import { NextRequest, NextResponse } from 'next/server';
import { revalidatePublic } from '@/lib/revalidate';
import connectDB from '@/lib/mongodb';
import Settings from '@/models/Settings';
import Page from '@/models/Page';
import Section from '@/models/Section';
import { isAuthed } from '@/lib/auth';
import { DEFAULT_SECTIONS } from '@/lib/defaults';

const TERMS_HTML = `
<p>Welcome to The Assignment Hub. By accessing or using our website and services, you agree to be bound by these Terms &amp; Conditions. Please read them carefully.</p>
<h2>1. Services</h2>
<p>The Assignment Hub provides academic writing and research support services intended for reference, learning and guidance purposes. All work delivered is meant to be used in accordance with your institution's academic integrity policies.</p>
<h2>2. Orders &amp; Payments</h2>
<ul>
  <li>All inquiries are subject to confirmation of scope, deadline and price before work begins.</li>
  <li>Prices are quoted per project and may vary based on complexity, length and turnaround time.</li>
  <li>Work commences only after the agreed terms are accepted by both parties.</li>
</ul>
<h2>3. Revisions</h2>
<p>We offer reasonable free revisions where the delivered work does not match the originally agreed requirements. Revision requests must be raised within the timeframe communicated at delivery.</p>
<h2>4. Refunds</h2>
<p>Refund eligibility is assessed on a case-by-case basis. Requests should be submitted with supporting details so our team can review them fairly and promptly.</p>
<h2>5. Confidentiality</h2>
<p>We treat all client information as strictly confidential and do not share personal details with third parties except as required to deliver the requested service.</p>
<h2>6. Acceptable Use</h2>
<p>You agree not to use our services for any unlawful purpose or in any way that violates your institution's regulations. Responsibility for the final use of delivered material rests with the client.</p>
<h2>7. Changes to These Terms</h2>
<p>We may update these Terms &amp; Conditions from time to time. Continued use of our services after changes are posted constitutes acceptance of the revised terms.</p>
<h2>8. Contact</h2>
<p>For any questions about these Terms, please reach out to us through the contact details provided on our website.</p>
`.trim();

const PRIVACY_HTML = `
<p>This Privacy Policy explains how The Assignment Hub collects, uses and protects the information you share with us when you use our website and services.</p>
<h2>1. Information We Collect</h2>
<ul>
  <li><strong>Contact details</strong> you provide through our inquiry form (name, email, phone).</li>
  <li><strong>Assignment details</strong> such as subject, requirements and any files you upload.</li>
  <li><strong>Usage data</strong> collected automatically to help us improve the website experience.</li>
</ul>
<h2>2. How We Use Your Information</h2>
<p>We use your information to respond to inquiries, deliver the services you request, process payments, and communicate updates relating to your order.</p>
<h2>3. Data Sharing</h2>
<p>We do not sell your personal information. Data is shared only with trusted parties strictly necessary to fulfil your request, and only to the extent required.</p>
<h2>4. Data Security</h2>
<p>We apply reasonable technical and organisational measures to protect your data against unauthorised access, loss or misuse.</p>
<h2>5. Data Retention</h2>
<p>We retain your information only for as long as necessary to provide our services and meet legal or operational requirements.</p>
<h2>6. Your Rights</h2>
<p>You may request access to, correction of, or deletion of your personal data by contacting us using the details on our website.</p>
<h2>7. Cookies</h2>
<p>Our website may use cookies to enhance functionality and analyse traffic. You can control cookies through your browser settings.</p>
<h2>8. Contact</h2>
<p>If you have questions about this Privacy Policy or how your data is handled, please contact us through the website.</p>
`.trim();

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();

    // 1) Ensure the global Settings singleton exists (defaults from the schema).
    const settings = await Settings.findOneAndUpdate(
      { key: 'global' },
      { $setOnInsert: { key: 'global' } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // 1b) Ensure the homepage Section config exists (config only — no marketing
    //     copy is injected, so the page stays driven by what the admin enters).
    if ((await Section.countDocuments()) === 0) {
      await Section.insertMany(DEFAULT_SECTIONS);
    }

    // 2) Seed Terms & Privacy pages only if they don't already exist (idempotent).
    const created: string[] = [];
    const defaults = [
      { slug: 'terms-and-conditions', title: 'Terms & Conditions', content: TERMS_HTML, order: 1,
        metaTitle: 'Terms & Conditions — The Assignment Hub',
        metaDescription: 'Read the Terms & Conditions governing the use of The Assignment Hub services.' },
      { slug: 'privacy-policy', title: 'Privacy Policy', content: PRIVACY_HTML, order: 2,
        metaTitle: 'Privacy Policy — The Assignment Hub',
        metaDescription: 'Learn how The Assignment Hub collects, uses and protects your personal information.' },
    ];

    for (const p of defaults) {
      const exists = await Page.findOne({ slug: p.slug });
      if (!exists) {
        await Page.create({ ...p, ogImage: '', published: true, showInFooter: true });
        created.push(p.slug);
      }
    }

    revalidatePublic();
    return NextResponse.json({
      success: true,
      settingsId: String(settings._id),
      pagesCreated: created,
      message: created.length
        ? `Created pages: ${created.join(', ')}`
        : 'Settings ensured. Terms & Privacy pages already existed.',
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Seeding failed' }, { status: 500 });
  }
}

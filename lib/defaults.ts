// Pure data + types shared by server AND client components.
// No server-only imports here so it is safe in the client bundle.
import type { ContentType } from '@/models/ContentItem';
export type { ContentType };

export type HeroStat = { icon: string; number: string; label: string };

export type SettingsData = {
  siteName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  managerName: string;
  supportHours: string;
  topStripText: string;
  address: { line1: string; line2: string; city: string; state: string; country: string; pincode: string; mapUrl: string };
  social: { instagram: string; facebook: string; linkedin: string };
  business: { legalName: string; foundedYear: string; about: string; gstin: string };
  stats: { assignments: string; writers: string; rating: string; years: string };
  heroStats: HeroStat[];
  seo: { metaTitle: string; metaDescription: string; keywords: string; siteUrl: string; ogImage: string; twitterHandle: string };
};

export type PageData = {
  slug: string; title: string; content: string;
  metaTitle: string; metaDescription: string; ogImage: string;
  published: boolean; showInFooter: boolean; order: number;
  updatedAt?: string;
};

export type ContentItemData = {
  _id?: string; type: ContentType; order: number;
  title: string; subtitle: string; body: string; icon: string;
  rating: number; published: boolean;
  // Service-detail fields (used by individual service pages). Optional so all
  // existing content types and previously-saved items keep working unchanged.
  slug?: string;        // SEO-friendly URL segment, e.g. "dissertation-writing"
  bodyHtml?: string;    // rich detailed description — may contain div/span/etc.
  benefits?: string[];  // bullet list of benefits / features
};

/* Slugify any title into a URL-safe segment. Pure + deterministic so the same
 * title always maps to the same /services/<slug> path (used as a fallback when
 * an item has no stored slug yet). */
export function slugify(input: string): string {
  return (input || '')
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'item';
}

/* Canonical path to an individual service page. Prefers a stored slug and
 * falls back to a slugified title so links resolve even before a slug is saved. */
export function serviceHref(s: { slug?: string; title: string }): string {
  return `/services/${s.slug && s.slug.trim() ? s.slug.trim() : slugify(s.title)}`;
}

export type SectionKey =
  | 'hero' | 'domains' | 'services' | 'how-it-works'
  | 'about' | 'business-info' | 'cta' | 'reviews' | 'faq' | 'gif';

export type SectionData = {
  _id?: string;
  key: SectionKey;
  label: string;
  enabled: boolean;
  order: number;
  tag: string;
  heading: string;
  subheading: string;
  marginLeft: number;
  marginRight: number;
  maxWidth: number;
  // Media fields — used only by the 'gif' section (Cloudinary-hosted GIF used
  // as the HERO BACKGROUND).
  mediaUrl?: string;      // Cloudinary secure delivery URL
  mediaPublicId?: string; // Cloudinary public_id (needed to delete/replace)
  mediaHeight?: number;   // (legacy) kept for compatibility; unused as background
  mediaOverlay?: number;  // 0–90 — darkness % of the overlay so hero text stays readable
};

/* Which sections pull their list items from the Content tab. The rest are
 * driven purely by Settings + the section's own heading text. */
export const CONTENT_DRIVEN: Record<string, ContentType | undefined> = {
  services: 'service',
  domains: 'domain',
  'how-it-works': 'step',
  about: 'reason',
  reviews: 'testimonial',
  faq: 'faq',
};

/* Default section configuration. Used as the in-memory fallback when the DB
 * has no Section rows yet, and as the template the admin "Sections" page
 * persists on first visit. Edit any of this from the admin panel. */
// Layout/config only — NO marketing copy. Text stays blank until the admin
// types it on the Sections page, so the live site shows only admin-entered data.
export const DEFAULT_SECTIONS: SectionData[] = [
  { key: 'hero',          label: 'Hero',                 order: 1, enabled: true, marginLeft: 20, marginRight: 20, maxWidth: 1280, tag: '', heading: '', subheading: '' },
  { key: 'domains',       label: 'Subjects Strip',       order: 2, enabled: true, marginLeft: 20, marginRight: 20, maxWidth: 1280, tag: '', heading: '', subheading: '' },
  { key: 'services',      label: 'Services',             order: 3, enabled: true, marginLeft: 20, marginRight: 20, maxWidth: 1280, tag: '', heading: '', subheading: '' },
  { key: 'how-it-works',  label: 'How It Works',         order: 4, enabled: true, marginLeft: 20, marginRight: 20, maxWidth: 1280, tag: '', heading: '', subheading: '' },
  { key: 'about',         label: 'About / Why Choose Us', order: 5, enabled: true, marginLeft: 20, marginRight: 20, maxWidth: 1280, tag: '', heading: '', subheading: '' },
  { key: 'business-info', label: 'Business & Contact',   order: 6, enabled: true, marginLeft: 20, marginRight: 20, maxWidth: 1280, tag: '', heading: '', subheading: '' },
  { key: 'cta',           label: 'Call To Action',       order: 7, enabled: true, marginLeft: 20, marginRight: 20, maxWidth: 900,  tag: '', heading: '', subheading: '' },
  { key: 'reviews',       label: 'Reviews',              order: 8, enabled: true, marginLeft: 20, marginRight: 20, maxWidth: 1280, tag: '', heading: '', subheading: '' },
  { key: 'faq',           label: 'FAQ',                  order: 9, enabled: true, marginLeft: 20, marginRight: 20, maxWidth: 768,  tag: '', heading: '', subheading: '' },
  { key: 'gif',           label: 'Hero Background GIF',  order: 10, enabled: true, marginLeft: 20, marginRight: 20, maxWidth: 1100, tag: '', heading: '', subheading: '', mediaUrl: '', mediaPublicId: '', mediaHeight: 380, mediaOverlay: 55 },
];

// Suggested copy shown ONLY as greyed-out placeholders in the admin Sections
// form. These are hints — never rendered on the live site.
export const SECTION_HINTS: Record<SectionKey, { tag: string; heading: string; subheading: string }> = {
  'hero':          { tag: "India's Most Trusted Academic Help", heading: 'Expert Assignment Help — | AI-Free & Plagiarism-Free', subheading: 'Get your assignments done by qualified academic experts. 100% original, on-time delivery, and grades you deserve.' },
  'domains':       { tag: '100+ Subjects:', heading: '', subheading: '' },
  'services':      { tag: 'Our Services', heading: 'Complete Academic Writing Services', subheading: 'From essays to dissertations — every type of academic assignment.' },
  'how-it-works':  { tag: 'Process', heading: 'How It Works in 4 Simple Steps', subheading: '' },
  'about':         { tag: 'Why Choose Us', heading: 'The {siteName} Advantage', subheading: '' },
  'business-info': { tag: '', heading: '', subheading: '' },
  'cta':           { tag: '', heading: 'Ready to Get the Grade You Deserve?', subheading: 'Join {assignments} students who trust {siteName}.' },
  'reviews':       { tag: 'Student Reviews', heading: 'What Our Students Say', subheading: 'Rated by thousands of verified students' },
  'faq':           { tag: 'FAQ', heading: 'Frequently Asked Questions', subheading: '' },
  'gif':           { tag: '', heading: 'See Us In Action', subheading: '' },
};

/* ------------------------------------------------------------------ *
 * Fallback defaults — used when the DB is empty / unreachable so the
 * site renders identically even before any content is seeded.
 * ------------------------------------------------------------------ */
export const DEFAULT_SETTINGS: SettingsData = {
  siteName: 'The Assignment Hub',
  tagline: 'Expert Academic Writing',
  phone: '+91-7357274693',
  whatsapp: '917357274693',
  email: 'contact.assignmenthub1@gmail.com',
  managerName: 'Anil Kumawat',
  supportHours: '24/7 Available',
  topStripText: '4.8 RATED · 50K+ ASSIGNMENTS DELIVERED',
  address: {
    line1: '', line2: '', city: '', state: '', country: 'India', pincode: '', mapUrl: '',
  },
  social: { instagram: '', facebook: '', linkedin: '' },
  business: { legalName: 'The Assignment Hub', foundedYear: '', about: '', gstin: '' },
  stats: { assignments: '', writers: '', rating: '', years: '' },
  heroStats: [],
  seo: {
    metaTitle: 'The Assignment Hub — Expert Academic Writing Services',
    metaDescription: 'AI-Free, plagiarism-free assignment help by 1500+ expert writers.',
    keywords: 'assignment help, academic writing, dissertation, essay writing, India',
    siteUrl: '', ogImage: '', twitterHandle: '',
  },
};

// The classic 4 cards — used ONLY by the admin "Load default cards" button.
// Not rendered automatically; the live hero shows only what is saved in settings.
export const DEFAULT_HERO_STATS: HeroStat[] = [
  { icon: '📚', number: '50K+',  label: 'Assignments Delivered' },
  { icon: '👨‍🏫', number: '1500+', label: 'Expert Writers' },
  { icon: '⭐', number: '4.8★',  label: 'Average Rating' },
  { icon: '🏆', number: '10+',   label: 'Years of Excellence' },
];

export const DEFAULT_CONTENT: Record<ContentType, ContentItemData[]> = {
  service: [
    { type: 'service', order: 1, icon: '📝', title: 'Essay Help', slug: 'essay-help', body: 'Custom essays for any topic, length, or academic level with original research.',
      bodyHtml: '<p>Our <span style="color:#2563a8;font-weight:600">essay writing experts</span> craft fully original, well-argued essays tailored to your topic, word count, and referencing style.</p><div style="background:#f5f7fa;border-radius:12px;padding:16px 18px;margin:18px 0;"><strong>Every essay includes</strong> a clear thesis, structured argument, credible citations and a plagiarism-free guarantee.</div><p>From short reflective pieces to argumentative and analytical essays, we cover all academic levels.</p>',
      benefits: ['Any topic & academic level', 'Original, plagiarism-free writing', 'Your choice of referencing style', 'On-time delivery'], subtitle: '', rating: 5, published: true },
    { type: 'service', order: 2, icon: '🎓', title: 'Dissertation & Thesis', slug: 'dissertation-thesis', body: 'End-to-end support from proposal to final submission for Masters & PhD.',
      bodyHtml: '<p>Comprehensive <span style="color:#2563a8;font-weight:600">dissertation and thesis support</span> for Masters and PhD candidates — from topic selection and proposal through to the final defended draft.</p><h3>What we help with</h3><ul><li>Research proposals &amp; literature reviews</li><li>Methodology &amp; data analysis</li><li>Chapter-by-chapter writing &amp; editing</li></ul>',
      benefits: ['Proposal to final submission', 'Subject-matched PhD writers', 'Methodology & data analysis', 'Unlimited free revisions'], subtitle: '', rating: 5, published: true },
    { type: 'service', order: 3, icon: '📊', title: 'Report Writing', slug: 'report-writing', body: 'Analytical, technical, and business reports structured for clarity.', bodyHtml: '', benefits: ['Business, technical & lab reports', 'Clear structure & data visuals', 'Executive summaries included'], subtitle: '', rating: 5, published: true },
    { type: 'service', order: 4, icon: '💼', title: 'Case Studies', slug: 'case-studies', body: 'In-depth case analysis with real-world solutions for business and law.', bodyHtml: '', benefits: ['Real-world frameworks', 'Business & law focus', 'Actionable recommendations'], subtitle: '', rating: 5, published: true },
    { type: 'service', order: 5, icon: '📄', title: 'CV & SOP Writing', slug: 'cv-sop-writing', body: 'Professional CVs and statements that get you noticed by top universities.', bodyHtml: '', benefits: ['ATS-friendly formatting', 'University & job applications', 'Tailored to your goals'], subtitle: '', rating: 5, published: true },
    { type: 'service', order: 6, icon: '🔬', title: 'Research Papers', slug: 'research-papers', body: 'Well-cited, peer-reviewed standard research across all disciplines.', bodyHtml: '', benefits: ['Peer-review standard', 'Accurate citations', 'All disciplines covered'], subtitle: '', rating: 5, published: true },
    { type: 'service', order: 7, icon: '💻', title: 'Technical Writing', slug: 'technical-writing', body: 'Engineering, CS, and IT assignments handled by domain specialists.', bodyHtml: '', benefits: ['Engineering, CS & IT', 'Domain specialist writers', 'Code & documentation'], subtitle: '', rating: 5, published: true },
    { type: 'service', order: 8, icon: '🧮', title: 'Finance & Stats', slug: 'finance-stats', body: 'Complex calculations, analysis, and reports with precise methodology.', bodyHtml: '', benefits: ['Statistical analysis', 'SPSS, R & Excel', 'Step-by-step working'], subtitle: '', rating: 5, published: true },
  ],
  reason: [
    { type: 'reason', order: 1, icon: '🤖', title: 'AI-Free Guarantee', body: '100% human-written content with no AI tools — verified and certified original.', subtitle: '', rating: 5, published: true },
    { type: 'reason', order: 2, icon: '⏰', title: 'On-Time Delivery', body: 'We respect every deadline. Get your work delivered before time, every time.', subtitle: '', rating: 5, published: true },
    { type: 'reason', order: 3, icon: '💰', title: 'Pocket-Friendly Pricing', body: 'Premium quality at student-friendly prices. No hidden fees, transparent billing.', subtitle: '', rating: 5, published: true },
    { type: 'reason', order: 4, icon: '👨‍🏫', title: 'Qualified Experts', body: 'PhD and Masters-qualified writers with 5+ years of academic writing experience.', subtitle: '', rating: 5, published: true },
    { type: 'reason', order: 5, icon: '🔄', title: 'Free Revisions', body: 'Unlimited revisions until you are 100% satisfied with the final output.', subtitle: '', rating: 5, published: true },
    { type: 'reason', order: 6, icon: '🔒', title: '24/7 Support', body: 'Round-the-clock customer support via WhatsApp, email, and live chat.', subtitle: '', rating: 5, published: true },
  ],
  step: [
    { type: 'step', order: 1, icon: '01', title: 'Submit Inquiry', body: 'Fill in your assignment details, deadline, and requirements in our simple form.', subtitle: '', rating: 5, published: true },
    { type: 'step', order: 2, icon: '02', title: 'Meet Your Expert', body: 'A qualified writer reviews your brief and connects with you personally.', subtitle: '', rating: 5, published: true },
    { type: 'step', order: 3, icon: '03', title: 'Secure Payment', body: 'Make a secure payment through multiple convenient payment methods.', subtitle: '', rating: 5, published: true },
    { type: 'step', order: 4, icon: '04', title: 'Receive Your Work', body: 'Get your perfectly crafted assignment delivered before your deadline.', subtitle: '', rating: 5, published: true },
  ],
  testimonial: [
    { type: 'testimonial', order: 1, title: 'Heeral P.', subtitle: 'Business Student', body: 'The team supported my marketing dissertation brilliantly. Well-structured, excellent writing, and helped me achieve top marks!', icon: '', rating: 5, published: true },
    { type: 'testimonial', order: 2, title: 'Nikhil S.', subtitle: 'Nursing Student', body: 'A big thanks for helping with my nursing research project. Their in-depth insights and academic knowledge were outstanding. Highly recommend!', icon: '', rating: 5, published: true },
    { type: 'testimonial', order: 3, title: 'Liam H.', subtitle: 'HR Student', body: 'They structured my Human Resource essay with strong arguments and solid research. The paper was both insightful and academically credible.', icon: '', rating: 5, published: true },
    { type: 'testimonial', order: 4, title: 'Sophia R.', subtitle: 'Psychology Student', body: 'My psychology thesis was handled with such expertise. Great research and profound analysis. My final result was absolutely perfect!', icon: '', rating: 5, published: true },
    { type: 'testimonial', order: 5, title: 'Daniel K.', subtitle: 'Engineering Student', body: 'They simplified my complex technical report into clear, concise language. Met my deadline with a very polished output.', icon: '', rating: 5, published: true },
    { type: 'testimonial', order: 6, title: 'Olivia M.', subtitle: 'Business Student', body: 'The research and strategy for my business case study was perfect. My professor was very impressed and I couldn\'t be happier!', icon: '', rating: 5, published: true },
  ],
  faq: [
    { type: 'faq', order: 1, title: 'Why should I trust your online assignment service?', body: 'We have 10+ years of experience, 1500+ qualified writers, and 50K+ delivered assignments. We maintain strict confidentiality policies and guarantee original work.', subtitle: '', icon: '', rating: 5, published: true },
    { type: 'faq', order: 2, title: 'How fast can you complete my assignment?', body: 'We offer urgent delivery as fast as 12 hours. Our team works 24/7 to meet any deadline, no matter how tight.', subtitle: '', icon: '', rating: 5, published: true },
    { type: 'faq', order: 3, title: 'Is the work plagiarism-free and AI-free?', body: 'Absolutely. Every assignment is 100% human-written, checked with Turnitin, and comes with a plagiarism-free certificate upon request.', subtitle: '', icon: '', rating: 5, published: true },
    { type: 'faq', order: 4, title: 'What subjects do you cover?', body: 'We cover 100+ subjects including Law, Engineering, Nursing, Finance, Psychology, Management, Science, Calculus, Computer Science, and many more.', subtitle: '', icon: '', rating: 5, published: true },
    { type: 'faq', order: 5, title: 'Is my personal information kept confidential?', body: 'Yes, completely. We follow strict data privacy protocols and never share your information with third parties.', subtitle: '', icon: '', rating: 5, published: true },
    { type: 'faq', order: 6, title: 'What if I need revisions?', body: 'We offer free unlimited revisions within the scope of original requirements until you are fully satisfied.', subtitle: '', icon: '', rating: 5, published: true },
  ],
  domain: [
    { type: 'domain', order: 1, title: 'Law', body: '', subtitle: '', icon: '', rating: 5, published: true },
    { type: 'domain', order: 2, title: 'Science', body: '', subtitle: '', icon: '', rating: 5, published: true },
    { type: 'domain', order: 3, title: 'Nursing', body: '', subtitle: '', icon: '', rating: 5, published: true },
    { type: 'domain', order: 4, title: 'Engineering', body: '', subtitle: '', icon: '', rating: 5, published: true },
    { type: 'domain', order: 5, title: 'Management & HR', body: '', subtitle: '', icon: '', rating: 5, published: true },
    { type: 'domain', order: 6, title: 'Finance & Stats', body: '', subtitle: '', icon: '', rating: 5, published: true },
    { type: 'domain', order: 7, title: 'Psychology', body: '', subtitle: '', icon: '', rating: 5, published: true },
    { type: 'domain', order: 8, title: 'Calculus', body: '', subtitle: '', icon: '', rating: 5, published: true },
    { type: 'domain', order: 9, title: 'Computer Science', body: '', subtitle: '', icon: '', rating: 5, published: true },
    { type: 'domain', order: 10, title: 'MBA', body: '', subtitle: '', icon: '', rating: 5, published: true },
  ],
};

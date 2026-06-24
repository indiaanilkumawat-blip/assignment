// Pure data + types shared by server AND client components.
// No server-only imports here so it is safe in the client bundle.
import type { ContentType } from '@/models/ContentItem';
export type { ContentType };

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
  stats: { assignments: '50K+', writers: '1500+', rating: '4.8★', years: '10+' },
  seo: {
    metaTitle: 'The Assignment Hub — Expert Academic Writing Services',
    metaDescription: 'AI-Free, plagiarism-free assignment help by 1500+ expert writers.',
    keywords: 'assignment help, academic writing, dissertation, essay writing, India',
    siteUrl: '', ogImage: '', twitterHandle: '',
  },
};

export const DEFAULT_CONTENT: Record<ContentType, ContentItemData[]> = {
  service: [
    { type: 'service', order: 1, icon: '📝', title: 'Essay Help', body: 'Custom essays for any topic, length, or academic level with original research.', subtitle: '', rating: 5, published: true },
    { type: 'service', order: 2, icon: '🎓', title: 'Dissertation & Thesis', body: 'End-to-end support from proposal to final submission for Masters & PhD.', subtitle: '', rating: 5, published: true },
    { type: 'service', order: 3, icon: '📊', title: 'Report Writing', body: 'Analytical, technical, and business reports structured for clarity.', subtitle: '', rating: 5, published: true },
    { type: 'service', order: 4, icon: '💼', title: 'Case Studies', body: 'In-depth case analysis with real-world solutions for business and law.', subtitle: '', rating: 5, published: true },
    { type: 'service', order: 5, icon: '📄', title: 'CV & SOP Writing', body: 'Professional CVs and statements that get you noticed by top universities.', subtitle: '', rating: 5, published: true },
    { type: 'service', order: 6, icon: '🔬', title: 'Research Papers', body: 'Well-cited, peer-reviewed standard research across all disciplines.', subtitle: '', rating: 5, published: true },
    { type: 'service', order: 7, icon: '💻', title: 'Technical Writing', body: 'Engineering, CS, and IT assignments handled by domain specialists.', subtitle: '', rating: 5, published: true },
    { type: 'service', order: 8, icon: '🧮', title: 'Finance & Stats', body: 'Complex calculations, analysis, and reports with precise methodology.', subtitle: '', rating: 5, published: true },
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

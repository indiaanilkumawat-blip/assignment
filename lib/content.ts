import connectDB from '@/lib/mongodb';
import Settings, { ISettings } from '@/models/Settings';
import Page, { IPage } from '@/models/Page';
import ContentItem, { ContentType } from '@/models/ContentItem';
import {
  SettingsData, PageData, ContentItemData,
  DEFAULT_SETTINGS, DEFAULT_CONTENT,
} from '@/lib/defaults';

export type { SettingsData, PageData, ContentItemData };
export { DEFAULT_SETTINGS, DEFAULT_CONTENT };


/* ------------------------------------------------------------------ *
 * Getters — never throw. On any error they return safe fallbacks.
 * ------------------------------------------------------------------ */
function toSettingsData(doc: ISettings): SettingsData {
  return {
    siteName: doc.siteName, tagline: doc.tagline, phone: doc.phone, whatsapp: doc.whatsapp,
    email: doc.email, managerName: doc.managerName, supportHours: doc.supportHours,
    topStripText: doc.topStripText,
    address: { ...DEFAULT_SETTINGS.address, ...(doc.address || {}) },
    social: { ...DEFAULT_SETTINGS.social, ...(doc.social || {}) },
    business: { ...DEFAULT_SETTINGS.business, ...(doc.business || {}) },
    stats: { ...DEFAULT_SETTINGS.stats, ...(doc.stats || {}) },
    seo: { ...DEFAULT_SETTINGS.seo, ...(doc.seo || {}) },
  };
}

export async function getSettings(): Promise<SettingsData> {
  try {
    await connectDB();
    const doc = await Settings.findOne({ key: 'global' }).lean<ISettings>();
    if (!doc) return DEFAULT_SETTINGS;
    return toSettingsData(doc);
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function getContent(type: ContentType): Promise<ContentItemData[]> {
  try {
    await connectDB();
    const docs = await ContentItem.find({ type, published: true }).sort({ order: 1 }).lean();
    if (!docs || docs.length === 0) return DEFAULT_CONTENT[type];
    return docs.map((d) => ({
      _id: String(d._id),
      type: d.type, order: d.order, title: d.title, subtitle: d.subtitle,
      body: d.body, icon: d.icon, rating: d.rating, published: d.published,
    }));
  } catch {
    return DEFAULT_CONTENT[type];
  }
}

export async function getPublishedPages(): Promise<PageData[]> {
  try {
    await connectDB();
    const docs = await Page.find({ published: true }).sort({ order: 1 }).lean<IPage[]>();
    return docs.map(mapPage);
  } catch {
    return [];
  }
}

export async function getPageBySlug(slug: string): Promise<PageData | null> {
  try {
    await connectDB();
    const doc = await Page.findOne({ slug, published: true }).lean<IPage>();
    return doc ? mapPage(doc) : null;
  } catch {
    return null;
  }
}

function mapPage(d: IPage): PageData {
  return {
    slug: d.slug, title: d.title, content: d.content,
    metaTitle: d.metaTitle, metaDescription: d.metaDescription, ogImage: d.ogImage,
    published: d.published, showInFooter: d.showInFooter, order: d.order,
    updatedAt: d.updatedAt ? new Date(d.updatedAt).toISOString() : undefined,
  };
}

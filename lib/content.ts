import { cache } from 'react';
import connectDB from '@/lib/mongodb';
import Settings, { ISettings } from '@/models/Settings';
import Page, { IPage } from '@/models/Page';
import ContentItem, { ContentType } from '@/models/ContentItem';
import Section, { ISection } from '@/models/Section';
import {
  SettingsData, PageData, ContentItemData, SectionData,
  DEFAULT_SETTINGS, DEFAULT_CONTENT, DEFAULT_SECTIONS, slugify,
} from '@/lib/defaults';

export type { SettingsData, PageData, ContentItemData, SectionData };
export { DEFAULT_SETTINGS, DEFAULT_CONTENT, DEFAULT_SECTIONS };


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
    heroStats: Array.isArray(doc.heroStats)
      ? doc.heroStats.map((h) => ({ icon: h?.icon || '', number: h?.number || '', label: h?.label || '' }))
      : [],
    seo: { ...DEFAULT_SETTINGS.seo, ...(doc.seo || {}) },
  };
}

export const getSettings = cache(async (): Promise<SettingsData> => {
  try {
    await connectDB();
    const doc = await Settings.findOne({ key: 'global' }).lean<ISettings>();
    if (!doc) return DEFAULT_SETTINGS;
    return toSettingsData(doc);
  } catch {
    return DEFAULT_SETTINGS;
  }
});

export const getContent = cache(async (type: ContentType): Promise<ContentItemData[]> => {
  try {
    await connectDB();
    const docs = await ContentItem.find({ type, published: true }).sort({ order: 1 }).lean();
    // Return ONLY what the admin entered. No silent demo-content fallback —
    // an empty section simply renders nothing on the live site.
    return docs.map((d) => ({
      _id: String(d._id),
      type: d.type, order: d.order, title: d.title, subtitle: d.subtitle,
      body: d.body, icon: d.icon, rating: d.rating, published: d.published,
      slug: d.slug || '', bodyHtml: d.bodyHtml || '',
      benefits: Array.isArray(d.benefits) ? d.benefits : [],
    }));
  } catch {
    return [];
  }
});

/**
 * Section configuration that drives the homepage layout. If the DB has no
 * Section rows yet, fall back to the in-memory defaults so the page still
 * renders — the admin "Sections" page persists editable copies on first open.
 */
export const getSections = cache(async (): Promise<SectionData[]> => {
  try {
    await connectDB();
    const docs = await Section.find({}).sort({ order: 1 }).lean<ISection[]>();
    if (!docs || docs.length === 0) return DEFAULT_SECTIONS;
    return docs.map((d) => ({
      _id: String(d._id),
      key: d.key, label: d.label, enabled: d.enabled, order: d.order,
      tag: d.tag, heading: d.heading, subheading: d.subheading,
      marginLeft: d.marginLeft, marginRight: d.marginRight, maxWidth: d.maxWidth,
      mediaUrl: d.mediaUrl || '', mediaPublicId: d.mediaPublicId || '',
      mediaHeight: d.mediaHeight || 380, mediaOverlay: typeof d.mediaOverlay === 'number' ? d.mediaOverlay : 55,
    }));
  } catch {
    return DEFAULT_SECTIONS;
  }
});

/**
 * Look up ONE published service by its URL slug for the individual service
 * page. Matches the stored `slug` first; if a service was saved before slugs
 * existed (empty slug), it falls back to matching a slugified title so links
 * built from titles still resolve. Returns null when nothing matches.
 */
export const getServiceBySlug = cache(async (slug: string): Promise<ContentItemData | null> => {
  try {
    await connectDB();
    const target = slugify(slug);
    const docs = await ContentItem.find({ type: 'service', published: true }).sort({ order: 1 }).lean();
    const match = docs.find((d) => (d.slug && d.slug === target) || (!d.slug && slugify(d.title) === target));
    if (!match) return null;
    return {
      _id: String(match._id),
      type: match.type, order: match.order, title: match.title, subtitle: match.subtitle,
      body: match.body, icon: match.icon, rating: match.rating, published: match.published,
      slug: match.slug || slugify(match.title), bodyHtml: match.bodyHtml || '',
      benefits: Array.isArray(match.benefits) ? match.benefits : [],
    };
  } catch {
    return null;
  }
});

/** All published service slugs — used by the sitemap and static params. */
export const getServiceSlugs = cache(async (): Promise<string[]> => {
  try {
    await connectDB();
    const docs = await ContentItem.find({ type: 'service', published: true }).select('slug title').lean();
    return docs.map((d) => d.slug || slugify(d.title)).filter(Boolean);
  } catch {
    return [];
  }
});

export const getPublishedPages = cache(async (): Promise<PageData[]> => {
  try {
    await connectDB();
    const docs = await Page.find({ published: true }).sort({ order: 1 }).lean<IPage[]>();
    return docs.map(mapPage);
  } catch {
    return [];
  }
});

export const getPageBySlug = cache(async (slug: string): Promise<PageData | null> => {
  try {
    await connectDB();
    const doc = await Page.findOne({ slug, published: true }).lean<IPage>();
    return doc ? mapPage(doc) : null;
  } catch {
    return null;
  }
});

function mapPage(d: IPage): PageData {
  return {
    slug: d.slug, title: d.title, content: d.content,
    metaTitle: d.metaTitle, metaDescription: d.metaDescription, ogImage: d.ogImage,
    published: d.published, showInFooter: d.showInFooter, order: d.order,
    updatedAt: d.updatedAt ? new Date(d.updatedAt).toISOString() : undefined,
  };
}

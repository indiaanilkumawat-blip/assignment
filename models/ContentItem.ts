import mongoose, { Schema, Document } from 'mongoose';

export type ContentType = 'service' | 'faq' | 'testimonial' | 'step' | 'reason' | 'domain';

export interface IContentItem extends Document {
  type: ContentType;
  order: number;
  title: string;
  subtitle: string; // testimonial role / step accent label
  body: string; // description / faq answer / testimonial text
  icon: string; // emoji or short label
  rating: number; // testimonials
  published: boolean;
  // Service-detail fields (individual service pages). Optional / defaulted so
  // every other content type and any previously-saved item is unaffected.
  slug: string;       // SEO-friendly URL segment for /services/<slug>
  bodyHtml: string;   // rich detailed description (may contain div/span/etc.)
  benefits: string[]; // benefits / features bullet list
  createdAt: Date;
  updatedAt: Date;
}

const ContentItemSchema = new Schema<IContentItem>(
  {
    type: {
      type: String,
      enum: ['service', 'faq', 'testimonial', 'step', 'reason', 'domain'],
      required: true,
      index: true,
    },
    order: { type: Number, default: 0 },
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    body: { type: String, default: '' },
    icon: { type: String, default: '' },
    rating: { type: Number, default: 5 },
    published: { type: Boolean, default: true },
    slug: { type: String, default: '', index: true, trim: true, lowercase: true },
    bodyHtml: { type: String, default: '' },
    benefits: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.ContentItem ||
  mongoose.model<IContentItem>('ContentItem', ContentItemSchema);

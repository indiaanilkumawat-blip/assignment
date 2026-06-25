import mongoose, { Schema, Document } from 'mongoose';

/**
 * A Section is a configuration row that controls ONE block on the homepage.
 * The admin decides: is it shown, in what order, what heading text, and how
 * much horizontal margin (px) it gets. The actual list items (services, faqs,
 * reviews …) still live in ContentItem — a Section only controls the wrapper.
 *
 * `key` maps to a known render block in app/page.tsx. Admins can reorder /
 * hide / retitle / re-margin these, but cannot invent brand-new layout types
 * (those require code), which keeps the system predictable and safe.
 */
export type SectionKey =
  | 'hero'
  | 'domains'
  | 'services'
  | 'how-it-works'
  | 'about'
  | 'business-info'
  | 'cta'
  | 'reviews'
  | 'faq';

export interface ISection extends Document {
  key: SectionKey;
  label: string;        // admin-facing name
  enabled: boolean;     // show / hide on the live site
  order: number;        // placement (lower = higher up)
  tag: string;          // small uppercase pill label
  heading: string;      // big H2 / H1 title
  subheading: string;   // supporting paragraph
  marginLeft: number;   // px gutter from the left
  marginRight: number;  // px gutter from the right
  maxWidth: number;     // px max content width (centered inside the margins)
  createdAt: Date;
  updatedAt: Date;
}

const SectionSchema = new Schema<ISection>(
  {
    key: {
      type: String,
      enum: ['hero', 'domains', 'services', 'how-it-works', 'about', 'business-info', 'cta', 'reviews', 'faq'],
      required: true,
      unique: true,
      index: true,
    },
    label: { type: String, default: '' },
    enabled: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    tag: { type: String, default: '' },
    heading: { type: String, default: '' },
    subheading: { type: String, default: '' },
    marginLeft: { type: Number, default: 20 },
    marginRight: { type: Number, default: 20 },
    maxWidth: { type: Number, default: 1280 },
  },
  { timestamps: true }
);

export default mongoose.models.Section || mongoose.model<ISection>('Section', SectionSchema);

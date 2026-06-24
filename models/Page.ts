import mongoose, { Schema, Document } from 'mongoose';

export interface IPage extends Document {
  slug: string;
  title: string;
  content: string; // HTML authored in the admin panel
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  published: boolean;
  showInFooter: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const PageSchema = new Schema<IPage>(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true },
    content: { type: String, default: '' },
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    ogImage: { type: String, default: '' },
    published: { type: Boolean, default: true },
    showInFooter: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Page || mongoose.model<IPage>('Page', PageSchema);

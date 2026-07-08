import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  key: string; // always 'global' — singleton
  theme: string; // selected theme key (see lib/themes.ts)
  siteName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  managerName: string;
  supportHours: string;
  topStripText: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    mapUrl: string;
  };
  social: {
    instagram: string;
    facebook: string;
    linkedin: string;
  };
  business: {
    legalName: string;
    foundedYear: string;
    about: string;
    gstin: string;
  };
  stats: {
    assignments: string;
    writers: string;
    rating: string;
    years: string;
  };
  heroStats: { icon: string; number: string; label: string }[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    siteUrl: string;
    ogImage: string;
    twitterHandle: string;
  };
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    key: { type: String, default: 'global', unique: true },
    theme: { type: String, default: 'midnight-gold' },
    siteName: { type: String, default: 'The Assignment Hub' },
    tagline: { type: String, default: 'Expert Academic Writing' },
    phone: { type: String, default: '+91-7357274693' },
    whatsapp: { type: String, default: '917357274693' },
    email: { type: String, default: 'contact.assignmenthub1@gmail.com' },
    managerName: { type: String, default: 'Anil Kumawat' },
    supportHours: { type: String, default: '24/7 Available' },
    topStripText: { type: String, default: '4.8 RATED · 50K+ ASSIGNMENTS DELIVERED' },
    address: {
      line1: { type: String, default: '' },
      line2: { type: String, default: '' },
      city: { type: String, default: '' },
      state: { type: String, default: '' },
      country: { type: String, default: 'India' },
      pincode: { type: String, default: '' },
      mapUrl: { type: String, default: '' },
    },
    social: {
      instagram: { type: String, default: '' },
      facebook: { type: String, default: '' },
      linkedin: { type: String, default: '' },
    },
    business: {
      legalName: { type: String, default: '' },
      foundedYear: { type: String, default: '' },
      about: { type: String, default: '' },
      gstin: { type: String, default: '' },
    },
    stats: {
      assignments: { type: String, default: '' },
      writers: { type: String, default: '' },
      rating: { type: String, default: '' },
      years: { type: String, default: '' },
    },
    heroStats: {
      type: [{
        icon: { type: String, default: '' },
        number: { type: String, default: '' },
        label: { type: String, default: '' },
      }],
      default: [],
    },
    seo: {
      metaTitle: { type: String, default: 'The Assignment Hub — Expert Academic Writing Services' },
      metaDescription: { type: String, default: 'AI-Free, plagiarism-free assignment help by 1500+ expert writers.' },
      keywords: { type: String, default: 'assignment help, academic writing, dissertation, essay writing, India' },
      siteUrl: { type: String, default: '' },
      ogImage: { type: String, default: '' },
      twitterHandle: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);

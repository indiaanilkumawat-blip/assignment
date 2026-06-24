import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IInquiry extends Document {
  name: string;
  email: string;
  phone: string;
  subject: string;
  serviceType: string;
  message: string;
  deadline?: string;
  attachmentId?: Types.ObjectId;
  attachmentName?: string;
  status: 'new' | 'read' | 'replied';
  createdAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, required: true },
    serviceType: { type: String, required: true },
    message: { type: String, required: true },
    deadline: { type: String },
    attachmentId: { type: Schema.Types.ObjectId, ref: 'Attachment' },
    attachmentName: { type: String },
    status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
  },
  { timestamps: true }
);

export default mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);

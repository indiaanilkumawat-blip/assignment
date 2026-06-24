import mongoose, { Schema, Document } from 'mongoose';

export interface IAttachment extends Document {
  filename: string;
  contentType: string;
  size: number;
  data: Buffer;
  createdAt: Date;
}

const AttachmentSchema = new Schema<IAttachment>(
  {
    filename: { type: String, required: true },
    contentType: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Attachment ||
  mongoose.model<IAttachment>('Attachment', AttachmentSchema);

import mongoose, { Schema, Document } from 'mongoose';

/**
 * Singleton store for the admin password hash (key: 'admin').
 *
 * The password used to live ONLY in the ADMIN_PASSWORD env var, which can't be
 * changed at runtime (it needs a redeploy). Moving the hash into the database
 * makes "Change Password" possible. ADMIN_PASSWORD is still honoured as a
 * one-time bootstrap on first login (see lib/adminAuth.ts).
 *
 * This is deliberately a separate collection — never merged into Settings —
 * so the hash is never returned by any public getter.
 */
export interface IAdminCredential extends Document {
  key: string;
  passwordHash: string;
  updatedAt: Date;
}

const AdminCredentialSchema = new Schema<IAdminCredential>(
  {
    key: { type: String, default: 'admin', unique: true, index: true },
    passwordHash: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.AdminCredential ||
  mongoose.model<IAdminCredential>('AdminCredential', AdminCredentialSchema);

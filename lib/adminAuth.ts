import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import AdminCredential from '@/models/AdminCredential';

const BOOTSTRAP_KEY = 'admin';

/**
 * Persist a new admin password (bcrypt-hashed). Upserts the singleton.
 */
export async function setAdminPassword(newPassword: string): Promise<void> {
  await connectDB();
  const passwordHash = await bcrypt.hash(newPassword, 10);
  await AdminCredential.findOneAndUpdate(
    { key: BOOTSTRAP_KEY },
    { key: BOOTSTRAP_KEY, passwordHash },
    { upsert: true, new: true }
  );
}

/**
 * Verify a candidate password.
 *
 * Priority:
 *   1. If a hash exists in the DB, that is authoritative (bcrypt compare).
 *   2. Otherwise fall back to the ADMIN_PASSWORD env var (first-time bootstrap)
 *      and, on success, seed the DB hash so future "change password" works.
 *   3. If the DB is unreachable, fall back to the env var so the admin is never
 *      locked out by a transient DB issue.
 */
export async function verifyAdminPassword(password: string): Promise<boolean> {
  const envPw = process.env.ADMIN_PASSWORD;
  try {
    await connectDB();
    const cred = await AdminCredential.findOne({ key: BOOTSTRAP_KEY }).lean<{ passwordHash?: string }>();
    if (cred?.passwordHash) {
      return bcrypt.compare(password, cred.passwordHash);
    }
    // Bootstrap from the env password, then seed the DB hash.
    if (envPw && password === envPw) {
      try { await setAdminPassword(password); } catch { /* seeding is best-effort */ }
      return true;
    }
    return false;
  } catch {
    // DB down — don't lock the admin out.
    return !!envPw && password === envPw;
  }
}

/** Whether a DB-stored password hash already exists. */
export async function hasDbPassword(): Promise<boolean> {
  try {
    await connectDB();
    const cred = await AdminCredential.findOne({ key: BOOTSTRAP_KEY }).lean<{ passwordHash?: string }>();
    return !!cred?.passwordHash;
  } catch {
    return false;
  }
}

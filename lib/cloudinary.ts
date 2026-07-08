import crypto from 'crypto';

/**
 * Minimal server-side Cloudinary helper. We deliberately do NOT install the
 * cloudinary SDK — signing an upload is just a SHA-1 over the sorted params,
 * which keeps the bundle small and the dependency surface tiny.
 *
 * Flow (avoids Vercel's ~4.5 MB request body limit — GIFs are often bigger):
 *   1. Browser asks our API for a signature      (POST /api/admin/media { action: 'sign' })
 *   2. Browser uploads the file DIRECTLY to Cloudinary with that signature
 *   3. Browser saves the resulting URL back here (PUT /api/admin/media)
 * The API secret never leaves the server.
 */

export function cloudinaryEnv() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || '';
  const apiKey = process.env.CLOUDINARY_API_KEY || '';
  const apiSecret = process.env.CLOUDINARY_API_SECRET || '';
  return { cloudName, apiKey, apiSecret, configured: !!(cloudName && apiKey && apiSecret) };
}

/** Cloudinary signature: SHA-1 hex of "k1=v1&k2=v2...<api_secret>" with keys sorted. */
export function signParams(params: Record<string, string | number>, apiSecret: string): string {
  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&');
  return crypto.createHash('sha1').update(toSign + apiSecret).digest('hex');
}

/** Best-effort delete of an old Cloudinary asset so replaced GIFs don't pile up. */
export async function destroyAsset(publicId: string): Promise<void> {
  const { cloudName, apiKey, apiSecret, configured } = cloudinaryEnv();
  if (!configured || !publicId) return;
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = signParams({ public_id: publicId, timestamp }, apiSecret);
  const body = new URLSearchParams({
    public_id: publicId,
    timestamp: String(timestamp),
    api_key: apiKey,
    signature,
  });
  try {
    await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
      method: 'POST',
      body,
    });
  } catch {
    // Never let cleanup failure break the admin save.
  }
}

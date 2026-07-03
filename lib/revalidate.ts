import { revalidatePath } from 'next/cache';

/**
 * Bust the ISR cache for every public page. Called after any admin mutation
 * (settings / content / pages / sections / seed) so changes made in the admin
 * panel appear on the live site immediately, instead of waiting for the
 * 5-minute background revalidation window.
 */
export function revalidatePublic() {
  try {
    revalidatePath('/', 'layout');
  } catch {
    // Never let cache invalidation break the admin API response.
  }
}

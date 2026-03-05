/**
 * Strict image fetcher for the Edge runtime.
 * Prevents hanging requests and invalid URLs from crashing the OG generator.
 */

// We use the application's base URL or a static fallback if the provided image is invalid
export const fetchImageWithFallback = async (url: string | null): Promise<string> => {
  // 1. Fallback URL (the "Monolith" default black avatar/logo)
  // Ensure this points to an absolute URL accessible on the web.
  // Using a relative path won't work inside Satori without fetching the array buffer.
  const FALLBACK_IMG = process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/me/me.png`
    : "https://www.wistant.dev/me/me.png"; // Hardcoded prod fallback just in case

  if (!url) return FALLBACK_IMG;

  try {
    // 2. Basic URL validation
    new URL(url);

    // 3. Fetch with timeout to prevent Edge function from hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s max timeout

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[OG API] Image fetch failed with status: ${response.status}. Using fallback.`);
      return FALLBACK_IMG;
    }

    // If it's a valid ok response, we trust the URL and pass it to Satori.
    // Note: Satori handles rendering external absolute URLs natively if they aren't blocked by CORS.
    return url;
  } catch (error) {
    console.error(`[OG API] Failed to fetch or validate image: ${url}`, error);
    return FALLBACK_IMG;
  }
};

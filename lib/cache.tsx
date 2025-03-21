/**
 * Defines the structure of a cache entry, storing the data and the timestamp
 * when the data was cached.
 */
type CacheEntry = {
  data: any;
  timestamp: number;
};

/**
 * In-memory cache object used to store API responses.
 * Each key corresponds to a unique cache entry.
 */
const cache: { [key: string]: CacheEntry } = {};

/**
 * Time-to-live (TTL) for cached data, set to 1 hour (in milliseconds).
 * After this period, the cached entry is considered expired and will be refreshed.
 */
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

/**
 * Retrieves data from the cache if it exists and is still valid.
 * If not, it executes the provided fetcher function to obtain fresh data,
 * caches the result, and returns the new data.
 * 
 * @param key - The unique cache key associated with the data
 * @param fetcher - A callback function that fetches fresh data when the cache is expired or missing
 * @returns The cached or freshly fetched data
 */
export async function getOrSetCache(key: string, fetcher: () => Promise<any>) {
  const now = Date.now();

  // Check if the data exists in the cache and is still within the TTL window
  if (cache[key] && now - cache[key].timestamp < CACHE_TTL) {
    if (cache[key].data === null) {
      console.log(`Cache hit for ${key}, but data is null`);
    }
    console.log(`Cache hit for ${key}`);
    return cache[key].data;
  }

  // Cache miss or expired entry: fetch new data and store it in the cache
  console.log(`Cache miss for ${key}, fetching...`);
  const data = await fetcher();
  cache[key] = { data, timestamp: now };

  return data;
}

type CacheEntry = {
    data: any;
    timestamp: number;
  };
  
  const cache: { [key: string]: CacheEntry } = {};
  const CACHE_TTL = 1000 * 60 * 60; // Time to live for API cache (1 hour)
  
  export async function getOrSetCache(key: string, fetcher: () => Promise<any>) {
    const now = Date.now();
  
    if (cache[key] && now - cache[key].timestamp < CACHE_TTL) {
      console.log(`Cache hit for ${key}`);
      return cache[key].data;
    }
  
    console.log(`Cache miss for ${key}, fetching...`);
    const data = await fetcher();
    cache[key] = { data, timestamp: now };
    return data;
  }
  
import { GLTF } from 'three-stdlib';

interface ModelCacheEntry {
  gltf: GLTF;
  timestamp: number;
}

const CACHE_EXPIRY = 5 * 60 * 1000;

class ModelCache {
  private cache: Map<string, ModelCacheEntry> = new Map();

  get(url: string): GLTF | null {
    const entry = this.cache.get(url);
    if (!entry) {
      return null;
    }

    if (Date.now() - entry.timestamp > CACHE_EXPIRY) {
      this.cache.delete(url);
      return null;
    }

    return entry.gltf;
  }

  set(url: string, gltf: GLTF): void {
    this.cache.set(url, {
      gltf,
      timestamp: Date.now(),
    });
  }

  clear(): void {
    this.cache.clear();
  }

  has(url: string): boolean {
    return this.cache.has(url);
  }
}

export const modelCache = new ModelCache();

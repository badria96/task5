// weather-cache.service.ts
import { Injectable } from '@angular/core';

@Injectable()
export class WeatherCacheService {
  private cache: Map<string, any> = new Map();
  private cacheDurationMs: number = 60000; // Cache data for 1 minute

  get(key: string): any {
    const cachedData = this.cache.get(key);
    if (cachedData && Date.now() - cachedData.timestamp <= this.cacheDurationMs) {
      return cachedData.data;
    }
    return null; // Data not found or cache expired
  }

  set(key: string, data: any): void {
    const timestamp = Date.now();
    this.cache.set(key, { data, timestamp });
  }
}

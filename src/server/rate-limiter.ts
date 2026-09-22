/**
 * In-Memory Sliding-Window Rate Limiter for Defensive Edge & API Protection
 */

interface RateLimitBucket {
  timestamps: number[];
}

const rateLimitBuckets = new Map<string, RateLimitBucket>();

export interface RateLimitConfig {
  windowMs: number; // Duration of window in ms
  maxRequests: number; // Max allowed requests per window
}

export class SlidingWindowRateLimiter {
  /**
   * Evaluates if an IP / key is allowed to proceed
   */
  static check(
    key: string,
    action: string,
    config: RateLimitConfig = { windowMs: 60000, maxRequests: 30 },
  ): {
    allowed: boolean;
    remaining: number;
    resetInMs: number;
  } {
    const bucketKey = `${action}:${key}`;
    const now = Date.now();
    const windowStart = now - config.windowMs;

    let bucket = rateLimitBuckets.get(bucketKey);
    if (!bucket) {
      bucket = { timestamps: [] };
      rateLimitBuckets.set(bucketKey, bucket);
    }

    // Filter out timestamps outside the active sliding window
    bucket.timestamps = bucket.timestamps.filter((ts) => ts > windowStart);

    if (bucket.timestamps.length >= config.maxRequests) {
      const oldestTs = bucket.timestamps[0] || now;
      const resetInMs = Math.max(0, oldestTs + config.windowMs - now);
      return {
        allowed: false,
        remaining: 0,
        resetInMs,
      };
    }

    // Record this request
    bucket.timestamps.push(now);
    return {
      allowed: true,
      remaining: config.maxRequests - bucket.timestamps.length,
      resetInMs: config.windowMs,
    };
  }

  /**
   * Periodic garbage collection of stale keys
   */
  static cleanup(): void {
    const now = Date.now();
    for (const [key, bucket] of rateLimitBuckets.entries()) {
      bucket.timestamps = bucket.timestamps.filter((ts) => ts > now - 3600000);
      if (bucket.timestamps.length === 0) {
        rateLimitBuckets.delete(key);
      }
    }
  }
}

// Run cleanup every 15 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => SlidingWindowRateLimiter.cleanup(), 15 * 60000);
}

import { Redis } from '@upstash/redis'

// Check if variables exist to avoid crashing locally without them
// Check if variables exist and are not placeholders to avoid crashing
const isRedisConfigured = 
  process.env.UPSTASH_REDIS_REST_URL && 
  process.env.UPSTASH_REDIS_REST_URL !== "your-url-here" &&
  process.env.UPSTASH_REDIS_REST_TOKEN &&
  process.env.UPSTASH_REDIS_REST_TOKEN !== "your-token-here"

export const redis = isRedisConfigured 
  ? Redis.fromEnv() 
  : null

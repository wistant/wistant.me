import { Redis } from '@upstash/redis'

// Check if variables exist to avoid crashing locally without them
const isRedisConfigured = 
  process.env.UPSTASH_REDIS_REST_URL && 
  process.env.UPSTASH_REDIS_REST_TOKEN

export const redis = isRedisConfigured 
  ? Redis.fromEnv() 
  : null

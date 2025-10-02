import { Redis } from '@upstash/redis'
const redis = Redis.fromEnv()
export default async (req, res) => {
  const n = await redis.incr('delta')
  res.status(200).send(String(n))
}

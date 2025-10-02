import { Redis } from '@upstash/redis'
const redis = Redis.fromEnv()
export default async (req, res) => {
  const user = req.query.user || 'unknown'
  const key = `daily:${user}:${new Date().toISOString().slice(0,10)}`
  const n = await redis.incr(key)
  await redis.expire(key, 86400)
  if (n > 10) return res.status(200).send('kick')
  res.status(200).send(String(n))
}

import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

import "dotenv/config";

const retelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, "60 s"),
});

export default retelimit;

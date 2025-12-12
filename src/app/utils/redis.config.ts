import { createClient, RedisClientType } from "redis";

let redisClient: RedisClientType | null = null;

export const getRedis = () => {
  if (!redisClient) {
    redisClient = createClient({
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    });

    redisClient.on("error", (err) => {
      console.error("Redis Client Error:", err);
    });
  }

  if (!redisClient.isOpen) {
    redisClient.connect().catch((err) => {
      console.error("Failed to connect to Redis:", err);
    });
  }

  return redisClient;
};

import {z} from "zod";
import * as process from "node:process";

const envSchema = z.object({
    HETZNER_API_KEY: z.string(),
    DATABASE_URL: z.string(),
    DIRECT_URL: z.string(),
    CHECK_INTERVAL: z.string().transform(v => Number(v))
})

export const env = envSchema.parse(process.env)
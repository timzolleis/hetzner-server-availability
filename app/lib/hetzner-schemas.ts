import {z} from "zod";

export const datacenterSchema = z.object({
    description: z.string(),
    id: z.number(),
    location: z.object({
        city: z.string(),
        country: z.string(),
        description: z.string(),
        id: z.number(),
        latitude: z.number(),
        longitude: z.number(),
        name: z.string(),
        network_zone: z.string()
    }),
    name: z.string(),
    server_types: z.object({
        available: z.array(z.number()),
        available_for_migration: z.array(z.number()),
        supported: z.array(z.number())
    })
})

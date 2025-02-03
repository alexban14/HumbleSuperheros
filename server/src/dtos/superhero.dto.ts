import { z } from 'zod';

export const SuperheroSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    superpower: z.string().min(1),
    humility_score: z.number().int().min(1).max(10),
    user_id: z.string().uuid(),
});

export const SuperheroCreateSchema = z.object({
    name: z.string().min(1),
    superpower: z.string().min(1),
    humility_score: z.number().int().min(1).max(10),
    user_id: z.string().uuid(),
})

export const SuperheroCreateRequestSchema = z.object({
    name: z.string().min(1),
    superpower: z.string().min(1),
    humility_score: z.number().int().min(1).max(10),
    user_id: z.string().uuid().optional(),
})

export type SuperheroDto = z.infer<typeof SuperheroSchema>;
export type SuperheroCreateDto = z.infer<typeof SuperheroCreateSchema>;
export type SuperheroCreateRequestDto = z.infer<typeof SuperheroCreateRequestSchema>;

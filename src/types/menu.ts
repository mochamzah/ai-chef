import { z } from "zod" // Zod Schema for strict Output Validation

export const MenuIdeaSchema = z.object({
    title: z.string(),
    description: z.string(),
    prep_time: z.number().describe("Waktu persiapan/marinasi dalam menit"),
    cook_time: z.number().describe("Waktu aktif di depan kompor dalam menit"),
    difficulty: z.enum(["Mudah", "Sedang", "Sulit"]),
    match_percentage: z.number().min(0).max(100),
    chef_notes: z.string().describe("Tips rahasia untuk tekstur atau rasa"),
    steps_detail: z.array(z.string())
})

export interface MenuIdea {
    title: string;
    description: string;
    chef_notes: string;
    prep_time: number;
    cook_time: number;
    difficulty: "Mudah" | "Sedang" | "Sulit";
    steps_detail: string[];
    used_ingredients: string[];
    match_percentage: number;
}

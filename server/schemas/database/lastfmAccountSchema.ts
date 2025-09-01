import { object, string, number, date, array, any, ZodType } from "zod";

export const lastfmAccountSchema = object({
  id: string(),
  user_id: number(),
  session_key: string().optional(),
  display_name: string().optional(),
  avatar_url: string().optional(),
  created_at: date().optional(),
  updated_at: date().optional(),
})


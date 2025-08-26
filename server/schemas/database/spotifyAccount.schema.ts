import { object, string, number, date, array, any, ZodType } from "zod";

export const spotifyAccountSchema = object({
  user_id: number(),
  spotify_id: string(),
  refresh_token: string().optional(),
  access_token: string().optional(),
  expires_in: date().optional(),
  display_name: string().optional(),
  avatar_url: string().optional(),
  created_at: date().optional(),
  updated_at: date().optional(),
})


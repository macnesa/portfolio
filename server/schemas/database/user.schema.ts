import { object, string, number, date, array, any, ZodType } from "zod";

export const userSchema = object({
  id: number().optional(),
  username: string(),
  email: string().optional(),
  password_hash: string().optional(),
  created_at: string().optional(),
})
import { z } from "zod";

export const redirectSchema = z.object({
  code: z.string().min(1, "Missing or invalid code")
});
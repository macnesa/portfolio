import { z } from "zod";

export const redirectSchema = z.object({
  code: z.string().nonempty()
});;
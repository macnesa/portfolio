
import { z, ZodType } from 'zod';

// root or outer layer of this server's API response
export const Response = < T extends ZodType<any> >(data: T) =>
  z.object({
    success: z.boolean(),
    status: z.number(),
    message: z.string(),
    data: data,
  });

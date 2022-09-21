import { z } from 'zod';

export const cartItem = z.object({
  id: z.string(),
  description: z.string(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export type CartItem = z.infer<typeof cartItem>;

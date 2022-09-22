import { z } from 'zod';

const cartItem = z.object({
  id: z.string(),
  description: z.string(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export type CartItem = z.infer<typeof cartItem>;

const cart = z.object({
  items: z.array(cartItem),
  total: z.number(),
});

export type Cart = z.infer<typeof cart>;

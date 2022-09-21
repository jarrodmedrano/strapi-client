import { z } from 'zod';
import { dish } from './dish';

const restaurantDish = z.object({
  id: z.string(),
  attributes: z.object({
    Dish: dish,
  }),
});

const restaurantChild = z.object({
  id: z.string(),
  description: z.string(),
  name: z.string(),
  thumbnail: z.object({
    data: z.object({
      attributes: z.object({
        name: z.string(),
        size: z.string(),
        width: z.string(),
        previewUrl: z.string(),
        height: z.string(),
        alternativeText: z.string(),
        caption: z.string(),
        url: z.string(),
      }),
    }),
  }),
});

const restaurant = z.object({
  id: z.string(),
  attributes: z.object({
    Restaurant: restaurantChild,
  }),
});

export type RestaurantDish = z.infer<typeof restaurantDish>;

export type RestaurantChild = z.infer<typeof restaurantChild>;

export type Restaurant = z.infer<typeof restaurant>;

import { z } from 'zod';

export const thumbnail = z.object({
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
});

export const dish = z.object({
  id: z.string(),
  description: z.string(),
  name: z.string(),
  thumbnail: z.object({
    data: thumbnail,
  }),
  price: z.number(),
});

export type Thumbnail = z.infer<typeof thumbnail>;

export type Dish = z.infer<typeof dish>;

import { z } from 'zod';

export const Dish = z.object({
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

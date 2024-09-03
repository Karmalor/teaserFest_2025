import * as z from 'zod'

export const applicationFormSchema = z.object({
    stageName: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    tagline: z.string(),
    imageUrl: z.string(),
    applicantResponse: z.object({
        stageName: z.string(),
        tagline: z.string(),
        imageUrl: z.string(),
      })
  });


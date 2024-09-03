import * as z from 'zod'

// export const applicantResponseSchema = z.object({
//     stageName: z.string().min(2, {
//       message: "Username must be at least 2 characters.",
//     }),
//     tagline: z.string().min(2, {
//       message: "tagline must be at least 2 characters.",
//     }),
//     imageUrl: z.string(),
// }).optional()

export const applicationFormSchema = z.object({
    stageName: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    tagline: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    imageUrl: z.string(),
    applicantResponse: z.record(z.string()).optional()
  })

  


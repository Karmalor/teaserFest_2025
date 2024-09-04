import * as z from 'zod'

export const applicantResponseSchema = z.object({
    stageName: z.string().min(1, {
      message: "Username must be at least 1 character.",
    }),
    legalName: z.string().min(1, {
      message: "Username must be at least 1 character.",
    }),
    tagline: z.string().min(2, {
      message: "tagline must be at least 2 characters.",
    }),
    preferredPronouns: z.string().optional(),
    nameOfAct: z.string(),
    imageUrl: z.string(),
    music: z.string().optional(),
    performanceVideo: z.string(),
    techNotes: z.string().optional(),
    descriptionOfAct: z.string(),
    lightingRequests: z.string().optional(),
    soundCues: z.string().optional(),
    setupForAct: z.string().optional(),
    breakdownForAct: z.string().optional(),
    socialMediaLinks: z.object({
      instagram: z.string().optional(),
      faceBook: z.string().optional(),
      tikTok: z.string().optional(),
    }),
    submitToCompetition: z.boolean().default(false),

    

})

export const applicationFormSchema = z.object({
    // stageName: z.string().min(2, {
    //   message: "Username must be at least 2 characters.",
    // }),
    // tagline: z.string().min(2, {
    //   message: "Username must be at least 2 characters.",
    // }),
    // imageUrl: z.string(),
    // createdAt: z.date(),
    // submittedAt: z.string(),
    applicantResponse: applicantResponseSchema,
    // applicationSubmitted: z.boolean().default(false)
  })

  


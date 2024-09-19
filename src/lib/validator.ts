import * as z from 'zod'

export const applicantResponseSchema = z.object({
    stageName: z.string().min(1, {
      message: "Username must be at least 1 character.",
    }),
    legalName: z.string().min(2, {
      message: "Username must be at least 2 character.",
    }),
    tagline: z.string().min(2, {
      message: "tagline must be at least 2 characters.",
    }),
    preferredPronouns: z.string().optional(),
    nameOfAct: z.string().min(3),
    descriptionOfAct: z.string().optional(),
    imageUrl: z.string().min(1, {
      message: "Don't forget to add a photo",
    }),
    musicUrl: z.string().min(1, {
      message: "Don't forget to include your music",
    }),
    musicName: z.string().optional(),
    performanceVideo: z.string().min(3).includes('www.', {message: 'Must be a link to a video'}),
    techNotes: z.string().optional(),
    lightingRequests: z.string().optional(),
    soundCues: z.string().optional(),
    setupForAct: z.string().optional(),
    breakdownForAct: z.string().optional(),
    socialMediaLinks: z.object({
      instagram: z.string().optional(),
      faceBook: z.string().optional(),
      tikTok: z.string().optional(),
    }).optional(),
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

  


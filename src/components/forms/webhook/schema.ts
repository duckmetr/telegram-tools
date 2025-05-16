import { z } from 'zod'

export const formSchema = z.object({
  method: z.string().min(1).max(20),
  token: z.string().min(2).max(50),
  domain: z.string().optional(),
  path: z.string().optional()
})

export type FormValues = z.infer<typeof formSchema>

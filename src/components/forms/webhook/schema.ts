import { z } from 'zod'

export const formSchema = z.object({
  method: z.enum(['Set webhook', 'Webhook info', 'Bot info', '']),
  token: z.string().min(2).max(50),
  domain: z.string().optional(),
  path: z.string().optional()
})

export type FormValues = z.infer<typeof formSchema>

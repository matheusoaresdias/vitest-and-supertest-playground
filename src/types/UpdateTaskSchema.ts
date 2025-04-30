import { z } from 'zod'

export const UpdateTaskSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
})

import z from 'zod'
export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(63, { message: 'Username must be at most 63 characters' })
    .regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/, {
      message: 'Username must be lowercase and can only contain letters, numbers, and hyphens',
    })
    .refine((val) => !val.includes('--'), 'username cannot contain double hyphens')
    .transform((val) => val.toLowerCase()),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

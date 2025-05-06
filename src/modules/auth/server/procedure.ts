import { baseProcedure, createTRPCRouter } from '@/trpc/init'
import { headers as getHeaders } from 'next/headers'
import { cookies as getCookies } from 'next/headers'
import { TRPCError } from '@trpc/server'
import { loginSchema, signUpSchema } from '../schema'
export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders()

    const session = await ctx.db.auth({ headers: headers })

    return session
  }),
  logout: baseProcedure.mutation(async ({}) => {
    const cookies = await getCookies()
    cookies.delete('payload-token')
  }),
  register: baseProcedure.input(signUpSchema).mutation(async ({ ctx, input }) => {
    await ctx.db.create({
      collection: 'users',
      data: {
        email: input.email,
        password: input.password,
        username: input.username,
      },
    })

    const data = await ctx.db.login({
      collection: 'users',
      data: {
        email: input.email,
        password: input.password,
      },
    })

    if (!data.token) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid email or password',
      })
    }

    const cookies = await getCookies()

    cookies.set({
      name: 'payload-token',
      value: data.token,
      httpOnly: true,
      path: '/',
      // TODO: Ensure the cross domain cookie sharing
    })

    return data
  }),

  login: baseProcedure.input(loginSchema).mutation(async ({ ctx, input }) => {
    const data = await ctx.db.login({
      collection: 'users',
      data: {
        email: input.email,
        password: input.password,
      },
    })

    if (!data.token) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid email or password',
      })
    }

    const cookies = await getCookies()

    cookies.set({
      name: 'payload-token',
      value: data.token,
      httpOnly: true,
      path: '/',
      // TODO: Ensure the cross domain cookie sharing
    })

    return data
  }),
})

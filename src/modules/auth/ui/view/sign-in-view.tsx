'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../../schema'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { useTRPC } from '@/trpc/client'
import { toast } from 'sonner'
import Link from 'next/link'
export function SignInView() {
  const trpc = useTRPC()

  const signUpMutation = useMutation(
    trpc.auth.login.mutationOptions({
      onError: (error) => {
        toast.error('Invalid credentials')
      },
      onSuccess: () => {
        toast.success('Login successfully')
      },
    }),
  )

  // 1. Define your form.
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof loginSchema>) {
    signUpMutation.mutate(values)
  }

  return (
    <div className="flex items-center flex-col justify-center w-full min-h-screen  p-5 ">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold my-3 text-center">Welcome back to Shoper</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="**********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant={'evaluated'}
              disabled={signUpMutation.isPending}
              className="w-full"
              type="submit"
            >
              {signUpMutation.isPending ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </Form>
      </div>
      <Link href={'/sign-up'} className="text-blue-600 my-3   hover:underline text-center" prefetch>
        Don't have an account
      </Link>
    </div>
  )
}

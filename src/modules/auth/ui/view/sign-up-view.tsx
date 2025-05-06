'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { signUpSchema } from '../../schema'
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
export function SignUpView() {
  const trpc = useTRPC()

  const signUpMutation = useMutation(
    trpc.auth.register.mutationOptions({
      onError: (error) => {
        toast.error(error.message)
      },
      onSuccess: () => {
        toast.success('Account created successfully')
      },
    }),
  )

  // 1. Define your form.
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    mode: 'all',
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof signUpSchema>) {
    signUpMutation.mutate(values)
  }

  const username = form.watch('username')
  const usernameErrors = form.formState.errors.username
  const showPreview = username && !usernameErrors

  return (
    <div className="flex items-center flex-col justify-center w-full min-h-screen  p-5 ">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold my-3 text-center">Create an account to get started</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  {showPreview && (
                    <FormDescription>Your domain will be {username}.shoper.com </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

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
              {signUpMutation.isPending ? 'Signing up...' : 'Sign up'}
            </Button>
          </form>
        </Form>
      </div>
      <Link className="text-blue-600 my-3  hover:underline text-center" href={'/sign-in'} prefetch>
        Already have an account
      </Link>
    </div>
  )
}

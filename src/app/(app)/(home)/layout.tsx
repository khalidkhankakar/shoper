import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Footer } from './_components/footer'
import { Navbar } from './_components/navbar'
import { SearchFilter } from './_components/search-filter'
import { getQueryClient, trpc } from '@/trpc/server'
import { Suspense } from 'react'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions())

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>loading...</p>}>
          <SearchFilter />
        </Suspense>
      </HydrationBoundary>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

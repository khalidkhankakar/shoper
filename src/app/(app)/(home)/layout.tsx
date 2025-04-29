import { getPayload } from 'payload'
import { Footer } from './_components/footer'
import configPromise from '@payload-config'
import { Navbar } from './_components/navbar'
import { SearchFilter } from './_components/search-filter'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    depth: 1,
    where: {
      parent: {
        exists: false,
      },
    },
    collection: 'categories',
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <SearchFilter data={data} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

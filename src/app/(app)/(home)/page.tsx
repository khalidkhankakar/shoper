'use client'

import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'

const HomePage = () => {
  const trpc = useTRPC()

  const { data } = useQuery(trpc.auth.session.queryOptions())

  return (
    <div className="p-4">
      <p>Home page</p>
      {JSON.stringify(data, null, 2)}
    </div>
  )
}

export default HomePage

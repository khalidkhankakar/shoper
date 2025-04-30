'use client'
import React from 'react'
import { SearchInput } from './search-input'
import { Categories } from './categories'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'

export const SearchFilter = () => {
  const trpc = useTRPC()
  // destructure the query options from the trpc instance
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions())

  return (
    <div className="bg-slate-100 p-4">
      <SearchInput />
      <Categories data={data} />
    </div>
  )
}

import React from 'react'
import { SearchInput } from './search-input'
import { Categories } from './categories'
import { CustomCategory } from '../../types'
import { Category } from '@/payload-types'

interface Props {
  data: {
    docs: CustomCategory[]
  }
}

export const SearchFilter = ({ data }: Props) => {
  const formattedData: CustomCategory[] = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((subcat) => ({
      ...(subcat as Category),
      subcategories: undefined,
    })),
  }))

  return (
    <div className="bg-slate-100 p-4">
      <SearchInput />
      <Categories data={formattedData} />
    </div>
  )
}

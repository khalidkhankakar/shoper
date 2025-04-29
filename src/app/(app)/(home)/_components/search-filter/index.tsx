import React from 'react'
import { SearchInput } from './search-input'
import { Categories } from './categories'

interface Props {
  data: any
}

export const SearchFilter = ({ data }: Props) => {
  const formattedData = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((subcat: any) => ({
      ...subcat,
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

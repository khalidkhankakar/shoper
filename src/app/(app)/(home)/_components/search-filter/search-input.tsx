import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import React from 'react'

export const SearchInput = () => {
  return (
    <div className='w-full my-2 relative flex items-center justify-center'>
        <SearchIcon size={16} className='absolute left-4' />
      <Input
        className='w-full pl-8 pr-4 py-2'
        placeholder='Search for products...'
        type='text'
      />
    </div>
  )
}



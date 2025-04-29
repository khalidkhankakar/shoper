import React from 'react'
import { CategoryDropdown } from './category-dropdown'

interface Props {
    data: any
}
export const Categories = ({data}:Props) => {
  return (
    <div className='flex items-center flex-wrap px-4 gap-2 '>
      {
        data.map((category:any)=>(
            <div key={category.id}>
                <CategoryDropdown 
                    category={category} 
                    isActive={false} 
                    isNavigationHover={false}
                />
            </div>
        ))
      }
    </div>
  )
}


'use client'
import React, { useState } from 'react'
import { CustomCategory } from '../../types'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: CustomCategory[]
}

export const CategoriesSidebar = ({ open, onOpenChange, data }: Props) => {
  const router = useRouter()
  const [parentCategories, setParentCategories] = useState<CustomCategory[] | null>(null)
  const [selectedCagtegory, setSelectedCategory] = useState<CustomCategory | null>(null)

  // if the parent category show those otherwise show the root categories
  const currentCategories = parentCategories ?? data ?? []

  const handleOpenChange = (open: boolean) => {
    setSelectedCategory(null)
    setParentCategories(null)
    onOpenChange(open)
  }

  const handleCategoryClick = (cat: CustomCategory) => {
    if (cat.subcategories && cat.subcategories.length > 0) {
      setParentCategories(cat.subcategories as CustomCategory[])
      setSelectedCategory(cat)
    } else {
      // this is leaf category
      if (parentCategories && selectedCagtegory) {
        router.push(`/${selectedCagtegory.slug}/${cat.slug}`)
      } else {
        // this is main category
        if (cat.slug === 'all') {
          router.push('/')
        } else {
          router.push(`/${cat.slug}`)
        }
      }

      handleOpenChange(false)
    }
  }

  const handleBackClick = () => {
    if (parentCategories) {
      setParentCategories(null)
      setSelectedCategory(null)
    }
  }

  const backgroundColor = selectedCagtegory?.color || 'white'
  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent className="p-0 transition-none" style={{ backgroundColor }} side="left">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="text-3xl font-bold">Categories</SheetTitle>
        </SheetHeader>

        <ScrollArea className=" flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories && (
            <button
              onClick={handleBackClick}
              className="w-full text-left p-4  hover:bg-black hover:text-white flex items-center text-base font-medium"
            >
              <ChevronLeft className="size-4  mr-2" />
              Back
            </button>
          )}

          {currentCategories.map((category) => (
            <button
              onClick={() => handleCategoryClick(category)}
              key={category.slug}
              className="w-full text-left p-4  hover:bg-black hover:text-white flex items-center justify-between text-base font-medium"
            >
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRight className="size-4" />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

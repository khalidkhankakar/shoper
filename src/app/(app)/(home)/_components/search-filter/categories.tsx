'use client'
import React, { useEffect, useRef, useState } from 'react'
import { CategoryDropdown } from './category-dropdown'
import { CustomCategory } from '../../types'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ListFilterIcon } from 'lucide-react'
import { CategoriesSidebar } from './categories-sidebar'

interface Props {
  data: CustomCategory[]
}
export const Categories = ({ data }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const viewAllRef = useRef<HTMLDivElement>(null)

  const [visibleCount, setvisibleCount] = useState(data.length)
  const [isAnyHovered, setIsAnyHovered] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const activeCategory = 'all'

  const activeCategoryIndex = data.findIndex((category) => category.slug === activeCategory)
  const isActiveCategoryHidden = activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1
  useEffect(() => {
    const calculateVisibleCount = () => {
      if (!containerRef.current || !measureRef.current || !viewAllRef.current) return

      const containerWidth = containerRef.current.offsetWidth
      const viewAllWidth = viewAllRef.current.offsetWidth
      const avaliableWidth = containerWidth - viewAllWidth

      const items = Array.from(measureRef.current.children) as HTMLDivElement[]

      let totalWidth = 0
      let visible = 0

      for (const item of items) {
        const width = item.getBoundingClientRect().width

        if (totalWidth + width > avaliableWidth) {
          break
        }

        totalWidth += width
        visible++
      }

      setvisibleCount(visible)
    }

    const resizeObserver = new ResizeObserver(() => {
      calculateVisibleCount()
    })
    resizeObserver.observe(containerRef.current!)
    return () => {
      resizeObserver.disconnect()
    }
  }, [data.length])

  return (
    <div className="relative w-full">
      {/* categories sidebar */}
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} data={data} />

      <div
        ref={measureRef}
        className="absolute opacity-0 pointer-events-none flex gap-2"
        style={{ position: 'fixed', top: -9999, left: -9999 }}
      >
        {data.map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHover={false}
            />
          </div>
        ))}
      </div>

      {/* visible items */}

      <div
        ref={containerRef}
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
        className="flex items-center px-4 gap-2 "
      >
        {data.slice(0, visibleCount).map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHover={isAnyHovered}
            />
          </div>
        ))}
        <div ref={viewAllRef} className="shrink-0">
          <Button
            className={cn(
              'h-11 px-4 rounded-full border-transparent text-black bg-transparent hover:bg-white hover:text-black',
              isActiveCategoryHidden && !isAnyHovered && 'bg-white border ',
            )}
            onClick={() => setIsSidebarOpen(true)}
          >
            View All
            <ListFilterIcon className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}

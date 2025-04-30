import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { CategoriesGetManyOutput } from '@/modules/categories/types'

interface Props {
  category: CategoriesGetManyOutput
  isActive?: boolean
  isNavigationHover?: boolean
}

export const CategoryDropdown = ({ category, isActive, isNavigationHover }: Props) => {
  const backgroundColor = category.color || '#32a852'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full px-4 py-1 " variant={isActive ? 'evaluated' : 'outline'}>
          {category.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent style={{ backgroundColor }} className="w-56 ">
        <DropdownMenuGroup>
          {category.subcategories.map((subcat) => (
            <DropdownMenuItem
              key={subcat.id}
              className="hover:bg-black hover:text-white py-2 w-full text-lg font-medium underline cursor-pointer"
              asChild
            >
              <Link href={'/'}>{subcat.name}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

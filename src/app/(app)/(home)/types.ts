import { Category } from '@/payload-types'

export type CustomCategory = Category & {
  subcategories: Omit<Category, 'subcategories'>[]
}

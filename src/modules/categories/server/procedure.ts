import { baseProcedure, createTRPCRouter } from '@/trpc/init'
import { Category } from '@/payload-types'

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.find({
      depth: 1,
      where: {
        parent: {
          exists: false,
        },
      },
      collection: 'categories',
      sort: 'name',
    })

    const formattedData = data.docs.map((doc) => ({
      ...doc,
      subcategories: (doc.subcategories?.docs ?? []).map((subcat) => ({
        ...(subcat as Category),
        subcategories: undefined,
      })),
    }))

    return formattedData
  }),
})

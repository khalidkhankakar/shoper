import { baseProcedure, createTRPCRouter } from '@/trpc/init'

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    return [{ name: 'Khalid khan trpc server' }]
  }),
})

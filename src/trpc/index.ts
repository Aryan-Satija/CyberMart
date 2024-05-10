import {  publicProcedure, router } from "./trpc";
import { authRouter} from "./auth-router";
import {z} from "zod";
import { getPayloadClient } from "../get-payload";

const QueryValidator = z.object({
    category: z.string().optional(),
    sort: z.enum(['asc', 'desc']).optional(),
    limit: z.number().optional()
})

interface parsedQueryOpts {
    [key: string]: {
        equals: string
    }
}

export const appRouter = router({
    auth : authRouter,
    getInfiniteProducts: publicProcedure.input(z.object({
        cursor: z.number().nullish(),
        query: QueryValidator
    })).query(async({input})=>{
        const {cursor, query} = input;
        const {sort, limit, ...queryOpts} = query;
        const payload = await getPayloadClient();
        
        const parsedQueryOpts : parsedQueryOpts = {}

        Object.entries(queryOpts).forEach(([key, value]) => {
            parsedQueryOpts[key] = {
                equals: value
            }
        })
        
        const page = cursor ?? 1

        const {docs : items, hasNextPage, nextPage } = await payload.find({
            collection: 'products',
            where: {
                approvedForSale: {
                    equals: 'approved'
                },
                ...parsedQueryOpts
            },
            sort,
            depth: 1,
            limit, 
            page
        })

        return {items, nextPage: hasNextPage ? nextPage : null}
    })
});

export type AppRouter = typeof appRouter
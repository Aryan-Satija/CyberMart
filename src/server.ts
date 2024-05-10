import { getPayloadClient } from "./get-payload";

// Importing the `express` framework under the name `express`
import express from "express";


import { nextApp, nextHandler } from "./next-utils";
import * as trpcExpress  from "@trpc/server/adapters/express"
import { appRouter } from "./trpc";
import { inferAsyncReturnType } from "@trpc/server";


// Creating an instance of the Express application
const app = express()

const PORT = Number(process.env.PORT) || 3000

const createContext =  ({req, res} : trpcExpress.CreateExpressContextOptions) => ({req, res}) 
export type ExpressContext = inferAsyncReturnType<typeof createContext>

app.use('/api/trpc', trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
}))

const start = async() => {

    const payload = await getPayloadClient({
        initOptions : {
            express : app,
            onInit : async(cms) => {
                cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
            }
        }
    });

    app.use((req, res) => nextHandler(req, res));

    nextApp.prepare().then(()=>{
        payload.logger.info('NEXT.js started');
        app.listen(PORT, () => {
            payload.logger.info(`Server started on port ${PORT}`);
        });
    })
}
start();
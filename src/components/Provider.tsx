"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "@/trpc/client";
import { httpBatchLink } from "@trpc/client";

const Providers = ({children} : {children  : ReactNode}) => {
    const [queryClient] = useState(() => {
        return new QueryClient()
    })

    // note : we did not prefer to do queryClient = new QueryClient()
    // in order to preserve the state across re renders

    const [trpcClient] = useState(() => {
        return trpc.createClient({
            links : [
                httpBatchLink({
                    url: 'http://localhost:3000/api/trpc',
                    fetch(url, options){
                        return  fetch(url, {...options, credentials : 'include'}, )
                    }
                })
            ]
        })
    })

        return (
            <trpc.Provider client={trpcClient} queryClient={queryClient}>
                <QueryClientProvider client={queryClient}>
                    {
                        children
                    }
                </QueryClientProvider>
            </trpc.Provider>
        )

}   

export default Providers;
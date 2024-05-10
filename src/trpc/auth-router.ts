import { getPayloadClient } from "../get-payload";
import { publicProcedure, router } from "./trpc";
import {z} from 'zod';
import { TRPCError } from "@trpc/server";

const signupSchema = z.object({
    email : z.string().email(),
    password : z.string().min(8, {message : 'Password must be atleast 8 characters long'})
})

export const authRouter = router({
    createPayloadUser : publicProcedure.input(signupSchema).mutation(async({input})=>{
        const {email, password} = input;
        const payload = await getPayloadClient()

        const {docs : users} = await payload.find({
            collection: "users",
            where: {
                email: {
                    equals: email
                }
            }
        })

        if(users.length !== 0) 
            throw new TRPCError({code: 'CONFLICT'})

        await payload.create({
            collection: 'users',
            data: {
                email,
                password,
                role: 'user'
            }
        })
        return {success: true, emailtosent : email}
    }),
    verifyEmail : publicProcedure.input(z.object({token : z.string()})).query(async ({input})=>{
        const {token} = input;

        const payload = await getPayloadClient();
        
        const isVerified = await payload.verifyEmail({
            collection: 'users',
            token,
        })
    
        if(!isVerified)
                throw new TRPCError({code : 'UNAUTHORIZED'})
        return {success: true}
    }),
    signIn : publicProcedure.input(signupSchema).mutation(async({input, ctx})=>{
        const {email, password} = input;
        
        const {res} = ctx;

        const payload = await getPayloadClient();
        
        try{
            await payload.login({
                collection: 'users',
                data: { 
                    email,
                    password
                },
                res
            })
        }
        catch(err){
            throw new TRPCError({code: 'UNAUTHORIZED'})
        }
    })
})
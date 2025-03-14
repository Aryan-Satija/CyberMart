import dotenv from 'dotenv';
import path from 'path';
import type {InitOptions} from "payload/config";
import payload, { Payload } from "payload";
import nodemailer from 'nodemailer';

dotenv.config({
    path: path.resolve(__dirname, "../.env")
})

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
        user: "codebattles01@gmail.com",
        pass: "qmfotumkmzubndfu"
    }
})

let cached = (global as any).payload;

if(!cached){
    cached = (global as any).payload = {
        client : null,
        promise: null
    }
}

interface args {
    initOptions ?: Partial<InitOptions>
}

export const getPayloadClient = async({initOptions} : args = {}) : Promise<Payload>  => {
    
    if(!process.env.PAYLOAD_SECRET){
        throw new Error("Secret key is missing")
    }
    
    if(cached.client) return cached.client;

    if(!cached.promise){
        cached.promise = payload.init({
            email: {
                transport: transporter,
                fromAddress: "codebattles01@gmail.com",
                fromName: "CyberMart"
            },
            secret : process.env.PAYLOAD_SECRET,
            local : initOptions?.express ? false : true,
            ...(initOptions || {}) 
        });
    }

    try{
        cached.client = await cached.promise;
    } catch(e : unknown){
        cached.promise = null
        throw e;
    }
    
    return cached.client;
}
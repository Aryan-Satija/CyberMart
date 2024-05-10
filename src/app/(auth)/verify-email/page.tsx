import Image from "next/image";
import { Verifytoken } from "@/components/verify-token";
interface paramsProps { 
    searchParams : {
        [index : string] : string | undefined
    }
}
const VerifyEmail = ({searchParams} : paramsProps)=>{
    const {to} = searchParams;
    const {token} = searchParams;
    return (
        token ? 
        (
            <p>
                <Verifytoken token = {token} />
            </p>
        ) 
        : 
        (
            <div className="p-20 flex flex-col items-center gap-8 justify-center mx-auto">
                <div>
                    <Image src={'/neon mailbox.png'} width={250} height={250} alt="neon mailbox cybermart" className="w-full rounded-full shadow-md shadow-slate-500"/>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                    <p className="font-bold text-slate-700 ">
                        Please verify your email address to continue.
                    </p>
                    <p className="text-muted-foreground">
                        {
                            to ? `We have sent an email at ${to}.` : `We have sent an email at your email.`
                        }
                    </p>
                </div>
            </div>
        )
    )
}

export default VerifyEmail
"use client";

import { trpc } from '@/trpc/client'
import React from 'react'
import Image from 'next/image';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

interface tokenProps { 
  token : string
}

export const Verifytoken = ({token} : tokenProps) => {
  
  const {data, isLoading, isError} = trpc.auth.verifyEmail.useQuery({token});
  console.log(data, isLoading, isError);
  if(isError){
    return (
      <div className='mx-auto flex flex-col items-center justify-center gap-4 p-20'>
        <div>
          <Image src={'/neon cart.png'} width={250} height={250} alt="neon cart cybermart" className='rounded-full'/>
        </div>
        <div className='text-center flex flex-col gap-2'>
          <p className='text-red-600 text-lg font-bold'>
            There was a problem.
          </p>
          <p className='text-muted-foreground text-sm'>
            This token is not valid or has expired. Please try again later.
          </p>
        </div>
      </div>
    )
  }
  
  else if(data?.success){    
    return (
      <div className='mx-auto flex flex-col items-center justify-center gap-4 p-20'>
        <div>
          <Image src={'/neon cart.png'} width={250} height={250} alt="neon cart cybermart" className='rounded-full'/>
        </div>
        <div className='text-center flex flex-col gap-2'>
          <p className=' text-orange-500 font-bold text-lg'>
            You are all set.
          </p>
          <p className='text-muted-foreground text-sm'>
            Thank You for verifying your email.
          </p>
        </div>
        <div>
          <Button>Sign In</Button>
        </div>
      </div>
    )
  }
  else if(isLoading){
    return (<div className='p-20 gap-4 flex flex-col justify-center items-center'>
      <Loader2 className='animate-spin text-muted-foreground font-bold text-2xl'/>
      <p className='text-md text-gray-800'>Please wait....</p>
    </div>)
  }
}

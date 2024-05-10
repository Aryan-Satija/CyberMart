'use client';

import {
  Button,
  buttonVariants,
} from '@/components/ui/button'
import Image from 'next/image';
import Link from 'next/link'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod';
import { cn } from '@/lib/utils';
import { trpc } from '@/trpc/client';
import {toast} from 'sonner';
import { ZodError } from 'zod';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
      message: 'Password must be atleast 8 characters long'
    })
  });

  type TsignupSchema = z.infer<typeof signupSchema> 
  const {register, handleSubmit, formState: {errors}} = useForm<TsignupSchema>({
    resolver: zodResolver(signupSchema)
  });

  const {mutate, isLoading} = trpc.auth.createPayloadUser.useMutation({
    onError: (err)=>{ 
      if(err.data?.code === 'CONFLICT'){
          toast.error('This email is already in use. Sign In instead');
      }
      else if(err instanceof ZodError){
          toast.error(err.issues[0].message)
      }
      else{
        toast.error('Something went wrong. Please try again later');
      }
    },
    onSuccess: ({emailtosent})=>{
      toast.success(`Verification Email sent to ${emailtosent}`)
      router.push('/verify-email?to=' + emailtosent);
    }
  });
  console.log(isLoading);
  console.log(mutate);
  const submitHandler = ({email, password} : TsignupSchema) => {
    mutate({email, password});
  }
  return (
    <>
      <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col items-center space-y-2 text-center'>
            <Image src="/neon cart.png" width={250} height={250} alt="cybermart cart image" className="rounded-full" quality={100} aria-hidden={true}/>
            <h1 className='text-2xl font-bold'>
                Create an account
            </h1>

            <Link 
                className={buttonVariants({
                    variant: 'link'
                })}
                href={"/sign-in"}
            >   
                Already have an account ? Sign-in 
            </Link>


            <div className='grid gap-6 text-start'>
                <form onSubmit={handleSubmit(submitHandler)}> 
                  <div className='grid gap-2'>
                    <div className='grid gap-1 py-2'>
                      <Label htmlFor='email'>Email</Label>
                      <Input 
                      {...register('email')}
                      className={cn({'focus-visible : ring-red-400' : errors.email})}
                      id={'email'} placeholder='spongebob@gmail.com'/>
                    </div>
                    <div className='grid gap-1 py-2'>
                      <Label htmlFor='password'>password</Label>
                      <Input 
                      {...register('password')}
                      id={'password'}
                      className={cn({'focus-visible : ring-red-400' : errors.password})}
                      placeholder='wh!t3pant$'/>
                    </div>
                    <Button>Sign Up</Button>
                  </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
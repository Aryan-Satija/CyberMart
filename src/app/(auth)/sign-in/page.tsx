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

  const {mutate, isLoading} = trpc.auth.signIn.useMutation({
    onError: (err)=>{ 
      if(err.data?.code === 'UNAUTHORIZED'){
          toast.error('Invalid email or password');
      }
      else{
        toast.error('Something went wrong. Please try again later');
      }
    },
    onSuccess: ()=>{
      toast.success(`Signed In Successfully`);
      router.refresh();

      router.push('/');
    }
  });

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
                Sign in to your account
            </h1>

            <Link 
                className={buttonVariants({
                    variant: 'link'
                })}
                href={"/sign-up"}
            >   
                Don&apos;t  have an account ? Sign-up 
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
                    <Button>Sign In</Button>
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
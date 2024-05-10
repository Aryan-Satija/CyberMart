import Wrapper from "@/components/Wrapper";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Truck } from 'lucide-react';
import { Clover } from 'lucide-react';
import { CircleCheckBig } from 'lucide-react';
import ProductReel from "@/components/ProductReels";

const perks = [
  {
    name: 'Instant Delivery',
    Icon: Truck,
    description : 'Get your assets delivered to yout email in seconds and download them right away.'
  },
  { 
    name: 'Guaranteed Quality',
    Icon: CircleCheckBig,
    description: 'Every asset on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer a 30-day refund guarantee.'
  },
  {
    name: 'For the Planet',
    Icon: Clover,  
    description: "We've pledged 1% of sales to the preservation and restoration of the natural environment."
  }
]

export default function Home() {
  return (
    <>
      <Wrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold ">Your marketplace for high-quality <span className="text-orange-500">digital assets</span></h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to CyberMart.Every asset on our platform is verified by our team to ensure our highest quality standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href='/products' className={buttonVariants()}> 
                Browse Trending
            </Link>
            <Button variant="ghost">
              Our quality products
            </Button>
          </div>
        </div>
      </Wrapper>
      <section>
        <Wrapper>
          <ProductReel title="Brand New" subtitle={'Shop now and get a chance to win a free ticket to Singapore....'} query={{limit: 4, category: "icons", sort: "asc"}}/>
        </Wrapper>
      </section>
      <section>
        <Wrapper>
          <div className="flex flex-col sm:flex-row lg:items-start lg:justify-between gap-4">
            {
              perks.map((perk)=>{
                return (<div id={perk.name} className="flex flex-col items-center text-center gap-4">
                  <perk.Icon className="w-16 h-16 bg-orange-500/40 p-4 rounded-full"/>
                  <div>
                    <h3 className="text-base font-medium text-gray-900">{perk.name}</h3>
                    <div className='mt-3 text-sm text-muted-foreground'>
                      {perk.description}
                    </div>
                  </div>
                </div>)
              })
            }
          </div>
        </Wrapper>
      </section>
    </>
  );
}

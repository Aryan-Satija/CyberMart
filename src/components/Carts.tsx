"use client";

import { 
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { ShoppingCart } from 'lucide-react';
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import ImageSlider from "./ImageSlider";
import { Button } from "./ui/button";

export const Cart = () => {
    const { items, removeItem } = useCart();
    return (
    <Sheet>
        <SheetTrigger>
            <span className="flex gap-2 item-center">
                <ShoppingCart/> 0
            </span>
        </SheetTrigger>
        <SheetContent className="overflow-auto">
            <SheetHeader>
                <SheetTitle>
                    Your Cart (0)
                </SheetTitle>
            </SheetHeader>
            <SheetDescription>
                {
                    items.length == 0 ? 
                    (
                        <div className="flex flex-col gap-8 items-center justify-center mt-24">
                            <div>
                                <Image src="/neon cart.png" width={250} height={250} alt="cybermart empty cart image" className="rounded-full shadow-md shadow-gray-600"/>
                            </div>
                            <p className="text-muted-foreground text-md font-semibold">
                                Your cart is empty
                            </p>
                        </div>
                    )
                    :
                    (
                        <div className="flex flex-col item-center justify-center gap-4">
                            {
                                items.map((item, i) => {
                                    const validUrls : string[] = [];
                                    
                                    
                                    item.product.images.forEach((img)=>{
                                        if(typeof img.image === "string" ){
                                            return;
                                        }
                                        else{
                                            validUrls.push(img.image.url!)
                                        }
                                    })

                                    return (<div key={item.product.id}>
                                        <div>
                                            <ImageSlider urls={validUrls}/>
                                        </div>
                                        <div>
                                            <p className="text-slate-950 font-bold ">
                                                {
                                                    item.product.name
                                                }
                                            </p>
                                            <p className="font-muted-forground text-xs">
                                                {
                                                    item.product.description
                                                }
                                            </p>
                                            <p className="text-md font-extrabold text-black">
                                                {
                                                    item.product.priceId
                                                }
                                            </p>
                                            <div>
                                                <Button variant={'destructive'} onClick={()=>{
                                                    removeItem(item.product.id);
                                                }} className="w-full">Remove From Cart</Button>
                                            </div>
                                        </div>
                                    </div>)
                                })
                            }
                        </div>
                    )
                }
            </SheetDescription>
        </SheetContent>
    </Sheet>
  )
}

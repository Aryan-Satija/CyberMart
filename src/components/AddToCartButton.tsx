"use client";

import React, {useState} from 'react'
import { Button } from './ui/button';
import { CircleCheckBig } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/payload-types';

const AddToCartButton = ({product} : {product : Product}) => {
    const [inCart, setInCart] = useState<boolean>(false);

    const {addItem} = useCart();

    return (
        <Button className="w-full" variant={"secondary"} onClick={()=>{
            addItem(product);
            setInCart((prev)=>!prev)
        }}>
        {
            inCart ? <span className='flex items-center justify-center gap-4 '>Added To Cart <CircleCheckBig className='text-green-400'/></span> : "Add To Cart"    
        }
        </Button>
    )
}

export default AddToCartButton
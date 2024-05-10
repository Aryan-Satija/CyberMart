"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { useState, useRef, useEffect } from "react";
import NavItem from './NavItem';

const NavItems = () => {
    const [activeIndex, setActiveIndex] = useState<null | number>(null); 

    const isAnyOpen = (activeIndex !== null);

    useEffect(()=>{
        const close = (e : KeyboardEvent)=>{
            if(e.key === 'Escape') 
                setActiveIndex(null);
        }
        document.addEventListener("keydown", (e : KeyboardEvent) => close(e));
        return ()=>{
            document.removeEventListener("keydown", (e : KeyboardEvent) => close(e));
        }
    }, [])
    return (<div className='flex gap-4 h-full'>
        {
            PRODUCT_CATEGORIES.map((category, i) => {
                const handleClick = () => {
                    if(activeIndex === i){
                        setActiveIndex(null);
                    }
                    else{
                        setActiveIndex(i);
                    }
                }

                const close = ()=>{
                    setActiveIndex(null);
                } 

                const isOpen = (i === activeIndex);

                return <NavItem key={i} isAnyOpen={isAnyOpen} isOpen={isOpen} category={category} handleClick = {handleClick} close={close} />
            })
        }
    </div>)
}
export default NavItems;
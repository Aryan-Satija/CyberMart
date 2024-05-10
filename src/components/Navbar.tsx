import Wrapper from "./Wrapper"
import Link from "next/link";
import NavItems from "./NavItems";
import { Cart } from "./Carts";
import Image from "next/image";
import { Button, buttonVariants } from "./ui/button";
const Navbar = () => {
    const user = null;
    return (
        <div className="bg-white sticky top-0 z-50 p-2 h-16 ">
            <header className="bg-white">
                <Wrapper>
                    <div className="border-b border-gray-200 p-2 flex items-center justify-between">
                        <div className="flex gap-4 items-center">
                            <div className="ml-4 flex lg:ml-0">
                                <Link href='/'>
                                    <Image src="/neon_cart_logo.png" className="rounded-full" width={55} height={55}  alt="cybermart logo"/>
                                </Link>
                            </div>
                            <div>
                                <NavItems />
                            </div>
                        </div>
                        <div className="flex items-center ">
                            {
                                user ? (<>
                                </>) : (
                                    <Button variant={'ghost'}>Sign In</Button>
                                )
                            }
                            {
                                user ? (<>
                                </>) : (
                                    <Button variant={'ghost'}>Register</Button>
                                )
                            }
                            {
                                user ? (<>
                                </>) : (
                                    <Button variant={'ghost'}>

                                    </Button>
                                )
                            }
                            {
                                <Cart/>
                            }
                        </div>
                    </div>
                </Wrapper>
            </header>
        </div>
    )
}
export default Navbar;
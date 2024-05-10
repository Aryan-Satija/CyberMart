import { Product } from "@/payload-types";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ImageSlider from "./ImageSlider";
const ProductListing = ({product, index} : {product : (Product | null), index : number}) => {
    if(!product){
        return (<div className="flex flex-col w-full">
            <div className="bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
                <Skeleton className="h-full w-full"/>
            </div>
            <Skeleton className='mt-4 w-2/3 h-4 rounded-lg' />
            <Skeleton className='mt-2 w-16 h-4 rounded-lg' />
            <Skeleton className='mt-2 w-12 h-4 rounded-lg' />
        </div>)
    }

    const validUrls = product.images
    .map(({ image }) =>
      typeof image === 'string' ? image : image.url
    ) as string[]

    return (
        <Link
          className={cn(
            'invisible h-full w-full cursor-pointer group/main',
            {
              'visible animate-in fade-in-5': product,
            }
          )}
          href={`/product/${product.id}`}>
          <div className='flex flex-col w-full'>
            <ImageSlider urls={validUrls} />
            <h3 className='mt-4 font-medium text-sm text-gray-700'>
              {product.name}
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              {product.category === 'icons' ? 'Icons' : 'UI Kits'}
            </p>
            <p className='mt-1 font-medium text-sm text-gray-900'>
              {product.priceId}
            </p>
          </div>
        </Link>
    )
}

export default ProductListing;
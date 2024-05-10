import { Product, User } from "../payload-types";
import {  Access, CollectionConfig } from "payload/types";

const yourOwnedOrPurchased : Access = async({req, data})=>{
    const user = req.user as User | null;
    if(!user) return false;
    if(user.role === 'admin') return true;

    const {docs: products} = await req.payload.find({
        collection: "products",
        depth : 0,
        where: {
            user: {
                equals: user.id
            }
        }
    })

    const ownedProductFiles = products.map((prod)=>{
        return prod.product_files
    }).flat();

     
    const {docs : orders} = await req.payload.find({
        collection: "orders",
        depth: 2,
        where: {
            user: {
                equals: user.id
            }
        }
    })
    
    const purchasedProductFiles = orders.map((ord)=>{
        return ord.products.map((prod)=>{
            if(typeof prod === 'string'){
                return req.payload.logger.error("search depth not sufficient to find purchased file IDs");
            }
            return typeof prod.product_files === "string" ? prod.product_files : prod.product_files.id
        })
    }).flat()

    return {
        id : {
            in : [
                ...ownedProductFiles, ...purchasedProductFiles
            ]
        }
    }
}

export const ProductFiles: CollectionConfig = {
    slug: "product_files",
    hooks: {
        beforeChange: [({req, data})=>{
            return {...data, user : req.user.id}
        }]
    },
    access: {
        read : yourOwnedOrPurchased,
        update: ({req}) => req.user === "admin",
        delete: ({req}) => req.user === "admin",
    },
    admin: {
        hidden: ({user})  => user.role !== 'admin'
    },
    upload: {
        staticURL: "/product_files",
        staticDir: "product_files",
        mimeTypes: ["image/*", "font/*", "application/postscript"]
    },
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            admin: {
                condition: () => false
            },
            hasMany: false,
        }
    ]
}
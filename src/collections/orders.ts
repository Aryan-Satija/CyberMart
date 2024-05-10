import { User } from "../payload-types";
import { Access, CollectionConfig } from "payload/types";

const yourOwn : Access = ({req}) => {
    const user = req.user as User | null;
    if(!user) return false;
    if(user.role == 'admin')  return false;
    return {
        user : {
            equals: user.id
        }
    }
}

export const Order : CollectionConfig = {
    slug: "orders",
    admin : {
        useAsTitle : 'Your Orders',
        description: 'A summary of all your orders at cybermart'
    },
    access:{
        create: yourOwn,
        delete: ({req}) => req.user.role === 'admin',
        update: ({req}) => req.user.role === 'admin'
    },
    fields: [
        {
            name: "_isPaid",
            type: "checkbox",
            access: {
                read: ({req}) => req.user.role == "admin",
                create: () => false,
                update: () => false,
            },
            label: "Is Paid",
            admin: {
                hidden: true
            },
            required: true,
            defaultValue: false,
        },
        {
            name: "user",
            type: 'relationship',
            admin : {
                hidden: true
            },
            relationTo : 'users',
            required: true
        },
        {
            name: "products",
            type: 'relationship',
            admin : {
                hidden: true
            },
            hasMany: true,
            relationTo : 'products',
            required: true
        }
    ]
}
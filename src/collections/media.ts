import { User } from "../payload-types";
import { Access, CollectionConfig } from "payload/types";

const isAdminOrHasAccessToImage = () : Access =>{
    return async ({req}) => {
        const user = req.user as User 
        if(user.role === "admin") return true;
        return {
            user: {
                equals : req.user.id
            }
        }
    }
}

export const Media : CollectionConfig = {
    slug: "media",
    hooks: {
        beforeChange : [({req, data}) => { 
            return {...data, user: req.user.id}
        }]
    },
    admin: {
        hidden: ({user}) => user.role !== 'admin'
    },
    access: {
        read: async({req}) => {
            const referer = req.headers.referer;
            if(!req.user || !referer?.includes('sell')){
                return true;
            }
            
            return await isAdminOrHasAccessToImage()({req});
        },
        delete: isAdminOrHasAccessToImage(),
        update: isAdminOrHasAccessToImage()
    },
    upload: {
        staticURL: '/media',
        staticDir: 'media',
        imageSizes: [
            {
                name : "thumbnail",
                width: 400,
                height: 300,
                position: "centre"
            },
            {
                name : "card",
                width: 768,
                height: 1024,
                position: "centre"
            },
            {
                name : "tablet",
                width: 1024,
                height: undefined,
                position: "centre"
            }
        ],
        mimeTypes: ['image/*']
    },
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            hasMany: false,
            admin: {
                condition : () => false
            }
        }
    ]
}
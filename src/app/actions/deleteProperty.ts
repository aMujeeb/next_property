'use server';
import cloudinary from "@/config/cloudinary";
import connectDb from "@/config/database";
import Property from "@/app/models/property";
import getSessionUser from "../../../utils/getSessionUser";
import { revalidatePath } from "next/cache"; //Submit then update cache

export default async function deleteProperty(propertyId: String) {
    //Check for user. who created the property will be allowed to delete it.
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is Required...!!!');
    }

    const { userId } = sessionUser;

    const property = await Property.findById(propertyId);
    if (!property) {
        throw new Error('Property not found...!!!');
    }

    //Verify ownership
    if (property.owner.toString() !== userId) {
        throw new Error('Un Authorized...!!!');
    }

    //Extract Public Ids from Image URLs
    //https://res.cloudinary.com/dnrj180nh/image/upload/v1724383587/properties/kwxt7if4rqwntjvc1tk0.jpg
    const publicIds = property.images.map((imageUrl: String) => {
        const parts = imageUrl.split('/');
        return parts.at(-1)?.split('.').at(0); //-1 gets the last elementof the array
    });

    //Delete Images from Cloudinary
    if (publicIds.length > 0) {
        for (const publicId of publicIds) {
            await cloudinary.uploader.destroy('properties/' + publicId);
        }
    }

    await property.deleteOne();

    revalidatePath('/', 'layout'); //Submit then update cache
}
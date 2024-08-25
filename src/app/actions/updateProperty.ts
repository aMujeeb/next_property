"use server"

import Property from "@/app/models/property";
import connectDb from "@/config/database";
import { revalidatePath } from "next/cache"; //Submit then update cache
import { redirect } from "next/navigation";
import getSessionUser from "../../../utils/getSessionUser";

export default async function updateProperty(propertyId: String, formData: FormData) {

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        //console.log('Session User', sessionUser?.userId);
        throw new Error('User not authenticated');
    }

    const userId = sessionUser?.userId;

    //Connect to DB  
    await connectDb();

    const existingProperty = await Property.findById(propertyId);

    //Verify ownership
    //console.log('Owner Id', existingProperty.owner._id.toString());
    //console.log('Session User Id', userId);
    if (existingProperty.owner._id.toString() != userId) {
        throw new Error('Current User dows not own this property..!!!');
    }

    const images = formData
        .getAll('images')
        .filter((image) => (image as File).name !== '');

    const propertyData = {
        owner: userId,
        name: formData.get('name') as String,
        type: formData.get('type') as String,
        amenities: formData.getAll('amenities'),
        //images: images,
        description: formData.get('description') as String,
        location: {
            street: formData.get('location.street') as String,
            state: formData.get('location.state') as String,
            city: formData.get('location.city') as String,
            zipcode: formData.get('location.zipcode') as String,
        },
        beds: formData.get('beds') as unknown as Number,
        baths: formData.get('baths') as unknown as Number,
        square_feet: formData.get('square_feet') as unknown as Number,
        rates: {
            nightly: formData.get('rates.nightly'),
            weekly: formData.get('rates.weekly'),
            monthly: formData.get('rates.monthly')
        },
        seller_info: {
            name: formData.get('seller_info.name') as String,
            email: formData.get('seller_info.email') as String,
            phone: formData.get('seller_info.phone') as String,
        }
    };

    const updatedProperty = await Property.findByIdAndUpdate(
        propertyId, propertyData
    );

    console.log('Updated Property Id', updatedProperty._id.toString());
    revalidatePath('/', 'layout');
    redirect(`/properties/${updatedProperty._id.toString()}`);

}
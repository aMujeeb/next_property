"use server"

//https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations

import Property from "@/app/models/property";
import connectDb from "@/config/database";
import { revalidatePath } from "next/cache"; //Submit then update cache
import { redirect } from "next/navigation";
import getSessionUser from "../../../utils/getSessionUser";

export default async function addProperty(formData: FormData) {
    //console.log('Property Listing Name', formData.get('name')); //'name', 'amenities' are the form components names
    //console.log('Property Amneties', formData.getAll('amenities'));

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        //throw new Error('User not authenticated');
        console.log('Session User', sessionUser?.userId);
    }

    //Connect to DB  
    await connectDb();

    const userId = sessionUser?.userId;

    //Acccess all values from amenities
    const amenities = formData.getAll('amenities');

    //Get Array of images
    const images = formData
        .getAll('images')
        .filter((image) => (image as File).name !== '')
        .map((image) => (image as File).name);

    console.log('Property Images', images);

    const propertyData = {
        owner: userId,
        name: formData.get('name') as String,
        type: formData.get('type') as String,
        amenities: amenities,
        images: images,
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
            nightly: formData.get('nightly') as unknown as Number,
            weekly: formData.get('weekly') as unknown as Number,
            monthly: formData.get('monthly') as unknown as Number
        },
        seller_info: {
            name: formData.get('seller_info.name') as String,
            email: formData.get('seller_info.email') as String,
            phone: formData.get('seller_info.phone') as String,
        }
    };

    console.log('Property Data', propertyData);

    const newProperty = new Property(propertyData);
    await newProperty.save();

    revalidatePath('/', 'layout');
    redirect(`/properties/${newProperty._id}`);
}
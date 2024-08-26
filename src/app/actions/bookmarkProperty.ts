'use server';

import connectDb from "@/config/database";
import User from "../models/user";
import getSessionUser from "../../../utils/getSessionUser";
import { revalidatePath } from "next/cache"; //Submit then update cache
import { redirect } from "next/navigation";
import getProperty from "./getProperty";
import Property from "@/app/models/property";

export default async function BookmarkProperty(propertyID: String) {
    await connectDb()

    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required');
    }

    const { userId } = sessionUser;
    const user = await User.findById(userId);
    const property = await getProperty({ propertyId: propertyID })

    let isBookMarked = false
    let message = '';

    //const foundObject = array.find(obj => obj.id === objectID);
    const foundObject = user.bookMarks.find((prop: Property) => prop._id.toString() === propertyID);
    if (foundObject) {
        // console.log('Bookmark operation property ID XXXX--> Found');
        user.bookMarks.pull(property);
        message = 'Bookmark Removed';
        isBookMarked = false
    } else {
        //console.log('Bookmark operation property ID XXXX--> Not Found');
        user.bookMarks.push(property);
        message = 'Bookmark Added';
        isBookMarked = true
    }
    /*isBookMarked = user.bookMarks.includes(property);
    console.log('Bookmark operation property ID XX-->', isBookMarked);

    if (isBookMarked) {
        //If Already booked marked
        user.bookMarks.pull(property);
        message = 'Bookmark Removed';
        isBookMarked = false
    } else {
        user.bookMarks.push(property);
        message = 'Bookmark Added';
        isBookMarked = true
    }
*/
    await user.save();
    revalidatePath('/properties/saved', 'page');

    return {
        message,
        isBookMarked
    }
}
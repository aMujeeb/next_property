'use server';

import connectDb from "@/config/database";
import User from "../models/user";
import getSessionUser from "../../../utils/getSessionUser";
import getProperty from "./getProperty";

export default async function CheckBookMarkStatus(propertyID: String) {
    await connectDb()

    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required');
    }
    console.log('Bookmark operation property ID XX-->', propertyID);
    const { userId } = sessionUser;
    const user = await User.findById(userId);
    const property = await getProperty({ propertyId: propertyID })

    //const isBookMarked = user.bookMarks.includes(property);
    const foundObject = user.bookMarks.find(prop => prop._id.toString() === propertyID);

    const isBookMarked = foundObject ? true : false;
    console.log('Bookmark operation property ID XX-->', isBookMarked);
    return { isBookMarked }
}


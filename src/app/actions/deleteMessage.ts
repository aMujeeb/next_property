'use server';

import connectDb from "@/config/database";
import Message from "@/app/models/message";
import getSessionUser from "../../../utils/getSessionUser";
import { revalidatePath } from "next/cache"; //Submit then update cache

export default async function DeleteMessage(messageId: String) {
    await connectDb();

    //Check for user. who created the property will be allowed to delete it.
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is Required...!!!');
    }

    const { userId } = sessionUser;

    const message = await Message.findById(messageId);
    if (!message) {
        throw new Error('Property not found...!!!');
    }

    await message.deleteOne();

    revalidatePath('/', 'layout'); //Submit then update cache
}
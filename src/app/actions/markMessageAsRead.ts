'use server';

import connectDb from "@/config/database";
import Message from "../models/message";
import getSessionUser from "../../../utils/getSessionUser";
import { revalidatePath } from "next/cache"; //Submit then update cache

export default async function MarkMessaegAsRead(messageId: String) {
    await connectDb();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is Required...!!!');
    }

    const { userId } = sessionUser;

    const message = await Message.findById(messageId);

    if (!message) throw new Error('Message Not Found..!!!');

    //Verify ownership
    if (message.recipient.toString() !== userId) {
        throw new Error('Un Authorized..!!!');
    }

    message.read = !message.read;

    await message.save();

    return message.read
}
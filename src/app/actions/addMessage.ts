"use server"
import connectDb from "@/config/database";
import getSessionUser from "../../../utils/getSessionUser";
import Message from "../models/message";

export default async function addMessage(previouseState: FormData, formData: FormData) {

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        console.log('Session User', sessionUser?.userId);
        throw new Error('User not authenticated');
    }

    //Connect to DB  
    await connectDb();

    const userId = sessionUser?.userId;
    console.log('User ID', userId);
    console.log('User Name', sessionUser?.user.name);

    const recipient = formData.get('recipient');

    //Not allowing property owner to send messages to him self
    if (userId === recipient) {
        return {
            error: "You cannot send message to your self"
        };
    }

    const newMessage = new Message({
        sender: userId,
        recipient: recipient,
        property: formData.get('property') as string,
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        body: formData.get('message') as string,
    });

    await newMessage.save()

    return {
        submitted: true
    };
}
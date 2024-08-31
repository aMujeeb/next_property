import React from "react";

import connectDb from "@/config/database";
import Property from "../models/property";
import Message from "../models/message";
import { ConvertToSerializableObject } from "../../../utils/convertToObject";
import getSessionUser from "../../../utils/getSessionUser";

export default async function MessagesPage() {
    const session = await getSessionUser();

    const userId = session?.userId;

    console.log("Read messages User ID :", userId);

    await connectDb();

    const readMessages = await Message.find({ recipient: userId, read: true })
        .sort({ createdAt: -1 }) //to sort the messages in descending order 
        .populate('sender', 'username')
        .populate('property', 'name')
        .lean();

    const unReadMessages = await Message.find({ recipient: userId, read: false })
        .sort({ createdAt: -1 }) //to sort the messages in descending order 
        .populate('sender', 'username')
        .populate('property', 'name')
        .lean();

    //const unReadMessages = await Message.find({ recipient: userId, read: false }).lean();

    console.log("Read messages :", readMessages?.length);
    console.log("Un-Read messages :", unReadMessages?.length);

    const messages = [...unReadMessages, ...readMessages].map((messageDoc) => {
        const message = ConvertToSerializableObject(messageDoc);
        message.sender = ConvertToSerializableObject(message.sender);
        message.property = ConvertToSerializableObject(message.property);

        return message;
    });

    return (
        <section className="bg-blue-50">
            <div className="container m-auto py-24 max-w-6xl">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
                    <div className="space-y-4">
                        {messages.length === 0 ? (<p>You Have no messages</p>) : (
                            messages.map((message) => (
                                <div key={message._id as React.Key} className="border-b border-gray-300 py-4">
                                    <h2 className="text-xl font-bold">{message.property.name}</h2>
                                    <p className="text-gray-700">{message.sender.username}</p>
                                    <p className="text-gray-700">{message.body}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

        </section>
    )
}
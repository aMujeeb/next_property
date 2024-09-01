'use client';

import React, { useState } from "react";
import { toast } from "react-toastify";
import MarkMessaegAsRead from "@/app/actions/markMessageAsRead";
import DeleteMessage from "@/app/actions/deleteMessage";

interface Props {
    chatMessage: Message
}

export default function MessageCard({ chatMessage }: Props) {

    const [isRead, setIsRead] = useState(chatMessage.read);
    const [isDelete, setIsDelete] = useState(false);

    const handleReadClick = async () => {
        const read = await MarkMessaegAsRead(chatMessage._id)
        setIsRead(read)

        toast.success(`Marked as ${read ? "Read" : "New"}`);
    }

    const handleDeleteClick = async () => {
        const deleted = await DeleteMessage(chatMessage._id)
        setIsDelete(true)

        toast.success("Message Deleted");
    }

    if (isDelete) {
        return <p>Deleted Message..!!!</p>
    }

    return (
        <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
            {!isRead && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-2 rounded-md">New</div>
            )}
            <h2 className="text-xl mb-4">
                <span className="font-bold">Property Inquiry:</span>{' '}
                {chatMessage.property.name}
            </h2>
            <p className="text-gray-700">{chatMessage.body}</p>
            <ul className="mt-4">
                <li>
                    <strong>Reply Email :</strong>{' '}
                    <a href={`mailto:${chatMessage.email}`} className="text-blue-500">{chatMessage.email}</a>
                </li>
                <li>
                    <strong>Telephone :</strong>{' '}
                    <a href={`tel:${chatMessage.phone}`} className="text-blue-500">{chatMessage.phone}</a>
                </li>
                <li>
                    <strong>Received :</strong>{' '}
                    {new Date(chatMessage.createdAt).toLocaleString()}
                </li>
            </ul>
            <button className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md" onClick={handleReadClick}> {isRead ? 'Mark As New' : 'Mark as Read'} </button>
            <button className="mt-4 mr-3 bg-red-500 text-white py-1 px-3 rounded-md" onClick={handleDeleteClick}>Delete</button>
        </div>
    )
}
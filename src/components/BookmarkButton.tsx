'use client'
import BookmarkProperty from "@/app/actions/bookmarkProperty";
import CheckBookMarkStatus from "@/app/actions/checkBookMarkStatus";
import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react"; //this is used because of a client component
import { useState, useEffect } from 'react';

interface Props {
    propertyItem: Property
}

export default function BookmarkButton({ propertyItem }: Props) {

    //console.log('Bookmark Button->', propertyItem._id);

    const { data: session } = useSession();
    const userId = session?.user?.id;

    const [isLoading, setIsLoading] = useState(true);
    const [isBookMarked, setIsBookMarked] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        if (!userId) {
            setIsLoading(false)
            return
        }
        CheckBookMarkStatus(propertyItem._id).then((res) => {
            if (res.error) {
                toast.error(res.error);
                return
            }
            if (res.isBookMarked) setIsBookMarked(res.isBookMarked);
            setIsLoading(false)
        });
    }, [propertyItem._id, userId, CheckBookMarkStatus]
    )

    const handleClick = async () => {
        if (!userId) {
            toast.error('You must be logged in to bookmark a property');
        }

        BookmarkProperty(propertyItem._id).then((res) => {
            console.log('Bookmark Button->', propertyItem._id);
            if (res.error) return toast.error(res.error);
            setIsBookMarked(res.isBookMarked);
            toast.success(res.message);
        })
    }

    if (isLoading) {
        return (
            <p>Looading...</p>
        )
    }

    return isBookMarked ? (
        <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
            onClick={handleClick}>
            <FaBookmark className="mr-2" /> Remove Bookmark
        </button>
    ) : (
        <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
            onClick={handleClick}>
            <FaBookmark className="mr-2" /> Bookmark Property
        </button>
    )
}
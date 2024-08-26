'use server';

import connectDb from "@/config/database";
import Property from "../models/property";

interface Props {
    propertyId: String
}

export default async function getProperty({ propertyId }: Props) {
    await connectDb()
    return await Property.findById(propertyId);
}
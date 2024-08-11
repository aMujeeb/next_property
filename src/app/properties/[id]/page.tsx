
//"use client";
import PropertyHeaderImage from "@/components/propertHeaderImage";
import Link from "next/link";
import { FaArrowLeft } from 'react-icons/fa';
import connectDb from "@/config/database";
import Property from "@/app/models/property";
import PropertyDetails from "@/components/PropertyDetails";
import axios from 'axios';


export default async function PropertyPage({ params }: {
    params: { id: Object }
}) {
    await connectDb();
    const property: { images: string[] } | null = await Property.findById(params.id).lean()!;
    //const response = await axios.get(`api/properties/${params.id}`)
    //const property = response.data;

    return (
        <>
            <PropertyHeaderImage image={property?.images[0]} />

            <section>
                <div className="container m-auto py-6 px-6">
                    <Link
                        href="/properties"
                        className="text-blue-500 hover:text-blue-600 flex items-center"
                    >
                        <FaArrowLeft className='mr-2' /> Back to Properties
                    </Link>
                </div>
            </section>
            <section className="bg-blue-50">
                <div className="container m-auto py-10 px-6">
                    <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                        {/* Property Info */}
                        <PropertyDetails propertyItem={property} />
                    </div>
                </div>
            </section>
        </>

    )
}
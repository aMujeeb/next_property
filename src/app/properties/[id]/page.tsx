
//"use client";
import PropertyHeaderImage from "@/components/propertHeaderImage";
import Link from "next/link";
import { FaArrowLeft } from 'react-icons/fa';
import connectDb from "@/config/database";
import Property from "@/app/models/property";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyImages from "@/components/PropertyImages";
import axios from 'axios';
import { ConvertToSerializableObject } from "../../../../utils/convertToObject";


export default async function PropertyPage({ params }: {
    params: { id: Object }
}) {
    await connectDb();
    const propertyDoc = await Property.findById(params.id).lean();
    const property: { images: string[] } = ConvertToSerializableObject(propertyDoc) as unknown as { images: string[] };
    //Since its an object 'ConvertToSerializableObject(propertyDoc)' called. if array of objects .map operator used
    /*const propertyDoc = await Property.findById(params.id).lean();
    const property = ConvertToSerializableObject(propertyDoc) */
    //const response = await axios.get(`api/properties/${params.id}`)
    //const property = response.data;

    if (!property) {
        return (
            <h1 className="text-center text-2xl font-bold mt-10">Property Not Found</h1>
        )
    }

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
            <section className="bg-blue-50">
                <div className="container m-auto py-5">
                    <PropertyImages images={property?.images ?? []} />
                </div>
            </section >
        </>

    )
}
import PropertyEditForm from "@/components/PropertyEditForm"
import connectDb from "@/config/database";
import Property from "@/app/models/property";
import { ConvertToSerializableObject } from "../../../../../utils/convertToObject";

interface Props {
    params: Property
}

export default async function EditPropertyPage({ params }: Props) {

    await connectDb()

    const propertyDoc = await Property.findById(params.id).lean();
    const property = ConvertToSerializableObject(propertyDoc);

    if (!property) {
        return (
            <h1 className="text-center text-2xl font-bold mt-10">Property Not Found</h1>
        )
    }

    return (
        <section className="bg-blue-50">
            <div className="container m-auto max-w-2xl py-24">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <PropertyEditForm params={property} />
                </div>
            </div>
        </section>
    )
}
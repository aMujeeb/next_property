import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm"; //To make use of search more options other than going back to home
import connectDb from "@/config/database";
import Property from "@/app/models/property";
import { ConvertToSerializableObject } from "../../../../utils/convertToObject";
import { FaArrowAltCircleLeft } from "react-icons/fa";

interface Props {
    searchParams: {
        location: string;
        propertyType: string;
    };
}
export default async function SearchResultsPage({ searchParams: { location, propertyType } }: Props) {

    console.log('Search Params :', location + propertyType)

    await connectDb()

    //Create a Regex pattern
    //i -> case insensitive
    const locationPattern = new RegExp(location, 'i')

    //Matching with Database using Mongoose features
    let query = {
        $or: [
            { name: locationPattern },
            { description: locationPattern },
            { 'location.street': locationPattern },
            { 'location.city': locationPattern },
            { 'location.state': locationPattern },
            { 'location.zipcode': locationPattern }
        ]
    }

    //Check if All or not. If All no need to execute query
    if (propertyType && propertyType !== 'All') {
        const typePattern = new RegExp(propertyType, 'i')
        query.type = typePattern
    }

    const propertieQueryResults = await Property.find(query).lean();
    const properties = ConvertToSerializableObject(propertieQueryResults);

    //console.log('Filtered Properties :', properties)

    //<></> Fragment tags

    return (
        <>
            <section className="bg-blue-700 py-4">
                <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
                    <PropertySearchForm />
                </div>
            </section>

            <section className="px-4 py-6">
                <div className="container-xl lg:container m-auto px-4 py-6">
                    <Link href='/properties' className="flex items-center text-blue-500 hover:underline mb-3">
                        <FaArrowAltCircleLeft className="mr-2 nb-1" /> Back to Properties
                    </Link>
                    <h1 className="text-2xl mb-4">Search Results</h1>
                    {
                        properties.length === 0 ? (<p>No Search Results</p>) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {
                                    properties.map((property) => (
                                        <PropertyCard key={property._id} propertyItem={property} />
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </section>
        </>
    )
}
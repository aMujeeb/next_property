import PropertyCard from '@/components/PropertyCard';

//Connecting to DB or API related stuff
import connectDb from '@/config/database';
import Property from '../models/property';


interface Props {
    searchParams: Number
}

export default async function PropertiesPage({ searchParams }: Props) {
    console.log(searchParams)

    await connectDb();
    const properties = await Property.find({}).lean(); //Lean returns JS objects than Mongoos objects

    return (
        <section className='px-4 py-6'>
            <div className='container-xl lg:container m-auto px-4 py-6'>
                {properties.length === 0 ? (<p>No Properties Found</p>) : (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {
                            properties.map((property) => (
                                <PropertyCard key={property._id.toString()} propertyItem={property} />
                            ))
                        }
                    </div>
                )}
            </div>
        </section>
    )
}
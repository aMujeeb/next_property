import Link from 'next/link';
import connectDb from '@/config/database';
import Property from '@/app/models/property';

import PropertyCard from '@/components/PropertyCard';

export default async function HomeProperties() {
    await connectDb();
    const recentProperties = await Property.find({})
        .sort({ createdAt: -1 })// Sort by latest date
        .limit(3)
        .lean(); //Lean returns JS objects than Mongoos objects

    return (
        <>
            <section className='px-4 py-6'>
                <div className='container-xl lg:container m-auto px-4 py-6'>
                    <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>Recent Properties</h2>
                    {recentProperties.length === 0 ? (<p>No Properties Found</p>) : (
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            {
                                recentProperties.map((property) => (
                                    <PropertyCard key={property._id} propertyItem={property} />
                                ))
                            }
                        </div>
                    )}
                </div>
            </section>

            <section className='m-auto max-w-lg my-6 px-6'>
                <Link href='/properties' className='block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700' >All properties</Link>
            </section>
        </>
    )
}
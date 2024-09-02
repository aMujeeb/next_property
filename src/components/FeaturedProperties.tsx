import connectDb from "@/config/database";
import Property from "@/app/models/property";
import FeaturedPropertyCard from "./FeaturedPropertyCard";


export default async function FeaturedProperties() {

    await connectDb();

    const properties = await Property.find({
        is_featured: true
    }).lean();

    return properties.length > 0 ? (
        <section className="bg-blue-50">
            <div className="container-xl lg:container m-auto">
                <h2 className="text-3xl font-bold text-blue-500 mb-4 py-2">Featured Properties</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                    {properties.map((property) => (
                        <FeaturedPropertyCard key={property._id} propertyItem={property} />
                    ))}
                </div>
            </div>
        </section>
    ) : null;
}
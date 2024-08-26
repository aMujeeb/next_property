import PropertyCard from "@/components/PropertyCard";
import connectDb from "@/config/database";
import User from "@/app/models/user";
import getSessionUser from '../../../../utils/getSessionUser';

export default async function SavedProperties() {

    const { userId } = await getSessionUser();

    const { bookMarks } = await User.findById(userId).populate('bookMarks');
    //console.log('BookMarks ->>>', bookMarks.length);

    //console.log("Book Marks", bookMarks);
    return (
        <section className="px-4 py-6">
            <div className="container lg:container m-auto px-4 py-6">
                <h1 className="text-2xl mb-4">
                    Saved Properties
                </h1>
                {
                    bookMarks.length === 0 ? (<p>No Saved Properties</p>) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {
                                bookMarks.map((property) => (
                                    <PropertyCard key={property._id.toString()} propertyItem={property} />
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </section >
    )
}
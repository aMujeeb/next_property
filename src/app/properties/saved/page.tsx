import PropertyCard from "@/components/PropertyCard";
import connectDb from "@/config/database";
import User from "@/app/models/user";
import getSessionUser from '../../../../utils/getSessionUser';

export default async function SavedProperties() {

    const { userId } = await getSessionUser();

    const { bookMarks } = await User.findById(userId).populate('bookMarks');

    console.log("Book Marks", bookMarks);
    return (
        <div>Saved Properties</div>
    )
}
import Image from "next/image";
import connectDb from "@/config/database";
import Property from "../models/property";
import getSessionUser from "../../../utils/getSessionUser";
import profileDefault from '@/assets/images/profile.png';
import { ConvertToSerializableObject } from "../../../utils/convertToObject";

import ProfileProperties from "@/components/ProfileProperties";

export default async function ProfilePage() {

    await connectDb();
    const session = await getSessionUser();
    const { userId } = session as { user: String; userId: String; };

    if (!userId) {
        throw new Error("User Id Required");
    }

    const propertiesDocs = await Property.find({ owner: userId }).lean();
    const properties = propertiesDocs.map(ConvertToSerializableObject);
    console.log(properties.length);

    return (
        <section className="bg-blue-50">
            <div className="container m-auto py-24">
                <div
                    className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
                >
                    <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 mx-20 mt-10">
                            <div className="mb-4">
                                <Image
                                    className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                                    src={session?.user.image || profileDefault}
                                    alt="User"
                                    width={200}
                                    height={200}
                                />
                            </div>

                            <h2 className="text-2xl mb-4">
                                <span className="font-bold block">Name: </span> {session?.user.name}
                            </h2>
                            <h2 className="text-2xl">
                                <span className="font-bold block">Email: </span> {session?.user.email}
                            </h2>
                        </div>

                        <div className="md:w-3/4 md:pl-4">
                            <h2 className="text-xl font-semibold mb-4">Your Listings</h2>

                            <ProfileProperties initialProperties={properties} />

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
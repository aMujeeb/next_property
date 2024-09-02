import Hero from "@/components/Hero";
import HomeProperties from "@/components/HomeProperties";
import InfoBoxes from "@/components/InfoBoxes";
import FeaturedProperties from "@/components/FeaturedProperties";

import connectDb from "@/config/database";

export default function Home() {
    //console.log(process.env.MONGODB_URI);
    //connectDb(); //For testing purposes
    return (
        <>
            <Hero />
            <InfoBoxes />
            <FeaturedProperties />
            <HomeProperties />
        </>
    )
}
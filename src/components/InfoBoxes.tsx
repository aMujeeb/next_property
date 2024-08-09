import { link } from "fs";
import InfoBox from "./InfoBox";

export default function InfoBoxes() {
    return (
        <section>
            <div className="container-xl lg:container m-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
                    <InfoBox heading={'For Renters'} backgroundColor={""} textColor={""} buttonInfo={{
                        text: 'Browse Properties',
                        link: '/properties',
                        backGroundColor: 'bg-black'
                    }}>Find your dream rental property. Bookmark properties and contact owners.</InfoBox>
                    <InfoBox heading={'For property owners'} backgroundColor='bg-blue-100' textColor={""} buttonInfo={{
                        text: 'Add property',
                        link: '/properties/add',
                        backGroundColor: 'bg-blue-500'
                    }}>List your properties and reach potential tenants. Rent as an airbnb or long term.</InfoBox>
                </div>
            </div>
        </section>
    )
}
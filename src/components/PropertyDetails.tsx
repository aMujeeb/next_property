import { FaTimes } from "react-icons/fa";
import { FaBed, FaBath, FaRulerCombined, FaCheck, FaMapMarker } from 'react-icons/fa';
import PropertyMap from "./PropertyMap";

interface Props {
    propertyItem: Property
}

export default function PropertyDetails({ propertyItem }: Props) {

    const getRateDisplay = () => {
        const { rates } = propertyItem; //Object destruction
        if (rates.monthly) {
            return `$${rates.monthly.toLocaleString()}/mo`;
        } else if (rates.weekly) {
            return `$${rates.weekly.toLocaleString()}/week`;
        } else if (rates.nightly) {
            return `$${rates.nightly.toLocaleString()}/night`;
        }
    }

    return (
        <main>
            <div
                className="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
            >
                <div className="text-gray-500 mb-4">{propertyItem.type}</div>
                <h1 className="text-3xl font-bold mb-4">{propertyItem.name}</h1>
                <div
                    className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
                >
                    <FaMapMarker className="text-orange-700 mr-2 mt-1" />
                    <p className="text-orange-700">
                        {propertyItem.location.street}, {propertyItem.location.city}, {propertyItem.location.state}. {propertyItem.location.zipcode}
                    </p>
                </div>

                <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
                    Rates & Options
                </h3>
                <div className="flex flex-col md:flex-row justify-around">
                    <div
                        className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0"
                    >
                        <div className="text-gray-500 mr-2 font-bold">Nightly</div>
                        <div className="text-2xl font-bold text-blue-500">{propertyItem.rates.nightly ? (
                            `$${propertyItem.rates.nightly.toLocaleString()}`
                        ) : (<FaTimes className="text-red-700" />)}</div>
                    </div>
                    <div
                        className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0"
                    >
                        <div className="text-gray-500 mr-2 font-bold">Weekly</div>
                        <div className="text-2xl font-bold text-blue-500">{propertyItem.rates.weekly ? (
                            `$${propertyItem.rates.weekly.toLocaleString()}`
                        ) : (<FaTimes className="text-red-700" />)}</div>
                    </div>
                    <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
                        <div className="text-gray-500 mr-2 font-bold">Monthly</div>
                        <div className="text-2xl font-bold text-blue-500">{propertyItem.rates.monthly ? (
                            `$${propertyItem.rates.monthly.toLocaleString()}`
                        ) : (<FaTimes className="text-red-700" />)}</div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-bold mb-6">Description & Details</h3>
                <div
                    className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
                    <p>
                        <i className="fa-solid fa-bed"></i> <FaBed className="md:hidden lg:inline mr-2" />{propertyItem.beds}{' '}
                        <span className="hidden sm:inline">Beds</span>
                    </p>
                    <p>
                        <i className="fa-solid fa-bath"></i> <FaBath className="md:hidden lg:inline mr-2" />{propertyItem.baths}{' '}
                        <span className="hidden sm:inline">Baths</span>
                    </p>
                    <p>
                        <i className="fa-solid fa-ruler-combined"></i>
                        <FaRulerCombined className="md:hidden lg:inline mr-2" />
                        {propertyItem.square_feet}{' '} <span className="hidden sm:inline">sqft</span>
                    </p>
                </div>
                <p className="text-gray-500 mb-4">
                    {propertyItem.description}
                </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-bold mb-6">Amenities</h3>

                <ul
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none"
                >
                    {propertyItem.amenities.map((amenity: String, index: number) => (
                        <li key={index}>
                            <FaCheck className="inline-block text-green-600 mr-2" />{amenity}
                        </li>
                    ))}

                </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <PropertyMap propertyItem={propertyItem} />
            </div>
        </main>
    )
}
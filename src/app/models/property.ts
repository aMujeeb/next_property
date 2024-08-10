interface Property {
    _id: string,
    owner: string,
    name: string,
    type: string,
    description: string,
    location: Location,
    beds: number,
    baths: number,
    square_feet: number,
    amenities: string[],
    seller_info: SellerInfo,
    images: string[],
    is_featured: boolean,
    rates: Rates,
    createdAt: string,
    updatedAt: string
}
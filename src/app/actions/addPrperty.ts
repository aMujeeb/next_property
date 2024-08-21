"use server"


export default async function addProperty(formData: FormData) {
    console.log('Property Listing Name', formData.get('name'));
    console.log('Property Amneties', formData.getAll('amenities'));
}
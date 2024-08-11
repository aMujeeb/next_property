import connectDb from "@/config/database";
import Property from "@/app/models/property";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await connectDb();
        const properties = await Property.find({});

        return new NextResponse(JSON.stringify(properties), {
            status: 200
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Something went wrong..!!" }), {
            status: 500
        })
    }

}
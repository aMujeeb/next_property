import connectDb from "@/config/database";
import Property from "@/app/models/property";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest, { params }: {
    params: {
        id: string
    }
}) {
    try {
        await connectDb();
        const property = await Property.findById(params.id);

        if (!property) {
            return new Response(JSON.stringify({ message: "Property not found..!!" }), {
                status: 404
            })
        }
        return new Response(JSON.stringify(property), {
            status: 200
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Something went wrong..!!" }), {
            status: 500
        })
    }

}
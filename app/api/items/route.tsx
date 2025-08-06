/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import Colour from "@/models/colour";
import Item from "@/models/item";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDb();

        const items = await Item.find({});
        const colours = await Colour.find({});

        const res = {
            status: "success",
            data: { items: items, colours: colours },
        };

        return new NextResponse(JSON.stringify(res), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

export async function POST(request: Request) {
    try {
        await connectDb();
        const body = await request.json();

        console.log(body);

        const item = await Item.create({
            itemId: body.itemId,
            name: body.name,
            category: body.category,
            colours: body.colours,
            options: body.options,
            images: body.images,
        });

        const res = {
            status: "success",
            data: item,
        };

        return new NextResponse(JSON.stringify(res), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

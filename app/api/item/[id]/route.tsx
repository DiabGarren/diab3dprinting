import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import Colour from "@/models/colour";
import Item from "@/models/item";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDb();

        const { id } = await params;
        const item = await Item.findOne({ _id: id });
        const colours = await Colour.find({});

        if (item.colours.length == 0) {
            colours.forEach((colour) => {
                item.colours.push({ name: colour.name, value: colour.value });
            });
        }

        const res = {
            status: "success",
            data: item,
        };

        return new NextResponse(JSON.stringify(res), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

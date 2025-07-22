import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import Item from "@/models/item";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDb();

        const items = await Item.find({});

        const res = {
            status: "success",
            data: items,
            length: items.length,
        };

        return new NextResponse(JSON.stringify(res), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

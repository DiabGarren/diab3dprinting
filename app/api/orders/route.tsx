import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import Order from "@/models/order";
import { NextResponse } from "next/server";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function GET() {
    try {
        await connectDb();

        const orders = await Order.find({});

        const res = { status: "success", data: orders };

        return new NextResponse(JSON.stringify(res), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

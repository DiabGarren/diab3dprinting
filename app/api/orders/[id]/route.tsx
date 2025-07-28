import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import Order from "@/models/order";
import User from "@/models/user";
import { NextResponse } from "next/server";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDb();

        const { id } = await params;
        const user = await User.findOne({ _id: id });

        if (!user) {
            return createErrorResponse("No user found", 404);
        }

        const orders = await Order.find({ userId: user._id });

        const res = { status: "success", data: orders };

        return new NextResponse(JSON.stringify(res), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

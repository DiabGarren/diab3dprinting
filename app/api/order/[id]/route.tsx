import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import Order from "@/models/order";
import User from "@/models/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDb();

        const biscuits = await cookies();
        const userId = biscuits.get("diab3dprinting-user");

        const user = await User.findOne({ _id: userId?.value });

        if (!user) {
            return createErrorResponse("No user found", 404);
        }

        const { id } = await params;

        const order = await Order.findOne({ _id: id });

        const res = { status: "success", data: order };

        return new NextResponse(JSON.stringify(res), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

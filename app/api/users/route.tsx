import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import User from "@/models/user";
import { NextResponse } from "next/server";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function GET() {
    try {
        await connectDb();

        const users = await User.find({});

        const res = {
            status: "success",
            data: users,
        };
        return new NextResponse(JSON.stringify(res), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

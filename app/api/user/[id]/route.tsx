import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDb();

        const user = await User.findOne({ _id: params.id });

        if (!user) {
            return createErrorResponse("No user found", 404);
        }

        const res = { status: "success", data: user };

        return new NextResponse(JSON.stringify(res), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

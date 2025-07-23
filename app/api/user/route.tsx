import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import User from "@/models/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDb();
        const biscuits = await cookies();
        const userId = biscuits.get("diab3dprinting-user");

        const user = await User.findOne({ _id: userId?.value });

        if (!userId || !userId.value || !user)
            return createErrorResponse("No user logged in", 404);

        const res = {
            status: "success",
            data: user,
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

import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await connectDb();
        const body = await request.json();

        const user = await User.findOne({ email: body });

        if (!user)
            return createErrorResponse("Email address doesn't exist", 406);

        const res = {
            status: "success",
            message:
                "An email has been sent to you with a link to reset your password",
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

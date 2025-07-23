import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { compare } from "bcrypt";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        await connectDb();
        const biscuits = await cookies();
        const body = await request.json();

        let user = null;

        if (body.username.includes("@"))
            user = await User.findOne({ email: body.username });
        else if (!body.username.includes("@"))
            user = await User.findOne({ username: body.username });

        if (!user) {
            return createErrorResponse("Username/Email does not exist", 406);
        }
        if (body.password === "")
            return createErrorResponse("Please enter a password", 406);

        const pass = await compare(body.password, user.password);
        if (!pass) return createErrorResponse("Password is incorrect", 406);

        biscuits.set("diab3dprinting-user", user._id);

        return new NextResponse(
            JSON.stringify({
                status: "success",
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

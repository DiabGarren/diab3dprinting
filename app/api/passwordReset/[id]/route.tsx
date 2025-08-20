import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import User from "@/models/user";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDb();
        const { id } = await params;
        const body = await request.json();

        const user = await User.findOne({ _id: id });
        if (!user) return createErrorResponse("User not found", 406);

        const password = await hash(body.password, 10);

        await User.updateOne({ _id: id }, { password: password });

        const res = {
            status: "success",
            message: "Password successfully changed",
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

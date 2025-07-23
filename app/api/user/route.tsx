import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import User from "@/models/user";
import { hash } from "bcrypt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDb();
        const biscuits = await cookies();
        const userId = biscuits.get("diab3dprinting-user");

        const user = await User.findOne({ _id: userId?.value });

        if (!userId || !userId.value || !user)
            return createErrorResponse("No user logged in", 406);

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

export async function POST(request: Request) {
    try {
        await connectDb();
        const biscuits = await cookies();
        const body = await request.json();

        if (body.user.password !== body.confirm) {
            return createErrorResponse("Passwords do not match", 406);
        }

        const users = await User.find({});

        users.forEach((user) => {
            if (user.username === body.username && user.email === body.email)
                return createErrorResponse(
                    "Username and Email already exist",
                    406
                );

            if (user.username === body.username)
                return createErrorResponse("Username already exists", 406);

            if (user.email === body.email)
                return createErrorResponse("Email already exists", 406);
        });

        const password = await hash(body.password, 10);

        const user = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            username: body.username,
            email: body.email,
            phone: body.phone,
            prefer: body.prefer,
            password: password,
            level: 1,
            cart: [],
            address: {
                street: "",
                suburb: "",
                city: "",
                postalCode: "",
            },
        });

        biscuits.set("diab3dprinting", user._id);
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

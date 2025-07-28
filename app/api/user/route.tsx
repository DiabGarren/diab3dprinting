/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import User from "@/models/user";
import { hash } from "bcrypt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Get Current Logged In User
export async function GET() {
    try {
        await connectDb();
        const biscuits = await cookies();
        const userId = biscuits.get("diab3dprinting-user");

        const user = await User.findOne({ _id: userId?.value });

        if (!userId || !userId.value || !user) {
            biscuits.delete("diab3dprinting-user");
            return createErrorResponse("No user logged in", 406);
        }

        const res = {
            status: "success",
            data: user,
        };

        return new NextResponse(JSON.stringify(res), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

// Register New User
export async function POST(request: Request) {
    try {
        await connectDb();
        const biscuits = await cookies();
        const body = await request.json();

        const users = await User.find({});

        let exisits = { message: "", code: 200 };

        users.forEach((user) => {
            if (
                user.username.toLowerCase() === body.username.toLowerCase() &&
                user.email.toLowerCase() === body.email.toLowerCase()
            ) {
                exisits = {
                    message: "Username and Email already exist",
                    code: 406,
                };
                return;
            }

            if (user.username.toLowerCase() === body.username.toLowerCase()) {
                exisits = {
                    message: "Username already exists",
                    code: 406,
                };
                return;
            }

            if (user.email.toLowerCase() === body.email.toLowerCase()) {
                {
                    exisits = {
                        message: "Email already exists",
                        code: 406,
                    };
                    return;
                }
            }
        });

        if (exisits.code != 200) {
            return createErrorResponse(exisits.message, exisits.code);
        }

        const password = await hash(body.password, 10);

        const user = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            username: body.username.toLowerCase(),
            email: body.email.toLowerCase(),
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

        biscuits.set("diab3dprinting-user", user._id);
        const res = { status: "success", data: user };

        return new NextResponse(JSON.stringify(res), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

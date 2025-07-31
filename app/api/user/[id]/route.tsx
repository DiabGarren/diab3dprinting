/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import User from "@/models/user";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

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

        const res = { status: "success", data: user };

        return new NextResponse(JSON.stringify(res), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

export async function PUT(
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

        const body = await request.json();

        const newUser = await User.updateOne(
            { _id: id },
            {
                $set: {
                    firstName: body.firstName,
                    lastName: body.lastName,
                    username: body.username.toLowerCase(),
                    email: body.email.toLowerCase(),
                    phone: body.phone,
                    prefer: body.prefer,
                    password: body.password,
                    level: body.level,
                    cart: body.cart,
                    address: {
                        street: body.address.street,
                        suburb: body.address.suburb,
                        city: body.address.city,
                        postalCode: body.address.postalCode,
                    },
                },
            }
        );

        const res = {
            status: "success",
            data: newUser,
        };

        return new NextResponse(JSON.stringify(res), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

export async function POST(
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

        const body = await request.json();

        const password = await hash(body.password, 10);

        const newUser = await User.updateOne(
            { _id: id },
            {
                firstName: body.firstName,
                lastName: body.lastName,
                username: body.username.toLowerCase(),
                email: body.email.toLowerCase(),
                phone: body.phone,
                prefer: body.prefer,
                password: password,
                level: body.level,
                cart: body.cart,
                address: {
                    street: body.address.street,
                    suburb: body.address.suburb,
                    city: body.address.city,
                    postalCode: body.address.postalCode,
                },
            }
        );

        const res = {
            status: "success",
            data: newUser,
        };

        return new NextResponse(JSON.stringify(res), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

import connectDb from "@/lib/connectDb";
import { createErrorResponse } from "@/lib/utils";
import User from "@/models/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function POST(request: Request) {
    try {
        await connectDb();
        const biscuits = await cookies();
        const userId = biscuits.get("diab3dprinting-user");

        if (!userId) {
            return createErrorResponse("Please log in", 406);
        }

        const body = await request.json();

        const user = await User.findOne({ _id: userId?.value });

        await User.updateOne({ _id: user._id }, { cart: body.cart });

        const res = {
            status: "success",
        };
        return new NextResponse(JSON.stringify(res), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

export async function PUT(request: Request) {
    try {
        await connectDb();
        const biscuits = await cookies();
        const userId = biscuits.get("diab3dprinting-user");

        if (!userId) {
            return createErrorResponse("Please log in", 406);
        }

        const body = await request.json();

        const user = await User.findOne({ _id: userId?.value });
        const cart = JSON.parse(JSON.stringify(user)).cart;

        const existing = cart.findIndex(
            (item: any) =>
                item.name === body.name &&
                item.size === body.size &&
                item.colour === body.colour
        );

        if (existing > -1) {
            cart[existing].qty++;
        } else {
            cart.push({
                _id: body._id,
                itemId: body.itemId,
                name: body.name,
                size: body.size,
                price: body.price,
                colour: body.colour,
                qty: 1,
            });
        }

        await User.updateOne({ _id: user._id }, { cart: cart });

        const res = {
            status: "success",
        };
        return new NextResponse(JSON.stringify(res), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

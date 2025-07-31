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
        let cart = JSON.parse(JSON.stringify(user)).cart;

        const existing = cart.findIndex(
            (item: any) =>
                item.name === body.cart.name &&
                item.size === body.cart.size &&
                item.colour === body.cart.colour
        );
        if (body.add == true) {
            if (existing > -1) {
                cart[existing].qty += body.qty;
            } else {
                cart.push({
                    _id: body.cart._id,
                    itemId: body.cart.itemId,
                    name: body.cart.name,
                    size: body.cart.size,
                    price: body.cart.price,
                    colour: body.cart.colour,
                    qty: body.cart.qty,
                });
            }
        } else {
            if (body.qty) {
                cart[existing].qty = body.qty;
            } else {
                cart = body.cart;
            }
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

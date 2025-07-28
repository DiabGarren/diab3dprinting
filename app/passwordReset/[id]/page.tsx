"use client";
import Body from "@/components/body";
import { User } from "@/lib/interfaces/user";
import { useState } from "react";

export default function PasswordResetPage() {
    const [user, setUser] = useState<User>({
        _id: "",
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phone: "",
        prefer: "",
        password: "",
        level: 0,
        cart: [
            {
                _id: "",
                itemId: "",
                name: "",
                size: "",
                price: 0,
                colour: "",
                qty: 0,
            },
        ],
        address: {
            street: "",
            suburb: "",
            city: "",
            postalCode: "",
        },
    });
    return (
        <Body active="" user={user}>
            <></>
        </Body>
    );
}

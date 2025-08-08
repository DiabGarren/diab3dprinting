"use client";
import Back from "@/components/back";
import Body from "@/components/body";
import { User } from "@/lib/interfaces/user";
import { useEffect, useState } from "react";

export default function PasswordResetPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
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

    useEffect(() => {
        const getUser = async () => {
            const { id } = await params;
            fetch(process.env.NEXT_PUBLIC_API_URL + "/user/" + id)
                .then((res) => res.json())
                .then((data) => {
                    if (data.status == "success") {
                        setUser(data.data);
                    }
                });
        };
        getUser();
    }, []);

    return (
        <Body active="" user={user}>
            <div className="password-reset">
                <Back href="/passwordReset" />
                <h1>
                    Reset Password - {user.firstName} {user.lastName}
                </h1>
            </div>
        </Body>
    );
}

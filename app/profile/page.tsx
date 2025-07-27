"use client";
import Body from "@/components/body";
import { User } from "@/lib/interfaces/user";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
    const { push } = useRouter();
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
            fetch(process.env.NEXT_PUBLIC_API_URL + "/user")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        return setUser(data.data);
                    }
                });
        };
        getUser();
    }, []);

    return (
        <Body active="profile" user={user}>
            <Button
                className="button-red"
                onClick={() => {
                    fetch(process.env.NEXT_PUBLIC_API_URL + "/logout", {
                        method: "POST",
                    }).then((res) => {
                        if (res.status === 200) push("/");
                    });
                }}
            >
                Logout
            </Button>
        </Body>
    );
}

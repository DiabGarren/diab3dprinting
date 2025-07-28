"use client";
import Back from "@/components/back";
import Body from "@/components/body";
import { User } from "@/lib/interfaces/user";
import { Button, Input } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
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
    const [error, setError] = useState("");

    useEffect(() => {
        const getUser = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/user")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        setUser(data.data);
                        if (data.data._id) {
                            push("/profile");
                        }
                    }
                });
        };
        getUser();
    }, []);

    return (
        <Body active="login" user={user}>
            <Back href="/" />
            <h1 className="text-center">Log In</h1>
            <h2 className="text-center text-(--red)">{error}</h2>
            <form
                onSubmit={async (event) => {
                    event.preventDefault();
                    if (!user.username || !user.password) {
                        setError("Please complete the form");
                    } else {
                        setError("");
                        const res = await fetch(
                            process.env.NEXT_PUBLIC_API_URL + "/login",
                            {
                                method: "POST",
                                body: JSON.stringify({
                                    username: user.username,
                                    password: user.password,
                                }),
                            }
                        );
                        if (res.status === 200) push("/");
                        const message = await res.json();

                        setError(message.message);
                    }
                }}
            >
                <Input
                    label="Username/Email"
                    type="text"
                    onChange={(event) =>
                        setUser({ ...user, username: event.target.value })
                    }
                />
                <Input
                    label="Password"
                    type="password"
                    onChange={(event) =>
                        setUser({ ...user, password: event.target.value })
                    }
                />
                <p>
                    {"Dont't have an account? "}
                    <Link
                        href="/register"
                        className="text-(--primary) hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                <Button type="submit" className="button-green mt-[25px]">
                    Log In
                </Button>
            </form>
        </Body>
    );
}

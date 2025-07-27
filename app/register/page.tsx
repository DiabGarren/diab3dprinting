"use client";
import Back from "@/components/back";
import Body from "@/components/body";
import { User } from "@/lib/interfaces/user";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
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
                images: 0,
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
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");

    return (
        <Body active="register" user={user}>
            <Back href="/" />
            <h1 className="text-center">Sign Up</h1>
            <h2 className="text-center text-(--red)">{error}</h2>
            <form
                onSubmit={async (event) => {
                    event.preventDefault();
                    console.log(user);

                    if (
                        !user.firstName ||
                        !user.lastName ||
                        !user.username ||
                        !user.email ||
                        !user.phone ||
                        !user.prefer ||
                        !user.password
                    ) {
                        setError("Please complete the form");
                    } else {
                        setError("");
                        const res = await fetch(
                            process.env.NEXT_PUBLIC_API_URL + "/user",
                            {
                                method: "POST",
                                body: JSON.stringify({
                                    user: user,
                                    confirm: confirm,
                                }),
                            }
                        );
                        if (res.status === 201) push("/");
                        const message = await res.json();

                        setError(message.message);
                    }
                }}
            >
                <Input
                    type="text"
                    label="First Name"
                    onChange={(event) => {
                        setUser({ ...user, firstName: event.target.value });
                    }}
                />
                <Input
                    type="text"
                    label="Last Name"
                    onChange={(event) => {
                        setUser({ ...user, lastName: event.target.value });
                    }}
                />
                <Input
                    type="text"
                    label="Username"
                    onChange={(event) => {
                        setUser({ ...user, username: event.target.value });
                    }}
                />
                <Input
                    type="email"
                    label="Email"
                    className="mt-[10px]"
                    onChange={(event) => {
                        setUser({ ...user, email: event.target.value });
                    }}
                />
                <Input
                    type="text"
                    label="Phone Number"
                    onChange={(event) => {
                        setUser({ ...user, phone: event.target.value });
                    }}
                />
                <Select
                    label="Perfered contact method"
                    onChange={(event) => {
                        setUser({ ...user, prefer: event.target.value });
                    }}
                >
                    <SelectItem key={"Email"}>Email</SelectItem>
                    <SelectItem key={"WhatsApp"}>WhatsApp</SelectItem>
                </Select>
                <Input
                    type="password"
                    label="Password"
                    className="mt-[10px]"
                    onChange={(event) =>
                        setUser({ ...user, password: event.target.value })
                    }
                />
                <Input
                    type="password"
                    label="Confirm Password"
                    onChange={(event) => setConfirm(event.target.value)}
                />
                <Button type="submit" className="button-green mt-[25px]">
                    Sign Up
                </Button>
            </form>
        </Body>
    );
}

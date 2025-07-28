"use client";
import Back from "@/components/back";
import Body from "@/components/body";
import { User } from "@/lib/interfaces/user";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
        <Body active="register" user={user}>
            <Back href="/" />
            <h1 className="text-center">Sign Up</h1>
            <h2 className="text-center text-(--red)">{error}</h2>
            <form
                onSubmit={async (event) => {
                    event.preventDefault();

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
                        return;
                    }
                    if (user.password != confirm) {
                        setError("Passwords do not match");
                        return;
                    }
                    setError("");
                    fetch(process.env.NEXT_PUBLIC_API_URL + "/user", {
                        method: "POST",
                        body: JSON.stringify(user),
                    }).then(async (res) => {
                        if (res.status === 201) {
                            fetch(process.env.NEXT_PUBLIC_API_URL + "/email", {
                                method: "POST",
                                body: JSON.stringify({
                                    sendTo: user.email,
                                    subject: "Account Created",
                                    html: `<div>
                                        <h1>You now have a Diab 3D Printing Account</h1>
                                        <p>Account Successfully created</p>
                                        <p>Start shopping now   <a href="https://diab3dprinting.vercel.app">Store</a></p>
                                        <p>View your profile information   <a href="https://diab3dprinting.vercel.app/profile">Profile</a> </p>
                                    </div>`,
                                    bcc: "",
                                }),
                            }).then((res) => {
                                if (res.status === 200) push("/");
                            });
                            return;
                        }
                        const data = await res.json();
                        setError(data.message);
                        return;
                    });
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
                <p>
                    {"Already have an account? "}
                    <Link
                        href="/login"
                        className="text-(--primary) hover:underline"
                    >
                        Log In
                    </Link>
                </p>
                <Button type="submit" className="button-green mt-[25px]">
                    Sign Up
                </Button>
            </form>
        </Body>
    );
}

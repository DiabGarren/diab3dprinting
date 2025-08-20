"use client";
import Back from "@/components/back";
import Body from "@/components/body";
import { User } from "@/lib/interfaces/user";
import { Button, Input } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PasswordResetPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
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

    const [passwords, setPasswords] = useState({ password: "", confirm: "" });

    const [error, setError] = useState({ message: "", type: "green" });
    const [updated, setUpdated] = useState(false);

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
                <h1 className="text-center">
                    Reset Password - {user.firstName} {user.lastName}
                </h1>
                <h2
                    className={`text-center ${
                        error.type == "green"
                            ? "text-(--print-green)"
                            : "text-(--red)"
                    }`}
                >
                    {error.message}
                </h2>
                <form
                    action="submit"
                    onSubmit={async (event) => {
                        event.preventDefault();
                        setError({ message: "", type: "green" });
                        if (!passwords.password || !passwords.confirm) {
                            setError({
                                message: "Please fill all fields",
                                type: "red",
                            });
                            return;
                        }
                        if (passwords.password !== passwords.confirm) {
                            setError({
                                message: "Passwords must match",
                                type: "red",
                            });
                            return;
                        }
                        fetch(
                            process.env.NEXT_PUBLIC_API_URL +
                                "/passwordReset/" +
                                user._id,
                            {
                                method: "PUT",
                                body: JSON.stringify({
                                    password: passwords.password,
                                }),
                            }
                        )
                            .then((res) => res.json())
                            .then((data) => {
                                if (data.status == "success") {
                                    setError({
                                        message: data.message,
                                        type: "green",
                                    });
                                    setUpdated(true);
                                }
                            });
                    }}
                >
                    <Input
                        type="password"
                        label="New Password"
                        value={passwords.password}
                        onChange={(event) =>
                            setPasswords({
                                ...passwords,
                                password: event.target.value,
                            })
                        }
                    />
                    <Input
                        type="password"
                        label="Confirm Password"
                        value={passwords.confirm}
                        onChange={(event) =>
                            setPasswords({
                                ...passwords,
                                confirm: event.target.value,
                            })
                        }
                    />
                    <Button className="button-green mt-[15px]" type="submit">
                        Change Password
                    </Button>
                </form>
                <Link href="/login">
                    <Button
                        className={`button-green mt-[15px] ${
                            updated ? "block" : "hidden"
                        }`}
                    >
                        Login
                    </Button>
                </Link>
            </div>
        </Body>
    );
}

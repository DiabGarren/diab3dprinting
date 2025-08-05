"use client";
import Back from "@/components/back";
import Body from "@/components/body";
import { User } from "@/lib/interfaces/user";
import { Button, Input } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PasswordResetPage() {
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
    const [error, setError] = useState({ message: "", status: "" });

    useEffect(() => {
        const getUser = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/user")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status == "success") setUser(data.data);
                });
        };
        getUser();
    }, []);

    return (
        <Body active="profile" user={user}>
            <div className="password-reset">
                <Back href={!user._id ? "login" : "profile"} />
                <h1 className="text-center">Reset Password</h1>

                <form
                    action="submit"
                    onSubmit={async (event) => {
                        event.preventDefault();
                        fetch(
                            process.env.NEXT_PUBLIC_API_URL + "/passwordReset",
                            {
                                method: "POST",
                                body: JSON.stringify(user.email),
                            }
                        )
                            .then((res) => res.json())
                            .then((data) => setError(data));
                    }}
                >
                    <h2
                        className={`text-center ${
                            error.status == "success"
                                ? "text-(--print-green)"
                                : "text-(--red)"
                        }`}
                    >
                        {error.message}
                    </h2>
                    <Input
                        type="email"
                        label="Email"
                        description="Enter your email address"
                        value={user.email}
                        onChange={(event) =>
                            setUser({ ...user, email: event.target.value })
                        }
                    />
                    <Button className="button-green" type="submit">
                        Reset Password
                    </Button>
                </form>
            </div>
        </Body>
    );
}

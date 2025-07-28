"use client";
import Back from "@/components/back";
import Body from "@/components/body";
import { User } from "@/lib/interfaces/user";
import { Button, Input } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
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

    const [update, setUpdate] = useState(false);
    const [error, setError] = useState("");

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
            <Back href="/" />
            {user._id ? (
                <>
                    {/* <Button
                        className="button-green"
                        onClick={async () => {
                            fetch(process.env.NEXT_PUBLIC_API_URL + "/email", {
                                method: "POST",
                                body: JSON.stringify({
                                    sendTo: "garrendiab@gmail.com",
                                    subject: "3D Printing Order Placed",
                                    html: `<h2>Dear Garren Diab</h2>
                                        <p>Thank you for placing an order with Diab 3D Printing.
                                        <br>We will contact you as soon as possible to confirm everything and send you an invoice.</p>
                                        <div>
                                        <h3>Order:</h3>
                                        <h4>Item Name</h4>
                                        <p>Size: 00x00x00</p>
                                        <p>Colour: White</p>
                                        <p>R16 <span style="margin-left: 10px;">Qty: 1</span></p> 
                                        <h3>Shipping method:</h3>
                                        <p>Collect</p>
                                        <h2>Total: R16</h2></div>`,
                                    body: "",
                                }),
                            })
                                .then((res) => res.json())
                                .then((data) => console.log(data.data));
                        }}
                    >
                        Send Email
                    </Button> */}
                    <h1 className="text-center">
                        Welcome {user.firstName} {user.lastName}
                    </h1>
                    {update ? (
                        <div className="profile-info-edit">
                            <h2 className="text-(--red)">{error}</h2>
                            <div className="user-info-edit">
                                <h2>Personal Info</h2>
                                <Input
                                    type="text"
                                    label="First Name"
                                    value={user.firstName}
                                    onChange={(event) =>
                                        setUser({
                                            ...user,
                                            firstName: event.target.value,
                                        })
                                    }
                                />
                                <Input
                                    type="text"
                                    label="Last Name"
                                    value={user.lastName}
                                    onChange={(event) =>
                                        setUser({
                                            ...user,
                                            lastName: event.target.value,
                                        })
                                    }
                                />
                                <Input
                                    type="text"
                                    label="Username"
                                    value={user.username}
                                    onChange={(event) =>
                                        setUser({
                                            ...user,
                                            username: event.target.value,
                                        })
                                    }
                                />
                                <Input
                                    type="email"
                                    label="Email"
                                    value={user.email}
                                    onChange={(event) =>
                                        setUser({
                                            ...user,
                                            email: event.target.value,
                                        })
                                    }
                                />
                                <p>
                                    Looking for{" "}
                                    <Link
                                        href={"/passwordReset/" + user._id}
                                        className="text-(--primary) hover:underline"
                                    >
                                        Reset Password
                                    </Link>
                                    ?
                                </p>
                            </div>
                            <div className="address-edit">
                                <h2>Address</h2>
                                <Input
                                    type="text"
                                    label="Street"
                                    value={user.address.street}
                                    onChange={(event) =>
                                        setUser({
                                            ...user,
                                            address: {
                                                ...user.address,
                                                street: event.target.value,
                                            },
                                        })
                                    }
                                />
                                <Input
                                    type="text"
                                    label="Suburb"
                                    value={user.address.suburb}
                                    onChange={(event) =>
                                        setUser({
                                            ...user,
                                            address: {
                                                ...user.address,
                                                suburb: event.target.value,
                                            },
                                        })
                                    }
                                />
                                <Input
                                    type="text"
                                    label="City"
                                    value={user.address.city}
                                    onChange={(event) =>
                                        setUser({
                                            ...user,
                                            address: {
                                                ...user.address,
                                                city: event.target.value,
                                            },
                                        })
                                    }
                                />
                                <Input
                                    type="text"
                                    label="Postal Code"
                                    value={user.address.postalCode}
                                    onChange={(event) =>
                                        setUser({
                                            ...user,
                                            address: {
                                                ...user.address,
                                                postalCode: event.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>

                            <Button
                                className="button-green my-[5px]"
                                onClick={async () => {
                                    if (
                                        !user.firstName ||
                                        !user.lastName ||
                                        !user.email ||
                                        !user.username
                                    ) {
                                        setError("Please fill out all fields");
                                        return;
                                    }
                                    fetch(
                                        process.env.NEXT_PUBLIC_API_URL +
                                            "/user/" +
                                            user._id,
                                        {
                                            method: "PUT",
                                            body: JSON.stringify(user),
                                        }
                                    ).then((res) => {
                                        if (res.status === 201)
                                            setUpdate(false);
                                    });
                                }}
                            >
                                Save
                            </Button>
                            <Button
                                className="button-red my-[5px]"
                                onClick={() => setUpdate(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    ) : (
                        <div className="profile-info">
                            <div className="user-info my-[10px] [&_p]:ml-[15px]">
                                <h2 className="flex items-center">
                                    Personal Info{" "}
                                    <button
                                        className="flex items-center justify-center cursor-pointer w-[30px] aspect-[1/1] bg-(--green) mx-[10px] rounded-[10px] p-[5px]"
                                        onClick={() => setUpdate(true)}
                                    >
                                        <Image
                                            src="/edit.svg"
                                            alt="Edit profile button"
                                            width={30}
                                            height={30}
                                        />
                                    </button>
                                </h2>
                                <p className="first-name">
                                    First Name: <span>{user.firstName}</span>
                                </p>
                                <p className="last-name">
                                    Last Name: <span>{user.lastName}</span>
                                </p>
                                <p className="username">
                                    Username: <span>{user.username}</span>
                                </p>
                                <p className="email">
                                    Email: <span>{user.email}</span>
                                </p>
                                <p className="password">
                                    Password: <span>**********</span>
                                </p>
                            </div>

                            <div className="address my-[10px] [&_p]:ml-[15px]">
                                <h2>Address</h2>
                                <p className="street">{user.address.street}</p>
                                <p className="suburb">{user.address.suburb}</p>
                                <p className="city">{user.address.city}</p>
                                <p className="postal-code">
                                    {user.address.postalCode}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="logout border-(--primary) border-t-[2px] my-[10px]">
                        <Button
                            className="button-red mt-[5px]"
                            onClick={() => {
                                fetch(
                                    process.env.NEXT_PUBLIC_API_URL + "/logout",
                                    {
                                        method: "POST",
                                    }
                                ).then((res) => {
                                    if (res.status === 200) push("/");
                                });
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                </>
            ) : (
                <div className="w-[100%] flex justify-center">
                    <Image
                        src={"/loading.webp"}
                        alt={"Loading spinner"}
                        width={75}
                        height={75}
                    />
                </div>
            )}
        </Body>
    );
}

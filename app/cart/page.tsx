"use client";
import Back from "@/components/back";
import Body from "@/components/body";
import { User } from "@/lib/interfaces/user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Cart() {
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

    const [total, setTotal] = useState(0);

    useEffect(() => {
        const getUser = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/user")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status == "success") {
                        setUser(data.data);
                        let sub = 0;
                        data.data.cart.forEach(
                            (item: {
                                _id: "";
                                itemId: "";
                                name: "";
                                size: "";
                                price: 0;
                                colour: "";
                                qty: 0;
                            }) => {
                                sub += item.price * item.qty;
                            }
                        );
                        setTotal(sub);
                        return;
                    }
                    push("/");
                });
        };
        getUser();
    }, []);

    return (
        <Body active="cart" user={user}>
            <Back href="/" />
            {user._id ? (
                <>
                    <div className="cart-items">
                        {user.cart.length > 0 ? (
                            <>
                                {user.cart.map(
                                    (
                                        item: {
                                            _id: string;
                                            itemId: string;
                                            name: string;
                                            size: string;
                                            price: number;
                                            colour: string;
                                            qty: number;
                                        },
                                        index: number
                                    ) => (
                                        <div
                                            className="cart-item"
                                            key={"item-" + index}
                                        >
                                            <div className="cart-item-image relative w-[100%] h-[100%] self-center">
                                                <Image
                                                    src={
                                                        "/items/" +
                                                        item.itemId +
                                                        "/" +
                                                        item.itemId +
                                                        "0.jpg"
                                                    }
                                                    alt={
                                                        "Thumbnail image for " +
                                                        item.name
                                                    }
                                                    fill
                                                    className="object-cover rounded-[10px]"
                                                />
                                            </div>
                                            <div className="item-details px-[10px]">
                                                <h2 className="item-name">
                                                    {item.name}
                                                </h2>
                                                <div>
                                                    <p className="item-size">
                                                        Size: {item.size}
                                                    </p>
                                                    <p className="item-colour">
                                                        Colour: {item.colour}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="item-price">
                                                        <span className="text-[17px]">
                                                            R{item.price}
                                                        </span>
                                                    </p>
                                                    <p className="item-qty">
                                                        Qty:{"  "}
                                                        <span className="text-[17px]">
                                                            {item.qty}
                                                        </span>
                                                    </p>
                                                </div>
                                                <p className="item-total">
                                                    Item total:{" "}
                                                    <span className="text-[18px]">
                                                        R{item.price * item.qty}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    )
                                )}
                            </>
                        ) : (
                            <h2 className="text-center">Your cart is empty</h2>
                        )}
                    </div>
                    <h2 className="text-center my-[15px]">Total: R{total}</h2>
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

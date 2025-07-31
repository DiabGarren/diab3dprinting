"use client";
import Back from "@/components/back";
import Body from "@/components/body";
import ImageFallback from "@/components/imageFallback";
import Loading from "@/components/loading";
import { User } from "@/lib/interfaces/user";
import { Input } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartPage() {
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
                                            <div className="cart-item-image relative w-[100%] h-[100%] self-center row-[1/3]">
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
                                                    sizes="150px"
                                                    className="object-cover rounded"
                                                />
                                            </div>
                                            <h2 className="item-name col-[2/4] mx-[5px]">
                                                {item.name}
                                            </h2>
                                            <div className="item-details px-[10px] col-[2/3]">
                                                <div>
                                                    <p className="item-size">
                                                        Size: {item.size}
                                                    </p>
                                                    <p className="item-colour">
                                                        Colour: {item.colour}
                                                    </p>
                                                </div>

                                                <div className="mt-[5px] flex gap-[15px] items-center">
                                                    <p className="item-price">
                                                        <span className="text-[17px]">
                                                            R{item.price}
                                                        </span>
                                                    </p>
                                                    <div>
                                                        Qty:{" "}
                                                        <input
                                                            className="item-qty text-[17px] w-[50px] border-t border-t-[#e9e9e9] border-b-[2px] border-b-[#808080] rounded-[10px] bg-[#f4f4f5] inline-block pl-[5px]"
                                                            type="number"
                                                            value={item.qty.toString()}
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                const newCart =
                                                                    [
                                                                        ...user.cart,
                                                                    ];

                                                                if (
                                                                    parseInt(
                                                                        event
                                                                            .target
                                                                            .value
                                                                    ) <= 0
                                                                ) {
                                                                    newCart.splice(
                                                                        index,
                                                                        1
                                                                    );
                                                                } else {
                                                                    newCart[
                                                                        index
                                                                    ].qty =
                                                                        parseInt(
                                                                            event
                                                                                .target
                                                                                .value
                                                                        );
                                                                }

                                                                fetch(
                                                                    process.env
                                                                        .NEXT_PUBLIC_API_URL +
                                                                        "/cart",
                                                                    {
                                                                        method: "PUT",
                                                                        body: JSON.stringify(
                                                                            {
                                                                                cart: newCart,
                                                                                add: false,
                                                                            }
                                                                        ),
                                                                    }
                                                                ).then(
                                                                    (res) => {
                                                                        if (
                                                                            res.status ===
                                                                            201
                                                                        ) {
                                                                            setUser(
                                                                                {
                                                                                    ...user,
                                                                                    cart: newCart,
                                                                                }
                                                                            );
                                                                            let total = 0;
                                                                            newCart.forEach(
                                                                                (
                                                                                    item
                                                                                ) => {
                                                                                    total +=
                                                                                        item.price *
                                                                                        item.qty;
                                                                                }
                                                                            );
                                                                            setTotal(
                                                                                total
                                                                            );
                                                                        }
                                                                    }
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <p className="item-total">
                                                    Item total:{" "}
                                                    <span className="text-[18px]">
                                                        R{item.price * item.qty}
                                                    </span>
                                                </p>
                                            </div>
                                            <button
                                                className="flex button-red cursor-pointer relative aspect-[1/1] p-[px] rounded items-center justify-center self-center"
                                                onClick={() => {
                                                    const newCart = [
                                                        ...user.cart,
                                                    ];
                                                    newCart.splice(index, 1);
                                                    fetch(
                                                        process.env
                                                            .NEXT_PUBLIC_API_URL +
                                                            "/cart",
                                                        {
                                                            method: "PUT",
                                                            body: JSON.stringify(
                                                                {
                                                                    cart: newCart,
                                                                    add: false,
                                                                }
                                                            ),
                                                        }
                                                    ).then((res) => {
                                                        if (
                                                            res.status === 201
                                                        ) {
                                                            setUser({
                                                                ...user,
                                                                cart: newCart,
                                                            });
                                                            let total = 0;
                                                            newCart.forEach(
                                                                (item) => {
                                                                    total +=
                                                                        item.price *
                                                                        item.qty;
                                                                }
                                                            );
                                                            setTotal(total);
                                                        }
                                                    });
                                                }}
                                            >
                                                <ImageFallback
                                                    src={"/trash.svg"}
                                                    alt="Trash Icon"
                                                    width={25}
                                                    height={25}
                                                />
                                            </button>
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
                <Loading />
            )}
        </Body>
    );
}

"use client";
import Back from "@/components/back";
import Body from "@/components/body";
import ImageFallback from "@/components/imageFallback";
import Loading from "@/components/loading";
import { Item } from "@/lib/interfaces/item";
import { User } from "@/lib/interfaces/user";
import { Button, Input } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ItemPage({
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

    const [item, setItem] = useState<Item>({
        _id: "",
        itemId: "",
        name: "",
        colours: [],
        options: [
            {
                size: "",
                price: 0,
                printing: {
                    time: { hours: 0, minutes: 0 },
                    weight: 0,
                },
            },
        ],
        images: 0,
    });

    const [choice, setChoice] = useState({
        _id: "",
        itemId: "",
        name: "",
        size: "",
        colour: "",
        price: 0,
        qty: 0,
    });
    const [currImg, setCurrImg] = useState(0);
    const [added, setAdded] = useState(false);
    const [error, setError] = useState({ name: "", message: "" });

    useEffect(() => {
        const getProps = async () => {
            const { id } = await params;
            fetch(process.env.NEXT_PUBLIC_API_URL + "/item/" + id)
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        setItem(data.data);
                        setChoice({
                            ...choice,
                            _id: data.data._id,
                            itemId: data.data.itemId,
                            name: data.data.name,
                            size: data.data.options[0].size,
                            colour: data.data.colours[0].name,
                            price: data.data.options[0].price,
                        });
                    }
                });
        };
        const getUser = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/user")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        setUser(data.data);
                    }
                });
        };
        getProps();
        getUser();
    }, []);

    return (
        <Body active="" user={user}>
            <div className="item">
                <Back href="" />
                {item.name ? (
                    <>
                        <h1 className="text-center">{item?.name}</h1>
                        <div className="item-image relative w-[100%] aspect-[3/2] my-[15px]">
                            {item?.images > 0 ? (
                                <>
                                    {item?.images == 1 ? (
                                        <ImageFallback
                                            src={
                                                "/items/" +
                                                item?.itemId +
                                                "/" +
                                                item?.itemId +
                                                "0.jpg"
                                            }
                                            alt={"Item image for " + item?.name}
                                            fill
                                            className={`object-cover rounded-[10px]`}
                                        />
                                    ) : (
                                        <>
                                            <div className="absolute h-[100%] w-[50px] z-[99] flex items-center left-[0px]">
                                                <button
                                                    className="item-image-button"
                                                    onClick={() => {
                                                        if (currImg == 0) {
                                                            setCurrImg(
                                                                item?.images - 1
                                                            );
                                                        } else {
                                                            setCurrImg(
                                                                currImg - 1
                                                            );
                                                        }
                                                    }}
                                                >
                                                    {"<"}
                                                </button>
                                            </div>
                                            {[...new Array(item?.images)].map(
                                                (x, index: number) => (
                                                    <ImageFallback
                                                        key={index}
                                                        src={
                                                            "/items/" +
                                                            item?.itemId +
                                                            "/" +
                                                            item?.itemId +
                                                            index +
                                                            ".jpg"
                                                        }
                                                        alt={
                                                            "Item image for " +
                                                            item?.name
                                                        }
                                                        fill
                                                        className={`object-cover rounded-[10px] ${
                                                            index == currImg
                                                                ? ""
                                                                : "hidden"
                                                        }`}
                                                    />
                                                )
                                            )}

                                            <div className="absolute h-[100%] w-[50px] z-[99] flex items-center right-[0px]">
                                                <button
                                                    className="item-image-button"
                                                    onClick={() => {
                                                        if (
                                                            currImg ==
                                                            item.images - 1
                                                        ) {
                                                            setCurrImg(0);
                                                        } else {
                                                            setCurrImg(
                                                                currImg + 1
                                                            );
                                                        }
                                                    }}
                                                >
                                                    {">"}
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div className="item-size my-[15px]">
                            <h2>Size (mm):</h2>
                            {item?.options.map(
                                (
                                    option: {
                                        size: string;
                                        price: number;
                                        printing: {
                                            time: {
                                                hours: number;
                                                minutes: number;
                                            };
                                            weight: number;
                                        };
                                    },
                                    index: number
                                ) => (
                                    <Button
                                        key={"size-" + index}
                                        className={`${
                                            choice.size == option.size
                                                ? "bg-(--primary-dark) border-[2px] border-(--primary)"
                                                : "bg-(--primary)"
                                        } mx-[5px] text-white`}
                                        onClick={() =>
                                            setChoice({
                                                ...choice,
                                                size: option.size,
                                                price: option.price,
                                            })
                                        }
                                    >
                                        {option.size}
                                    </Button>
                                )
                            )}
                        </div>
                        <div className="item-colour my-[5px]">
                            <h2>Colour: {choice.colour}</h2>
                            {item?.colours.map((colour, index: number) => (
                                <button
                                    key={"colour-" + index}
                                    style={{ backgroundColor: colour.value }}
                                    className={`${
                                        choice.colour == colour.name
                                            ? "border-(--primary-dark)"
                                            : "border-(--primary)"
                                    } mx-[5px] border-[3px] w-[50px] aspect-[1/1] rounded-[50%] cursor-pointer item-colour-icon`}
                                    onClick={() =>
                                        setChoice({
                                            ...choice,
                                            colour: colour.name,
                                        })
                                    }
                                ></button>
                            ))}
                        </div>
                        <div className="item-price my-[5px]">
                            <h2>Price: R{choice.price}</h2>
                        </div>
                        <div className="item-qty my-[5px] flex items-center gap-[10px]">
                            <h2>Qty:</h2>
                            <Input
                                type="number"
                                className="w-[80px]"
                                value={choice.qty.toString()}
                                onChange={(event) => {
                                    setChoice({
                                        ...choice,
                                        qty: parseInt(event.target.value),
                                    });
                                }}
                            />
                        </div>
                        <h2 className="text-(--red) text-center">
                            {error.message}
                        </h2>
                        <Button
                            className={`button-green mt-[15px] ${
                                error.name == "No User" ? "hidden" : ""
                            }`}
                            onClick={async () => {
                                if (!user._id) {
                                    setError({
                                        name: "No User",
                                        message: "Please log in",
                                    });
                                    return;
                                }
                                if (choice.size == "") {
                                    setError({
                                        name: "Empty",
                                        message: "Please choose a size",
                                    });
                                    return;
                                }
                                if (choice.colour == "") {
                                    setError({
                                        name: "Empty",
                                        message: "Please choose a colour",
                                    });
                                    return;
                                }
                                if (choice.qty == 0) {
                                    setError({
                                        name: "Empty",
                                        message: "Please choose a quantity",
                                    });
                                    return;
                                }
                                fetch(
                                    process.env.NEXT_PUBLIC_API_URL + "/cart/",
                                    {
                                        method: "PUT",
                                        body: JSON.stringify({
                                            cart: choice,
                                            add: true,
                                            qty: choice.qty,
                                        }),
                                    }
                                ).then((res) => {
                                    if (res.status === 201) {
                                        setAdded(true);
                                    }
                                });
                            }}
                        >
                            Add to cart
                        </Button>
                        <Link href="/cart">
                            <Button
                                className={`button-green my-[10px] ${
                                    added ? "" : "hidden"
                                }`}
                            >
                                Go to cart
                            </Button>
                        </Link>

                        <Link href="/login">
                            <Button
                                className={`button-green my-[10px] ${
                                    error.name == "No User" ? "" : "hidden"
                                }`}
                            >
                                Log In
                            </Button>
                        </Link>
                    </>
                ) : (
                    <Loading />
                )}
            </div>
        </Body>
    );
}

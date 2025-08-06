/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Back from "@/components/back";
import Body from "@/components/body";
import ImageFallback from "@/components/imageFallback";
import Loading from "@/components/loading";
import { Item } from "@/lib/interfaces/item";
import { User } from "@/lib/interfaces/user";
import { Button, Checkbox, Input, Select, SelectItem } from "@heroui/react";
import { option } from "framer-motion/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateOrderPage() {
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

    const [users, setUsers] = useState<User[]>([]);

    const [items, setItems] = useState<Item[]>([]);
    const [colours, setColours] = useState<{ name: string; value: string }[]>(
        []
    );

    const [existing, setExisting] = useState(true);
    const [order, setOrder] = useState({
        userId: "",
        name: "",
        phone: "",
        date: "",
        order: [
            { itemId: "", name: "", size: "", price: 0, colour: "", qty: 0 },
        ],
        shipping: "",
        shippingCost: "",
        address: "",
        total: "",
        status: "",
    });

    useEffect(() => {
        const getProps = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/items")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        const newItems = data.data.items.sort(
                            (a: Item, b: Item) => (a.name > b.name ? 1 : -1)
                        );
                        newItems.push({
                            name: "Custom",
                            itemId: "custom",
                            category: "",
                            colours: [],
                            options: [],
                            images: 0,
                        });
                        setItems(newItems);
                        setColours(data.data.colours);
                    }
                });
            fetch(process.env.NEXT_PUBLIC_API_URL + "/users")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        setUsers(data.data);
                        return;
                    }
                    push("/");
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
        <Body active="createOrder" user={user}>
            <div className="create">
                <Back href="" />
                {items.length > 0 ? (
                    <>
                        <form
                            onSubmit={async (event) => {
                                event.preventDefault();
                                console.log(order);

                                // fetch(process.env.NEXT_PUBLIC_API_URL + "");
                            }}
                        >
                            <Checkbox
                                isSelected={existing}
                                onValueChange={setExisting}
                            >
                                Existing user
                            </Checkbox>
                            {existing ? (
                                <Select
                                    label={"Select a user"}
                                    onChange={(event) => {
                                        if (event.target.value) {
                                            const currUser =
                                                users[
                                                    users.findIndex(
                                                        (user) =>
                                                            user._id ==
                                                            event.target.value
                                                    )
                                                ];
                                            setOrder({
                                                ...order,
                                                userId: event.target.value,
                                                name:
                                                    currUser.firstName +
                                                    " " +
                                                    currUser.lastName,
                                                phone: currUser.phone,
                                            });
                                        } else {
                                            setOrder({
                                                ...order,
                                                userId: "",
                                                name: "",
                                                phone: "",
                                            });
                                        }
                                    }}
                                >
                                    {users?.map((user: User) => (
                                        <SelectItem key={user._id}>
                                            {user.firstName}
                                        </SelectItem>
                                    ))}
                                </Select>
                            ) : (
                                <>
                                    <Input type="text" label="Name" />
                                    <Input
                                        type="text"
                                        label="Phone number/Email"
                                    />
                                </>
                            )}
                            <h2 className="text-center">Order</h2>
                            {order.order.map((x, index: number) => {
                                return (
                                    <div key={index}>
                                        <div className="flex items-center justify-center">
                                            <h3>Order Item {index + 1}</h3>
                                            <button
                                                className="bg-[#f54545] p-[5px] rounded trash cursor-pointer ml-[15px]"
                                                onClick={() => {
                                                    const newOrder = [
                                                        ...order.order,
                                                    ];
                                                    newOrder.splice(index, 1);

                                                    setOrder({
                                                        ...order,
                                                        order: newOrder,
                                                    });
                                                }}
                                            >
                                                <ImageFallback
                                                    src="/trash.svg"
                                                    alt="Trash icon"
                                                    width={25}
                                                    height={25}
                                                />
                                            </button>
                                        </div>

                                        <Select
                                            label={"Select an item"}
                                            onChange={(event) => {
                                                const newOrder = [
                                                    ...order.order,
                                                ];
                                                newOrder[index].itemId =
                                                    event.target.value;
                                                setOrder({
                                                    ...order,
                                                    order: newOrder,
                                                });
                                            }}
                                        >
                                            {items?.map((item: Item) => (
                                                <SelectItem key={item.itemId}>
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                        {order.order[index]?.itemId ? (
                                            <>
                                                {order.order[index]?.itemId !==
                                                "custom" ? (
                                                    <>
                                                        <Select
                                                            label="Item Size"
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                const newOrder =
                                                                    [
                                                                        ...order.order,
                                                                    ];
                                                                newOrder[
                                                                    index
                                                                ].size =
                                                                    event.target.value;
                                                                try {
                                                                    const itemIndex =
                                                                        items.findIndex(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item.itemId ===
                                                                                order
                                                                                    .order[
                                                                                    index
                                                                                ]
                                                                                    .itemId
                                                                        );
                                                                    newOrder[
                                                                        index
                                                                    ].price =
                                                                        items[
                                                                            itemIndex
                                                                        ].options[
                                                                            items[
                                                                                itemIndex
                                                                            ].options.findIndex(
                                                                                (
                                                                                    option
                                                                                ) =>
                                                                                    option.size ===
                                                                                    event
                                                                                        .target
                                                                                        .value
                                                                            )
                                                                        ].price;
                                                                } catch (error: unknown) {
                                                                    newOrder[
                                                                        index
                                                                    ].price = 0;
                                                                }
                                                                setOrder({
                                                                    ...order,
                                                                    order: newOrder,
                                                                });
                                                            }}
                                                        >
                                                            {items[
                                                                items.findIndex(
                                                                    (item) =>
                                                                        item.itemId ===
                                                                        order
                                                                            .order[
                                                                            index
                                                                        ].itemId
                                                                )
                                                            ].options.map(
                                                                (option) => (
                                                                    <SelectItem
                                                                        key={
                                                                            option.size
                                                                        }
                                                                    >
                                                                        {
                                                                            option.size
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </Select>
                                                        <Input
                                                            type="number"
                                                            label="Item Price"
                                                            value={order.order[
                                                                index
                                                            ].price.toString()}
                                                            readOnly
                                                        />
                                                    </>
                                                ) : (
                                                    <>
                                                        <Input
                                                            type="text"
                                                            label="Item Name"
                                                        />
                                                        <Input
                                                            type="text"
                                                            label="Item ID"
                                                        />
                                                        <Input
                                                            type="text"
                                                            label="Item Size"
                                                        />

                                                        <Input
                                                            type="number"
                                                            label="Item Price"
                                                        />
                                                    </>
                                                )}
                                                <Select label="Item Colour">
                                                    {colours.map((colour) => (
                                                        <SelectItem
                                                            key={colour.name}
                                                            startContent={
                                                                <div
                                                                    className="rounded-[50%] w-[25px] aspect-[1/1] border-[1px]"
                                                                    style={{
                                                                        backgroundColor:
                                                                            colour.value,
                                                                    }}
                                                                ></div>
                                                            }
                                                        >
                                                            {colour.name}
                                                        </SelectItem>
                                                    ))}
                                                </Select>
                                                <Input
                                                    type="number"
                                                    label="Item Qty"
                                                />
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                );
                            })}

                            <Button
                                className="button-green mt-[15px]"
                                onClick={() => {
                                    const newOrder = [...order.order];
                                    newOrder.push({
                                        name: "",
                                        itemId: "",
                                        colour: "",
                                        size: "",
                                        price: 0,
                                        qty: 0,
                                    });

                                    setOrder({ ...order, order: newOrder });
                                }}
                            >
                                +
                            </Button>
                            <Button
                                type="submit"
                                className="button-green mt-[20px]"
                            >
                                Create Order
                            </Button>
                        </form>
                    </>
                ) : (
                    <Loading />
                )}
            </div>
        </Body>
    );
}

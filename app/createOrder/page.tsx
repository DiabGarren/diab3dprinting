/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Back from "@/components/back";
import Body from "@/components/body";
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
    const [order, setOrder] = useState([
        { itemId: "", name: "", size: "", price: 0, colour: "", qty: 0 },
    ]);

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
            <Back href="/" />

            <form
                onSubmit={(event) => {
                    event.preventDefault();
                }}
            >
                <Checkbox isSelected={existing} onValueChange={setExisting}>
                    Existing user
                </Checkbox>
                {existing ? (
                    <>
                        <Select label={"Select a user"}>
                            {users?.map((user: User) => (
                                <SelectItem key={user._id}>
                                    {user.firstName}
                                </SelectItem>
                            ))}
                        </Select>
                    </>
                ) : (
                    <>
                        <Input type="text" label="Name" />
                        <Input type="text" label="Phone number" />
                    </>
                )}
                <h2 className="text-center">Order</h2>
                {order.map((x, index: number) => {
                    return (
                        <div key={index}>
                            <div className="flex items-center justify-center">
                                <h3>Order Item {index + 1}</h3>
                                <button
                                    className="bg-[#f54545] w-[35px] p-[5px] rounded trash cursor-pointer ml-[15px]"
                                    onClick={() => {
                                        const item = [...order];
                                        item.splice(index, 1);

                                        setOrder(item);
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 640 640"
                                        className="w-[25px]"
                                    >
                                        <path d="M262.2 48C248.9 48 236.9 56.3 232.2 68.8L216 112L120 112C106.7 112 96 122.7 96 136C96 149.3 106.7 160 120 160L520 160C533.3 160 544 149.3 544 136C544 122.7 533.3 112 520 112L424 112L407.8 68.8C403.1 56.3 391.2 48 377.8 48L262.2 48zM128 208L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 208L464 208L464 512C464 520.8 456.8 528 448 528L192 528C183.2 528 176 520.8 176 512L176 208L128 208zM288 280C288 266.7 277.3 256 264 256C250.7 256 240 266.7 240 280L240 456C240 469.3 250.7 480 264 480C277.3 480 288 469.3 288 456L288 280zM400 280C400 266.7 389.3 256 376 256C362.7 256 352 266.7 352 280L352 456C352 469.3 362.7 480 376 480C389.3 480 400 469.3 400 456L400 280z" />
                                    </svg>
                                </button>
                            </div>

                            <Select
                                label={"Select an item"}
                                onChange={(event) => {
                                    const newOrder = [...order];
                                    newOrder[index].itemId = event.target.value;
                                    setOrder(newOrder);
                                }}
                            >
                                {items?.map((item: Item) => (
                                    <SelectItem key={item.itemId}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </Select>
                            {order[index]?.itemId ? (
                                <>
                                    {order[index]?.itemId !== "custom" ? (
                                        <>
                                            <Select
                                                label="Item Size"
                                                onChange={(event) => {
                                                    const newOrder = [...order];
                                                    newOrder[index].size =
                                                        event.target.value;
                                                    try {
                                                        const itemIndex =
                                                            items.findIndex(
                                                                (item) =>
                                                                    item.itemId ===
                                                                    order[index]
                                                                        .itemId
                                                            );
                                                        newOrder[index].price =
                                                            items[
                                                                itemIndex
                                                            ].options[
                                                                items[
                                                                    itemIndex
                                                                ].options.findIndex(
                                                                    (option) =>
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
                                                    setOrder(newOrder);
                                                }}
                                            >
                                                {items[
                                                    items.findIndex(
                                                        (item) =>
                                                            item.itemId ===
                                                            order[index].itemId
                                                    )
                                                ].options.map((option) => (
                                                    <SelectItem
                                                        key={option.size}
                                                    >
                                                        {option.size}
                                                    </SelectItem>
                                                ))}
                                            </Select>
                                            <Input
                                                type="number"
                                                label="Item Price"
                                                value={order[
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
                                    <Input type="number" label="Item Qty" />
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                    );
                })}

                <Button
                    className="button-green"
                    onClick={() => {
                        const items = [...order];
                        items.push({
                            name: "",
                            itemId: "",
                            colour: "",
                            size: "",
                            price: 0,
                            qty: 0,
                        });

                        setOrder(items);
                    }}
                >
                    +
                </Button>
                <Button type="submit">Create Order</Button>
            </form>
        </Body>
    );
}

"use client";
import Back from "@/components/back";
import Body from "@/components/body";
import { Item } from "@/lib/interfaces/item";
import { User } from "@/lib/interfaces/user";
import { Button, Checkbox, Input, Select, SelectItem } from "@heroui/react";
import { option } from "framer-motion/client";
import { useEffect, useState } from "react";

export default function CreateOrder() {
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

    const [users, setUsers] = useState<User[]>([]);

    const [items, setItems] = useState<Item[]>([]);
    const [colours, setColours] = useState<{ name: string; value: string }[]>(
        []
    );

    const [existing, setExisting] = useState(true);
    const [order, setOrder] = useState([
        { itemId: "", size: "", price: 0, colour: "", qty: 0 },
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
        <Body active="createOrder" user={user}>
            <Back callback={"/"} />

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
                <h2>Order</h2>
                {order.map((x, index: number) => {
                    return (
                        <div key={index}>
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

                <Button type="submit">Create Order</Button>
            </form>
        </Body>
    );
}

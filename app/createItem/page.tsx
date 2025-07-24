"use client";
import Back from "@/components/back";
import Body from "@/components/body";
import { Item } from "@/lib/interfaces/item";
import { Metadata } from "@/lib/interfaces/metadata";
import { User } from "@/lib/interfaces/user";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { useEffect, useState } from "react";

export default function CreateItem() {
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
    const [allColours, setAllColours] = useState<
        [{ name: string; value: string }] | { name: string; value: string }[]
    >([]);
    const [metadata, setMetadata] = useState<Metadata>();
    const [options, setOptions] = useState([
        {
            size: "",
            price: 0,
            printing: {
                time: { hours: 0, minutes: 0 },
                weight: 0,
            },
        },
    ]);

    useEffect(() => {
        const getProps = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/items")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        setAllColours(data.data.colours);
                    }
                });
            fetch(process.env.NEXT_PUBLIC_API_URL + "/metadata")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        setMetadata(data.data);
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

    console.log(options);

    return (
        <Body active="createItem" user={user}>
            <Back callback="/" />

            <Input
                type="text"
                label="ItemName"
                onChange={(event) =>
                    setItem({ ...item, name: event.target.value })
                }
            />
            <Input
                type="text"
                label="ItemId"
                description="Used to identify the image files"
                onChange={(event) =>
                    setItem({ ...item, itemId: event.target.value })
                }
            />
            <Select
                label="Colours"
                selectionMode="multiple"
                description="Leave blank to select all"
                onChange={(event) => {
                    if (event.target.value) {
                        const newColours = event.target.value
                            .split(",")
                            .map((val: string) => {
                                return {
                                    name: allColours[
                                        allColours.findIndex(
                                            (col) => col.value === val
                                        )
                                    ].name,
                                    value: allColours[
                                        allColours.findIndex(
                                            (col) => col.value === val
                                        )
                                    ].value,
                                };
                            });
                        setItem({ ...item, colours: newColours });
                    } else {
                        setItem({ ...item, colours: [] });
                    }
                }}
            >
                {allColours.map((colour: { name: string; value: string }) => (
                    <SelectItem
                        key={colour.value}
                        startContent={
                            <div
                                className="rounded-[50%] w-[30px] h-[30px] border-[1px]"
                                style={{ backgroundColor: colour.value }}
                            ></div>
                        }
                    >
                        {colour.name}
                    </SelectItem>
                ))}
            </Select>
            <h2>Options</h2>
            {options.map((x, index: number) => {
                return (
                    <div className="my-[5px]" key={index}>
                        <Input
                            type="text"
                            label="Size"
                            onChange={(event) =>
                                setOptions([
                                    ...options,
                                    {
                                        size: event.target.value,
                                        price: item.options[index].price,
                                        printing: {
                                            time: {
                                                hours: item.options[index]
                                                    .printing.time.hours,
                                                minutes:
                                                    item.options[index].printing
                                                        .time.minutes,
                                            },
                                            weight: item.options[index].printing
                                                .weight,
                                        },
                                    },
                                ])
                            }
                        />
                    </div>
                );
            })}
            <Button
                onClick={() =>
                    setOptions([
                        ...options,
                        {
                            size: "",
                            price: 0,
                            printing: {
                                time: { hours: 0, minutes: 0 },
                                weight: 0,
                            },
                        },
                    ])
                }
            >
                +
            </Button>

            <Input
                type="number"
                label="Number of Images"
                onChange={(event) =>
                    setItem({ ...item, images: parseInt(event.target.value) })
                }
            />
        </Body>
    );
}

"use client";
import Back from "@/components/back";
import Body from "@/components/body";
import { Item } from "@/lib/interfaces/item";
import { User } from "@/lib/interfaces/user";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateItem() {
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
    const [metadata, setMetadata] = useState({
        filamentCost: 375,
        filamentWeight: 1000,
        filamentMarkup: 0.2,
        printerCost: 6500,
        repairCost: 0.25,
        returnTerm: 2,
        dailyUsage: 6,
        VAT: 0.2,
    });

    const [itemCost, setItemCost] = useState([0]);

    const [error, setError] = useState("");

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

    return (
        <Body active="createItem" user={user}>
            <Back callback="/" />
            <h2>{error}</h2>
            <form
                onSubmit={async (event) => {
                    event.preventDefault();

                    if (
                        !item.name ||
                        !item.itemId ||
                        !item.options ||
                        !item.options[0].price ||
                        !item.options[0].size ||
                        (!item.options[0].printing.time.hours &&
                            item.options[0].printing.time.hours != 0) ||
                        !item.options[0].printing.time.minutes ||
                        !item.options[0].printing.weight
                    ) {
                        setError("Please fill out each field");
                    } else {
                        fetch(process.env.NEXT_PUBLIC_API_URL + "/items", {
                            method: "POST",
                            body: JSON.stringify(item),
                        }).then((res) => {
                            if (res.status === 201) push("/");
                        });
                    }
                }}
            >
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
                    {allColours.map(
                        (colour: { name: string; value: string }) => (
                            <SelectItem
                                key={colour.value}
                                startContent={
                                    <div
                                        className="rounded-[50%] w-[30px] h-[30px] border-[1px]"
                                        style={{
                                            backgroundColor: colour.value,
                                        }}
                                    ></div>
                                }
                            >
                                {colour.name}
                            </SelectItem>
                        )
                    )}
                </Select>
                <h2>Options</h2>
                {item.options.map((x, index: number) => {
                    return (
                        <div className="my-[5px]" key={index}>
                            <div>
                                <span>Option {index + 1}</span>
                                <Button
                                    onClick={() => {
                                        const options = item.options;
                                        options.splice(index, 1);

                                        setItem({
                                            ...item,
                                            options: options,
                                        });
                                    }}
                                >
                                    del
                                </Button>
                            </div>
                            <Input
                                type="text"
                                label="Size"
                                value={item.options[index].size}
                                onChange={(event) => {
                                    const options = item.options;

                                    options[index].size = event.target.value;

                                    setItem({
                                        ...item,
                                        options: options,
                                    });
                                }}
                            />
                            <Input
                                type="number"
                                label="Print Hours"
                                value={item.options[
                                    index
                                ].printing.time.hours.toString()}
                                onChange={(event) => {
                                    const options = item.options;

                                    options[index].printing.time.hours =
                                        parseInt(event.target.value);

                                    setItem({
                                        ...item,
                                        options: options,
                                    });

                                    const cost = itemCost;
                                    cost[index] =
                                        (((metadata.filamentCost /
                                            metadata.filamentWeight) *
                                            (1 + metadata.filamentMarkup) *
                                            item.options[index].printing
                                                .weight +
                                            ((metadata.printerCost *
                                                (1 + metadata.repairCost)) /
                                                metadata.returnTerm /
                                                365 /
                                                metadata.dailyUsage) *
                                                (item.options[index].printing
                                                    .time.hours +
                                                    item.options[index].printing
                                                        .time.minutes /
                                                        60)) *
                                            (1 + metadata.VAT)) |
                                        0;
                                    setItemCost(cost);
                                }}
                            />
                            <Input
                                type="number"
                                label="Print Minutes"
                                value={item.options[
                                    index
                                ].printing.time.minutes.toString()}
                                onChange={(event) => {
                                    const options = item.options;

                                    options[index].printing.time.minutes =
                                        parseInt(event.target.value);

                                    setItem({
                                        ...item,
                                        options: options,
                                    });

                                    const cost = itemCost;
                                    cost[index] =
                                        (((metadata.filamentCost /
                                            metadata.filamentWeight) *
                                            (1 + metadata.filamentMarkup) *
                                            item.options[index].printing
                                                .weight +
                                            ((metadata.printerCost *
                                                (1 + metadata.repairCost)) /
                                                metadata.returnTerm /
                                                365 /
                                                metadata.dailyUsage) *
                                                (item.options[index].printing
                                                    .time.hours +
                                                    item.options[index].printing
                                                        .time.minutes /
                                                        60)) *
                                            (1 + metadata.VAT)) |
                                        0;
                                    setItemCost(cost);
                                }}
                            />
                            <Input
                                type="number"
                                label="Print Weight"
                                value={item.options[
                                    index
                                ].printing.weight.toString()}
                                onChange={(event) => {
                                    const options = item.options;

                                    options[index].printing.weight = parseInt(
                                        event.target.value
                                    );

                                    setItem({
                                        ...item,
                                        options: options,
                                    });

                                    const cost = itemCost;
                                    cost[index] =
                                        (((metadata.filamentCost /
                                            metadata.filamentWeight) *
                                            (1 + metadata.filamentMarkup) *
                                            item.options[index].printing
                                                .weight +
                                            ((metadata.printerCost *
                                                (1 + metadata.repairCost)) /
                                                metadata.returnTerm /
                                                365 /
                                                metadata.dailyUsage) *
                                                (item.options[index].printing
                                                    .time.hours +
                                                    item.options[index].printing
                                                        .time.minutes /
                                                        60)) *
                                            (1 + metadata.VAT)) |
                                        0;
                                    setItemCost(cost);
                                }}
                            />
                            <Input
                                type="number"
                                label="Price"
                                description={
                                    "Recommened Price: R" + itemCost[index]
                                }
                                onChange={(event) => {
                                    const options = item.options;

                                    options[index].price = parseInt(
                                        event.target.value
                                    );

                                    setItem({
                                        ...item,
                                        options: options,
                                    });
                                }}
                            />
                        </div>
                    );
                })}
                <Button
                    onClick={() => {
                        const options = item.options;
                        options.push({
                            size: "",
                            price: 0,
                            printing: {
                                time: { hours: 0, minutes: 0 },
                                weight: 0,
                            },
                        });
                        setItem({
                            ...item,
                            options: options,
                        });

                        const cost = itemCost;
                        cost.push(0);
                        setItemCost(cost);
                    }}
                >
                    +
                </Button>

                <Input
                    type="number"
                    label="Number of Images"
                    onChange={(event) =>
                        setItem({
                            ...item,
                            images: parseInt(event.target.value),
                        })
                    }
                />
                <Button type="submit">Create Item</Button>
            </form>
        </Body>
    );
}

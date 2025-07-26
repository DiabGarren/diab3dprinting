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
            <h1 className="text-center text-[25px] font-[500] mb-[15px]">
                Create Item
            </h1>
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
                    label="Item Name"
                    className="form-input"
                    onChange={(event) =>
                        setItem({ ...item, name: event.target.value })
                    }
                />
                <Input
                    type="text"
                    label="Item ID"
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
                                        className="rounded-[50%] w-[25px] aspect-[1/1] border-[1px]"
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
                <h2 className="text-center text-[20px] font-[500]">Options</h2>
                {item.options.map((x, index: number) => {
                    return (
                        <div className="my-[5px]" key={index}>
                            <div className="flex items-center justify-center">
                                <span className="text-[18px]">
                                    Option {index + 1}
                                </span>
                                <button
                                    className="bg-[#f54545] w-[35px] p-[5px] rounded trash cursor-pointer ml-[15px]"
                                    onClick={() => {
                                        const options = item.options;
                                        options.splice(index, 1);

                                        setItem({
                                            ...item,
                                            options: options,
                                        });
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
                            <Input
                                type="text"
                                label="Item Size"
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
                    className="button-green"
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
                <Button type="submit" className="button-green">
                    Create Item
                </Button>
            </form>
        </Body>
    );
}

"use client";
import Body from "@/components/body";
import ItemCard from "@/components/itemCard";
import Loading from "@/components/loading";
import { Colour } from "@/lib/interfaces/colour";
import { Item } from "@/lib/interfaces/item";
import { Metadata } from "@/lib/interfaces/metadata";
import { User } from "@/lib/interfaces/user";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HomePage() {
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
    const [items, setItems] = useState<Item[]>([]);
    // const [displayItems, setDisplayItems] = useState<Item[]>([]);
    // const [page, setPage] = useState(1);
    const [colours, setColours] = useState<Colour[]>([]);
    const [metadata, setMetadata] = useState<Metadata>();

    useEffect(() => {
        const getProps = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/items")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        data.data.items.sort((a: Item, b: Item) =>
                            a.name > b.name ? 1 : -1
                        );
                        setItems(data.data.items);

                        // const newItems = [];
                        // for (let i = 0; i < 10; i++) {
                        //     newItems.push(data.data.items[i]);
                        // }
                        // setDisplayItems(newItems);

                        setColours(data.data.colours);
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
        <Body active="home" user={user}>
            <div className="hero-image relative h-[180px] w-[100%]">
                <Image
                    src={"/hero.jpg"}
                    alt={"Hero Image"}
                    fill
                    className="object-cover"
                />
            </div>
            <h1 className="text-center">3D Prints</h1>
            <div className="items">
                {items.length > 0 ? (
                    <>
                        {items.map((item: Item, index: number) => (
                            <ItemCard
                                item={item}
                                colours={colours}
                                key={"item-" + index}
                            />
                        ))}
                        {/* {displayItems.map((item: Item, index: number) => (
                            <ItemCard
                                item={item}
                                colours={colours}
                                key={"item-" + index}
                            />
                        ))}
                        <Button
                            onPress={() => {
                                const newItems = [];
                                for (
                                    let i = 10 * (page - 2);
                                    i < 10 + 10 * (page - 2);
                                    i++
                                ) {
                                    if (items.length > i && i >= 0) {
                                        newItems.push(items[i]);
                                    }
                                }
                                setDisplayItems(newItems);
                                setPage(page - 1);
                            }}
                        >
                            {"<"}
                        </Button>
                        <p>{page}</p>
                        <Button
                            onPress={() => {
                                const newItems = [];
                                for (
                                    let i = 10 * page;
                                    i < 10 + 10 * page;
                                    i++
                                ) {
                                    if (items.length > i) {
                                        newItems.push(items[i]);
                                    }
                                }
                                setDisplayItems(newItems);
                                setPage(page + 1);
                            }}
                        >
                            {">"}
                        </Button> */}
                    </>
                ) : (
                    <Loading />
                )}
                <h2>Printer: {metadata?.printer}</h2>
            </div>
        </Body>
    );
}

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
    const [colours, setColours] = useState<Colour[]>([]);
    const [metadata, setMetadata] = useState<Metadata>();

    useEffect(() => {
        const getProps = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/items")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        setItems(
                            data.data.items.sort((a: Item, b: Item) =>
                                a.name > b.name ? 1 : -1
                            )
                        );
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
                        {items.map((item: Item, index: number) => {
                            return (
                                <>
                                    {item.category != "tool" ? (
                                        <ItemCard
                                            item={item}
                                            colours={colours}
                                            key={"item-" + index}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </>
                            );
                        })}
                    </>
                ) : (
                    <Loading />
                )}
                <h2>Printer: {metadata?.printer}</h2>
            </div>
        </Body>
    );
}

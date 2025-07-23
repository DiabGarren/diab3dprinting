"use client";
import Body from "@/components/body";
import ItemCard from "@/components/itemCard";
import { Colour } from "@/lib/interfaces/colour";
import { Item } from "@/lib/interfaces/item";
import { Metadata } from "@/lib/interfaces/metadata";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
    const [items, setItems] = useState<Item[]>([]);
    const [colours, setColours] = useState<Colour[]>([]);
    const [metadata, setMetadata] = useState<Metadata>();

    useEffect(() => {
        const getProps = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/items")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        setItems(data.data.items);
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
        getProps();
    }, []);

    return (
        <Body active="">
            <div className="relative object-fit h-[180px] w-[100%]">
                <Image src={"/hero.jpg"} alt={"Hero Image"} fill />
            </div>
            <div className="items">
                {items.length > 0 ? (
                    <>
                        {items.map((item: Item, index: number) => {
                            return (
                                <ItemCard
                                    item={item}
                                    colours={colours}
                                    key={"item-" + index}
                                />
                            );
                        })}
                    </>
                ) : (
                    <>No Items</>
                )}
                <h2>Printer: {metadata?.printer}</h2>
            </div>
        </Body>
    );
}

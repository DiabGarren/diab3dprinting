"use client";
import Body from "@/components/body";
import ItemCard from "@/components/itemCard";
import { Item } from "@/lib/item";
import { Metadata } from "@/lib/metadata";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
    const [items, setItems] = useState<[]>([]);
    const [metadata, setMetadata] = useState<Metadata>();

    useEffect(() => {
        const getItems = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/items")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        console.log(data.data);

                        setItems(data.data);
                    }
                });
        };
        const getMetadata = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/metadata")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        setMetadata(data.data);
                    }
                });
        };
        getItems();
        getMetadata();
    }, []);

    return (
        <Body>
            <div className="relative object-fit h-[180px] w-[100%]">
                <Image src={"/hero.jpg"} alt={"Hero Image"} fill />
            </div>
            <div className="items">
                {items.length > 0 ? (
                    <>
                        {items.map((item: Item, index: number) => {
                            return <ItemCard {...item} key={"item-" + index} />;
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

"use client";
import Back from "@/components/back";
import Body from "@/components/body";
import OrderItemCard from "@/components/orderItemCard";
import { Order } from "@/lib/interfaces/order";
import { User } from "@/lib/interfaces/user";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AllOrders() {
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
    const [orders, setOrders] = useState<[Order] | []>([]);

    useEffect(() => {
        const getUser = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/user")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        setUser(data.data);
                        fetch(process.env.NEXT_PUBLIC_API_URL + "/orders")
                            .then((res) => res.json())
                            .then((data) => {
                                if (data.status == "success") {
                                    setOrders(
                                        data.data.sort((a: Order, b: Order) => {
                                            const dateA = new Date(a.date);
                                            const dateB = new Date(b.date);

                                            if (dateA > dateB) {
                                                return 1;
                                            }
                                            return -1;
                                        })
                                    );
                                }
                            });
                        return;
                    }
                    push("/");
                });
        };
        getUser();
    }, []);

    return (
        <Body active="allOrders" user={user}>
            <Back href="/" />
            {orders.length > 0 ? (
                <div className="orders">
                    <h1 className="text-center">All Orders</h1>
                    {orders.map((order: Order, index: number) => {
                        const date = new Date(order.date);
                        return (
                            <Link
                                href={"/orders/" + order._id}
                                key={"order-" + index}
                            >
                                <div className="order-card">
                                    <h2 className="date">
                                        {date.toLocaleDateString("en-GB", {
                                            weekday: "short",
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </h2>
                                    <h3>Ordered by: {order.name}</h3>
                                    <div className="order-items flex items-center">
                                        {order.order.length > 3 ? (
                                            <>
                                                {[...new Array(3)].map(
                                                    (item, index) => (
                                                        <OrderItemCard
                                                            itemId={
                                                                order.order[
                                                                    index
                                                                ].itemId
                                                            }
                                                            name={
                                                                order.order[
                                                                    index
                                                                ].name
                                                            }
                                                            price={
                                                                order.order[
                                                                    index
                                                                ].price
                                                            }
                                                            qty={
                                                                order.order[
                                                                    index
                                                                ].qty
                                                            }
                                                            key={
                                                                "item-" + index
                                                            }
                                                        />
                                                    )
                                                )}
                                                <div className="w-[40px] h-[40px] flex items-center justify-center m-[5px_2px]">
                                                    <span className="text-[18px]">
                                                        +{" "}
                                                        {order.order.length - 3}
                                                    </span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {[
                                                    ...new Array(
                                                        order.order.length
                                                    ),
                                                ].map((item, index) => (
                                                    <OrderItemCard
                                                        itemId={
                                                            order.order[index]
                                                                .itemId
                                                        }
                                                        name={
                                                            order.order[index]
                                                                .name
                                                        }
                                                        price={
                                                            order.order[index]
                                                                .price
                                                        }
                                                        qty={
                                                            order.order[index]
                                                                .qty
                                                        }
                                                        key={"item-" + index}
                                                    />
                                                ))}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <div className="w-[100%] flex justify-center">
                    <Image
                        src={"/loading.webp"}
                        alt={"Loading spinner"}
                        width={75}
                        height={75}
                    />
                </div>
            )}
        </Body>
    );
}

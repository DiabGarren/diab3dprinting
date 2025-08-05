"use client";
import Back from "@/components/back";
import Body from "@/components/body";
import Loading from "@/components/loading";
import CartItemCard from "@/components/cartItemCard";
import { Order } from "@/lib/interfaces/order";
import { User } from "@/lib/interfaces/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OrderItemCard from "@/components/orderItemCard";

export default function OrdersPage() {
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
                        fetch(
                            process.env.NEXT_PUBLIC_API_URL +
                                "/orders/" +
                                data.data._id
                        )
                            .then((res) => res.json())
                            .then((data) => {
                                if (data.status === "success") {
                                    setOrders(data.data);
                                }
                            });
                        return;
                    }
                    push("/");
                });
        };
        getUser();
    }, []);

    console.log(orders);

    return (
        <Body active="orders" user={user}>
            <div className="orders">
                <Back href="" />
                {orders.length > 0 ? (
                    <>
                        <h1 className="text-center">Orders</h1>
                        {orders[0]?._id == "No Orders" ? (
                            <h2 className="text-center">
                                You have no past orders
                            </h2>
                        ) : (
                            <>
                                {orders.map((order: Order, index: number) => {
                                    const date = new Date(order.date);
                                    return (
                                        <Link
                                            href={"/orders/" + order._id}
                                            key={"order-" + index}
                                        >
                                            <div className="order-card">
                                                <h2 className="date">
                                                    {date.toLocaleDateString(
                                                        "en-GB",
                                                        {
                                                            weekday: "short",
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                        }
                                                    )}
                                                </h2>
                                                <div className="order-items flex items-center">
                                                    {order.order.length > 3 ? (
                                                        <>
                                                            {[
                                                                ...new Array(3),
                                                            ].map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => (
                                                                    <OrderItemCard
                                                                        itemId={
                                                                            order
                                                                                .order[
                                                                                index
                                                                            ]
                                                                                .itemId
                                                                        }
                                                                        name={
                                                                            order
                                                                                .order[
                                                                                index
                                                                            ]
                                                                                .name
                                                                        }
                                                                        key={
                                                                            "item-" +
                                                                            index
                                                                        }
                                                                    />
                                                                )
                                                            )}
                                                            <div className="w-[40px] h-[40px] flex items-center justify-center m-[5px_2px]">
                                                                <span className="text-[18px]">
                                                                    +{" "}
                                                                    {order.order
                                                                        .length -
                                                                        3}
                                                                </span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {[
                                                                ...new Array(
                                                                    order.order.length
                                                                ),
                                                            ].map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => (
                                                                    <OrderItemCard
                                                                        itemId={
                                                                            order
                                                                                .order[
                                                                                index
                                                                            ]
                                                                                .itemId
                                                                        }
                                                                        name={
                                                                            order
                                                                                .order[
                                                                                index
                                                                            ]
                                                                                .name
                                                                        }
                                                                        key={
                                                                            "item-" +
                                                                            index
                                                                        }
                                                                    />
                                                                )
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </>
                        )}
                    </>
                ) : (
                    <Loading />
                )}
            </div>
        </Body>
    );
}

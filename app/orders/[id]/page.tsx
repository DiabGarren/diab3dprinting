"use client";
import Back from "@/components/back";
import Body from "@/components/body";
import Loading from "@/components/loading";
import { Order } from "@/lib/interfaces/order";
import { User } from "@/lib/interfaces/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
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

    const [order, setOrder] = useState<Order>();

    useEffect(() => {
        const getUser = async () => {
            const { id } = await params;
            fetch(process.env.NEXT_PUBLIC_API_URL + "/user")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        setUser(data.data);
                        fetch(process.env.NEXT_PUBLIC_API_URL + "/order/" + id)
                            .then((res) => res.json())
                            .then((data) => {
                                if (data.status === "success") {
                                    setOrder(data.data);
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
        <Body active="order" user={user}>
            <Back href="./orders" />
            {order ? (
                <div className="order">
                    <h1 className="text-center">Order Details</h1>
                </div>
            ) : (
                <Loading />
            )}
        </Body>
    );
}

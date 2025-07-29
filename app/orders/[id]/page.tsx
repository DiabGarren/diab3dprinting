"use client";
import Back from "@/components/back";
import Body from "@/components/body";
import ImageFallback from "@/components/imageFallback";
import Loading from "@/components/loading";
import { Order } from "@/lib/interfaces/order";
import { User } from "@/lib/interfaces/user";
import { Button } from "@heroui/react";
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
            <Back href={user.level == 2 ? "./allOrders" : "./orders"} />
            {order ? (
                <div className="order">
                    <div className="no-print">
                        <h1 className="text-center">Order Details</h1>
                        <h2>
                            {new Date(order.date).toLocaleDateString("en-GB", {
                                weekday: "short",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </h2>
                        {order.order.map((item, index: number) => (
                            <div
                                className="grid grid-cols-[120px_2fr] p-[10px] border-b-[2px] border-(--primary)"
                                key={"order-" + index}
                            >
                                <div className="order-item-image relative w-[120px] h-[100%]">
                                    <ImageFallback
                                        src={
                                            "/items/" +
                                            item.itemId +
                                            "/" +
                                            item.itemId +
                                            "0.jpg"
                                        }
                                        alt={"Thumbnail image for " + item.name}
                                        fill
                                        className="object-cover rounded"
                                    />
                                </div>
                                <div className="order-item-details px-[10px]">
                                    <h2>{item.name}</h2>
                                    <p>{item.size}</p>
                                    <p>{item.colour}</p>
                                    <p>R{item.price}</p>
                                    <p>Qty: {item.qty}</p>
                                </div>
                            </div>
                        ))}

                        <h1 className="text-center">Invoice</h1>
                        <Button
                            className="button-green"
                            onClick={() => print()}
                        >
                            Print Invoice
                        </Button>
                    </div>
                    <div className="order-invoice max-w-[100%] overflow-x-auto my-[15px] p-[15px]">
                        <div className="w-[550px] mx-auto">
                            <p className="text-(--print-green) text-[32px] font-[700]">
                                DIAB DESGINS & CONSULTING
                            </p>
                            <p className="text-(--print-green) text-[22px] font-[600]">
                                CUSTOM 3D PRINTING
                            </p>
                            <p className="text-[16px] text-(--print-green-dark) font-[600] mt-[36px]">
                                DATE:{" "}
                                {new Date(order.date).toLocaleDateString(
                                    "en-GB"
                                )}
                            </p>
                            <div className="details grid grid-cols-[1fr_1fr]">
                                <div>
                                    <p className="text-[20px] text-(--print-green) font-[600]">
                                        BILLED TO
                                    </p>
                                    <p>{order.name}</p>
                                    <p>{order.phone}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[20px] text-(--print-green) font-[600]">
                                        PAYMENT INFO
                                    </p>
                                    <p>Account name: Garren Diab</p>
                                    <p>Account Number: 62880826684</p>
                                    <p>Bank: FNB</p>
                                </div>
                                <div className="my-[18px]">
                                    <p className="text-[20px] text-(--print-green) font-[600]">
                                        SHIPPING
                                    </p>
                                    <p>{order.shipping}</p>
                                    {order.shipping == "Deliver" ? (
                                        <>
                                            <p>
                                                {order.address.street}
                                                <br />
                                                {order.address.suburb}
                                                <br />
                                                {order.address.city}
                                                <br />
                                                {order.address.postalCode}
                                            </p>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                            <div className="w-[100%] [&_*]:border-(--print-yellow)">
                                <div className="grid grid-cols-[1fr_152px]">
                                    <p className="text-center text-[20px] text-(--print-green) font-[600] border">
                                        DESCRIPTION
                                    </p>
                                    <p className="text-center text-[20px] text-(--print-green) font-[600] border border-l-[0px]">
                                        TOTAL
                                    </p>
                                </div>

                                {order.order.map((item, index: number) => (
                                    <div
                                        className="border-b-[1px] grid grid-cols-[1fr_152px]"
                                        key={index}
                                    >
                                        <div className="border-r border-l p-[8px]">
                                            <p className="text-(--print-green) font-[600]">
                                                {item.name}
                                            </p>
                                            <p className="ml-[25px]">
                                                Size: {item.size}
                                                <br />
                                                Colour: {item.colour}
                                                <br />
                                                Price: R{item.price}
                                                <br />
                                                Qty: {item.qty}
                                                <br />
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-center border-r">
                                            <p className="text-(--print-green) font-[600]">
                                                R{item.price * item.qty}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <div className="grid grid-cols-[1fr_152px]">
                                    <p className="border-r text-(--print-green) font-[600] text-right p-[8px]">
                                        TOTAL
                                    </p>
                                    <div className="border-r border-b flex items-center justify-center">
                                        <p className="text-(--print-green) font-[600]">
                                            R{order.total}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-[100px] w-[100%] border-t-[2px] py-[8px]">
                                    <p>Garren Diab</p>
                                    <p>
                                        <a
                                            href="mailto:garrendiab@gmail.com"
                                            className="text-(--primary) underline"
                                        >
                                            garrendiab@gmail.com
                                        </a>
                                    </p>
                                    <p>060 981 1694</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </Body>
    );
}

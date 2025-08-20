"use client";
import Back from "@/components/back";
import Body from "@/components/body";
import CartItemCard from "@/components/cartItemCard";
import Loading from "@/components/loading";
import { Order } from "@/lib/interfaces/order";
import { User } from "@/lib/interfaces/user";
import { Button, Checkbox, Input, Radio, RadioGroup } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
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
    const [order, setOrder] = useState<Order>({
        _id: "",
        userId: "",
        name: "",
        phone: "",
        date: "",
        order: [
            {
                _id: "",
                itemId: "",
                name: "",
                size: "",
                colour: "",
                price: 0,
                qty: 0,
            },
        ],
        shipping: "",
        shippingCost: 0,
        address: {
            street: "",
            suburb: "",
            city: "",
            postalCode: "",
        },
        total: 0,
        status: "",
    });

    const [saveAddress, setSaveAddress] = useState(true);

    const radioClass =
        "border-2 mx-[5px] rounded border-transparent data-[selected=true]:border-(--primary) bg-white mb-[5px]";

    useEffect(() => {
        const getUser = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/user")
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        setUser(data.data);
                        let sub = 0;
                        data.data.cart.forEach(
                            (item: {
                                _id: string;
                                itemId: string;
                                name: string;
                                size: string;
                                price: number;
                                colour: string;
                                qty: number;
                            }) => {
                                sub += item.price * item.qty;
                            }
                        );
                        setOrder({
                            ...order,
                            userId: data.data._id,
                            name: `${data.data.firstName} ${data.data.lastName}`,
                            phone: data.data.phone,
                            date: new Date().toISOString(),
                            order: data.data.cart,
                            address: data.data.address,
                            total: sub,
                        });
                        return;
                    }
                    push("/");
                });
        };
        getUser();
    }, []);

    return (
        <Body active="cart" user={user}>
            <div className="checkout">
                <Back href="cart" />
                <h1 className="text-center">Checkout</h1>
                {user._id ? (
                    <>
                        <p className="text-center text-[22px] font-[600]">
                            Order Summary
                        </p>
                        <div className="cart-items">
                            {user.cart.map((item, index) => (
                                <div key={index} className="cart-item">
                                    <CartItemCard {...item} />
                                </div>
                            ))}
                        </div>
                        <h2 className="ml-[15px]">Subtotal: R{order.total}</h2>
                        <p className="text-center text-[22px] font-[600]">
                            Shipping
                        </p>
                        <div className="border-b-[2px] border-(--primary) m-[5px_10px] p-[10px]">
                            <RadioGroup
                                defaultValue={"Collect"}
                                orientation="horizontal"
                                className="items-center"
                                onChange={(event) => {
                                    let shipCost = 0;
                                    if (event.target.value == "Deliver")
                                        shipCost = 50;
                                    setOrder({
                                        ...order,
                                        shipping: event.target.value,
                                        shippingCost: shipCost,
                                    });
                                }}
                            >
                                <Radio className={radioClass} value="Collect">
                                    Collect
                                </Radio>
                                <Radio className={radioClass} value="Deliver">
                                    Deliver
                                </Radio>
                            </RadioGroup>
                            {order.shipping == "Deliver" ? (
                                <>
                                    <p className="text-center text-[18px] font-[500]">
                                        Address
                                    </p>
                                    <div className="w-[80%] mx-auto">
                                        <Input
                                            label="Street"
                                            value={order.address.street}
                                            onChange={(event) => {
                                                setOrder({
                                                    ...order,
                                                    address: {
                                                        ...order.address,
                                                        street: event.target
                                                            .value,
                                                    },
                                                });
                                            }}
                                        />
                                        <Input
                                            label="Suburb"
                                            value={order.address.suburb}
                                            onChange={(event) => {
                                                setOrder({
                                                    ...order,
                                                    address: {
                                                        ...order.address,
                                                        suburb: event.target
                                                            .value,
                                                    },
                                                });
                                            }}
                                        />
                                        <Input
                                            label="City"
                                            value={order.address.city}
                                            onChange={(event) => {
                                                setOrder({
                                                    ...order,
                                                    address: {
                                                        ...order.address,
                                                        city: event.target
                                                            .value,
                                                    },
                                                });
                                            }}
                                        />
                                        <Input
                                            label="Postal Code"
                                            value={order.address.postalCode}
                                            onChange={(event) => {
                                                setOrder({
                                                    ...order,
                                                    address: {
                                                        ...order.address,
                                                        postalCode:
                                                            event.target.value,
                                                    },
                                                });
                                            }}
                                        />
                                        <Checkbox
                                            defaultSelected
                                            onValueChange={(event) =>
                                                setSaveAddress(event)
                                            }
                                        >
                                            Save address
                                        </Checkbox>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                        <h2 className="ml-[15px]">
                            Shipping Cost: R{order.shippingCost}
                        </h2>
                        <hr className="border-(--primary) border-t-[2px] my-[15px]" />
                        <p className="text-center text-[22px] font-[600]">
                            Order Total: R{order.total + order.shippingCost}
                        </p>
                        <Button
                            className="button-green mt-[10px]"
                            onClick={async () => {
                                fetch(
                                    process.env.NEXT_PUBLIC_API_URL + "/orders",
                                    {
                                        method: "POST",
                                        body: JSON.stringify(order),
                                    }
                                ).then((res) => {
                                    if (res.status == 201) {
                                        const newUser = { ...user };
                                        if (
                                            saveAddress &&
                                            order.shipping == "Deliver"
                                        )
                                            newUser.address = order.address;

                                        newUser.cart = [];
                                        fetch(
                                            process.env.NEXT_PUBLIC_API_URL +
                                                "/user/" +
                                                user._id,
                                            {
                                                method: "PUT",
                                                body: JSON.stringify(newUser),
                                            }
                                        );
                                    }
                                    push("/orders");
                                });
                            }}
                        >
                            Place Order
                        </Button>
                    </>
                ) : (
                    <Loading />
                )}
            </div>
        </Body>
    );
}

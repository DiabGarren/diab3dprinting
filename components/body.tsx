"use client";

import { User } from "@/lib/interfaces/user";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Body({
    children,
    active,
    user,
}: {
    children: React.ReactNode;
    active: string;
    user: User;
}) {
    const [nav, setNav] = useState(false);
    return (
        <>
            <header className="bg-(--primary) h-[90px] grid grid-cols-[75px_1fr_75px] px-[5px]">
                <Link href={"/"}>
                    <div className="relative w-[100%] h-[100%]">
                        <Image
                            src={"/logoGlow.png"}
                            alt={"Logo"}
                            fill
                            className="object-contain"
                        />
                    </div>
                </Link>
                <h1 className="text-white text-center text-[25px] self-center">
                    Custom 3D Printing
                </h1>
                <button
                    className="cursor-pointer"
                    onClick={() => {
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        nav ? setNav(false) : setNav(true);
                    }}
                >
                    <svg width={75} height={70}>
                        <line
                            x1={15}
                            y1={20}
                            x2={55}
                            y2={20}
                            strokeWidth={6}
                            stroke="white"
                            strokeLinecap="round"
                            className={`${nav == true ? "hidden" : "block"}`}
                        />
                        <line
                            x1={15}
                            y1={35}
                            x2={55}
                            y2={35}
                            strokeWidth={6}
                            stroke="white"
                            strokeLinecap="round"
                            className={`${nav == true ? "hidden" : "block"}`}
                        />
                        <line
                            x1={15}
                            y1={50}
                            x2={55}
                            y2={50}
                            strokeWidth={6}
                            stroke="white"
                            strokeLinecap="round"
                            className={`${nav == true ? "hidden" : "block"}`}
                        />
                        <line
                            x1={20}
                            y1={20}
                            x2={50}
                            y2={50}
                            strokeWidth={6}
                            stroke="white"
                            strokeLinecap="round"
                            className={`${nav == true ? "block" : "hidden"}`}
                        />
                        <line
                            x1={20}
                            y1={50}
                            x2={50}
                            y2={20}
                            strokeWidth={6}
                            stroke="white"
                            strokeLinecap="round"
                            className={`${nav == true ? "block" : "hidden"}`}
                        />
                    </svg>
                </button>
            </header>
            <nav className={`${nav ? "block" : "hidden"} bg-(--primary)`}>
                <ul className="[&_a]:block [&_a]:w-[100%] [&_a]:text-white [&_a]:text-center [&_a]:py-[5px] [&_a]:hover:bg-(--primary-dark) [&_a]:hover:underline [&_li]:border-y-[1px] [&_li]:border-(--primary-dark) [&_li]:first:border-t-[0px] [&_li]:last:border-b-[0px]">
                    <li>
                        <Link
                            href={"/"}
                            className={
                                active == "home" ? "bg-(--primary-dark)" : ""
                            }
                        >
                            Home
                        </Link>
                    </li>
                    {!user._id ? (
                        <>
                            <li>
                                <Link
                                    href={"/login"}
                                    className={
                                        active == "login"
                                            ? "bg-(--primary-dark)"
                                            : ""
                                    }
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/register"}
                                    className={
                                        active == "register"
                                            ? "bg-(--primary-dark)"
                                            : ""
                                    }
                                >
                                    Sign Up
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link
                                    href={"/cart"}
                                    className={
                                        active == "cart"
                                            ? "bg-(--primary-dark)"
                                            : ""
                                    }
                                >
                                    Cart
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/profile"}
                                    className={
                                        active == "profile"
                                            ? "bg-(--primary-dark)"
                                            : ""
                                    }
                                >
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/orders"}
                                    className={
                                        active == "orders"
                                            ? "bg-(--primary-dark)"
                                            : ""
                                    }
                                >
                                    Orders
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            <main className="mx-auto mt-[50px]">{children}</main>
            <footer></footer>
        </>
    );
}

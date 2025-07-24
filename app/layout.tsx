import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Custom 3D Printing",
    description: "Custom 3D Printing run by Garren Diab",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}

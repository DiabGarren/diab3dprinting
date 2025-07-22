"use client";
export default function Body({ children }: { children: React.ReactNode }) {
    return (
        <>
            <header className="bg-(--primary) h-[90px]"></header>
            <main className="mx-auto mt-[50px]">{children}</main>
            <footer></footer>
        </>
    );
}

import Link from "next/link";

export default function Back({ href }: { href: string }) {
    return (
        <Link
            href={"/" + href}
            className="flex gap-[2px] items-center hover:underline no-print"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="10"
                viewBox="0 0 41 52"
                fill="none"
            >
                <path
                    d="M33.2265 50.8176L2.24038 30.1602C-0.728286 28.1811 -0.728284 23.8188 2.24038 21.8397L33.2265 1.18233C36.5493 -1.03285 41 1.3491 41 5.34258V46.6574C41 50.6509 36.5493 53.0328 33.2265 50.8176Z"
                    fill="black"
                />
            </svg>
            Back
        </Link>
    );
}

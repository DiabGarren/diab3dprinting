import Image from "next/image";

export default function Loading() {
    return (
        <div className="w-[100%] flex justify-center">
            <Image
                src={"/loading.webp"}
                alt={"Loading spinner"}
                width={75}
                height={75}
                unoptimized
            />
        </div>
    );
}

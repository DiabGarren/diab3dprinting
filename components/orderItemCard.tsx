import Image from "next/image";

export default function OrderItemCard({
    itemId,
    name,
    price,
    qty,
}: {
    itemId: string;
    name: string;
    price: number;
    qty: number;
}) {
    return (
        <div className="order-item">
            <div className="item-image relative w-[80px] aspect-[1/1]">
                <Image
                    src={"/items/" + itemId + "/" + itemId + "0.jpg"}
                    alt={"Thumbnail image for " + name}
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    );
}

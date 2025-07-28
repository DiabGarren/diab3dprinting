import ImageFallback from "./imageFallback";

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
            <div className="item-image relative w-[80px] aspect-[1/1] rounded-[5px] border-[2px] border-(--primary-dark) m-[5px_2px]">
                <ImageFallback
                    src={"/items/" + itemId + "/" + itemId + "0.jpg"}
                    alt={"Thumbnail image for " + name}
                    fill
                    className="object-cover rounded-[2px]"
                />
            </div>
        </div>
    );
}

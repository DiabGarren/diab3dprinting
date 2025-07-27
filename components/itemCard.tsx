import { Colour } from "@/lib/interfaces/colour";
import { Item } from "@/lib/interfaces/item";
import Image from "next/image";
import Link from "next/link";

export default function ItemCard({
    item,
    colours,
}: {
    item: Item;
    colours: Colour[];
}) {
    const itemColours: { name: string; value: string }[] = [];

    if (item.colours.length > 0) {
        item.colours.forEach((colour: { name: string; value: string }) => {
            itemColours.push(colour);
        });
    } else {
        colours.forEach((colour: { name: string; value: string }) => {
            itemColours.push(colour);
        });
    }

    return (
        <Link
            href={"/item/" + item._id}
            className="item-card border-b-[2px] border-(--primary) m-[5px] grid grid-cols-[150px_1fr] p-[10px]"
        >
            <div className="relative w-[150px] h-[120px]">
                <Image
                    src={"/items/" + item.itemId + "/" + item.itemId + "0.jpg"}
                    alt={item.name + " thumbnail image"}
                    fill
                    className="object-cover rounded"
                />
            </div>

            <div className="px-[10px]">
                <h2>{item.name}</h2>
                <p className="my-[5px]">
                    <span className="font-[600] text-[16px]">From </span>
                    <span className="font-[700] text-[18px]">
                        R{item.options[0].price}
                    </span>
                </p>
                <div className="text-[14px] mt-[8px]">
                    <p>
                        <span className="text-[16px] font-[500]">
                            {item.options.length}
                        </span>{" "}
                        size
                        {item.options.length > 1 ? "s" : ""}
                        <br />
                        <span className="text-[16px] font-[500]">
                            {itemColours.length}
                        </span>{" "}
                        colour
                        {itemColours.length > 1 ? "s" : ""}
                    </p>
                </div>
            </div>
        </Link>
    );
}

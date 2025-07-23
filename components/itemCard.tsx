import { Colour } from "@/lib/interfaces/colour";
import { Item } from "@/lib/interfaces/item";
import Image from "next/image";

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
        <div className="w-[250px] border-[2px] border-(--primary) rounded m-[5px] p-[2px]">
            <div className="relative w-[100%] h-[120px]">
                <Image
                    src={"/items/" + item.itemId + "0.jpg"}
                    alt={item.name + " thumbnail image"}
                    fill
                    className="object-cover"
                />
            </div>

            <h2>{item.name}</h2>
            <p>From: R{item.options[0].price}</p>
            <p>
                {item.options.length} size{item.options.length > 1 ? "s" : ""}{" "}
                available
            </p>
            <p>
                {itemColours.length} colour{itemColours.length > 1 ? "s" : ""}{" "}
                available
            </p>
        </div>
    );
}

import { Item } from "@/lib/item";
import Image from "next/image";

export default function ItemCard(props: Item) {
    return (
        <div className="w-[250px] border-[2px] border-(--primary) rounded m-[5px] p-[2px]">
            <div className="relative w-[100%] h-[120px]">
                <Image
                    src={"/items/" + props.itemId + "0.jpg"}
                    alt={props.name + " thumbnail image"}
                    fill
                    className="object-cover"
                />
            </div>

            <h2>{props.name}</h2>
            <p>From: R{props.options[0].price}</p>
            <p>{props.options.length} sizes available</p>
            <p>
                Colours:{" "}
                {props.colours.map(
                    (
                        colour: { name: string; value: string },
                        index: number
                    ) => {
                        return (
                            <span
                                key={"colour-" + index}
                                className={`inline-block w-[25px] h-[25px] bg-[${colour.value}] border-[1px] rounded-[50%]`}
                            ></span>
                        );
                    }
                )}
            </p>
        </div>
    );
}

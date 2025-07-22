import { Item } from "@/lib/item";

export default function ItemCard(props: Item) {
    return (
        <div>
            <h2>{props.name}</h2>
            <p>From: R{props.options[0].quality[0].price}</p>
            <p>{props.options.length} sizes available</p>
        </div>
    );
}

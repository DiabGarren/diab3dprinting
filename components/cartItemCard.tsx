import ImageFallback from "./imageFallback";

export default function CartItemCard(props: {
    _id: string;
    itemId: string;
    name: string;
    size: string;
    colour: string;
    price: number;
    qty: number;
}) {
    return (
        <>
            <div className="item-image relative rounded-[5px] border-[2px] border-(--primary-dark) m-[5px_2px]">
                <ImageFallback
                    src={
                        "/items/" + props.itemId + "/" + props.itemId + "0.jpg"
                    }
                    alt={"Thumbnail image for " + props.name}
                    fill
                    className="object-cover rounded-[2px]"
                />
            </div>
            <div className="item-details">
                <div className="item-name">
                    <h2>{props.name}</h2>
                </div>
                <div>
                    <p className="item-size">Size: {props.size}</p>
                    <p className="item-colour">Colour: {props.colour}</p>
                </div>
                <div>
                    <p className="item-price">
                        <span className="text-[18px]">R{props.price}</span>
                    </p>
                    <p className="item-qty">
                        Qty: <span className="text-[18px]">{props.qty}</span>
                    </p>
                </div>
                <div>
                    <p className="item-subtotal">
                        Subtotal:{" "}
                        <span className="text-[18px]">
                            R{props.price * props.qty}
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
}

import { Schema, model, models } from "mongoose";

const itemSchema = new Schema(
    {
        itemId: String,
        name: String,
        colours: [{ name: String, value: String }],
        options: [
            {
                size: String,
                quality: [
                    {
                        type: String,
                        price: Number,
                        printing: {
                            time: { hours: Number, minutes: Number },
                            weight: Number,
                        },
                    },
                ],
            },
        ],
    },
    { collection: "items" }
);

const Item = models.Item || model("Item", itemSchema);
export default Item;

import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
    {
        userId: String,
        name: String,
        phone: String,
        date: String,
        order: [
            {
                name: String,
                size: String,
                colour: String,
                multiColour: Boolean,
                base: String,
                image: String,
                price: Number,
                qty: Number,
            },
        ],
        shipping: String,
        shippingCost: Number,
        address: {
            street: String,
            suburb: String,
            city: String,
            postalCode: String,
        },
        total: Number,
        status: String,
    },
    { collection: "orders" }
);

const Order = models.Order || model("Order", OrderSchema);
export default Order;

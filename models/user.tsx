import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        username: String,
        email: String,
        phone: String,
        prefer: String,
        password: String,
        level: Number,
        cart: [
            {
                _id: String,
                name: String,
                size: String,
                price: Number,
                colour: String,
                multiColour: Boolean,
                base: String,
                image: String,
                qty: Number,
            },
        ],
        address: {
            street: String,
            suburb: String,
            city: String,
            postalCode: String,
        },
    },
    { collection: "users" }
);

const User = models.User || model("User", userSchema);
export default User;

import { Schema, model, models } from "mongoose";

const ColourSchema = new Schema(
    {
        name: String,
        value: String,
    },
    { collection: "colours" }
);

const Colour = models.Colour || model("Colour", ColourSchema);
export default Colour;

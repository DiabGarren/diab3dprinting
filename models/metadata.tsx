import { Schema, model, models } from "mongoose";

const metadataSchema = new Schema(
    {
        filamentCost: Number,
        filamentWeight: Number,
        filamentMarkup: Number,
        printerCost: Number,
        repairCost: Number,
        returnTerm: Number,
        dailyUsage: Number,
        VAT: Number,
        itemCost: String,
        slicerSettings: {
            slicer: String,
            quality: {
                types: [
                    {
                        name: String,
                        layerHeight: Number,
                    },
                ],
                lineWidth: Number,
            },
            walls: {
                wallLineCount: Number,
                wallOrdering: String,
                horizontalExpansion: Number,
                initialHorizontalExpansion: Number,
            },
            topBottom: {
                topLayers: Number,
                bottomLayers: Number,
                pattern: String,
            },
            infill: {
                density: Number,
                pattern: String,
            },
            material: [{ type: String, temp: Number, bed: Number }],
            speed: {
                printSpeed: Number,
                infill: Number,
                innerWall: Number,
                outerWall: Number,
                initialLayer: Number,
                support: Number,
                travel: Number,
                topInner: Number,
                topOuter: Number,
            },
            travel: {
                retractionDistance: Number,
                retractionSpeed: Number,
                zHop: Boolean,
            },
            support: {
                type: String,
                placement: String,
                overhangAngle: Number,
                pattern: String,
                wallLineCount: Number,
                brimWidth: Number,
                topDistance: Number,
                interfaceThickness: Number,
                interfaceDensity: Number,
            },
        },
        printer: String,
        categories: [String]
    },
    { collection: "metadata" }
);

const Metadata = models.Metadata || model("Metadata", metadataSchema);
export default Metadata;

export interface Metadata {
    filamentCost: number;
    filamentWeight: number;
    filamentMarkup: number;
    printerCost: number;
    repairCost: number;
    returnTerm: number;
    dailyUsage: number;
    VAT: number;
    itemCost: string;
    slicerSettings: {
        slicer: string;
        quality: {
            types: [
                {
                    name: string;
                    layerHeight: number;
                }
            ];
            lineWidth: number;
        };
        walls: {
            wallLineCount: number;
            wallOrdering: string;
            horizontalExpansion: number;
            initialHorizontalExpansion: number;
        };
        topBottom: {
            topLayers: number;
            bottomLayers: number;
            pattern: string;
        };
        infill: {
            density: number;
            pattern: string;
        };
        material: [{ type: string; temp: number; bed: number }];
        speed: {
            printSpeed: number;
            infill: number;
            innerWall: number;
            outerWall: number;
            initialLayer: number;
            support: number;
            travel: number;
            topInner: number;
            topOuter: number;
        };
        travel: {
            retractionDistance: number;
            retractionSpeed: number;
            zHop: boolean;
        };
        support: {
            type: string;
            placement: string;
            overhangAngle: number;
            pattern: string;
            wallLineCount: number;
            brimWidth: number;
            topDistance: number;
            interfaceThickness: number;
            interfaceDensity: number;
        };
    };
    printer: string;
}

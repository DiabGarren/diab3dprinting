export interface Item {
    _id: string;
    itemId: string;
    name: string;
    colours:
        | [{ name: string; value: string }]
        | { name: string; value: string }[]
        | [];
    options: [
        {
            size: string;
            price: number;
            printing: {
                time: { hours: number; minutes: number };
                weight: number;
            };
        }
    ];
    images: number;
}

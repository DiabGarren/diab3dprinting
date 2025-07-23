export interface Item {
    _id: { $oid: string };
    itemId: string;
    name: string;
    colours: [{ name: string; value: string }];
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
}

export interface Order {
    _id: string;
    userId: string;
    name: string;
    phone: string;
    date: string;
    order: [
        {
            _id: string;
            itemId: string;
            name: string;
            size: string;
            colour: string;
            price: number;
            qty: number;
        }
    ];
    shipping: string;
    shippingCost: number;
    address: {
        street: string;
        suburb: string;
        city: string;
        postalCode: string;
    };
    total: number;
    status: string;
}

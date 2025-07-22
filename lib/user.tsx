export interface User {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    prefer: string;
    password: string;
    level: number;
    cart: [
        {
            _id: string;
            name: string;
            size: string;
            price: number;
            colour: string;
            multiColour: boolean;
            image: string;
            qty: number;
        }
    ];
    address: {
        street: string;
        suburb: string;
        city: string;
        postalCode: string;
    };
}

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    prefer: string;
    password: string;
    level: number;
    cart:
        | [
              {
                  _id: string;
                  itemId: string;
                  name: string;
                  size: string;
                  price: number;
                  colour: string;
                  qty: number;
              }
          ]
        | {
              _id: string;
              itemId: string;
              name: string;
              size: string;
              price: number;
              colour: string;
              qty: number;
          }[]
        | [];
    address: {
        street: string;
        suburb: string;
        city: string;
        postalCode: string;
    };
}

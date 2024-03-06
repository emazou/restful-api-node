export interface IProduct {
    _id: string;
    name: string;
    price: number;
    productImage: string;
    __v: number;
};

export interface IOrder {
    _id: string;
    quantity: number;
    product: string;
    __v: number;
};

export interface IUser {
    _id: string;
    username: string;
    password: string;
    __v: number;
};

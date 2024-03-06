export type ProductType = {
    _id: string;
    name: string;
    price: number;
    productImage: string;
};

export type OrderType = {
    _id: string;
    quantity: number;
    product: string;
};
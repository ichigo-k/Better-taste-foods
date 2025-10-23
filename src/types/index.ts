export type ProductType = {
    id: number;
    name: string;
    price: number;
    discount: number;
    outOfStock: boolean;
    image: string;
};

export type ProductsDisplayProps = {
    products: ProductType[];
};
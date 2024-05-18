import { Static, Type } from "@sinclair/typebox";

export const User = Type.Object({
    id: Type.Integer(),
    user: Type.String(),
    password: Type.String(),
});

export const Product = Type.Object({
    sku: Type.BigInt(),
    handle: Type.String(),
    title: Type.String(),
    description: Type.String(),
    grams: Type.Number(),
    stock: Type.Integer(),
    price: Type.Integer(),
    compare_price: Type.Integer(),
    barcode: Type.Number(),
});

export type UserType = Static<typeof User>;
export type ProductType = Static<typeof Product>;

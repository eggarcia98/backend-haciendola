import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
interface Product {
    sku: number;
    handle: string;
    title: string;
    description: string;
    grams: number;
    stock: number;
    price: number;
    compare_price: number;
    barcode?: number;
}

interface MySqlFastifyInstance extends FastifyInstance {
    mysql: any;
}

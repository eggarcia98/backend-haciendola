import { FastifyInstance } from "fastify";
import productsController from "./controller/productsController";
import productController from "./controller/productController";

export default async function router(fastify: FastifyInstance) {
    fastify.register(productsController, { prefix: "/api/products" });
    fastify.register(productController, { prefix: "/api/product" });
}

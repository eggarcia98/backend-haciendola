import { FastifyInstance } from "fastify";
import {allProductsController, productController} from "./controller/productsController";
// import productController from "./controller/productController";

export default async function router(fastify: FastifyInstance) {
    fastify.register(allProductsController, { prefix: "/api/products" });
    fastify.register(productController, { prefix: "/api/products" });
}

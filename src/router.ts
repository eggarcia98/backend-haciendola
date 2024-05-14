import { FastifyInstance } from "fastify";
import {
    allProductsController,
    productController,
} from "./controller/productsController";
import { loginUserController } from "./controller/userController";

export default async function router(fastify: FastifyInstance) {
    fastify.register(allProductsController, { prefix: "/api/products" });
    fastify.register(productController, { prefix: "/api/products" });
    fastify.register(loginUserController, { prefix: "/api/user" });
}

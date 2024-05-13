import { FastifyInstance } from "fastify";
import userController from "./controller/productsController";

export default async function router(fastify: FastifyInstance) {
    fastify.register(userController, { prefix: "/api/v1/user" });
}

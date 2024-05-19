import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { MySqlFastifyInstance } from "../types";
import { Products } from "../database/entity/product.entity";

interface FastifyParams {
    sku: string;
    ["any"]: any;
}

const paramsHasId = (obj: unknown): obj is FastifyParams => {
    return (
        (obj as FastifyParams)?.sku !== undefined &&
        typeof (obj as FastifyParams).sku === "string"
    );
};

const hasMysqlObject = (obj: unknown): obj is MySqlFastifyInstance => {
    return (obj as MySqlFastifyInstance)?.mysql !== undefined;
};

export async function allProductsController(fastify: FastifyInstance) {
    fastify.get(
        "/",
        async function (Request: FastifyRequest, Reply: FastifyReply) {
            const productRepository =
                fastify.orm["typeorm"].getRepository(Products);
            const products = await productRepository.find();

            Reply.send(products);
        }
    );
}

export async function productController(fastify: FastifyInstance) {
    fastify.get(
        "/:sku",
        async function (Request: FastifyRequest, Reply: FastifyReply) {
            if (paramsHasId(Request.params)) {
                if (!hasMysqlObject(fastify)) Reply.send({ error: "Error" });

                const productRepository =
                    fastify.orm["typeorm"].getRepository(Products);
                const products = await productRepository.findOneBy({
                    sku: Number(Request.params.sku),
                });

                Reply.send(products);
            }
        }
    );
}

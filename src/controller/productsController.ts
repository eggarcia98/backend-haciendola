import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { MySqlFastifyInstance, Product } from "../types";

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
    fastify.get("/", function (Request: FastifyRequest, Reply: FastifyReply) {
        (fastify as MySqlFastifyInstance).mysql.query(
            "SELECT * FROM products",
            "",
            function onResult(err: unknown, result: unknown) {
                Reply.send(err || result);
            }
        );
    });
}

export async function productController(fastify: FastifyInstance) {
    // GET /api/v1/user

    fastify.get(
        "/:sku",
        function (Request: FastifyRequest, Reply: FastifyReply) {
            if (paramsHasId(Request.params)) {
                if (!hasMysqlObject(fastify)) Reply.send({ error: "Error" });

                (fastify as MySqlFastifyInstance).mysql.query(
                    "SELECT * FROM products WHERE sku=?",
                    [Request.params.sku],
                    function onResult(err: unknown, result: Product[]) {
                        Reply.send(err || result);
                    }
                );
            }
        }
    );
}

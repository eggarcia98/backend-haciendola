import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { MySqlFastifyInstance } from "../types";

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

export default async function userController(fastify: MySqlFastifyInstance) {
    // GET /api/v1/user

    fastify.get(
        "/product/:sku",
        function (Request: FastifyRequest, Reply: FastifyReply) {
            if (paramsHasId(Request.params)) {
                fastify.mysql.query(
                    "SELECT id, username, hash, salt FROM users WHERE id=?",
                    [Request.params.sku],
                    function onResult(err: unknown, result: unknown) {
                        Reply.send(err || result);
                    }
                );
            }
        }
    );
}

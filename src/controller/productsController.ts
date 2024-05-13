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

const hasMysqlObject = (obj: unknown): obj is MySqlFastifyInstance => {
    return (obj as MySqlFastifyInstance)?.mysql !== undefined;
};

export default async function userController(fastify: FastifyInstance) {
    // GET /api/v1/user

    fastify.get(
        "/",
        function (Request: FastifyRequest, Reply: FastifyReply) {
            (fastify as MySqlFastifyInstance).mysql.query(
                "SELECT * FROM products",
                "",
                function onResult(err: unknown, result: unknown) {
                    Reply.send(err || result);
                }
            );
        }
    );
}

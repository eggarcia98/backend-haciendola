import fastify from "fastify";

import mysqlPlugin from "@fastify/mysql";
import fastifyEnv from "@fastify/env";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";

import options from "./config";
import router from "./router";
import cors from "@fastify/cors";

declare module "fastify" {
    interface FastifyInstance {
        config: {
            [s: string]: "string";
        };
    }
}

const server = fastify({
    logger: !!(process.env.NODE_ENV !== "development"),
});

server.register(fastifyEnv, options).then(async (err: any) => {
    server.register(mysqlPlugin, {
        connectionString: `mysql://${server.config.DB_USERNAME}:${server.config.DB_PASSWORD}@${server.config.DB_HOST}:${server.config.DB_PORT}/haciendola_db`,
    });

    server.register(router);
    const FASTIFY_PORT = Number(server.config.FASTIFY_PORT) || 3006;

    server.register(require("fastify-bcrypt"), {
        saltWorkFactor: 12,
    });

    server.register(fastifyJwt, {
        secret: "supersecret",
        sign: {
            expiresIn: "5m",
        },
    });

    server.register(fastifyCookie, {
        hook: "onRequest",
    });

    await server.register(cors, {
        origin: "*",
        credentials: true,
    });

    server.listen({ port: FASTIFY_PORT });

    console.log(
        `🚀  Fastify server running on port http://localhost:${FASTIFY_PORT}`
    );
});

import fastify from "fastify";
import "reflect-metadata";

import mysqlPlugin from "@fastify/mysql";
import fastifyEnv from "@fastify/env";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import fastifyTypeOrm from "typeorm-fastify-plugin";
import { Users } from "./database/entity/user.entity";

import options from "./config";
import router from "./router";
import cors from "@fastify/cors";

import { IQuerystring, IReply, IdeleteReply } from "./lib/interfaces";
import { Products } from "./database/entity/product.entity";

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

    server.register(fastifyTypeOrm, {
        namespace: "typeorm",
        type: "mysql",
        host: server.config.DB_HOST,
        port: parseInt(server.config.DB_PORT || "3306"),
        username: server.config.DB_USERNAME,
        password: server.config.DB_PASSWORD,
        database: "haciendola_db",
        migrations: [__dirname + "/migration/*.ts"],
        subscribers: [],
        entities: [Users, Products],
    });

    server.register(router);
    const FASTIFY_PORT = Number(server.config.FASTIFY_PORT) || 3006;

    server.register(require("fastify-bcrypt"), {
        saltWorkFactor: 12,
    });

    server.register(fastifyJwt, {
        secret: "supersecret",
        sign: {
            expiresIn: "1m",
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

import fastify from "fastify";
import mysqlPlugin from "@fastify/mysql";
import options from "./config";
import fastifyEnv from "@fastify/env";

import router from "./router";

declare module "fastify" {
    interface FastifyInstance {
        config: {
            [s: string]: "string";
        };
    }
}

const server = fastify({
    // Logger only for production
    logger: !!(process.env.NODE_ENV !== "development"),
});

server.register(fastifyEnv, options).then((err: any) => {
    console.log(
        `mysql://${server.config.DB_USERNAME}:${server.config.DB_PASSWORD}@${server.config.DB_HOST}:${server.config.DB_PORT}/haciendola_db`
    );
    server.register(mysqlPlugin, {
        connectionString: `mysql://${server.config.DB_USERNAME}:${server.config.DB_PASSWORD}@${server.config.DB_HOST}:${server.config.DB_PORT}/haciendola_db`,
    });

    // Middleware: Router
    server.register(router);

    const FASTIFY_PORT = Number(process.env.FASTIFY_PORT) || 3006;

    server.listen({ port: FASTIFY_PORT });

    console.log(
        `🚀  Fastify server running on port http://localhost:${FASTIFY_PORT}`
    );
    console.log(`Route indeddx: /`);
    console.log(`Route user: /api/v1/user`);
});

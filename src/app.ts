import fastify from "fastify";
import mysqlPlugin from "@fastify/mysql";

import router from "./router";

const server = fastify({
    // Logger only for production
    logger: !!(process.env.NODE_ENV !== "development"),
});

server.register(mysqlPlugin, {
    connectionString: "mysql://root@localhost/mysql",
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

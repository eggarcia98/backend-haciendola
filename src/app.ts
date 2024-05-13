import fastify from "fastify";
import router from "./router";

const server = fastify({
    // Logger only for production
    logger: !!(process.env.NODE_ENV !== "development"),
});

// Middleware: Router
server.register(router);

const FASTIFY_PORT = Number(process.env.FASTIFY_PORT) || 3006;

server.listen({ port: FASTIFY_PORT });

console.log(
    `🚀  Fastify server running on port http://localhost:${FASTIFY_PORT}`
);
console.log(`Route index: /`);
console.log(`Route user: /api/v1/user`);

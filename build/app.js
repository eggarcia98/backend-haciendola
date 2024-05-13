"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fastify_1 = __importDefault(require("fastify"));
var router_1 = __importDefault(require("./router"));
var server = (0, fastify_1.default)({
    // Logger only for production
    logger: !!(process.env.NODE_ENV !== "development"),
});
// Middleware: Router
server.register(router_1.default);
var FASTIFY_PORT = Number(process.env.FASTIFY_PORT) || 3006;
server.listen({ port: FASTIFY_PORT });
console.log("\uD83D\uDE80  Fastify server running on port http://localhost:".concat(FASTIFY_PORT));
console.log("Route index: /");
console.log("Route user: /api/v1/user");

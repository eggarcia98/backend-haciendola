import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import fastify from "fastify";

export default async function userController(fastify: FastifyInstance) {
    // GET /api/v1/user
    
    fastify.get("/user/:id", function (req, reply) {
        fastify.mysql.query(
            "SELECT id, username, hash, salt FROM users WHERE id=?",
            [req.params.id],
            function onResult(err, result) {
                reply.send(err || result);
            }
        );
    });


}

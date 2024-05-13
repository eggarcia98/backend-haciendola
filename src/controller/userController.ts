import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { BcryptFastifyInstance, MySqlFastifyInstance } from "../types";

interface UserBodyRequest {
    user: string;
    password: string;
}

const hasBcryptObject = (obj: unknown): obj is BcryptFastifyInstance => {
    return (obj as BcryptFastifyInstance)?.bcrypt !== undefined;
};

export async function authUserController(fastify: FastifyInstance) {
    fastify.post(
        "/auth",
        function (Request: FastifyRequest, Reply: FastifyReply) {
            const { user, password } = Request.body as UserBodyRequest;
            const { bcrypt } = fastify as BcryptFastifyInstance;
            const { mysql } = fastify as MySqlFastifyInstance;
            mysql.query(
                "SELECT * FROM users WHERE user=?",
                [user],
                async function onResult(err: unknown, result: any) {
                    const userData = result[0];

                    const response = {
                        auth: false,
                        message: `${user} is not registered`,
                    };

                    if (err) Reply.send(err);
                    else if (!userData) Reply.send(response);
                    else {
                        const hash = result?.[0]?.password ?? "";
                        const matched = await bcrypt.compare(password, hash);

                        response.auth = matched;
                        response.message = matched
                            ? "Authenticade"
                            : "No Authenticated";

                        Reply.send(response);
                    }
                }
            );
        }
    );
}

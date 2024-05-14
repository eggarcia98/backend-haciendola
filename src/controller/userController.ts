import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { BcryptFastifyInstance, MySqlFastifyInstance } from "../types";
import {
    areValidUserCredential,
    isAuthorized,
} from "../utils/jwtAuthorization";

interface UserBodyRequest {
    user: string;
    password: string;
}

const hasBcryptObject = (obj: unknown): obj is BcryptFastifyInstance => {
    return (obj as BcryptFastifyInstance)?.bcrypt !== undefined;
};

export async function loginUserController(fastify: FastifyInstance) {
    fastify.post(
        "/login",
        function (Request: FastifyRequest, Reply: FastifyReply) {
            const userInput = Request.body as UserBodyRequest;
            const { bcrypt } = fastify as BcryptFastifyInstance;
            const { mysql } = fastify as MySqlFastifyInstance;

            if (!areValidUserCredential(userInput))
                Reply.status(300).send({
                    authorized: false,
                    message: "user credentials incomplete",
                });
            else {
                mysql.query(
                    "SELECT * FROM users WHERE user=?",
                    [userInput.user],
                    async function onResult(err: unknown, result: any) {
                        const userRegistered = result[0];

                        if (err) Reply.send(err);
                        else {
                            const authorized = await isAuthorized(
                                userRegistered,
                                userInput,
                                bcrypt
                            );

                            const payload = {
                                user: userInput.user,
                                password: userInput.password,
                            };

                            const status = authorized ? 200 : 300;
                            const message = authorized
                                ? "Authorized"
                                : "No Authorized";
                            const token = authorized
                                ? fastify.jwt.sign(payload)
                                : undefined;

                            Reply.status(status).send({
                                message,
                                token,
                                authorized,
                            });
                        }
                    }
                );
            }
        }
    );
}

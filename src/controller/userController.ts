import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { BcryptFastifyInstance, MySqlFastifyInstance } from "../types";
import {
    areValidUserCredential,
    isAuthorized,
} from "../utils/jwtAuthorization";
import { Users } from "../database/entity/user.entity";

interface UserBodyRequest {
    user: string;
    password: string;
    token?: string;
}

const hasBcryptObject = (obj: unknown): obj is BcryptFastifyInstance => {
    return (obj as BcryptFastifyInstance)?.bcrypt !== undefined;
};

export async function loginUserController(fastify: FastifyInstance) {
    fastify.post(
        "/login",
        async function (Request: FastifyRequest, Reply: FastifyReply) {
            const userInput = Request.body as UserBodyRequest;
            const { bcrypt } = fastify as BcryptFastifyInstance;
            const { mysql } = fastify as MySqlFastifyInstance;

            if (!areValidUserCredential(userInput))
                Reply.status(300).send({
                    authorized: false,
                    message: "user credentials incomplete",
                });
            else {
                const userRepository =
                    fastify.orm["typeorm"].getRepository(Users);
                const userRegistered = await userRepository.findOneBy({
                    user: userInput.user,
                });

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
                const message = authorized ? "Authorized" : "No Authorized";
                const token = authorized ? fastify.jwt.sign(payload) : "";

                Reply.setCookie("AuthorizationToken", token, {
                    httpOnly: true, // Highly recommended for security
                    secure: true,
                    expires: new Date(new Date().getTime() + 60000),
                })
                    .status(status)
                    .send({
                        message,
                        authorized,
                        token,
                    });
            }
        }
    );

    fastify.post(
        "/authorizate",
        async function (Request: FastifyRequest, Reply: FastifyReply) {
            const { bcrypt } = fastify as BcryptFastifyInstance;
            const { mysql } = fastify as MySqlFastifyInstance;
            const body: any = Request.body;

            const AuthorizationToken =
                Request.cookies?.AuthorizationToken ?? body.AuthorizationToken;

            if (!AuthorizationToken)
                Reply.status(300).send({
                    authorized: false,
                    message: "No Authorized",
                });
            else {
                const userLogged = fastify.jwt.verify(
                    AuthorizationToken.split(" ")[1]
                ) as any;

                const userRepository =
                    fastify.orm["typeorm"].getRepository(Users);
                const userRegistered = await userRepository.findOneBy({
                    user: userLogged?.user,
                });

                const authorized = await isAuthorized(
                    userRegistered,
                    userLogged,
                    bcrypt
                );

                const response = {
                    authorized: authorized,
                    message: "User authorized",
                };

                if (!authorized) response.message = "Not valid user";

                Reply.send(response);
            }
        }
    );
}

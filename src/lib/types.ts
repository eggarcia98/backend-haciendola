import { Static, Type } from "@sinclair/typebox";

export const User = Type.Object({
    id: Type.Integer(),
    user: Type.String(),
    password: Type.String(),
});

export type UserType = Static<typeof User>;

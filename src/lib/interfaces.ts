import { UserType } from "./types";

interface IReply {
    201: {
        success: boolean;
        data: {
            users: UserType[];
        };
    };
    302: { url: string };
    "4xx": { error: string };
    "5xx": { error: string };
    200: {
        success: boolean;
        data: {
            users: UserType[];
        };
    };
}
interface IQuerystring {
    id: number;
}
interface IdeleteReply {
    200: {
        success: boolean;
    };
    404: {
        error: string;
    };
}
export { IReply, IQuerystring, IdeleteReply };

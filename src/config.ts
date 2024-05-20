const schema = {
    type: "object",
    required: ["DB_PASSWORD", "DB_USERNAME", "DB_HOST"],
    properties: {
        DB_PASSWORD: {
            type: "string",
        },
        DB_USERNAME: {
            type: "string",
        },
        DB_HOST: {
            type: "string",
        },
        DB_PORT: {
            type: "string",
            default: "3306",
        },
        API_PORT: {
            type: "number",
            default: 3006,
        },
        JWT_SECRET: {
            type: "string",
        },
    },
};

const options = {
    confKey: "config",
    schema,
    dotenv: true,
    data: process.env,
};

export default options;

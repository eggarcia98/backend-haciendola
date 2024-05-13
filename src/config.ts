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
            default: "3306"
        }
    },
};

const options = {
    confKey: "config",
    schema,
    dotenv: true,
    data: process.env
};

export default options
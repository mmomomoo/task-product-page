import "dotenv/config"; //이렇게 구현하면 import 횟수를 줄일 수 있다

export const SERVER_PORT = process.env.SERVER_PORT;
export const MONGODB_URL = process.env.MONGODB_URL;
export const MONGODB_NAME = process.env.MONGODB_NAME;

// Imports
import chalk from "chalk";
import { Elysia } from "elysia";
import { api } from "./api";
import { web } from "./web";

// Creates app
const port = Number(process.env.PORT);
const app = new Elysia()
    .use(api)
    .use(web)
    .onError(() => Bun.file("../client/dist/index.html"))
    .listen(port);
console.log(chalk.cyan(`Server is now listening on ${app.server?.url}.`));

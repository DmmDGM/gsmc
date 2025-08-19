// Imports
import staticPlugin from "@elysiajs/static";
import chalk from "chalk";
import { Elysia } from "elysia";

// Creates app
const port = Number(process.env.PORT);
const app = new Elysia()
    .use(staticPlugin({
        assets: "../client/dist/",
        prefix: "/"
    }))
    .listen(port);
console.log(chalk.cyan(`Server is now listening on ${app.server?.url}.`));

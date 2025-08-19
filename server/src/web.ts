// Imports
import staticPlugin from "@elysiajs/static";

// Defines web
export const web = staticPlugin({
    assets: "../client/dist/",
    prefix: "/"
});

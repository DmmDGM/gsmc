// Imports
import Elysia, { t } from "elysia";
import { loadArchive } from "../tools/archive";
import { loadImage } from "../tools/gallery";

// Defines api
export const api = new Elysia({ prefix: "/api" })
    .get("/:season/archive", async ({ params: { season }, status }) => {
        // Loads season archive
        const archive = loadArchive(season);
        return archive;
    })
    .get("/:season/gallery/:image", async ({ params: { image, season }, query: { quality, scale }, set, status }) => {
        // Loads gallery image
        const archive = loadArchive(season);
        const result = await loadImage(archive, image, quality, scale);
        set.headers["cache-control"] = "max-age=86400";
        set.headers["content-type"] = result.type;
        return result.buffer;
    }, {
        query: t.Object({
            quality: t.Optional(t.Number()),
            scale: t.Optional(t.Number())
        })
    });

// Defines api type
export type API = typeof api;

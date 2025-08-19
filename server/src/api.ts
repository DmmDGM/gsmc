// Imports
import Elysia, { t } from "elysia";
import sharp from "sharp";

// Defines archives
const archives = {
    "s1": await import("../archives/s1/archive.json"),
    "s2": await import("../archives/s2/archive.json"),
    "s3": await import("../archives/s3/archive.json"),
    "s4": await import("../archives/s4/archive.json"),
    "s5": await import("../archives/s5/archive.json"),
    "cwil": await import("../archives/cwil/archive.json")
} as Record<string, Archive>;

// Defines api
export const api = new Elysia({ prefix: "/api" })
    .get("/:season/archive", async ({ params: { season }, status }) => {
        // Returns season archive
        if(!(season in archives)) return status(404, "Season does not exist.");
        const archive = archives[season];
        return archive;
    })
    .get("/:season/gallery/:image", async ({ params: { image, season }, query, set, status }) => {
        // Returns gallery image
        if(!(season in archives)) return status(404, "Season does not exist.");
        const archive = archives[season];
        switch(archive.schema) {
            case 1: {
                try {
                    const path = `./archives/${season}/gallery/${image}`;
                    const file = sharp(path);
                    const { format, width } = await file.metadata();
                    const size = Math.round(width * (query.scale ?? 100) / 100);
                    set.headers["cache-control"] = "max-age=86400";
                    switch(format) {
                        case "avif": {
                            const level = Math.floor(Math.min(Math.max(query.quality ?? 50, 0), 100));
                            const buffer = await file
                                .resize({
                                    kernel: "nearest",
                                    width: size
                                })
                                .avif({ quality: level })
                                .toBuffer();
                            set.headers["content-type"] = "image/avif";
                            return buffer;
                        }
                        case "jpg":
                        case "jpeg": {
                            const level = Math.floor(Math.min(Math.max(query.quality ?? 80, 0), 100));
                            const buffer = await file
                                .resize({
                                    kernel: "nearest",
                                    width: size
                                })
                                .jpeg({ quality: level })
                                .toBuffer();
                            set.headers["content-type"] = "image/jpeg";
                            return buffer;
                        }
                        case "png": {
                            const level = 9 - Math.floor(Math.min(Math.max(query.quality ?? 30, 0), 99) / 10);
                            const buffer = await file
                                .resize({
                                    kernel: "nearest",
                                    width: size
                                })
                                .png({ compressionLevel: level })
                                .toBuffer();
                            set.headers["content-type"] = "image/png";
                            return buffer;
                        }
                        default: {
                            return status(400, "Image format not supported.");
                        }
                    }
                }
                catch(error) {
                    return status(404, "Image does not exist.");
                }
            }
            default: {
                return status(400, "Gallery not supported.");
            }
        }
    }, {
        query: t.Object({
            quality: t.Optional(t.Number()),
            scale: t.Optional(t.Number())
        })
    });

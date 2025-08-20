// Imports
import sharp from "sharp";

// Defines image morphers
export async function morphAvif(
    file: sharp.Sharp,
    level: number,
    size: number
): Promise<Buffer> {
    // Creates avif buffer
    const buffer = await file
        .resize({
            kernel: "nearest",
            width: size
        })
        .avif({ quality: level })
        .toBuffer();
    return buffer;
}
export async function morphJpeg(
    file: sharp.Sharp,
    level: number,
    size: number
): Promise<Buffer> {
    // Creates avif buffer
    const buffer = await file
        .resize({
            kernel: "nearest",
            width: size
        })
        .jpeg({ quality: level })
        .toBuffer();
    return buffer;
}
export async function morphPng (
    file: sharp.Sharp,
    level: number,
    size: number
): Promise<Buffer> {
    // Creates jpeg buffer
    const buffer = await file
        .resize({
            kernel: "nearest",
            width: size
        })
        .png({ compressionLevel: level })
        .toBuffer();
    return buffer;
}

// Defines image renderer
export async function renderImage(
    path: string,
    quality: number | undefined,
    scale: number | undefined
): Promise<{
    buffer: Buffer;
    type: string;
}> {
    // Renders image
    const file = sharp(path);
    const { format, width } = await file.metadata();
    switch(format) {
        case "avif": {
            // Renders avif
            const level = Math.floor(Math.min(Math.max(quality ?? 50, 0), 100));
            const size = Math.round(width * (scale ?? 100) / 100);
            const buffer = await morphAvif(file, level, size);
            const type = "image/avif";
            return { buffer, type };
        }
        case "jpeg": {
            // Renders jpeg
            const level = Math.floor(Math.min(Math.max(quality ?? 80, 0), 100));
            const size = Math.round(width * (scale ?? 100) / 100);
            const buffer = await morphJpeg(file, level, size);
            const type = "image/jpeg";
            return { buffer, type };
        }
        case "png": {
            // Renders png
            const level = 9 - Math.floor(Math.min(Math.max(quality ?? 30, 0), 99) / 10);
            const size = Math.round(width * (scale ?? 100) / 100);
            const buffer = await morphPng(file, level, size);
            const type = "image/png";
            return { buffer, type };
        }
        default: {
            // Throws error
            throw new Error("Format not supported.");
        }
    }
}

// Defines image loader
export async function loadImage(
    archive: Archive,
    image: string,
    quality: number | undefined,
    scale: number | undefined
): Promise<{
    buffer: Buffer,
    type: string
}> {
    // Pulls image
    switch(archive.schema) {
        case 1:
        case 2: {
            try {
                const path = `./archives/${archive.season}/gallery/${image}`;
                const render = await renderImage(path, quality, scale);
                return render;
            }
            catch(error) {
                throw new Error("Image does not exist or not supported.");
            }
        }
        default: {
            throw new Error("Gallery not supported.");
        }
    }
}

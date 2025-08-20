// Defines loader
export function loadImage(
    season: string,
    image: string,
    quality: number,
    scale: number
): string {
    // Loads archive
    const server = import.meta.env.VITE_SERVER ?? "";
    return `${server}/api/${season}/gallery/${image}?quality=${quality}&scale=${scale}`;
}

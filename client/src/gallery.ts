// Defines loader
export function loadImage(season: string, image: string): string {
    // Loads archive
    const server = import.meta.env.VITE_SERVER ?? "";
    return `${server}/api/${season}/gallery/${image}`;
}

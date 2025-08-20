

// Defines loader
export async function loadArchive(season: string): Promise<Archive> {
    // Loads archive
    const server = import.meta.env.VITE_SERVER ?? "";
    const response = await fetch(`${server}/api/${season}/archive`);
    const archive = await response.json();
    return archive;
}

// Defines parser
export function parseArchive(archive: Archive): {
    description: string;
    name: string;
    status: string;
} {
    // Parses archive
    switch(archive.schema) {
        case 1: {
            return {
                description: archive.description,
                name: archive.name,
                status: `${archive.time} (${archive.active ? "Active" : "Inactive"})`
            };
        }
        case 2: {
            const { begin, end } = archive.length;
            const activity = begin === null ? "Coming Soon" : end === null ? "Active" : "Inactive";
            return {
                description: archive.description,
                name: archive.name,
                status: `${begin ?? "N/A"} - ${end ?? "N/A"} (${activity})`
            };
        }
    }
}

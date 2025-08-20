// Defines loader
export async function loadArchive(season: string): Promise<Archive> {
    // Loads archive
    const server = import.meta.env.VITE_SERVER ?? "";
    const response = await fetch(`${server}/api/${season}/archive`);
    const archive = await response.json();
    return archive;
}

// Defines parser
export function parseArchive(archive: Archive): Catalog {
    // Parses archive
    switch(archive.schema) {
        case 1: {
            return {
                activity: archive.active ? "Active" : "Inactive",
                description: archive.description,
                gallery: archive.gallery.map((image) => {
                    return {
                        description: image.description,
                        file: image.file,
                        name: image.name,
                        time: "N/A"
                    };
                }),
                length: archive.time,
                members: archive.members,
                mods: archive.mods,
                name: archive.name,
                plugins: archive.plugins,
                version: archive.version,
                world: archive.world
            };
        }
        case 2: {
            const { begin, end } = archive.length;
            const activity = begin === null ? "Coming Soon" :
                end === null ? "Active" : "Inactive";
            return {
                activity: activity,
                description: archive.description,
                gallery: archive.gallery,
                length: `${begin ?? "N/A"} - ${end ?? "N/A"}`,
                members: archive.members,
                mods: archive.mods,
                name: archive.name,
                plugins: archive.plugins,
                version: archive.version,
                world: archive.world
            };
        }
    }
}

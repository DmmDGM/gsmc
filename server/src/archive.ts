// Defines archives
export const archives = {
    "s1": (await import("../archives/s1/archive.json")).default,
    "s2": (await import("../archives/s2/archive.json")).default,
    "s3": (await import("../archives/s3/archive.json")).default,
    "s4": (await import("../archives/s4/archive.json")).default,
    "s5": (await import("../archives/s5/archive.json")).default,
    "cwil": (await import("../archives/cwil/archive.json")).default
} as Record<string, Archive>;

// Defines archive loader
export function loadArchive(season: string): Archive {
    // Loads archive
    if(!(season in archives)) throw new Error("Archive does not exist.");
    return archives[season];
}

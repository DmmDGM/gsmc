// Defines contexts
export const contexts = {
    "s1": {
        banner: {
            alt: "Season 1 Banner",
            src: "/park-at-night.avif"
        },
        content: (await import("./pages/seasons/s1")).S1
    },
    "s2": {
        banner: {
            alt: "Season 2 Banner",
            src: "/water-fountain.png"
        },
        content: (await import("./pages/seasons/s2")).S2
    },
    "s3": {
        banner: {
            alt: "Season 3 Banner",
            src: "/iipython-selfie.png"
        },
        content: (await import("./pages/seasons/s3")).S3
    },
    "s4": {
        banner: {
            alt: "Season 4 Banner",
            src: "/goose-rockets.png"
        },
        content: (await import("./pages/seasons/s4")).S4
    },
    "s5": {
        banner: {
            alt: "Season 5 Banner",
            src: "/main-basement.png"
        },
        content: (await import("./pages/seasons/s5")).S5
    },
    "cwil": {
        banner: {
            alt: "CWIL Banner",
            src: "/bread.avif"
        },
        content: (await import("./pages/seasons/cwil")).CWIL
    }
};

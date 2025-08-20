// Defines contexts
export const contexts = {
    "s1": {
        Content: (await import("../pages/seasons/s1")).S1,
        banner: {
            alt: "Season 1 Banner",
            src: "/park-at-night.avif"
        }
    },
    "s2": {
        Content: (await import("../pages/seasons/s2")).S2,
        banner: {
            alt: "Season 2 Banner",
            src: "/water-fountain.png"
        }
    },
    "s3": {
        Content: (await import("../pages/seasons/s3")).S3,
        banner: {
            alt: "Season 3 Banner",
            src: "/iipython-selfie.png"
        }
    },
    "s4": {
        Content: (await import("../pages/seasons/s4")).S4,
        banner: {
            alt: "Season 4 Banner",
            src: "/goose-rockets.png"
        }
    },
    "s5": {
        Content: (await import("../pages/seasons/s5")).S5,
        banner: {
            alt: "Season 5 Banner",
            src: "/main-basement.png"
        }
    },
    "cwil": {
        Content: (await import("../pages/seasons/cwil")).CWIL,
        banner: {
            alt: "CWIL Banner",
            src: "/bread.avif"
        }
    }
} as Record<string, Context>;

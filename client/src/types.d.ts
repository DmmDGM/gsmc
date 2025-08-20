// Refers types
/// <reference path="../../types.d.ts" />

// Defines catalog
type Catalog = {
    activity: string;
    description: string;
    gallery: {
        description: string;
        file: string;
        name: string;
        time: string;
    }[];
    length: string;
    members: {
        name: string;
        uuid: string;
    }[];
    mods: {
        name: string;
        url: string;
    }[];
    name: string;
    plugins: {
        name: string;
        url: string;
    }[];
    version: string;
    world: string | null;
};

// Defines context
type Context = {
    Content: () => JSXInternal.Element;
    banner: {
        alt: string;
        src: string;
    };
};

// Defines archive
type Archive = {
    active: boolean;
    description: string;
    gallery: {
        description: string;
        file: string;
        name: string;
    }[];
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
    schema: 1;
    time: string;
    version: string;
    world: string | null;
} | {
    description: string;
    gallery: {
        description: string;
        file: string;
        name: string;
        time: string;
    }[];
    length: {
        begin: string | null;
        end: string | null;
    };
    members: {
        name: string;
        time: string;
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
    schema: 2;
    version: string;
    world: string | null;
};

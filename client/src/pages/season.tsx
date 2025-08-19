// Imports
import { useRoute } from "preact-iso";
import { useState } from "preact/hooks";
import { Separator } from "../parts/separator";

// Defines contents
const contents = {
    "s1": (await import("./seasons/s1")).S1,
    "s2": (await import("./seasons/s2")).S2,
    "s3": (await import("./seasons/s3")).S3,
    "s4": (await import("./seasons/s4")).S4,
    "s5": (await import("./seasons/s5")).S5,
    "cwil": (await import("./seasons/cwil")).CWIL,
};

// Defines season
export function Season() {
    // Fetches archive
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ status, setStatus ] = useState("");
    const [ content, setContent ] = useState(<></>);
    const { params: { season } } = useRoute();
    const server = import.meta.env.VITE_SERVER ?? "";
    fetch(`${server}/api/${season}/archive`).then(async (response) => {
        const archive: Archive = await response.json();
        switch(archive.schema) {
            case 1: {
                setName(archive.name);
                setDescription(archive.description);
                setStatus(`${archive.time} (${archive.active ? "Active" : "Inactive"})`);
                break;
            }
            case 2: {
                setName(archive.name);
                setDescription(archive.description);
                const { begin, end } = archive.length;
                const activity = begin === null ? "Coming Soon" : end === null ? "Active" : "Inactive";
                setStatus(`${begin ?? "N/A"} - ${end ?? "N/A"} (${activity})`);
                break;
            }
        }
        if(season in contents) setContent(contents[season]);
    });
    
    // Creates season
    return (
        <div id="season">
            <h1>{ name }</h1>
            <h2>{ description }</h2>
            <h2>{ status }</h2>
            <Separator/>
            { content }
            <Separator/>
        </div>
    );
}

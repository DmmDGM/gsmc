// Imports
import { useRoute } from "preact-iso";
import { useState } from "preact/hooks";
import { Separator } from "../parts/separator";
import { loadArchive, parseArchive } from "../archive";

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
    // Creates states
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ status, setStatus ] = useState("");
    const [ content, setContent ] = useState(<></>);

    // Parses archive
    const { params: { season } } = useRoute();
    loadArchive(season)
        .then((archive) => parseArchive(archive))
        .then((catalog) => {
            setName(catalog.name);
            setDescription(catalog.description);
            setStatus(catalog.status);
            setContent(contents[season]({ catalog }));
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

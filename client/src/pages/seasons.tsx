// Imports
import { useState } from "preact/hooks";

// Imports tools
import { loadArchive, parseArchive } from "../tools/archive";
import { contexts } from "../tools/contexts";

// Imports css
import "./seasons.css";

// Defines card
function Card({ alt, season, src }) {
    // Creates states
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    
    // Renders archive
    loadArchive(season)
        .then((archive) => parseArchive(archive))
        .then((catalog) => {
            setName(catalog.name);
            setDescription(catalog.description);
        });

    // Creates card
    return <a href={ `/seasons/${season}` } class="card">
        <img src={ src } alt={ alt }/>
        <div>
            <h3>{ name }</h3>
            <p>{ description }</p>
        </div>
    </a>;
}

// Defines seasons
export function Seasons() {
    // Creates seasons
    const seasons = [ "cwil", "s5", "s4", "s3", "s2", "s1" ];
    const children = seasons.map((season) => {
        const context = contexts[season];
        const { alt, src } = context.banner;
        return (<Card src={ src } alt={ alt } season={ season }></Card>);
    });
    return <div id="seasons">
        <h1>Seasons Archive</h1>
        <div id="list">
            { children }
        </div>
    </div>;
}

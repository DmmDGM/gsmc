// Imports
import { useState } from "preact/hooks";
import "./seasons.css";
import { loadArchive, parseArchive } from "../archive";

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
    return (
        <a href={ `/seasons/${season}` } class="card">
            <img src={ src } alt={ alt }/>
            <div>
                <h3>{ name }</h3>
                <p>{ description }</p>
            </div>
        </a>
    )
}

// Defines seasons
export function Seasons() {
    // Creates seasons
    return (
        <div id="seasons">
            <Card src="/bread.avif" alt="CWIL Banner" season="cwil"/>
            <Card src="/main-basement.png" alt="Season 5 Banner" season="s5"/>
            <Card src="/goose-rockets.png" alt="Season 4 Banner" season="s4"/>
            <Card src="/iipython-selfie.png" alt="Season 3 Banner" season="s3"/>
            <Card src="/water-fountain.png" alt="Season 2 Banner" season="s2"/>
            <Card src="/park-at-night.avif" alt="Season 1 Banner" season="s1"/>
        </div>
    );
}

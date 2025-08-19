// Imports
import { useState } from "preact/hooks";
import "./seasons.css";

// Defines card
function Card({ alt, season, src }) {
    // Fetches archive
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const server = import.meta.env.VITE_SERVER ?? "";
    fetch(`${server}/api/${season}/archive`).then(async (response) => {
        const archive: Archive = await response.json();
        switch(archive.schema) {
            case 1:
            case 2: {
                setName(archive.name);
                setDescription(archive.description);
                break;
            }
        }
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

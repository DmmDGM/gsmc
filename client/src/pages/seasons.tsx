// Imports
import "./seasons.css";

// Defines season
function Season({ alt, season, src }) {
    // Creates season
    return (
        <a href={ `/seasons/${season}` } class="season">
            <img src={ src } alt={ alt }/>
            <div>
                <h3>Title</h3>
                <h3>Description</h3>
            </div>
        </a>
    )
}

// Defines seasons
export function Seasons() {
    // Creates seasons
    return (
        <div id="seasons">
            <Season src="/bread.avif" alt="CWIL Banner" season="cwil"/>
            <Season src="/main-basement.png" alt="Season 5 Banner" season="s5"/>
            <Season src="/goose-rockets.png" alt="Season 4 Banner" season="s4"/>
            <Season src="/iipython-selfie.png" alt="Season 3 Banner" season="s3"/>
            <Season src="/water-fountain.png" alt="Season 2 Banner" season="s2"/>
            <Season src="/park-at-night.avif" alt="Season 1 Banner" season="s1"/>
        </div>
    );
}

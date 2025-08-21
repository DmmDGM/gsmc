// Imports
import { useEffect, useState } from "preact/hooks";

// Imports parts
import { Crumbs, Dots } from "../parts/separator";
import { Shortcut } from "../parts/shortcut";

// Imports css
import "./nest.css";

// Defines clock
function Clock({ target }) {
    // Calculates delta
    const [ source, setSource ] = useState(new Date());
    const calculate = (delta: number) => {
        const days = String(Math.floor(delta / 1000 / 60 / 60 / 24)).padStart(1, "0");
        const hours = String(Math.floor(delta / 1000 / 60 / 60 % 24)).padStart(2, "0");
        const minutes = String(Math.floor(delta / 1000 / 60 % 60)).padStart(2, "0");
        const seconds = String(Math.floor(delta / 1000 % 60)).padStart(2, "0");
        return `${days}:${hours}:${minutes}:${seconds}`; 
    };
    useEffect(() => {
        const tick = setInterval(() => setSource(new Date()), 250);
        return () => clearInterval(tick);
    });

    // Creates clock
    return <span class="clock">{ calculate(+target - +source) }</span>;
}

// Defines milestone
function Milestone({ alt, children, direction, src, title }) {
    // Creates milestone
    if(direction === "left") return <div class="milestone">
        <img src={ src } alt={ alt }/>
        <div>
            <h3>{ title }</h3>
            <p>{ children }</p>
        </div>
    </div>;
    else if(direction === "right") return <div class="milestone">
        <div>
            <h3>{ title }</h3>
            <p>{ children }</p>
        </div>
        <img src={ src } alt={ alt }/>
    </div>;
    else throw new Error("Invalid direction");
}

// Defines nest
export function Nest() {
    // Creates nest
    return <div id="nest">
        <div id="banner">
            <h1>Geesecraft</h1>
            <p class="center">A Minecraft Server with <b><u>Actual</u></b> Freedom and Democracy.</p>
            <div  class="highlights">
                <img src="/dmmd-sunset.avif" alt="DmmD Staring at the Sunset"/>
                <img src="/fepis-house.avif" alt="Fepis's House"/>
                <img src="/iipython-sunset.avif" alt="iiPython Staring at the Sunset"/>
            </div>
            <p class="center">"For the Geese, by the Geese, of the Geese!"</p>
        </div>
        <Crumbs/>
        <div id="timer">
            <h3>Time Until Season Starts</h3>
            <Clock target={ new Date("2025-09-01T00:00:00Z") }/>
            <p class="center">September 1st, 2025 - June 1st, 2029</p>
        </div>
        <Dots/>
        <div id="cwil">
            <h3>Geesecraft: College While It Lasts (CWIL)</h3>
            <p>
                Check out our latest season - this time hosted by DmmD instead of iiPython!
                Unlike all other seasons, this one will remain active for the entirety of our college lives rather than being an annual event.
                We know that college is hard and life can get tough sometimes, that's why we hope this place will forever serve as our little pond that can let us escape from responsibilities briefly and give us some time to relax and chill with friends.
            </p>
            <p>
                This season officially starts on September 1st, 2025 and closes on June 1st, 2029.
                That gives us four entire years to create friendships and memories together on the same world.
            </p>
            <p>
                That's right, the <b><u>same world</u></b>!
                The server will migrate overtime to the newest version as Minecraft updates, and mods will continuously be added to keep the server interesting (suggestions are welcome).
                However, there will be no world resets during its entire four year lifetime.
                Feel free to leave your mark here on our server and watch it become history that will be remembered decades from now on!
            </p>
            <p class="center">
                Learn more about this season <Shortcut href="/seasons/cwil">here</Shortcut>!
            </p>
            <p class="center">
                Or scroll down to learn about how to join!
            </p>
        </div>
        <Crumbs/>
        <div id="legacy">
            <Milestone
                src="/park-at-night.avif" alt="Season 1 Park"
                title="Humble Beginnings" direction="left"
            >
                Geesecraft began simple - a small Minecraft SMP with friends hosted by iiPython during summer-break in May of 2021.
                Initially only intended as casual fun with two active members (DmmD and iiPython), it slowly transformed into an important part of our culture and childhood, and is still running as of August 2025.
            </Milestone>
            <Milestone
                src="/silly-dmmd.avif" alt="DmmD Being DmmD"
                title="Freedom for All" direction="right"
            >
                What are the rules of Geesecraft? Simple, there are none!
                While not a true anarchist server, Geesecraft allows you to be yourself without any fear of moderation (as long as they comply with federal laws, of course).
                Griefing? Trapping? Creating a monopoly? Go for it, although also be prepared for possible revenges!
                Just make sure to ask for permission or know beforehand that your fellow geese won't get offended before doing anything destructive.
            </Milestone>
            <Milestone
                src="/base-of-operation.avif" alt="Base Filled with Technology"
                title = "Automation First" direction="left"
            >
                Be warned, this is an automation-centered server.
                No matter what season you join, you will see automatic farms, game-breaking contraptions, and whatever else you could imagine.
                Since Season 4, we've also incorporated tech mods such as Applied Energistics 2, Tech Reborn, and Ad Astra into the server, giving us even more power over the landscape.
            </Milestone>
        </div>
        <Crumbs/>
        <div id="invite">
            <h3>Consider Joining?</h3>
            <p class="center">
                Join our <Shortcut href="https://discord.gg/HYgcp85g6u">Discord Server</Shortcut> and let us know your username, and we'll add you to our whitelist!
            </p>
            <p class="center">
                Or checkout our <Shortcut href="/seasons">Seasons Archive</Shortcut> to read more about Geesecraft and its past!
            </p>
            <p class="center">Hope to see you soon!</p>
        </div>
        <Crumbs/>
        <div id="motto">
            <h3>For Geese and Glory!</h3>
            <div class="highlights">
                <img src="/main-base-interior.png" alt="Season 5 Base"/>
                <img src="/vibes.png" alt="Pond outside Base"/>
                <img src="/welcome-to-geeseville.png" alt="Season 3 Porch"/>
            </div>
            <p class="center">Honk on, fellow goose! &lt;3</p>
        </div>
    </div>;
}

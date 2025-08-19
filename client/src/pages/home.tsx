// Imports
import { useEffect, useState } from "preact/hooks";
import { Separator } from "../parts/separator";
import { Shortcut } from "../parts/shortcut";
import "./home.css";

// Defines milestone
function Milestone({ alt, children, direction, src, title }) {
    // Creates milestone
    const text = <div class="text">
        <h3 class="title">{ title }</h3>
        <p class="description">
            { children }
        </p>
    </div>
    const image = <img src={ src } alt={ alt }/>;
    switch(direction) {
        case "left": {
            return (
                <div class="milestone">
                    {image}
                    {text}
                </div>
            );
        }
        case "right": {
            return (
                <div class="milestone">
                    {text}
                    {image}
                </div>
            );
        }
        default: {
            throw new Error("Invalid direction");
        }
    }
}

// Defines home
export function Home() {
    // Creates clock
    const targetTime = new Date("2025-09-01T00:00:00Z");
    const [ sourceTime, setSourceTime ] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setSourceTime(new Date());
        }, 250);
        return () => clearInterval(timer);
    });
    const calculateTime = (difference) => {
        const days = Math.floor(difference / 1000 / 60 / 60 / 24);
        const hours = Math.floor(difference / 1000 / 60 / 60 % 24);
        const minutes = Math.floor(difference / 1000 / 60 % 60);
        const seconds = Math.floor(difference / 1000 % 60);
        return `${
            String(days).padStart(1, "0")
        }:${
            String(hours).padStart(2, "0")
        }:${
            String(minutes).padStart(2, "0")
        }:${
            String(seconds).padStart(2, "0")
        }`; 
    }

    // Creates home
    return (
        <div id="home">
            <div class="banner">
                <h1 class="title">Geesecraft</h1>
                <h2 class="subtitle">A Minecraft Server with <b><u>Actual</u></b> Freedom and Democracy.</h2>
                <h2 class="subtitle">"For the Geese, by the Geese, of the Geese!"</h2>
                <div class="featured">
                    <img src="/dmmd-sunset.avif" alt="DmmD Staring at the Sunset"/>
                    <img src="/fepis-house.avif" alt="Fepis's House"/>
                    <img src="/iipython-sunset.avif" alt="iiPython Staring at the Sunset"/>
                </div>
            </div>
            <Separator/>
            <div class="cwil">
                <h3 class="title">Geesecraft: College While It Lasts (CWIL)</h3>
                <p>
                    Checkout our latest season - this time hosted by DmmD instead of iiPython!
                    Unlike all other seasons, this one will remain active for the entirety of our college lives rather than being an annual event. We know that college is hard and life can get tough sometimes, that's why we hope this place will forever serve as our little pond that can let us escape from responsibilities briefly and give us some time to relax and chill with friends.
                </p>
                <p>
                    This season officially starts on September 1st, 2025 and closes on June 1st, 2029.
                    That gives us four entire years to create friendships and memories together on the same world.
                </p>
                <p>
                    That's right, the <b><u>same world</u></b>!
                    The server will migrate overtime to the newest version as Minecraft updates, and
                    mods will continuously be added to keep the server interesting (suggestions are welcome).
                    However, there will be no world resets during its entire four year lifetime.
                    Feel free to leave your mark here on our server and watch it become history
                    that will be remembered decades from now on!
                </p>
                <p>
                    Learn more about this season <Shortcut href="/seasons/cwil">here</Shortcut>!
                </p>
                <p>
                    Or scroll down to learn about how to join!
                </p>
            </div>
            <Separator/>
            <div class="timer">
                <h3 class="title">Time Until Season Starts</h3>
                <h4 class="clock">{ calculateTime(+targetTime - +sourceTime) }</h4>
                <h4 class="subtitle">September 1st, 2025 - June 1st, 2029</h4>
            </div>
            <Separator/>
            <div class="legacy">
                <Milestone
                    src="/park-at-night.avif" alt="Season 1 Park"
                    title="Humble Beginnings" direction="left"
                >
                    Geesecraft began simple - a small Minecraft SMP with friends
                    hosted by iiPython during summer-break in May of 2021.
                    Initially only intended as casual fun with two active members (DmmD and iiPython),
                    it slowly transformed into an important part of our culture and childhood,
                    and is still running as of August 2025.
                </Milestone>
                <Milestone
                    src="/silly-dmmd.avif" alt="DmmD Being DmmD"
                    title="Freedom for All" direction="right"
                >
                    What are the rules of Geesecraft? Simple, there are none!
                    While not a true anarchist server, Geesecraft allows you to be yourself
                    without any fear of moderation (as long as they comply with federal laws, of course).
                    Griefing? Trapping? Creating a monopoly? Go for it, although also be prepared for possible revenges!
                    Just make sure to ask for permission or know beforehand that your fellow geese
                    won't get offended before doing anything destructive.
                </Milestone>
                <Milestone
                    src="/base-of-operation.avif" alt="Base Filled with Technology"
                    title = "Automation First" direction="left"
                >
                    Be warned, this is an automation-centered server.
                    No matter what season you join, you will see automatic farms,
                    game-breaking contraptions, and whatever else you could imagine.
                    Since Season 4, we've also incorporated tech mods such as Applied Energistics 2,
                    Tech Reborn, and Ad Astra into the server, giving us even more power over the landscape.
                </Milestone>
            </div>
            <Separator/>
            <div class="invite">
                <h3>Consider Joining?</h3>
                <p>
                    Join our <Shortcut href="/discord">Discord Server</Shortcut> and
                    let us know your username, and we'll add you to our whitelist!
                </p>
                <p>
                    Or checkout our <Shortcut href="/seasons">Seasons Archive</Shortcut> to
                    read more about Geesecraft and its past!
                </p>
                <p>Hope to see you soon!</p>
            </div>
            <Separator/>
            <div class="motto">
                <h3 class="title">For Geese and Glory!</h3>
                <div class="highlights">
                    <img src="/main-base-interior.png" alt="Season 5 Base"/>
                    <img src="/vibes.png" alt="Pond outside Base"/>
                    <img src="/welcome-to-geeseville.png" alt="Season 3 Porch"/>
                </div>
                <h4 class="subtitle">Honk on, fellow goose! &lt;3</h4>
            </div>
        </div>
    );
}

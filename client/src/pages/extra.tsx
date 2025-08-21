// Imports parts
import { Crumbs } from "../parts/separator";
import { Shortcut } from "../parts/shortcut";

// Imports css
import "./extra.css";

// Defines extra
export function Extra() {
    // Creates extra
    return <div id="extra">
        <h1>More About Geesecraft</h1>
        <section>
            <h3>FAQ</h3>
            <p>
                Q: How to join the server?
            </p>
            <p>
                A: Join our <Shortcut href="https://discord.gg/HYgcp85g6u">Discord server</Shortcut> and tell us your username.
                We will whitelist you once we see your message.
            </p>
            <p>
                Q: It says I need to install a bunch of mods. How do I install mods?
            </p>
            <p>
                A: Install <Shortcut href="https://fabricmc.net/">Fabric MC</Shortcut> as your Minecraft client.
                Then install <Shortcut href="https://modrinth.com/mod/automodpack">Automodpack</Shortcut> and place it in your mods folder.
            </p>
            <p>
                Q: Why geese?
            </p>
            <p>
                A: Because honk.
            </p>
        </section>
    </div>
}

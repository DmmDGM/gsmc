// Imports parts
import { Link } from "../../parts/portal";
import { Topic } from "../../parts/topic";

// Imports css
import "./index.css";

// Defines extra
export function Extra() {
    // Creates extra
    return <div id="extra">
        <h1>More About Geesecraft</h1>
        <Topic theme="FAQ">
            <p>
                Q: How to join the server?
            </p>
            <p>
                A: Join our <Link href="https://discord.gg/HYgcp85g6u">Discord server</Link> and tell us your username.
                We will whitelist you once we see your message.
            </p>
            <p>
                Q: It says I need to install a bunch of mods. How do I install mods?
            </p>
            <p>
                A: Install <Link href="https://fabricmc.net/">Fabric MC</Link> as your Minecraft client.
                Then install <Link href="https://modrinth.com/mod/automodpack">Automodpack</Link> and place it in your mods folder.
            </p>
            <p>
                Q: Why geese?
            </p>
            <p>
                A: Because honk.
            </p>
        </Topic>
    </div>
}

// Imports parts
import { Link } from "../../parts/portal";
import { Topic } from "../../parts/topic";
import { Crumbs } from "../../parts/spread";

// Imports css
import "./index.css";

// Defines community
export function Community() {
    // Creates community
    return <div id="community">
        <h1>Geese Community</h1>
        <Topic theme="Welcome">
            <p>
                Welcome to Geesecraft!
                A server that's focused on <b>fun</b>, <b>friends</b>, and, most importantly, <b>freedom</b>.
                We are a community of geese (and penguins) lovers who also enjoy fooling around in our little Minecraft server.

            </p>
            <p>
                Feel free to join our <Link href="https://discord.gg/HYgcp85g6u">Discord server</Link>.
            </p>
            <p>
                Or check out our <Link href="/seasons">Seasons Archive</Link> to learn more about Geesecraft and its past!
            </p>
        </Topic>
        <Crumbs/>
        <Topic theme="Rules">
            <p>
                We try to minimize the number of rules on this server.
                After all, this isn't your average "make sure to have fun" server that also imposed tons of weird rules along side to restrict your play-style and maximize profit from your wallet.
            </p>
            <p>
                Our only rule is to ask you not to be a duck (jerk).
                Don't go around and ruin people's fun by doing a lot of destructive stuff without permission.
                If you are going to TNT someone's base, go for it. But make sure you know for sure that it is fine to bomb their house, or at least the consequences of your action if you proceed.
            </p>
            <p>
                Otherwise, do whatever you want.
                We can't be bothered to boss around and moderate the server.
                We are trying to have fun ourselves in the end.
            </p>
            <p>
                #kthxbai
            </p>
        </Topic>
        <Crumbs/>
        <Topic theme="Culture">
            <p>
                BREERAAEAAADAADAAAAAAAD!
            </p>
            <p>
                <img src="/bread.avif" alt="bread.avif"/>
            </p>
            <p>
                YUHHHHHHH! GIANT BREAAAAAAAAAAAD!
            </p>
        </Topic>
    </div>
}

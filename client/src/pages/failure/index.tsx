// Imports
import { useLocation } from "preact-iso";

// Imports parts
import { Crumbs } from "../parts/spread";
import { Shortcut } from "../parts/portal";

// Imports css
import "./index.css";

// Defines failure
export function Failure() {
    // Redirects pages
    const { path, route } = useLocation();
    if(path === "/") route("/nest", true);
    if(path === "/home") route("/nest", true);
    
    // Creates failure
    return <div id="failure">
        <h1>Honk!</h1>
        <h2>I think you might be lost here!</h2>
        <Crumbs/>
        <Shortcut href="/nest">Return to Nest</Shortcut>
    </div>;
}

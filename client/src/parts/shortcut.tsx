// Imports
import { useLocation } from "preact-iso";

// Imports css
import "./shortcut.css";

// Defines shortcut
export function Shortcut({ children, href }) {
    // Configures attributes
    const { path } = useLocation();
    const url = new URL(href, location.origin);
    const active = path.startsWith(href) && "active";
    const external = url.origin === location.origin ? {} : {
        rel: "noopener noreferrer",
        target: "_blank"
    };

    // Creates shortcuts
    return <a href={ href } class={ `shortcut ${active}` } { ...external }>
        { children }
    </a>;
}

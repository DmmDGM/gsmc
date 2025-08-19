// Imports
import { useLocation } from "preact-iso";
import "./shortcut.css";

// Defines shortcut
export function Shortcut({ children, href }) {
    // Creates shortcut
    const { path } = useLocation();
    const url = new URL(href, location.origin);
    const external = url.origin === location.origin ? {} : {
        rel: "noopener noreferrer",
        target: "_blank"
    };
    return (
        <a 
            href={ href }
            class={ `shortcut ${path.startsWith(href) && "active"}` }
            { ...external }
        >
            { children }
        </a>
    );
}

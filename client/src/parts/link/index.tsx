// Imports
import { useLocation } from "preact-iso";

// Imports css
import "./index.css";

// Defines element
export default function({ children, href }: { children: any; href: string; }) {
    // Creates attributes
    const { path } = useLocation();
    const url = new URL(href, location.origin);
    const active = path.startsWith(href) && "active";
    const external = url.origin === location.origin ? {} : {
        rel: "noopener noreferrer",
        target: "_blank"
    };

    // Creates element
    return <a href={ href } class={ `link ${active}` } { ...external }>
        { children }
    </a>;
}

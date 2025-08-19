// Imports
import "./separator.css";

// Defines separator
export function Separator({ count = 3 }) {
    // Creates separator
    const bread = <img src="/bread.avif" alt="Bread"/>;
    const children = new Array(count * 2 + 1)
        .fill("★")
        .map((child, index) => index % 2 ? bread : child);
    return (
        <div class="separator">{ children }</div>
    );
}

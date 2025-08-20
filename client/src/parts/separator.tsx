// Imports css
import "./separator.css";

// Defines separators
export function Crumbs({ count = 3 }) {
    // Creates separator
    const star = <span>★</span>;
    const bread = <img src="/bread.avif" alt="Bread"/>;
    const children = new Array(count * 2 + 1)
        .fill(star)
        .map((child, index) => index % 2 ? bread : child);
    return <div class="separator crumbs">{ children }</div>;
}
export function Dots({ count = 3 }) {
    // Creates separator
    const dot = <span>•︎</span>;
    const children = new Array(count).fill(dot);
    return <div class="separator dots">{ children }</div>;
}

// Imports css
import "./index.css";

// Defines element
export default function(
    { count = 3, rank = "crumbs" }:
    { count?: number; pattern: "crumbs" | "dots" }
) {
    // Creates element
    const star = <span>★</span>;
    const dot = <span>•︎</span>;
    const bread = <img src="/bread.avif" alt="Bread"/>;
    const children = new Array(count * 2 + 1)
        .fill(star)
        .map((child, index) => index % 2 ? bread : child);
    return <div class="crumbs">{ children }</div>;
}
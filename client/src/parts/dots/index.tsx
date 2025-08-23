// Imports css
import "./index.css";

// Defines element
export default function({ count = 3 }: { count?: number; }) {
    // Creates element
    const dot = <span>•︎</span>;
    const children = new Array(count).fill(dot);
    return <div class="dots">{ children }</div>;
}

// Imports
import "./divider.css";

// Defines divider
export function Divider({ count = 3 }) {
    // Creates divider
    const children = new Array(count).fill(<span>•︎</span>);
    return (
        <div class="divider">{ children }</div>
    );
}

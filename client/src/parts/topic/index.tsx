// Imports css
import "./index.css";

// Defines element
export default function({ children, theme }: { children: any; theme: string; }) {
    // Creates element
    return <div class="topic">
        <h3>{ theme }</h3>
        { children }
    </div>
}

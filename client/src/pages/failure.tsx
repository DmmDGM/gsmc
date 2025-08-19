// Imports
import { useLocation } from "preact-iso";

// Defines failure
export function Failure() {
    // Redirects pages
    const { path, route } = useLocation();
    if(path === "/") route("/home", true);
    
    // Creates failure
    return (
        <div>failure</div>
    );
}

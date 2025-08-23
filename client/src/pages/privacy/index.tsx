// Imports parts
import { Topic } from "../parts/region";

// Imports css
import "./privacy.css";

// Defines privacy
export function Privacy() {
    // Creates privacy
    return <div id="privacy">
        <h1>Privacy Policy</h1>
        <Topic theme="Your Data">
            <p>
                We don't store your data.
            </p>
            <p>
                We don't process your data.
            </p>
            <p>
                We don't sell your data.
            </p>
            <p>
                We don't do anything with your data.
            </p>
            <p>
                We don't want your data.
            </p>
            <p>
                Please keep it to yourself.
            </p>
            <p>
                #kthxbai
            </p>
        </Topic>
    </div>
}

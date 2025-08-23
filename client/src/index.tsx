// Imports
import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";

// Imports pages
import { Community } from "./pages/community";
import { Extra } from "./pages/extra";
import { Failure } from "./pages/failure";
import { Nest } from "./pages/nest";
import { Privacy } from "./pages/privacy";
import { Season } from "./pages/season";
import { Seasons } from "./pages/seasons";

// Imports parts
import { Logo } from "./parts/logo";
import { Shortcut } from "./parts/portal";
import { Watermark } from "./parts/watermark";

// Imports css
import "./soda.css";
import "./app.css";

// Defines app
export function App() {
	// Creates app
    return <LocationProvider>
        <header>
            <Logo/>
            <nav>
                <Shortcut href="/nest">Nest</Shortcut>
                <Shortcut href="/seasons">Seasons</Shortcut>
                <Shortcut href="/community">Community</Shortcut>
                <Shortcut href="/privacy">Privacy</Shortcut>
                <Shortcut href="/extra">Extra</Shortcut>
            </nav>
        </header>
        <main>
            <Router>
                <Route path="/nest" component={Nest} />
                <Route path="/seasons" component={Seasons} />
                <Route path="/seasons/:season" component={Season} />
                <Route path="/community" component={Community} />
                <Route path="/privacy" component={Privacy} />
                <Route path="/extra" component={Extra} />
                <Route default component={Failure} />
            </Router>
        </main>
        <footer>
            <Watermark/>
        </footer>
    </LocationProvider>;
}

// Renders page
render(<App/>, document.getElementById("app"));

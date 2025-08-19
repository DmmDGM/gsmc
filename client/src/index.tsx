// Imports
import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";
import { Failure } from "./pages/failure";
import { Home } from "./pages/home";
import { Seasons } from "./pages/seasons";
import { Logo } from "./parts/logo";
import { Shortcut } from "./parts/shortcut";
import { Watermark } from "./parts/watermark";
import "./soda.css";
import "./app.css";
import { Season } from "./pages/season";

// Defines app
export function App() {
	// Creates app
    return (
		<LocationProvider>
            <header>
                <Logo/>
                <nav>
                    <Shortcut href="/home">Home</Shortcut>
                    <Shortcut href="/seasons">Seasons</Shortcut>
                    <Shortcut href="/community">Community</Shortcut>
                    <Shortcut href="/privacy">Privacy</Shortcut>
                    <Shortcut href="/extra">Extra</Shortcut>
                </nav>
            </header>
			<main>
				<Router>
					<Route path="/home" component={Home} />
					<Route path="/seasons" component={Seasons} />
					<Route path="/seasons/:season" component={Season} />
					<Route path="/community" component={Season} />
					<Route path="/privacy" component={Season} />
					<Route path="/extra" component={Season} />
					<Route default component={Failure} />
				</Router>
			</main>
            <footer>
                <Watermark/>
            </footer>
		</LocationProvider>
	);
}

// Renders page
render(<App/>, document.getElementById("app"));

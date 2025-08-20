// Imports
import { useRoute } from "preact-iso";
import { useEffect, useState } from "preact/hooks";

// Imports parts
import { Crumbs, Dots } from "../parts/separator";
import { Shortcut } from "../parts/shortcut";

// Imports tools
import { contexts } from "../tools/contexts";
import { loadArchive, parseArchive } from "../tools/archive";
import { loadImage } from "../tools/gallery";

// Imports css
import "./season.css";

// Defines member
function Member({ name, uuid }) {
    // Creates states
    const [ avatar, setAvatar ] = useState("");
    const [ username, setUsername ] = useState("");

    // Parses uuid
    useEffect(() => {
        fetch(`https://playerdb.co/api/player/minecraft/${uuid}`)
            .then(async (response) => {
                const metadata = await response.json();
                setAvatar(metadata.data.player.avatar);
                setUsername(metadata.data.player.username);
            });
    }, []);

    // Creates member
    return <div class="member">
        <img src={ avatar } alt={ username }/>
        <span>{ username }</span>
        <span>({ name })</span>
    </div>;
}

// Defines plugin
function Plugin({ name, url }) {
    // Creates plugin
    const external = {
        rel: "noopener noreferrer",
        target: "_blank"
    };
    return <a href={ url } class="plugin" { ...external } >{ name }</a>;
}

// Defines mod
function Mod({ name, url }) {
    // Creates mod
    const external = {
        rel: "noopener noreferrer",
        target: "_blank"
    };
    return <a href={ url } class="mod" { ...external } >{ name }</a>;
}

// Defines snapshot
function Snapshot({ season, image, setSpotlight }) {
    // Creates image
    const url = loadImage(season, image.file, 50, 50);
    const toggle = () => setSpotlight({ image, visible: true });
    return <button class="snapshot" onClick={ toggle }>
        <img src={ url } alt={ image.file }/>
        <span>{ image.name }</span>
        <span class="long">({ image.file })</span>
    </button>;
}

function Preview({ season, image, setSpotlight }) {
    // Creates preview
    const url = loadImage(season, image.file, 100, 100);
    const toggle = () => setSpotlight({ image, visible: false });
    const external = {
        rel: "noopener noreferrer",
        target: "_blank"
    };
    return <div class="preview">
        <img src={ url } alt={ image.file }/>
        <h3>{ image.name }</h3>
        <p>{ image.description }</p>
        <div class="details">
            <span class="long">File: { image.file }</span>
            <span>Time: { image.time }</span>
        </div>
        <a href={ url } { ...external }>Open Raw</a>
        <button onClick={ toggle }>Close</button>
    </div>;
}

// Defines season
export function Season() {
    // Creates states
    const [ catalog, setCatalog ] = useState<Catalog>({
        activity: "",
        description: "",
        gallery: [],
        length: "",
        members: [],
        mods: [],
        name: "",
        plugins: [],
        version: "",
        world: null
    });
    const [ context, setContext ] = useState<Context>({
        Content: () => <></>,
        banner: {
            alt: "",
            src: ""
        },
    });
    const [ spotlight, setSpotlight ] = useState<{
        image: typeof catalog.gallery[number];
        visible: boolean;
    }>({
        image: {
            description: "",
            file: "",
            name: "",
            time: ""
        },
        visible: false
    });

    // Parses archive
    const { params: { season } } = useRoute();
    useEffect(() => {
        loadArchive(season)
            .then((archive) => parseArchive(archive))
            .then((catalog) => setCatalog(catalog));
        setContext(contexts[season]);
    }, []);

    // Creates components
    const download = catalog.world ?
        <Shortcut href={ catalog.world }>Download World</Shortcut> :
        <span>World Unavailable</span>;
    const members = catalog.members.length ? catalog.members.map((member) =>
        <Member name={ member.name } uuid={ member.uuid }/>
    ) : <span>No Members Whitelisted</span>;
    const plugins = catalog.plugins.length ? catalog.plugins.map((plugin) =>
        <Plugin name={ plugin.name } url={ plugin.url }/>
    ) : <span>No Plugins Installed</span>;
    const mods = catalog.mods.length ? catalog.mods.map((mod) =>
        <Mod name={ mod.name } url={ mod.url }/>
    ) : <span>No Mods Installed</span>;
    const gallery = catalog.gallery.length ? catalog.gallery.map((image) =>
        <Snapshot season={ season } image={ image } setSpotlight={ setSpotlight }/>
    ) : <span>No Gallery Images</span>;
    const modal = spotlight.visible ?
        <div id="modal">
            <Preview season={ season } image={ spotlight.image } setSpotlight={ setSpotlight }/>
        </div> :
        <></>;
    
    // Creates season
    return <div id="season">
        <div id="splash">
            <h1>{ catalog.name }</h1>
            <p>{ catalog.description }</p>
            <img src={ context.banner.src } alt={ context.banner.alt }/>
            <div class="details">
                <span>{ catalog.length }</span>
                <span>{ catalog.version }</span>
                <span>{ catalog.activity }</span>
                { download }
            </div>
        </div>
        <div id="content"><context.Content/></div>
        <div id="members">
            <h3>Members</h3>
            <div class="list">{ members }</div>
        </div>
        <Dots/>
        <div id="plugins">
            <h3>Plugins</h3>
            <div class="list">{ plugins }</div>
        </div>
        <Dots/>
        <div id="mods">
            <h3>Mods</h3>
            <div class="list">{ mods }</div>
        </div>
        <Crumbs/>
        <div id="gallery">
            <h3>Gallery</h3>
            <div class="list">{ gallery }</div>
        </div>
        { modal }
    </div>;
}

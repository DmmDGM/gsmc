// Imports
import { useRoute } from "preact-iso";
import { useEffect, useState } from "preact/hooks";
import { contexts } from "../tools/contexts";
import { Divider } from "../parts/divider";
import { Separator } from "../parts/separator";
import { Shortcut } from "../parts/shortcut";
import { loadArchive, parseArchive } from "../tools/archive";
import { loadImage } from "../tools/gallery";
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
    return (
        <div class="member">
            <img src={ avatar } alt={ username }/>
            <span>{ username }</span>
            <span>({ name })</span>
        </div>
    );
}

// Defines plugin
function Plugin({ name, url }) {
    // Creates plugin
    return (
        <a href={ url } class="plugin" target="_blank" rel="noopener noreferrer">{ name }</a>
    );
}

// Defines mod
function Mod({ name, url }) {
    // Creates mod
    return (
        <a href={ url } class="mod" target="_blank" rel="noopener noreferrer">{ name }</a>
    );
}

// Defines image
function Image({ season, image, setModal }) {
    // Creates image
    return (
        <button class="image" onClick={ () => setModal({ image, toggle: true }) }>
            <img src={ loadImage(season, image.file, 50, 50) } alt={ image.file }/>
            <div>{ image.name }</div>
            <div>({ image.file })</div>
        </button>
    );
}

function Preview({ season, image, setModal }) {
    // Creates preview
    const url = loadImage(season, image.file, 100, 100);
    return (
        <div class="preview">
            <img src={ url } alt={ image.file }/>
            <h3>{ image.name }</h3>
            <h4>({ image.file })</h4>
            <p>{ image.description }</p>
            <p>{ image.time }</p>
            <a href={ url } target="_blank" rel="noopener noreferrer">Open Raw</a>
            <button onClick={ () => setModal({ image: image, toggle: false }) }>Close</button>
        </div>
    );
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
    const [ modal, setModal ] = useState<{
        image: typeof catalog.gallery[number];
        toggle: boolean;
    }>({
        image: {
            description: "",
            file: "",
            name: "",
            time: ""
        },
        toggle: false
    });

    // Parses archive
    const { params: { season } } = useRoute();
    useEffect(() => {
        loadArchive(season)
            .then((archive) => parseArchive(archive))
            .then((catalog) => setCatalog(catalog));
        setContext(contexts[season]);
    }, []);
    
    // Creates season
    return (
        <div id="season">
            <div class="splash">
                <h1 class="name">{ catalog.name }</h1>
                <h2 class="description">{ catalog.description }</h2>
                <img class="banner" src={ context.banner.src } alt={ context.banner.alt }/>
                <div class="details">
                    <div>{ catalog.length }</div>
                    <span class="star">★</span>
                    <div>{ catalog.version }</div>
                    <span class="star">★</span>
                    <div>{ catalog.activity }</div>
                    <span class="star">★</span>
                    <div>
                        { catalog.world ? (
                            <Shortcut href={ catalog.world }>Download World</Shortcut>
                        ) : (
                            <>World Unavailable</>
                        ) }
                    </div>
                </div>
            </div>
            <div class="content"><context.Content/></div>
            <div class="members">
                <h3>Members</h3>
                <div>
                    { catalog.members.map((member) => (
                        <Member name={ member.name } uuid={ member.uuid }/>
                    )) }
                </div>
            </div>
            <Divider/>
            <div class="plugins">
                <h3>Plugins</h3>
                <div>
                    { catalog.plugins.length ? catalog.plugins.map((plugin) => (
                        <Plugin name={ plugin.name } url={ plugin.url }/>
                    )) : (
                        <>No Plugins Installed</>
                    ) }
                </div>
            </div>
            <Divider/>
            <div class="mods">
                <h3>Mods</h3>
                <div>
                    { catalog.mods.length ? catalog.mods.map((mod) => (
                        <Mod name={ mod.name } url={ mod.url }/>
                    )) : (
                        <>No Mods Installed</>
                    )}
                </div>
            </div>
            <Separator/>
            <div class="gallery">
                <h3>Gallery</h3>
                <div>
                    {
                        catalog.gallery.length ? catalog.gallery.map((image) => (
                            <Image season={ season } image={ image } setModal={ setModal }/>
                        )) : (
                            <>No Gallery Images</>
                        )
                    }
                </div>
            </div>
            {
                modal.toggle ? (
                    <div class="modal">
                        <Preview season={ season } image={ modal.image } setModal={ setModal }/>
                    </div>
                ) : (
                    <></>
                )
            }
        </div>
    );
}

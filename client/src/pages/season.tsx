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
                console.log(metadata);
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
function Image({ season, file, name, description, time, modal }) {
    // Creates image
    return (
        <button class="image" onClick={ () => modal({ season, file, name, description, time }) }>
            <img src={ loadImage(season, file, 50, 50) } alt={ file }/>
            <div>{ name }</div>
            <div>({ file })</div>
        </button>
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
        banner: {
            alt: "",
            src: ""
        },
        content: <></>
    });

    // Parses archive
    const { params: { season } } = useRoute();
    useEffect(() => {
        loadArchive(season)
            .then((archive) => parseArchive(archive))
            .then((catalog) => {
                const context = contexts[season];
                setCatalog(catalog);
                setContext(context);
            });
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
            <div class="content">{ context.content }</div>
            <div class="members">
                <h3>Members</h3>
                <div>
                    { members.map((member) => (
                        <Member name={ member.name } uuid={ member.uuid }/>
                    )) }
                </div>
            </div>
            <Divider/>
            <div class="plugins">
                <h3>Plugins</h3>
                <div>
                    { plugins.length ? plugins.map((plugin) => (
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
                    { mods.length ? mods.map((mod) => (
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
                            <Image
                                season={ season } file={ image.file } name={ image.name }
                                description={ image.description } time={ image.time }
                            />
                        )) : (
                            <>No Gallery Images</>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

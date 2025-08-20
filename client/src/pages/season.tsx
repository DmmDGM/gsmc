// Imports
import { useRoute } from "preact-iso";
import { useEffect, useState } from "preact/hooks";
import { loadArchive, parseArchive } from "../archive";
import { contexts } from "../contexts";
import { Divider } from "../parts/divider";
import { Separator } from "../parts/separator";
import { Shortcut } from "../parts/shortcut";
import { loadImage } from "../gallery";
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
function Image({ season, file, name, description, time }) {
    // Creates image
    return (
        <img src={ loadImage(season, file) } alt={ file }/>
    );
}

// Defines season
export function Season() {
    // Creates states
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ length, setLength ] = useState("");
    const [ version, setVersion ] = useState("");
    const [ activity, setActivity ] = useState("");
    const [ world, setWorld ] = useState(null);
    const [ members, setMembers ] = useState([]);
    const [ plugins, setPlugins ] = useState([]);
    const [ mods, setMods ] = useState([]);
    const [ gallery, setGallery ] = useState([]);
    const [ banner, setBanner ] = useState(<></>);
    const [ content, setContent ] = useState(<></>);

    // Parses archive
    const { params: { season } } = useRoute();
    useEffect(() => {
        loadArchive(season)
            .then((archive) => parseArchive(archive))
            .then((catalog) => {
                const context = contexts[season];
                setName(catalog.name);
                setDescription(catalog.description);
                setLength(catalog.length);
                setVersion(catalog.version);
                setActivity(catalog.activity);
                setMembers(catalog.members);
                setPlugins(catalog.plugins);
                setMods(catalog.mods);
                setGallery(catalog.gallery);
                setWorld(catalog.world);
                setBanner(<img class="banner" src={ context.banner.src } alt={ context.banner.alt }/>);
                setContent(context.content({ catalog }));
            });
    }, []);
    
    // Creates season
    return (
        <div id="season">
            <div class="splash">
                <h1 class="name">{ name }</h1>
                <h2 class="description">{ description }</h2>
                { banner }
                <div class="details">
                    <div>{ length }</div>
                    <span class="star">★</span>
                    <div>{ version }</div>
                    <span class="star">★</span>
                    <div>{ activity }</div>
                    <span class="star">★</span>
                    <div>
                        { world ? (
                            <Shortcut href={ world }>Download World</Shortcut>
                        ) : (
                            <>World Unavailable</>
                        ) }
                    </div>
                </div>
            </div>
            <div class="content">{ content }</div>
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
                        gallery.length ? gallery.map((image) => (
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


import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import https from "https";

const s3Client = new S3Client({ region: "ap-south-1" });
const BUCKET_NAME = process.env.BUCKET_NAME || "dreamframe-ai-bucket";

const concepts = [
    { title: "A Floating Smart City Above Chennai", prompt: "futuristic floating smart city above Chennai India in 2050, neon lights, flying cars, holographic billboards, sunset sky, ultra detailed, 8k, cinematic", description: "Where tradition meets tomorrow, a city rises above the clouds of time." },
    { title: "Autonomous Mars Hospital", prompt: "autonomous hospital on Mars surface powered by AI, red planet landscape, glass dome, robots treating patients, futuristic medical equipment, 8k detailed", description: "Healing knows no planetary bounds, where AI nurses tend to cosmic wounds." },
    { title: "Robotic Forest Sanctuary", prompt: "robotic forest protecting endangered animals, mechanical trees with LED leaves, robot guardians watching over tigers and elephants, bioluminescent plants, night scene, 8k", description: "Steel roots and digital leaves shelter the last wild hearts of Earth." },
    { title: "Underwater Quantum City", prompt: "underwater city powered by quantum computers, glass tunnels, bioluminescent sea creatures, holographic displays, deep ocean, futuristic architecture, 8k cinematic", description: "Beneath the waves, humanity found a new frontier of infinite possibility." },
    { title: "AI-Powered Space Garden", prompt: "space station with massive garden maintained by AI robots, zero gravity plants floating, Earth visible through window, beautiful flowers, futuristic greenhouse, 8k", description: "In the void of space, life blooms eternal under watchful digital eyes." },
    { title: "Neural Network Bridge", prompt: "massive bridge made of glowing neural networks connecting two futuristic cities, night sky, data streams flowing like rivers, cyberpunk aesthetic, 8k ultra detailed", description: "Thoughts become pathways, connecting minds across the digital divide." },
    { title: "Holographic Ocean Library", prompt: "massive library floating on ocean with holographic books, futuristic architecture, sunset, whales swimming nearby, knowledge beams shooting to sky, 8k cinematic", description: "Every wave carries a story, every beam of light a thousand books." },
    { title: "Quantum Butterfly Preserve", prompt: "futuristic butterfly preserve with quantum-enhanced butterflies glowing with data patterns, glass dome in mountain, rainbow light refractions, 8k detailed", description: "Wings of code flutter through gardens of light and mathematics." },
    { title: "Time Crystal Observatory", prompt: "observatory built from time crystals on mountain peak, aurora borealis, telescopes pointing at multiple dimensions, purple and blue glow, futuristic, 8k", description: "Peering not just into space, but into the fabric of time itself." },
    { title: "Living Skyscraper Forest", prompt: "skyscrapers that are alive with trees growing as structure, vertical forests in futuristic city, birds flying, clean energy, sunrise, green architecture, 8k", description: "Buildings breathe and grow, a concrete jungle reborn as living green." },
    { title: "Digital Aurora Village", prompt: "arctic village with AI-generated aurora borealis displaying art and data, futuristic igloos, holographic northern lights, snow, 8k cinematic", description: "The sky becomes canvas, painted by algorithms dancing with solar winds." },
    { title: "Coral Reef Data Center", prompt: "underwater data center integrated with coral reef, servers cooled by ocean, fish swimming between glowing server racks, bioluminescent, 8k detailed", description: "Where data flows like ocean currents, and coral grows on quantum cores." },
    { title: "Gravity-Defying Tea Garden", prompt: "zero gravity tea garden floating in space station, tea leaves floating, Japanese zen aesthetic meets futuristic technology, Earth in background, peaceful, 8k", description: "Serenity floats weightless, each leaf a meditation between stars." },
    { title: "Phoenix Solar Farm", prompt: "massive solar farm shaped like phoenix bird in desert, panels reflecting rainbow light, sand dunes, futuristic energy collection, aerial view, 8k cinematic", description: "From ancient myth to future power, the phoenix rises in light." },
    { title: "Memory Palace Cloud City", prompt: "city in clouds that stores human memories as light orbs, floating platforms, people accessing memories via hologram, dreamy atmosphere, golden hour, 8k", description: "Every moment preserved in light, floating forever above the world." },
    { title: "Bioluminescent Highway", prompt: "highway system powered by bioluminescent organisms, glowing road at night, self-driving cars, organic architecture, blue and green glow, futuristic city, 8k", description: "Roads alive with natures light guide travelers through tomorrows night." },
    { title: "AI Composer Concert Hall", prompt: "futuristic concert hall where AI composes music visualized as light sculptures, audience in floating seats, sound waves visible as colors, 8k cinematic", description: "Music becomes visible, each note a sculpture of pure emotion." },
    { title: "Seed Vault Spaceship", prompt: "massive spaceship designed as seed vault carrying Earths biodiversity to new planet, organic ship design, plants visible inside, stars background, 8k", description: "Noahs ark among the stars, carrying lifes blueprint to new worlds." },
    { title: "Crystal Energy Waterfall", prompt: "massive waterfall generating crystal energy in futuristic mountain city, rainbow crystals forming from water, clean energy plant, magical realism, 8k cinematic", description: "Water falls and crystals form, powering dreams of a cleaner world." },
    { title: "Origami Space Station", prompt: "space station designed like giant origami, folding solar panels, geometric beauty, Earth reflection, astronauts floating nearby, Japanese design meets space tech, 8k", description: "Paper folding dreams unfold in the infinite origami of space." },
    { title: "Dream Weaver Factory", prompt: "factory that weaves dreams into reality using AI, colorful dream threads, sleeping pods, imagination becoming physical objects, surreal, 8k detailed", description: "Where imagination is the raw material and dreams the final product." },
    { title: "Glacier Computing Hub", prompt: "computing center built inside glacier, ice walls with embedded circuits, blue glow, naturally cooled servers, arctic landscape, futuristic, 8k cinematic", description: "Ancient ice meets future thought, cooling the fires of computation." },
    { title: "Symbiotic Robot Garden", prompt: "garden where robots and plants grow together symbiotically, mechanical flowers, robot bees pollinating, organic meets digital, sunrise, peaceful, 8k", description: "Metal and petal intertwine, a new ecosystem of silicon and chlorophyll." },
    { title: "Starlight Harvester", prompt: "massive structure in space harvesting starlight for energy, lens arrays, light beams, nearby nebula, space workers, futuristic energy collection, 8k cinematic", description: "Reaching out to catch the light of distant suns, powering worlds unseen." },
    { title: "Emotion Weather Station", prompt: "weather station that reads collective human emotions and creates weather art in sky, colorful sky patterns, futuristic city below, holographic clouds, 8k", description: "The sky reflects our hearts, painting joy and hope across the heavens." },
    { title: "Magnetic Levitation City", prompt: "entire city floating on magnetic levitation above ocean, no ground contact, futuristic buildings, waterfalls from city edges, sunset, 8k ultra detailed", description: "A city unbound by earth, floating free on invisible magnetic dreams." },
    { title: "Photosynthetic Skyscraper", prompt: "skyscraper that photosynthesizes like plant, green glowing building, oxygen bubbles rising, futuristic city, clean air visualization, daytime, 8k cinematic", description: "Buildings that breathe for us, exhaling clean air into grateful lungs." },
    { title: "Quantum Rainbow Bridge", prompt: "bridge made of quantum entangled particles showing rainbow colors, connecting floating islands, people walking through light, magical futuristic, 8k", description: "Walking on entangled light, each step a quantum leap of faith." },
    { title: "AI Dream Aquarium", prompt: "massive aquarium where AI creates new dream sea creatures, impossible beautiful fish, holographic water, visitors watching in awe, bioluminescent, 8k", description: "Creatures that never were swim in waters that never existed, yet feel so real." },
    { title: "Solar Sail Messenger", prompt: "fleet of solar sail spacecraft carrying messages between star systems, golden sails catching starlight, deep space, nebula background, 8k cinematic", description: "Letters written in light, sailing on solar winds to distant worlds." }
];

function getImageFromPollinations(prompt) {
    return new Promise((resolve, reject) => {
        const encodedPrompt = encodeURIComponent(prompt);
        const url = "https://image.pollinations.ai/prompt/" + encodedPrompt + "?width=1024&height=1024&nologo=true";

        const makeRequest = (requestUrl) => {
            https.get(requestUrl, (response) => {
                if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                    makeRequest(response.headers.location);
                } else if (response.statusCode === 200) {
                    const chunks = [];
                    response.on("data", (chunk) => chunks.push(chunk));
                    response.on("end", () => resolve(Buffer.concat(chunks)));
                    response.on("error", reject);
                } else {
                    reject(new Error("HTTP " + response.statusCode));
                }
            }).on("error", reject);
        };

        makeRequest(url);
    });
}

export const handler = async (event) => {
    try {
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
        const conceptIndex = dayOfYear % concepts.length;
        const concept = concepts[conceptIndex];

        console.log("Todays concept:", concept.title);

        const imageBuffer = await getImageFromPollinations(concept.prompt);

        const dateKey = today.toISOString().split("T")[0];

        await s3Client.send(new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: "images/" + dateKey + ".png",
            Body: imageBuffer,
            ContentType: "image/png"
        }));

        const metadata = {
            date: dateKey,
            title: concept.title,
            description: concept.description,
            prompt: concept.prompt,
            generatedAt: today.toISOString(),
            imageUrl: "https://" + BUCKET_NAME + ".s3.ap-south-1.amazonaws.com/images/" + dateKey + ".png"
        };

        await s3Client.send(new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: "metadata/" + dateKey + ".json",
            Body: JSON.stringify(metadata, null, 2),
            ContentType: "application/json"
        }));

        await s3Client.send(new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: "latest.json",
            Body: JSON.stringify(metadata, null, 2),
            ContentType: "application/json"
        }));

        console.log("Success! Image saved:", concept.title);
        return {
            statusCode: 200,
            body: JSON.stringify(metadata)
        };

    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};


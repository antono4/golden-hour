/* ============================================================
   Golden Hour — data: tools, templates, testimonials, code
   ============================================================ */

const RAIL = [
  { name: "Face-Swap-Video", art: "art--fs", time: "0:21" },
  { name: "Lip Sync", art: "art--lip", time: "0:06" },
  { name: "Image-to-Video", art: "art--i2v", time: "0:13" },
  { name: "Text-to-Video", art: "art--t2v", time: "0:08" },
  { name: "Talking Photo", art: "art--talk", time: "0:07" },
  { name: "AI Headshot", art: "art--head", time: "0:08" },
  { name: "AI Upscaler", art: "art--upscale", time: "0:13" },
  { name: "AI Image Editor", art: "art--editor", time: "0:05" },
  { name: "Video-to-Video", art: "art--v2v", time: "0:10" },
  { name: "Animation", art: "art--anim", time: "0:09" },
];

const TOOLS = [
  // video
  { n:"Text to Video", d:"Turn a prompt into a short AI video", c:"video", a:"linear-gradient(135deg,#3a1c0a,#ff8c42,#ffd27a)" },
  { n:"Image to Video", d:"Animate any still photo", c:"video", a:"linear-gradient(135deg,#1a0f33,#6b3fa0,#ffb347)" },
  { n:"Video to Video", d:"Restyle existing footage", c:"video", a:"linear-gradient(135deg,#0a1020,#1a4a8b,#ffb347)" },
  { n:"Face Swap Video", d:"Swap faces in any video", c:"video", a:"linear-gradient(135deg,#0d2a2a,#2e8b8b,#f5c451)" },
  { n:"Character Replace", d:"Swap or animate a character", c:"video", a:"linear-gradient(135deg,#1a0410,#7a1a4a,#ffd27a)" },
  { n:"Lip Sync", d:"Sync audio to any face", c:"video", a:"linear-gradient(135deg,#2a0d1f,#c2185b,#ffb347)" },
  { n:"Talking Photo", d:"Make any portrait speak", c:"video", a:"linear-gradient(135deg,#1a1304,#7a5c00,#fff3d6)" },
  { n:"AI Animation", d:"Stop-motion & toon styles", c:"video", a:"linear-gradient(135deg,#1a0410,#7a1a4a,#ffd27a)" },
  { n:"AI UGC Ad", d:"Creator-style ad generator", c:"video", a:"linear-gradient(135deg,#2a0f04,#7a2a0a,#ff8c42)" },
  { n:"Video Upscaler", d:"Upscale footage to 4K", c:"video", a:"linear-gradient(135deg,#041a10,#1a7a4f,#f5c451)" },
  { n:"Video Translator", d:"Translate & dub any clip", c:"video", a:"linear-gradient(135deg,#0a1020,#1a4a8b,#ffb347)" },
  { n:"Subtitle Maker", d:"Auto captions in 50 langs", c:"video", a:"linear-gradient(135deg,#100c1a,#3a2f6b,#ffb347)" },
  // image
  { n:"AI Image Generator", d:"Text to stunning image", c:"image", a:"linear-gradient(135deg,#3a1c0a,#ff8c42,#fff3d6)" },
  { n:"AI Image Editor", d:"Edit images with text", c:"image", a:"linear-gradient(135deg,#1a0a0a,#8b1a1a,#ff8c42)" },
  { n:"Face Swap Photo", d:"Swap faces in any photo", c:"image", a:"linear-gradient(135deg,#0d2a2a,#2e8b8b,#f5c451)" },
  { n:"AI Upscaler", d:"Upscale images to 4K", c:"image", a:"linear-gradient(135deg,#041a10,#1a7a4f,#f5c451)" },
  { n:"AI Headshot", d:"Studio-grade portraits", c:"image", a:"linear-gradient(135deg,#100c1a,#3a2f6b,#ffb347)" },
  { n:"Background Remover", d:"Cut out any subject", c:"image", a:"linear-gradient(135deg,#15100b,#3a2f6b,#ff8c42)" },
  { n:"Background Replace", d:"New scenes in one click", c:"image", a:"linear-gradient(135deg,#1a0f33,#6b3fa0,#ffb347)" },
  { n:"Photo Restyle", d:"Photo to painting / anime", c:"image", a:"linear-gradient(135deg,#1a0410,#7a1a4a,#ffd27a)" },
  { n:"Object Remove", d:"Erase anything", c:"image", a:"linear-gradient(135deg,#2a0f04,#7a2a0a,#ff8c42)" },
  { n:"Image Extender", d:"Uncrop & outpaint", c:"image", a:"linear-gradient(135deg,#0a1020,#1a4a8b,#ffb347)" },
  { n:"AI Avatar", d:"Stylized avatar packs", c:"image", a:"linear-gradient(135deg,#1a1304,#7a5c00,#fff3d6)" },
  // audio
  { n:"Text to Speech", d:"Natural AI voices", c:"audio", a:"linear-gradient(135deg,#100c1a,#3a2f6b,#ffb347)" },
  { n:"Voice Clone", d:"Clone any voice", c:"audio", a:"linear-gradient(135deg,#2a0d1f,#c2185b,#ffb347)" },
  { n:"Audio to Lip Sync", d:"Match audio to lips", c:"audio", a:"linear-gradient(135deg,#1a0a0a,#8b1a1a,#ff8c42)" },
  { n:"Music Generator", d:"Royalty-free tracks", c:"audio", a:"linear-gradient(135deg,#1a0f33,#6b3fa0,#ffb347)" },
  { n:"Voice Translator", d:"Dub in your voice", c:"audio", a:"linear-gradient(135deg,#0a1020,#1a4a8b,#ffb347)" },
  { n:"Audio Enhancer", d:"Studio-quality audio", c:"audio", a:"linear-gradient(135deg,#041a10,#1a7a4f,#f5c451)" },
  // effects
  { n:"AI GIF Generator", d:"Text / image to GIF", c:"effect", a:"linear-gradient(135deg,#2a0f04,#7a2a0a,#ff8c42)" },
  { n:"Time Warp", d:"Speed ramp & freeze", c:"effect", a:"linear-gradient(135deg,#15100b,#3a2f6b,#ff8c42)" },
  { n:"Glitch FX", d:"Cinematic glitch", c:"effect", a:"linear-gradient(135deg,#1a0a0a,#8b1a1a,#ff8c42)" },
  { n:"Bokeh Maker", d:"Blur backgrounds beautifully", c:"effect", a:"linear-gradient(135deg,#0d2a2a,#2e8b8b,#f5c451)" },
  { n:"Color Grade", d:"Golden hour LUTs", c:"effect", a:"linear-gradient(135deg,#3a1c0a,#ff8c42,#fff3d6)" },
];

const TEMPLATES = [
  { t:"TikTok Hype Edit", r:"9:16", a:"linear-gradient(135deg,#2a0f04,#7a2a0a,#ff8c42)" },
  { t:"Product Showcase", r:"1:1", a:"linear-gradient(135deg,#100c1a,#3a2f6b,#ffb347)" },
  { t:"YouTube Intro", r:"16:9", a:"linear-gradient(135deg,#0a1020,#1a4a8b,#ffb347)" },
  { t:"UGC Testimonial", r:"9:16", a:"linear-gradient(135deg,#1a0410,#7a1a4a,#ffd27a)" },
  { t:"Reels Face Swap", r:"9:16", a:"linear-gradient(135deg,#0d2a2a,#2e8b8b,#f5c451)" },
  { t:"Brand Story", r:"16:9", a:"linear-gradient(135deg,#3a1c0a,#ff8c42,#fff3d6)" },
  { t:"Talking Photo Ad", r:"1:1", a:"linear-gradient(135deg,#1a1304,#7a5c00,#fff3d6)" },
  { t:"Anime Restyle", r:"9:16", a:"linear-gradient(135deg,#1a0f33,#6b3fa0,#ffb347)" },
];

const TESTIMONIALS = [
  { name:"Bill Tai", role:"@KiteVC", initial:"B", body:"Super fun AI automation… Photo of my grandfather 90+ years ago, restored and animated. Before & after is unreal." },
  { name:"Akshay Ram", role:"PM at Adobe", initial:"A", body:"Teams are recognizing that generative AI tools can be partners in creating moments that truly resonate." },
  { name:"Louis Brody", role:"Film & TV, 50 yrs", initial:"L", body:"One of (if not) the best lipsync products available. A clean, undistorted picture every time." },
  { name:"Gary Carter", role:"Creator", initial:"G", body:"It’s exactly the style my kids love. It makes AI video creation accessible and fun. I’ll be using it for a long time." },
  { name:"Divyansh C.", role:"Instagram creator", initial:"D", body:"In just minutes I produced excellent posts. One even went viral and gained thousands of new followers." },
  { name:"Max Hager", role:"@MaxHager66", initial:"M", body:"Reliable SOTA quality at a good price for txt2video, img2video, faceswap, lipsync and animation." },
  { name:"Kristie N.", role:"Creator", initial:"K", body:"The interface is clean, options are diverse, and everything just works. A powerful creative studio at your fingertips." },
  { name:"Ryan A.", role:"@wooby_clues", initial:"R", body:"I made creative NBA edits turning players into their favorite characters. They loved it." },
];

const CODE = {
  python:
`<span class="c"># No API key needed for the demo. Set GOLDEN_HOUR_KEY for scale.</span>
<span class="k">from</span> golden_hour <span class="k">import</span> <span class="n">Client</span>
<span class="k">from</span> os <span class="k">import</span> getenv

client = <span class="n">Client</span>(token=getenv(<span class="s">"GOLDEN_HOUR_KEY"</span>))  <span class="c"># optional</span>

res = client.v1.image_to_video.generate(
    style={<span class="s">"prompt"</span>: <span class="s">"waves crashing at sunset"</span>},
    assets={<span class="s">"image_file_path"</span>: <span class="s">"/path/to/beach.png"</span>},
    end_seconds=<span class="v">15</span>,
)
<span class="n">print</span>(res.video_url)`,
  node:
`<span class="c">// No API key needed for the demo. Set GOLDEN_HOUR_KEY for scale.</span>
<span class="k">import</span> { <span class="n">Client</span> } <span class="k">from</span> <span class="s">"golden-hour"</span>;

<span class="k">const</span> client = <span class="k">new</span> <span class="n">Client</span>({ token: process.env.<span class="n">GOLDEN_HOUR_KEY</span> }); <span class="c">// optional</span>

<span class="k">const</span> res = <span class="k">await</span> client.v1.imageToVideo.generate({
  style: { <span class="s">prompt</span>: <span class="s">"waves crashing at sunset"</span> },
  assets: { <span class="s">imageFilePath</span>: <span class="s">"./beach.png"</span> },
  endSeconds: <span class="v">15</span>,
});
console.log(res.videoUrl);`,
  curl:
`<span class="c"># No API key needed for the demo. Add a bearer token for scale.</span>
curl -X POST https://api.goldenhour.dev/v1/image-to-video \\
  -H <span class="s">"Content-Type: application/json"</span> \\
  -H <span class="s">"Authorization: Bearer $GOLDEN_HOUR_KEY"</span> \\
  -d <span class="s">'{ "style": {"prompt":"waves crashing"}, "end_seconds": 15 }'</span>`,
};

const PROMPT_PRESETS = {
  "text-to-video":"waves crashing on a golden beach at sunset, cinematic, 4K",
  "image-to-video":"a still portrait that slowly comes to life, subtle motion",
  "video-to-video":"restyle this clip as a 90s anime, warm golden palette",
  "face-swap":"seamless face replacement preserving lighting & expression",
  "lip-sync":"sync the spoken audio to natural mouth movement",
  "talking-photo":"portrait speaks directly to camera, friendly tone",
  "ai-image":"a lone lighthouse during golden hour, volumetric light",
  "image-upscaler":"upscale with crisp detail, no artifacts",
  "ai-gif":"looping 3-frame wave splash, vibrant",
  "ugc-ad":"creator-style testimonial for a coffee brand, vertical",
};

if (typeof window !== "undefined") {
  window.GH = { RAIL, TOOLS, TEMPLATES, TESTIMONIALS, CODE, PROMPT_PRESETS };
}

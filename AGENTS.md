# Golden Hour — AI Video & Image Studio (no-token demo)

A free, no-login, no-API-key demo inspired by magichour.ai. Everything runs in the browser.

## Run

```bash
node server.js
```

Open http://localhost:12000

## Structure

- `index.html` — landing page + interactive studio
- `styles.css` — golden-hour cinematic theme (Fraunces × Space Grotesk)
- `data.js` — tools, templates, testimonials, code samples, prompt presets
- `app.js` — catalog rendering, code tabs, scroll reveal, and the **no-token studio** (canvas animation renderer that simulates text-to-video / face swap / lip sync / upscaler / GIF outputs from a prompt)
- `server.js` — zero-dependency Node static server on port 12000

## Notes

- No backend, no keys, no accounts. The "Generate" button renders a live canvas animation locally.
- Footer states this is an unaffiliated demo.

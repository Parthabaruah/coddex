# Coddex

Coddex is a small, browser-based prompt improver built with plain HTML, CSS, and JavaScript. Enter a rough request, optionally describe its audience, choose an answer format, and get a structured prompt you can edit and copy.

The improvement runs locally in your browser using a prompt template; it does not call an AI service or send your text anywhere.

## Run locally

Open `index.html` directly in a browser, or serve this folder with Python:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Files

- `index.html` — application structure
- `styles.css` — responsive layout and themes
- `app.js` — local prompt formatting, theme toggle, and copy interaction

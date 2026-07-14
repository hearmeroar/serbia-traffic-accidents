# Serbia Traffic Accidents Dashboard

Static site, no build step. `index.html` + `style.css` + `app.js` fetch the JSON aggregates in `data/`.

## Run locally

```
npm run dev
```

then open http://localhost:8080.

## Deploy

Any static host works — point it at this `app/` directory as the site root:

- **Vercel / Netlify**: import the repo, set the root directory to `app/`, no build command.
- **GitHub Pages**: publish the `app/` directory (or copy its contents to the Pages branch).

### Python/WSGI hosts

For platforms that only run a Python process (expect a `Procfile` + `gunicorn`, no static-site option), use the Flask wrapper at the repo root instead — it serves this same `app/` directory unchanged, no app logic:

```
pip install -r requirements.txt
gunicorn wsgi:app
```

`wsgi.py` / `Procfile` / `requirements.txt` live one level up, at the repo root.

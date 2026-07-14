# Serbia Traffic Accidents Dashboard

Static site, no build step. `index.html` + `style.css` + `app.js` fetch the JSON aggregates in `data/`.

Live: https://hearmeroar.github.io/serbia-traffic-accidents/

## Run locally

```
npm run dev
```

then open http://localhost:8080.

## Deploy

Any static host works — point it at this `app/` directory as the site root:

- **GitHub Pages** (current): `.github/workflows/deploy-pages.yml` at the repo root publishes this `app/` directory on every push to `main`, via GitHub Actions.
- **Vercel / Netlify**: import the repo, set the root directory to `app/`, no build command.

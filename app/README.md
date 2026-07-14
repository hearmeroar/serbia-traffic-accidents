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

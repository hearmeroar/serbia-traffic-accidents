# Open Data Playground — project context

Analysis of traffic accidents (DTP) in Serbia from the data.gov.rs open data portal (Ministry of Interior), 2015–2026.

## Data

- `data/dtp_2015.xlsx` … `data/dtp_2026.xlsx` — raw per-year source records. Columns (no header row): id, region, municipality, datetime (`DD.MM.YYYY,HH:MM`), lon, lat, severity (`Sa mat.stetom` / `Sa povredjenim` / `Sa poginulim`), category, description.
- `data/all_records.parquet` — all records, `dt_raw`/`severity`/`dt` only (region/municipality/coords were dropped when this was first built — re-derived separately for the geo pipeline below).
- `data/yearly_summary.csv` — per-year summary.
- `data/{yearly,monthly,weekly,daily}.json` — nationwide precomputed aggregates, fields: `mat` (property damage only), `inj` (injuries), `fat` (fatalities), `total`. Weekly has `iso_year`/`iso_week`, daily has `date`.
- `data/geo/index.json` + `data/geo/region/{0..26}.json` + `data/geo/muni/{0..161}.json` — same yearly/monthly/weekly/daily aggregate shape, scoped to one region or municipality (27 regions, 162 municipalities, each municipality belongs to exactly one region). Built from the raw xlsx region/municipality columns. Index files are keyed by array position, not name — filenames are just the index.
- `data/weather_raw/{city}.json` — raw Open-Meteo daily archive responses for 8 representative cities (Beograd, Novi Sad, Nis, Kragujevac, Subotica, Uzice, Zrenjanin, Kraljevo), one fetch per city for the whole 2015-01-01..2026-05-31 range (`archive-api.open-meteo.com/v1/archive`, no API key). This is a one-time historical fetch — don't re-fetch, the data doesn't change.
- `data/weather_weekly.json` — the 8 cities' daily values simple-averaged per day, then bucketed into the same ISO weeks as the accident data (temp = mean of daily means, precip/snow = weekly sum, wind = weekly max). Exactly 596 rows, matching `weekly.json` 1:1 on `(iso_year, iso_week)`.
- Data spans 2015-01-01 … 2026-05-31. **2015 and 2026 are partial years**: 2015 collection ramped up mid-year (sharp jump from September 2015), 2026 cuts off at May.
- Everything under `data/` is duplicated into `app/data/` — that's the copy the dashboard actually fetches. Re-copy manually after regenerating anything in `data/`.

## App (`app/`)

Static site, no build step: `index.html` + `style.css` + `app.js`, data loaded via `fetch('data/*.json')`.

- All UI copy is **in English** (chat conversation stays Russian, app is English). Code comments in English too.
- Run: `cd app && npm run dev` (alias for `python3 -m http.server 8080`) → http://localhost:8080.
- Deploy: any static host with root = `app/`, no build command (see `app/README.md`).

### Chart / range picker
- Year, Month, Week all render as a stacked bar chart; Day renders as a stacked area chart (4169 points — too dense for bars). Week was area chart originally, changed to bar per user request.
- Date-range picker: GA4-style trigger button + popover — named presets (last 7/30 days, last month/quarter/year/3y/5y, this year, all time, custom), typed `DD.MM.YYYY` inputs, a click-to-select calendar, and the granularity switch, all staged and committed via Apply. Presets anchor to the dataset's max date (2026-05-31), not real wall-clock time.
- Region/municipality filter: two styled `<select>`s next to the range trigger. Selecting either lazy-fetches the matching `data/geo/{region,muni}/{idx}.json` bundle (cached in memory after first fetch) and swaps it in as the active data source; "All regions"/"All municipalities" reverts to the nationwide files with zero extra fetch. Sparse municipalities are zero-filled (`densify()` in app.js) against the nationwide period list so area/bar charts don't silently skip zero-accident periods.
- Holiday markers: small dots above the bar/area top on Week and Day views only (Year/Month are too coarse), for a static hand-built list of Serbian public holidays 2015–2026 (`HOLIDAYS` in app.js; Orthodox Easter dates computed via the Julian/Meeus algorithm, not hand-typed). Native SVG `<title>` gives the hover name. Legend item always visible with a `(?)` hint explaining the week/day-only scope, dimmed (not hidden) on Year/Month so the hint stays discoverable.
- Weather overlay: "Show weather" button next to "Table" (top-right of the card), lazy-fetches `data/weather_weekly.json` on first click. Only applies on the Week view (that's the only granularity weather is joined against) — a temperature line (right-hand axis, own scale) plus a low-opacity precipitation area, both keyed by `(iso_year, iso_week)` onto the same points already on screen. Tooltip appends temp/precip/snow/wind rows when weather is active.
- KPI tiles: Absolute / Per 1,000 vehicles toggle above the stat tiles. The per-1,000 series (`FLEET_ESTIMATE` in app.js) is **not** an official year-by-year RZS series — only 2015 (1,833,219) and 2023 (2,389,105) passenger-car counts are confirmed; everything else is geometric interpolation/extrapolation at the constant ~3.366%/year CAGR those two imply. RZS's real per-year table lives behind an interactive form (`data.stat.gov.rs/Home/Result/150201`) that couldn't be scraped programmatically — replace `FLEET_ESTIMATE` if a real series is ever pulled from there. The `norm-note` caption under the toggle discloses this whenever per-1,000 mode is active.

### Known bugs fixed along the way (don't reintroduce)
- `computeTicks`'s tick-building loop could stop one step short of the real max (bars overflowing the SVG, overlapping the legend above) — fixed by looping until the last tick is ≥ maxVal, not by a fixed iteration bound.
- `niceStep` could round to a sub-1 step for small maxVal (e.g. a single quiet day for a small municipality), which rounds to 0 every iteration and spins `computeTicks`'s loop forever (`Invalid array length`). Fixed by flooring the step at 1 — counts are always integers.
- The popover's "click outside to close" listener used `contains(e.target)`, which breaks when the click handler rebuilds the DOM (e.g. picking a preset) mid-bubble and detaches `e.target` before the outer listener runs. Fixed with `composedPath()`, which is fixed at dispatch time.
- The calendar used to rebuild all 42 day cells on every `mouseenter` for the hover-preview highlight — thrashed the DOM under the cursor. Split into a one-time grid build (on month change) and a cheap class-only highlight update (on hover).
- A general `svg { width:100%; height:auto }` rule (added for the chart's responsiveness) also hijacked the small icon svgs in the trigger buttons, blowing them up to fill their container. Scoped to `#chart` only.
- Recurring gotcha: any element toggled via the `hidden` JS/HTML attribute needs an explicit `[hidden] { display: none; }` rule if its base class also sets `display` (flex/block/etc) — the class's `display` otherwise beats the browser's default `[hidden]` styling and the element stays visible with `hidden` set. Hit this three times: `.empty-msg`, `.stats-row`/`.norm-toggle`, `.legend-item` (the last one silently broke the weather legend items). Check for this pattern first whenever a `hidden`-toggled element "isn't hiding."
- `addMonthsClamped` used `Date.setUTCMonth()` directly, which overflows into the next month when the target month is shorter (e.g. subtracting 1 month from May 31 lands on May 1, not April 30). Fixed by clamping the day-of-month to the target month's real length.

## Permissions

This project's `.claude/settings.local.json` allows all Bash without confirmation (`permissions.allow: ["Bash"]`) — done at the user's explicit request. Doesn't change the practice of still confirming genuinely destructive actions separately (see general guidelines).

## Open findings / analysis threads

- Seasonality (averaged 2016–2025, accidents/day): trough in February (~82), gradual rise to an October peak (~104), a dip in November, a secondary rise in December (~101).
- Property-damage-only (minor) crashes peak in October/December; fatalities, by contrast, peak in summer (July–September) and decline toward winter — i.e., the pre-winter rise in accident count isn't accompanied by a rise in severity.
- Seasonality hypotheses, now partly testable in-app via the weather overlay and holiday markers (Week view): autumn weather/black ice, shorter daylight hours, a summer fatality peak (motorcycle season, holiday travel, speed), December holiday traffic, a possible year-end reporting artifact.
- A self-contained single-file version of an early build (data hardcoded into JS, no region/holiday/weather features) lives in scratchpad and was published via the Artifact tool for a shareable preview link. It's stale relative to `app/` and not the source of truth.

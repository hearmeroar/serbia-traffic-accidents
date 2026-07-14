const SEG_DEFS = [
  { key: 'mat', label: 'Property damage only', varName: '--sev-1' },
  { key: 'inj', label: 'Injuries', varName: '--sev-2' },
  { key: 'fat', label: 'Fatalities', varName: '--sev-3' },
];

const RANGE_META = {
  year: {
    periodNoun: 'year',
    chartTitle: 'Accidents by year, split by severity',
    chartSub: 'Bar height = total accidents in the year. Segments stack by severity, lowest to highest.',
    mode: 'bar',
    colHeader: 'Year',
  },
  month: {
    periodNoun: 'month',
    chartTitle: 'Accidents by month, split by severity',
    chartSub: 'Bar height = total accidents in the month. Segments stack by severity, lowest to highest.',
    mode: 'bar',
    colHeader: 'Month',
  },
  week: {
    periodNoun: 'week',
    chartTitle: 'Accidents by week, split by severity',
    chartSub: 'Bar height = total accidents in the ISO week. Segments stack by severity, lowest to highest.',
    mode: 'bar',
    colHeader: 'Week',
  },
  day: {
    periodNoun: 'day',
    chartTitle: 'Accidents by day, split by severity',
    chartSub: 'Area height = total accidents in the day. Layers stack by severity, lowest to highest.',
    mode: 'area',
    colHeader: 'Date',
  },
};

const GRAN_LABEL = { year: 'Year', month: 'Month', week: 'Week', day: 'Day' };
const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTH_NAMES_FULL = ['January','February','March','April','May','June','July','August','September','October','November','December'];

// Serbian public (non-working) holidays, 2015-2026. Fixed dates are the same
// every year; Orthodox Easter moves, so Good Friday-Easter Monday is computed
// per year via the Julian Easter algorithm (Meeus) and converted to the
// Gregorian calendar (+13 days, valid for 1900-2099).
const HOLIDAYS = [
  { name: 'New Year', start: '2015-01-01', end: '2015-01-02' },
  { name: 'Orthodox Christmas', start: '2015-01-07', end: '2015-01-07' },
  { name: 'Statehood Day', start: '2015-02-15', end: '2015-02-16' },
  { name: 'Orthodox Easter', start: '2015-04-10', end: '2015-04-13' },
  { name: 'Labour Day', start: '2015-05-01', end: '2015-05-02' },
  { name: 'Armistice Day', start: '2015-11-11', end: '2015-11-11' },
  { name: 'New Year', start: '2016-01-01', end: '2016-01-02' },
  { name: 'Orthodox Christmas', start: '2016-01-07', end: '2016-01-07' },
  { name: 'Statehood Day', start: '2016-02-15', end: '2016-02-16' },
  { name: 'Orthodox Easter', start: '2016-04-29', end: '2016-05-02' },
  { name: 'Labour Day', start: '2016-05-01', end: '2016-05-02' },
  { name: 'Armistice Day', start: '2016-11-11', end: '2016-11-11' },
  { name: 'New Year', start: '2017-01-01', end: '2017-01-02' },
  { name: 'Orthodox Christmas', start: '2017-01-07', end: '2017-01-07' },
  { name: 'Statehood Day', start: '2017-02-15', end: '2017-02-16' },
  { name: 'Orthodox Easter', start: '2017-04-14', end: '2017-04-17' },
  { name: 'Labour Day', start: '2017-05-01', end: '2017-05-02' },
  { name: 'Armistice Day', start: '2017-11-11', end: '2017-11-11' },
  { name: 'New Year', start: '2018-01-01', end: '2018-01-02' },
  { name: 'Orthodox Christmas', start: '2018-01-07', end: '2018-01-07' },
  { name: 'Statehood Day', start: '2018-02-15', end: '2018-02-16' },
  { name: 'Orthodox Easter', start: '2018-04-06', end: '2018-04-09' },
  { name: 'Labour Day', start: '2018-05-01', end: '2018-05-02' },
  { name: 'Armistice Day', start: '2018-11-11', end: '2018-11-11' },
  { name: 'New Year', start: '2019-01-01', end: '2019-01-02' },
  { name: 'Orthodox Christmas', start: '2019-01-07', end: '2019-01-07' },
  { name: 'Statehood Day', start: '2019-02-15', end: '2019-02-16' },
  { name: 'Orthodox Easter', start: '2019-04-26', end: '2019-04-29' },
  { name: 'Labour Day', start: '2019-05-01', end: '2019-05-02' },
  { name: 'Armistice Day', start: '2019-11-11', end: '2019-11-11' },
  { name: 'New Year', start: '2020-01-01', end: '2020-01-02' },
  { name: 'Orthodox Christmas', start: '2020-01-07', end: '2020-01-07' },
  { name: 'Statehood Day', start: '2020-02-15', end: '2020-02-16' },
  { name: 'Orthodox Easter', start: '2020-04-17', end: '2020-04-20' },
  { name: 'Labour Day', start: '2020-05-01', end: '2020-05-02' },
  { name: 'Armistice Day', start: '2020-11-11', end: '2020-11-11' },
  { name: 'New Year', start: '2021-01-01', end: '2021-01-02' },
  { name: 'Orthodox Christmas', start: '2021-01-07', end: '2021-01-07' },
  { name: 'Statehood Day', start: '2021-02-15', end: '2021-02-16' },
  { name: 'Orthodox Easter', start: '2021-04-30', end: '2021-05-03' },
  { name: 'Labour Day', start: '2021-05-01', end: '2021-05-02' },
  { name: 'Armistice Day', start: '2021-11-11', end: '2021-11-11' },
  { name: 'New Year', start: '2022-01-01', end: '2022-01-02' },
  { name: 'Orthodox Christmas', start: '2022-01-07', end: '2022-01-07' },
  { name: 'Statehood Day', start: '2022-02-15', end: '2022-02-16' },
  { name: 'Orthodox Easter', start: '2022-04-22', end: '2022-04-25' },
  { name: 'Labour Day', start: '2022-05-01', end: '2022-05-02' },
  { name: 'Armistice Day', start: '2022-11-11', end: '2022-11-11' },
  { name: 'New Year', start: '2023-01-01', end: '2023-01-02' },
  { name: 'Orthodox Christmas', start: '2023-01-07', end: '2023-01-07' },
  { name: 'Statehood Day', start: '2023-02-15', end: '2023-02-16' },
  { name: 'Orthodox Easter', start: '2023-04-14', end: '2023-04-17' },
  { name: 'Labour Day', start: '2023-05-01', end: '2023-05-02' },
  { name: 'Armistice Day', start: '2023-11-11', end: '2023-11-11' },
  { name: 'New Year', start: '2024-01-01', end: '2024-01-02' },
  { name: 'Orthodox Christmas', start: '2024-01-07', end: '2024-01-07' },
  { name: 'Statehood Day', start: '2024-02-15', end: '2024-02-16' },
  { name: 'Orthodox Easter', start: '2024-05-03', end: '2024-05-06' },
  { name: 'Labour Day', start: '2024-05-01', end: '2024-05-02' },
  { name: 'Armistice Day', start: '2024-11-11', end: '2024-11-11' },
  { name: 'New Year', start: '2025-01-01', end: '2025-01-02' },
  { name: 'Orthodox Christmas', start: '2025-01-07', end: '2025-01-07' },
  { name: 'Statehood Day', start: '2025-02-15', end: '2025-02-16' },
  { name: 'Orthodox Easter', start: '2025-04-18', end: '2025-04-21' },
  { name: 'Labour Day', start: '2025-05-01', end: '2025-05-02' },
  { name: 'Armistice Day', start: '2025-11-11', end: '2025-11-11' },
  { name: 'New Year', start: '2026-01-01', end: '2026-01-02' },
  { name: 'Orthodox Christmas', start: '2026-01-07', end: '2026-01-07' },
  { name: 'Statehood Day', start: '2026-02-15', end: '2026-02-16' },
  { name: 'Orthodox Easter', start: '2026-04-10', end: '2026-04-13' },
  { name: 'Labour Day', start: '2026-05-01', end: '2026-05-02' },
  { name: 'Armistice Day', start: '2026-11-11', end: '2026-11-11' },
];

// Estimated registered-vehicle fleet size per year, for the "per 1,000 vehicles"
// normalization toggle. Only two years are confirmed RZS figures (passenger cars):
// 2015 = 1,833,219 and 2023 = 2,389,105. Everything else is interpolated (2016-2022)
// or extrapolated (2024-2026) at the constant ~3.366%/year growth rate implied by
// those two anchors — NOT an official year-by-year RZS series. Surfaced to the user
// via the "norm-note" caption whenever the toggle is active.
const FLEET_ESTIMATE = {
  2015: 1833219, 2016: 1894925, 2017: 1958707, 2018: 2024637,
  2019: 2092786, 2020: 2163229, 2021: 2236042, 2022: 2311307,
  2023: 2389105, 2024: 2469522, 2025: 2552645, 2026: 2638567,
};
function fleetForYear(year) {
  return FLEET_ESTIMATE[Math.max(2015, Math.min(2026, year))];
}
function per1000(value, year) {
  return (value / fleetForYear(year)) * 1000;
}

const NS = 'http://www.w3.org/2000/svg';
const W = 932, H = 380;
const marginL = 48, marginR = 12, marginT = 10, marginB = 34;
const plotW = W - marginL - marginR;
const plotH = H - marginT - marginB;

let raw = { year: [], month: [], week: [], day: [] };
let datasetMin, datasetMax;

let geoIndex = null;
let activeGeoRaw = null; // null = nationwide; otherwise a {yearly,monthly,weekly,daily} bundle for one region/municipality
const geoCache = { region: {}, muni: {} };

let currentRange = 'year';
let currentWindow = null;
let normMode = 'absolute';

let weatherData = null;
let weatherMap = null;
let weatherEnabled = false;

async function ensureWeatherLoaded() {
  if (weatherData) return weatherData;
  weatherData = await fetch('data/weather_weekly.json').then(r => r.json());
  weatherMap = new Map(weatherData.map(w => [`${w.iso_year}-${w.iso_week}`, w]));
  return weatherData;
}

let pendingRange = 'year';
let pendingWindow = null;
let pendingPresetKey = 'all';
let calendarMonth = null;
let pickAnchor = null;
let hoverDate = null;

function fmt(n) { return Math.round(n).toLocaleString('en-US'); }
function pad2(n) { return String(n).padStart(2, '0'); }
function dateUTC(y, m, d) { return new Date(Date.UTC(y, m, d)); }
function parseISODate(s) { const [y, m, d] = s.split('-').map(Number); return dateUTC(y, m - 1, d); }

const HOLIDAYS_PARSED = HOLIDAYS.map(h => ({ ...h, startDate: parseISODate(h.start), endDate: parseISODate(h.end) }));
function holidaysOverlapping(start, end) {
  return HOLIDAYS_PARSED.filter(h => h.startDate <= end && h.endDate >= start);
}
function fmtDDMMYYYY(date) { return `${pad2(date.getUTCDate())}.${pad2(date.getUTCMonth() + 1)}.${date.getUTCFullYear()}`; }
function fmtShort(date) { return `${date.getUTCDate()} ${MONTH_NAMES[date.getUTCMonth()]}`; }
function fmtShortYear(date) { return `${fmtShort(date)} ${date.getUTCFullYear()}`; }
function formatRangeLabel(start, end) {
  const sameYear = start.getUTCFullYear() === end.getUTCFullYear();
  return `${sameYear ? fmtShort(start) : fmtShortYear(start)} – ${fmtShortYear(end)}`;
}
function addMonthsClamped(date, delta) {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + delta;
  const targetYear = y + Math.floor(m / 12);
  const targetMonth = ((m % 12) + 12) % 12;
  const daysInTargetMonth = dateUTC(targetYear, targetMonth + 1, 0).getUTCDate();
  const day = Math.min(date.getUTCDate(), daysInTargetMonth);
  return dateUTC(targetYear, targetMonth, day);
}
function addDays(date, delta) { return new Date(date.getTime() + delta * 86400000); }
function sameDay(a, b) { return a.getTime() === b.getTime(); }
function clampDate(d, min, max) { return d < min ? min : d > max ? max : d; }
function clampWindow(win) { return { start: clampDate(win.start, datasetMin, datasetMax), end: clampDate(win.end, datasetMin, datasetMax) }; }

function isoWeekMonday(isoYear, isoWeek) {
  const simple = new Date(Date.UTC(isoYear, 0, 1 + (isoWeek - 1) * 7));
  const dow = simple.getUTCDay() || 7;
  simple.setUTCDate(simple.getUTCDate() + 1 - dow);
  return simple;
}

function normalizeYear(data) {
  const firstYear = data[0].year, lastYear = data[data.length - 1].year;
  return data.map(d => ({
    axisLabel: d.year === firstYear || d.year === lastYear ? d.year + '*' : String(d.year),
    full: String(d.year),
    mat: d.mat, inj: d.inj, fat: d.fat, total: d.total,
    partial: d.year === firstYear || d.year === lastYear,
    startDate: dateUTC(d.year, 0, 1),
    endDate: dateUTC(d.year, 11, 31),
  }));
}

function normalizeMonth(data) {
  return data.map(d => ({
    axisLabel: d.month === 1 ? String(d.year) : '',
    full: `${MONTH_NAMES[d.month - 1]} ${d.year}`,
    mat: d.mat, inj: d.inj, fat: d.fat, total: d.total,
    partial: false,
    startDate: dateUTC(d.year, d.month - 1, 1),
    endDate: dateUTC(d.year, d.month, 0),
  }));
}

function normalizeWeek(data) {
  let lastYear = null;
  return data.map(d => {
    const isNewYear = d.iso_year !== lastYear;
    lastYear = d.iso_year;
    const monday = isoWeekMonday(d.iso_year, d.iso_week);
    return {
      axisLabel: isNewYear ? String(d.iso_year) : '',
      full: `Week ${d.iso_week}, ${d.iso_year} (from ${monday.toISOString().slice(0, 10)})`,
      mat: d.mat, inj: d.inj, fat: d.fat, total: d.total,
      partial: false,
      startDate: monday,
      endDate: addDays(monday, 6),
      isoYear: d.iso_year,
      isoWeek: d.iso_week,
    };
  });
}

function normalizeDay(data) {
  let lastYear = null;
  return data.map(d => {
    const year = d.date.slice(0, 4);
    const isNewYear = year !== lastYear;
    lastYear = year;
    const dateObj = parseISODate(d.date);
    return {
      axisLabel: isNewYear ? year : '',
      full: d.date,
      mat: d.mat, inj: d.inj, fat: d.fat, total: d.total,
      partial: false,
      startDate: dateObj,
      endDate: dateObj,
    };
  });
}

const PERIOD_KEY = {
  year: d => String(d.year),
  month: d => `${d.year}-${d.month}`,
  week: d => `${d.iso_year}-${d.iso_week}`,
  day: d => d.date,
};

// Geo bundles only store periods with at least one accident (keeps the per-entity
// files small). A quiet municipality can have whole days/weeks/years with zero
// accidents that are simply absent from its rows. Without filling those gaps back
// in, the week/day area chart would draw a line straight across the gap as if the
// missing period didn't exist, instead of dipping to zero. Densify against the
// nationwide series (which is already gap-free) so every period appears.
function densify(entityRows, nationwideRows, range) {
  const keyFn = PERIOD_KEY[range];
  const byKey = new Map(entityRows.map(d => [keyFn(d), d]));
  return nationwideRows.map(d => {
    const hit = byKey.get(keyFn(d));
    return hit || { ...d, mat: 0, inj: 0, fat: 0, total: 0 };
  });
}

function getPoints(range) {
  const source = activeGeoRaw ? densify(activeGeoRaw[range], raw[range], range) : raw[range];
  if (range === 'year') return normalizeYear(source);
  if (range === 'month') return normalizeMonth(source);
  if (range === 'week') return normalizeWeek(source);
  return normalizeDay(source);
}

function filterPoints(points, win) {
  if (!win) return points;
  return points.filter(p => p.endDate >= win.start && p.startDate <= win.end);
}

const PRESETS = [
  { key: '7d', label: 'Last 7 days', compute: () => ({ start: addDays(datasetMax, -6), end: datasetMax }) },
  { key: '30d', label: 'Last 30 days', compute: () => ({ start: addDays(datasetMax, -29), end: datasetMax }) },
  { key: '1m', label: 'Last month', compute: () => ({ start: addMonthsClamped(datasetMax, -1), end: datasetMax }) },
  { key: '3m', label: 'Last quarter', compute: () => ({ start: addMonthsClamped(datasetMax, -3), end: datasetMax }) },
  { key: '1y', label: 'Last year', compute: () => ({ start: addMonthsClamped(datasetMax, -12), end: datasetMax }) },
  { key: '3y', label: 'Last 3 years', compute: () => ({ start: addMonthsClamped(datasetMax, -36), end: datasetMax }) },
  { key: '5y', label: 'Last 5 years', compute: () => ({ start: addMonthsClamped(datasetMax, -60), end: datasetMax }) },
  { key: 'thisyear', label: 'This year', compute: () => ({ start: dateUTC(datasetMax.getUTCFullYear(), 0, 1), end: datasetMax }) },
  { key: 'all', label: 'All time', compute: () => ({ start: datasetMin, end: datasetMax }) },
  { key: 'custom', label: 'Custom', compute: null },
];

function findMatchingPreset(win) {
  for (const p of PRESETS) {
    if (p.key === 'custom') continue;
    const w = clampWindow(p.compute());
    if (sameDay(w.start, win.start) && sameDay(w.end, win.end)) return p.key;
  }
  return 'custom';
}

function niceStep(roughStep) {
  if (roughStep <= 0) return 1;
  const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const residual = roughStep / magnitude;
  let niceResidual;
  if (residual < 1.5) niceResidual = 1;
  else if (residual < 3) niceResidual = 2;
  else if (residual < 7) niceResidual = 5;
  else niceResidual = 10;
  // Counts are always integers, so a sub-1 step (possible for small roughStep,
  // e.g. a single quiet day) would round to 0 on every iteration and spin
  // computeTicks' loop forever. Floor it at 1.
  return Math.max(1, niceResidual * magnitude);
}

function computeTicks(maxVal, targetCount) {
  const step = niceStep(maxVal / targetCount);
  const ticks = [0];
  while (ticks[ticks.length - 1] < maxVal) ticks.push(Math.round(ticks[ticks.length - 1] + step));
  return { ticks, yMax: ticks[ticks.length - 1] };
}

function tickText(v) {
  if (v === 0) return '0';
  if (v % 1000 === 0) return (v / 1000) + 'k';
  if (v >= 1000) return (v / 1000).toFixed(1) + 'k';
  return String(v);
}

function el(tag, attrs) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  return e;
}

function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function clearSvg(svg) {
  while (svg.firstChild) svg.removeChild(svg.firstChild);
}

function toSvgX(evt, svg) {
  const rect = svg.getBoundingClientRect();
  return (evt.clientX - rect.left) * (W / rect.width);
}

function buildTooltipContent(point) {
  const frag = document.createDocumentFragment();
  const head = document.createElement('div');
  head.className = 't-year';
  head.textContent = point.full + (point.partial ? ' (partial)' : '');
  frag.appendChild(head);
  SEG_DEFS.forEach(seg => {
    const row = document.createElement('div');
    row.className = 't-row';
    const keyWrap = document.createElement('div');
    keyWrap.className = 't-key';
    const line = document.createElement('span');
    line.className = 't-line';
    line.style.background = cssVar(seg.varName);
    keyWrap.appendChild(line);
    const label = document.createElement('span');
    label.textContent = seg.label;
    keyWrap.appendChild(label);
    row.appendChild(keyWrap);
    const valEl = document.createElement('span');
    valEl.className = 't-val';
    valEl.textContent = fmt(point[seg.key]);
    row.appendChild(valEl);
    frag.appendChild(row);
  });
  const totalRow = document.createElement('div');
  totalRow.className = 't-total';
  const totalLabel = document.createElement('span');
  totalLabel.textContent = 'Total';
  const totalVal = document.createElement('span');
  totalVal.className = 't-val';
  totalVal.textContent = fmt(point.total);
  totalRow.appendChild(totalLabel);
  totalRow.appendChild(totalVal);
  frag.appendChild(totalRow);

  if (point.weather) {
    const w = point.weather;
    const weatherRows = [
      ['Avg temp', `${w.temp_mean}°C`],
      ['Precipitation', `${w.precip_sum} mm`],
      ['Snowfall', `${w.snow_sum} mm`],
      ['Max wind', `${w.wind_max} km/h`],
    ];
    weatherRows.forEach(([label, val], idx) => {
      const row = document.createElement('div');
      row.className = 't-row t-weather' + (idx === 0 ? ' t-weather-first' : '');
      const labelEl = document.createElement('span');
      labelEl.textContent = label;
      labelEl.style.color = 'var(--text-secondary)';
      const valEl = document.createElement('span');
      valEl.className = 't-val';
      valEl.textContent = val;
      row.appendChild(labelEl);
      row.appendChild(valEl);
      frag.appendChild(row);
    });
  }

  return frag;
}

function positionTooltip(tooltip, chartHost, clientX, clientY) {
  const hostRect = chartHost.getBoundingClientRect();
  const px = clientX - hostRect.left;
  const py = clientY - hostRect.top;
  tooltip.style.left = Math.min(px + 14, chartHost.clientWidth - 190) + 'px';
  tooltip.style.top = Math.max(py - 90, 0) + 'px';
}

function renderHolidayMarkers(svg, points, xFn, yScale) {
  points.forEach((d, i) => {
    const hits = holidaysOverlapping(d.startDate, d.endDate);
    if (!hits.length) return;
    const marker = el('circle', { cx: xFn(i), cy: yScale(d.total) - 7, r: 3, class: 'holiday-marker' });
    const title = document.createElementNS(NS, 'title');
    title.textContent = hits.map(h => h.name).join(', ');
    marker.appendChild(title);
    svg.appendChild(marker);
  });
}

function computeTempScale(points) {
  const temps = points.map(p => p.weather && p.weather.temp_mean).filter(v => v != null);
  if (!temps.length) return null;
  const tMin = Math.min(...temps), tMax = Math.max(...temps);
  const pad = Math.max(2, (tMax - tMin) * 0.15);
  const lo = tMin - pad, hi = tMax + pad;
  return { lo, hi, scale: t => marginT + plotH - ((t - lo) / (hi - lo)) * plotH };
}

function renderPrecipLine(svg, points, xFn) {
  const precips = points.map(p => (p.weather ? p.weather.precip_sum : 0));
  const pMax = Math.max(...precips, 1) * 1.15;
  const scaleP = p => marginT + plotH - (p / pMax) * plotH;
  const d = 'M ' + points.map((p, i) => `${xFn(i)} ${scaleP(precips[i])}`).join(' L ');
  svg.appendChild(el('path', { d, class: 'precip-line' }));
  points.forEach((p, i) => {
    svg.appendChild(el('circle', { cx: xFn(i), cy: scaleP(precips[i]), r: 1.4, class: 'precip-dot' }));
  });
}

function renderTempLine(svg, points, xFn) {
  const scale = computeTempScale(points);
  if (!scale) return;
  const withTemp = points.map((p, i) => (p.weather ? [i, p.weather.temp_mean] : null)).filter(Boolean);
  if (!withTemp.length) return;

  const d = 'M ' + withTemp.map(([i, t]) => `${xFn(i)} ${scale.scale(t)}`).join(' L ');
  svg.appendChild(el('path', { d, class: 'temp-line' }));
  withTemp.forEach(([i, t]) => {
    svg.appendChild(el('circle', { cx: xFn(i), cy: scale.scale(t), r: 1.6, class: 'temp-dot' }));
  });

  const tickCount = 4;
  for (let k = 0; k <= tickCount; k++) {
    const t = scale.lo + (scale.hi - scale.lo) * (k / tickCount);
    const y = scale.scale(t);
    const label = el('text', { x: W - marginR + 6, y: y + 4, class: 'axis-text weather-temp' });
    label.textContent = Math.round(t) + '°';
    svg.appendChild(label);
  }
}

function renderBarChart(svg, points, showHolidays, weatherOn) {
  const maxTotal = Math.max(...points.map(d => d.total), 1);
  const { ticks, yMax } = computeTicks(maxTotal, 5);
  const yScale = v => marginT + plotH - (v / yMax) * plotH;

  ticks.forEach(v => {
    const y = yScale(v);
    svg.appendChild(el('line', { x1: marginL, x2: W - marginR, y1: y, y2: y, class: 'gridline' }));
    const t = el('text', { x: marginL - 8, y: y + 4, class: 'axis-text', 'text-anchor': 'end' });
    t.textContent = tickText(v);
    svg.appendChild(t);
  });
  svg.appendChild(el('line', { x1: marginL, x2: W - marginR, y1: yScale(0), y2: yScale(0), stroke: 'var(--baseline)', 'stroke-width': 1, 'shape-rendering': 'crispEdges' }));

  const n = points.length;
  const bandW = plotW / n;
  const barW = Math.max(1.4, Math.min(24, bandW * 0.62));
  const gap = n <= 20 ? 2 : 0.6;
  const showTotalLabels = n <= 12;
  const xCenter = i => marginL + bandW * i + bandW / 2;

  const tooltip = document.getElementById('tooltip');
  const chartHost = document.getElementById('chartHost');

  points.forEach((d, i) => {
    const cx = xCenter(i);
    const x0 = cx - barW / 2;
    let yCursor = yScale(0);
    const group = el('g', {});
    svg.appendChild(group);

    SEG_DEFS.forEach((seg, si) => {
      const val = d[seg.key];
      const segH = (val / yMax) * plotH;
      const yTop = yCursor - segH;
      const isTop = si === SEG_DEFS.length - 1;
      const drawH = Math.max(segH - gap, 0);
      const rectY = isTop ? yTop : yTop + gap / 2;
      const r = barW > 4 ? 3 : 0;
      const rTop = isTop ? r : 0;
      const yb = rectY + drawH;
      const dPath = `M ${x0} ${yb} L ${x0} ${rectY + rTop} Q ${x0} ${rectY} ${x0 + rTop} ${rectY} L ${x0 + barW - rTop} ${rectY} Q ${x0 + barW} ${rectY} ${x0 + barW} ${rectY + rTop} L ${x0 + barW} ${yb} Z`;

      const path = el('path', { d: dPath, fill: cssVar(seg.varName), class: 'bar-seg' });
      group.appendChild(path);

      const showTip = (evt) => {
        path.classList.add('hover');
        tooltip.innerHTML = '';
        tooltip.appendChild(buildTooltipContent(d));
        positionTooltip(tooltip, chartHost, evt.clientX, evt.clientY);
        tooltip.classList.add('show');
      };
      const hideTip = () => {
        path.classList.remove('hover');
        tooltip.classList.remove('show');
      };
      path.addEventListener('pointerenter', showTip);
      path.addEventListener('pointermove', showTip);
      path.addEventListener('pointerleave', hideTip);

      yCursor = yTop;
    });

    if (d.partial) {
      const totalH = (d.total / yMax) * plotH;
      svg.appendChild(el('rect', {
        x: x0 - 2, y: yScale(0) - totalH - 2, width: barW + 4, height: totalH + 4,
        class: 'partial-outline',
      }));
    }

    if (showTotalLabels) {
      const totalH = (d.total / yMax) * plotH;
      const labelY = yScale(0) - totalH - 8;
      const t = el('text', { x: cx, y: labelY, class: 'total-label' });
      t.textContent = fmt(d.total);
      svg.appendChild(t);
    }

    if (d.axisLabel) {
      const xt = el('text', { x: cx, y: H - 10, class: 'axis-text year', 'text-anchor': 'middle' });
      xt.textContent = d.axisLabel;
      svg.appendChild(xt);
    }
  });

  if (showHolidays) renderHolidayMarkers(svg, points, xCenter, yScale);
  if (weatherOn) {
    renderPrecipLine(svg, points, xCenter);
    renderTempLine(svg, points, xCenter);
  }
}

function renderAreaChart(svg, points, showHolidays) {
  const maxTotal = Math.max(...points.map(d => d.total), 1);
  const { ticks, yMax } = computeTicks(maxTotal, 5);
  const yScale = v => marginT + plotH - (v / yMax) * plotH;
  const n = points.length;
  const xScale = i => marginL + (n === 1 ? 0 : (i / (n - 1)) * plotW);

  ticks.forEach(v => {
    const y = yScale(v);
    svg.appendChild(el('line', { x1: marginL, x2: W - marginR, y1: y, y2: y, class: 'gridline' }));
    const t = el('text', { x: marginL - 8, y: y + 4, class: 'axis-text', 'text-anchor': 'end' });
    t.textContent = tickText(v);
    svg.appendChild(t);
  });
  svg.appendChild(el('line', { x1: marginL, x2: W - marginR, y1: yScale(0), y2: yScale(0), stroke: 'var(--baseline)', 'stroke-width': 1, 'shape-rendering': 'crispEdges' }));

  points.forEach((d, i) => {
    if (!d.axisLabel) return;
    const x = xScale(i);
    svg.appendChild(el('line', { x1: x, x2: x, y1: marginT, y2: yScale(0), class: 'gridline' }));
    const xt = el('text', { x, y: H - 10, class: 'axis-text year', 'text-anchor': 'middle' });
    xt.textContent = d.axisLabel;
    svg.appendChild(xt);
  });

  let cumBottom = points.map(() => 0);
  SEG_DEFS.forEach(seg => {
    const topPts = points.map((d, i) => [xScale(i), yScale(cumBottom[i] + d[seg.key])]);
    const botPts = points.map((d, i) => [xScale(i), yScale(cumBottom[i])]).reverse();
    const allPts = topPts.concat(botPts);
    const dPath = 'M ' + allPts.map(p => p[0] + ' ' + p[1]).join(' L ') + ' Z';
    const path = el('path', { d: dPath, fill: cssVar(seg.varName), class: 'area-seg' });
    svg.appendChild(path);
    cumBottom = points.map((d, i) => cumBottom[i] + d[seg.key]);
  });

  if (showHolidays) renderHolidayMarkers(svg, points, xScale, yScale);

  const hoverLine = el('line', { x1: 0, x2: 0, y1: marginT, y2: yScale(0), class: 'hover-line' });
  svg.appendChild(hoverLine);

  const tooltip = document.getElementById('tooltip');
  const chartHost = document.getElementById('chartHost');

  const showTip = (evt) => {
    const svgX = toSvgX(evt, svg);
    let idx = Math.round(((svgX - marginL) / plotW) * (n - 1));
    idx = Math.max(0, Math.min(n - 1, idx));
    const d = points[idx];
    const x = xScale(idx);
    hoverLine.setAttribute('x1', x);
    hoverLine.setAttribute('x2', x);
    hoverLine.style.opacity = '1';
    tooltip.innerHTML = '';
    tooltip.appendChild(buildTooltipContent(d));
    positionTooltip(tooltip, chartHost, evt.clientX, evt.clientY);
    tooltip.classList.add('show');
  };
  const hideTip = () => {
    hoverLine.style.opacity = '0';
    tooltip.classList.remove('show');
  };
  svg.addEventListener('pointermove', showTip);
  svg.addEventListener('pointerleave', hideTip);
}

function renderChart(range) {
  const meta = RANGE_META[range];
  const points = filterPoints(getPoints(range), currentWindow);
  const svg = document.getElementById('chart');
  const emptyMsg = document.getElementById('emptyMsg');
  clearSvg(svg);
  document.getElementById('chartTitle').textContent = meta.chartTitle;
  document.getElementById('chartSub').textContent = meta.chartSub;

  // KPI tiles are only meaningful at week granularity (per user preference) — hidden
  // by default on Year/Month/Day rather than shown-but-useless.
  const showStats = range === 'week';
  document.getElementById('normToggle').hidden = !showStats;
  document.getElementById('statsRow').hidden = !showStats;
  document.getElementById('normNote').hidden = !showStats || normMode !== 'per1000';

  if (points.length === 0) {
    emptyMsg.hidden = false;
    document.getElementById('statsRow').innerHTML = '';
    renderTable(range, points, meta);
    return;
  }
  emptyMsg.hidden = true;

  const showHolidays = range === 'week' || range === 'day';
  document.getElementById('holidayLegendItem').classList.toggle('inactive', !showHolidays);

  const weatherOn = range === 'week' && weatherEnabled && !!weatherMap;
  if (weatherOn) points.forEach(p => { p.weather = weatherMap.get(`${p.isoYear}-${p.isoWeek}`) || null; });
  document.getElementById('weatherLegendTemp').hidden = !weatherOn;
  document.getElementById('weatherLegendPrecip').hidden = !weatherOn;

  if (meta.mode === 'bar') renderBarChart(svg, points, showHolidays, weatherOn);
  else renderAreaChart(svg, points, showHolidays);
  renderTable(range, points, meta);
  renderStats(range, points, meta);
}

function renderTable(range, points, meta) {
  const thead = document.getElementById('tableHead');
  const tbody = document.getElementById('tableBody');
  thead.innerHTML = '';
  tbody.innerHTML = '';

  const headRow = document.createElement('tr');
  [meta.colHeader, 'Property damage only', 'Injuries', 'Fatalities', 'Total'].forEach(txt => {
    const th = document.createElement('th');
    th.textContent = txt;
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);

  const frag = document.createDocumentFragment();
  points.forEach(d => {
    const tr = document.createElement('tr');
    [d.full + (d.partial ? '*' : ''), fmt(d.mat), fmt(d.inj), fmt(d.fat), fmt(d.total)].forEach(txt => {
      const td = document.createElement('td');
      td.textContent = txt;
      tr.appendChild(td);
    });
    frag.appendChild(tr);
  });
  tbody.appendChild(frag);
}

function deltaTile(current, previous) {
  if (previous == null || previous === 0) return { text: 'no prior period to compare', cls: 'muted' };
  const pct = ((current - previous) / previous) * 100;
  const sign = pct > 0 ? '+' : '';
  const cls = pct < 0 ? 'good' : pct > 0 ? 'bad' : 'muted';
  return { text: `${sign}${pct.toFixed(1)}% vs previous`, cls };
}

function fmtRate(n) { return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

function renderStats(range, points, meta) {
  const statsRow = document.getElementById('statsRow');
  statsRow.innerHTML = '';

  const last = points[points.length - 1];
  const prev = points.length > 1 ? points[points.length - 2] : null;
  const perThousand = normMode === 'per1000';
  const valueOf = (p, key) => perThousand ? per1000(p[key], p.startDate.getUTCFullYear()) : p[key];
  const fmtValue = perThousand ? fmtRate : fmt;
  const unitSuffix = perThousand ? ' / 1k vehicles' : '';

  const avgRaw = perThousand
    ? points.reduce((s, d) => s + per1000(d.total, d.startDate.getUTCFullYear()), 0) / points.length
    : points.reduce((s, d) => s + d.total, 0) / points.length;

  const totalDelta = deltaTile(valueOf(last, 'total'), prev ? valueOf(prev, 'total') : null);
  const fatDelta = deltaTile(valueOf(last, 'fat'), prev ? valueOf(prev, 'fat') : null);

  const tiles = [
    {
      label: `Total accidents, latest ${meta.periodNoun} (${last.full})`,
      value: fmtValue(valueOf(last, 'total')) + unitSuffix,
      delta: totalDelta,
    },
    {
      label: `Fatalities, latest ${meta.periodNoun} (${last.full})`,
      value: fmtValue(valueOf(last, 'fat')) + unitSuffix,
      delta: fatDelta,
    },
    {
      label: `Average total per ${meta.periodNoun}`,
      value: fmtValue(avgRaw) + unitSuffix,
      delta: { text: `${points.length.toLocaleString('en-US')} ${meta.periodNoun}s in selected range`, cls: 'muted' },
    },
  ];

  tiles.forEach(t => {
    const tile = document.createElement('div');
    tile.className = 'stat-tile';
    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = t.label;
    const value = document.createElement('div');
    value.className = 'value';
    value.textContent = t.value;
    const delta = document.createElement('div');
    delta.className = 'delta ' + t.delta.cls;
    delta.textContent = t.delta.text;
    tile.appendChild(label);
    tile.appendChild(value);
    tile.appendChild(delta);
    statsRow.appendChild(tile);
  });
}

// --- Range picker (trigger + popover: presets, typed dates, calendar, granularity) ---

const rangePicker = document.getElementById('rangePicker');
const rangeTrigger = document.getElementById('rangeTrigger');
const rangePopover = document.getElementById('rangePopover');
const triggerLabel = document.getElementById('triggerLabel');
const presetSelect = document.getElementById('presetSelect');
const presetSelectLabel = document.getElementById('presetSelectLabel');
const presetListEl = document.getElementById('presetList');
const fromTextEl = document.getElementById('fromText');
const toTextEl = document.getElementById('toText');
const calPrevBtn = document.getElementById('calPrev');
const calNextBtn = document.getElementById('calNext');
const calMonthLabel = document.getElementById('calMonthLabel');
const calGrid = document.getElementById('calGrid');
const granularityRow = document.getElementById('granularityRow');
const applyBtn = document.getElementById('applyBtn');

function updateTriggerLabel() {
  const key = findMatchingPreset(currentWindow);
  const preset = PRESETS.find(p => p.key === key);
  const dateLabel = preset && preset.key !== 'custom'
    ? preset.label
    : formatRangeLabel(currentWindow.start, currentWindow.end);
  triggerLabel.textContent = `${dateLabel} · ${GRAN_LABEL[currentRange]}`;
}

function parseDDMMYYYY(s) {
  const m = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/.exec(s.trim());
  if (!m) return null;
  const dd = Number(m[1]), mm = Number(m[2]), yyyy = Number(m[3]);
  const d = dateUTC(yyyy, mm - 1, dd);
  if (d.getUTCFullYear() !== yyyy || d.getUTCMonth() !== mm - 1 || d.getUTCDate() !== dd) return null;
  return d;
}

function renderPresetList() {
  presetListEl.innerHTML = '';
  PRESETS.forEach(p => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'preset-item';

    const nameWrap = document.createElement('span');
    nameWrap.className = 'preset-name';
    if (p.key === pendingPresetKey) {
      const check = document.createElement('span');
      check.className = 'check';
      check.textContent = '✓';
      nameWrap.appendChild(check);
    }
    const nameText = document.createElement('span');
    nameText.textContent = p.label;
    nameWrap.appendChild(nameText);
    btn.appendChild(nameWrap);

    if (p.key !== 'custom') {
      const w = clampWindow(p.compute());
      const datesEl = document.createElement('span');
      datesEl.className = 'preset-dates';
      datesEl.textContent = formatRangeLabel(w.start, w.end);
      btn.appendChild(datesEl);
    }

    btn.addEventListener('click', () => {
      pendingPresetKey = p.key;
      if (p.key !== 'custom') {
        pendingWindow = clampWindow(p.compute());
        calendarMonth = dateUTC(pendingWindow.end.getUTCFullYear(), pendingWindow.end.getUTCMonth(), 1);
      }
      pickAnchor = null;
      hoverDate = null;
      presetListEl.hidden = true;
      presetSelect.setAttribute('aria-expanded', 'false');
      renderPopoverState();
    });
    presetListEl.appendChild(btn);
  });
}

let calDayButtons = [];
let calGridMonthKey = null;
function monthKey(d) { return `${d.getUTCFullYear()}-${d.getUTCMonth()}`; }

function applyCalendarHighlight() {
  let previewStart = pendingWindow.start, previewEnd = pendingWindow.end;
  if (pickAnchor) {
    const hover = hoverDate || pickAnchor;
    previewStart = pickAnchor < hover ? pickAnchor : hover;
    previewEnd = pickAnchor < hover ? hover : pickAnchor;
  }
  calDayButtons.forEach(({ el, date, disabled }) => {
    el.classList.remove('in-range', 'range-start', 'range-end');
    if (!disabled && date >= previewStart && date <= previewEnd) {
      el.classList.add('in-range');
      if (sameDay(date, previewStart)) el.classList.add('range-start');
      if (sameDay(date, previewEnd)) el.classList.add('range-end');
    }
  });
}

function buildCalendarGrid() {
  calGrid.innerHTML = '';
  calDayButtons = [];
  const firstOfMonth = calendarMonth;
  const firstWeekday = (firstOfMonth.getUTCDay() + 6) % 7;
  const gridStart = addDays(firstOfMonth, -firstWeekday);

  for (let i = 0; i < 42; i++) {
    const day = addDays(gridStart, i);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cal-day';
    if (day.getUTCMonth() !== firstOfMonth.getUTCMonth()) btn.classList.add('outside');
    const disabled = day < datasetMin || day > datasetMax;
    if (disabled) btn.classList.add('disabled');
    if (sameDay(day, datasetMax)) btn.classList.add('today');
    const span = document.createElement('span');
    span.textContent = String(day.getUTCDate());
    btn.appendChild(span);
    if (!disabled) {
      btn.addEventListener('click', () => onDayClick(day));
      btn.addEventListener('mouseenter', () => {
        if (pickAnchor) { hoverDate = day; applyCalendarHighlight(); }
      });
    }
    calGrid.appendChild(btn);
    calDayButtons.push({ el: btn, date: day, disabled });
  }
  calGridMonthKey = monthKey(calendarMonth);
  applyCalendarHighlight();
}

function renderCalendar() {
  calMonthLabel.textContent = `${MONTH_NAMES_FULL[calendarMonth.getUTCMonth()]} ${calendarMonth.getUTCFullYear()}`;
  const prevMonth = addMonthsClamped(calendarMonth, -1);
  calPrevBtn.disabled = prevMonth < dateUTC(datasetMin.getUTCFullYear(), datasetMin.getUTCMonth(), 1);
  const nextMonth = addMonthsClamped(calendarMonth, 1);
  calNextBtn.disabled = nextMonth > dateUTC(datasetMax.getUTCFullYear(), datasetMax.getUTCMonth(), 1);

  if (monthKey(calendarMonth) !== calGridMonthKey) buildCalendarGrid();
  else applyCalendarHighlight();
}

function onDayClick(day) {
  if (!pickAnchor) {
    pickAnchor = day;
    hoverDate = day;
    applyCalendarHighlight();
    return;
  }
  let start = pickAnchor, end = day;
  if (start > end) { const t = start; start = end; end = t; }
  pendingWindow = { start, end };
  pendingPresetKey = findMatchingPreset(pendingWindow);
  pickAnchor = null;
  hoverDate = null;
  fromTextEl.value = fmtDDMMYYYY(pendingWindow.start);
  toTextEl.value = fmtDDMMYYYY(pendingWindow.end);
  fromTextEl.classList.remove('invalid');
  toTextEl.classList.remove('invalid');
  presetSelectLabel.textContent = (PRESETS.find(p => p.key === pendingPresetKey) || {}).label || 'Custom';
  renderPresetList();
  applyCalendarHighlight();
}

function commitTextInputs() {
  const s = parseDDMMYYYY(fromTextEl.value);
  const e = parseDDMMYYYY(toTextEl.value);
  fromTextEl.classList.toggle('invalid', !s);
  toTextEl.classList.toggle('invalid', !e);
  if (!s || !e) return;
  let start = s, end = e;
  if (start > end) { const t = start; start = end; end = t; }
  pendingWindow = clampWindow({ start, end });
  pendingPresetKey = findMatchingPreset(pendingWindow);
  calendarMonth = dateUTC(pendingWindow.end.getUTCFullYear(), pendingWindow.end.getUTCMonth(), 1);
  pickAnchor = null;
  hoverDate = null;
  renderPopoverState();
}

function renderPopoverState() {
  presetSelectLabel.textContent = (PRESETS.find(p => p.key === pendingPresetKey) || {}).label || 'Custom';
  fromTextEl.value = fmtDDMMYYYY(pendingWindow.start);
  toTextEl.value = fmtDDMMYYYY(pendingWindow.end);
  fromTextEl.classList.remove('invalid');
  toTextEl.classList.remove('invalid');
  renderPresetList();
  renderCalendar();
  document.querySelectorAll('#granularityRow .gran-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.range === pendingRange);
  });
}

function openPopover() {
  pendingWindow = { start: currentWindow.start, end: currentWindow.end };
  pendingRange = currentRange;
  pendingPresetKey = findMatchingPreset(pendingWindow);
  pickAnchor = null;
  hoverDate = null;
  calendarMonth = dateUTC(pendingWindow.end.getUTCFullYear(), pendingWindow.end.getUTCMonth(), 1);
  presetListEl.hidden = true;
  presetSelect.setAttribute('aria-expanded', 'false');
  renderPopoverState();
  rangePopover.hidden = false;
}

function closePopover() {
  rangePopover.hidden = true;
  presetListEl.hidden = true;
}

// --- Geo filter (region / municipality) ---

const regionSelect = document.getElementById('regionSelect');
const muniSelect = document.getElementById('muniSelect');
const geoNote = document.getElementById('geoNote');

function rebuildMuniOptions(regionIdx) {
  const prevValue = muniSelect.value;
  muniSelect.innerHTML = '<option value="">All municipalities</option>';

  if (regionIdx === '' || regionIdx == null) {
    geoIndex.regions.forEach((regionName, rIdx) => {
      const group = document.createElement('optgroup');
      group.label = regionName;
      geoIndex.municipalities.forEach((m, mIdx) => {
        if (m.regionIdx !== rIdx) return;
        const opt = document.createElement('option');
        opt.value = String(mIdx);
        opt.textContent = m.name;
        group.appendChild(opt);
      });
      if (group.children.length) muniSelect.appendChild(group);
    });
  } else {
    const rIdx = Number(regionIdx);
    geoIndex.municipalities.forEach((m, mIdx) => {
      if (m.regionIdx !== rIdx) return;
      const opt = document.createElement('option');
      opt.value = String(mIdx);
      opt.textContent = m.name;
      muniSelect.appendChild(opt);
    });
  }
  if ([...muniSelect.options].some(o => o.value === prevValue)) muniSelect.value = prevValue;
}

function populateGeoSelects() {
  geoIndex.regions.forEach((name, i) => {
    const opt = document.createElement('option');
    opt.value = String(i);
    opt.textContent = name;
    regionSelect.appendChild(opt);
  });
  rebuildMuniOptions('');
}

async function fetchGeoBundle(type, idx) {
  if (geoCache[type][idx]) return geoCache[type][idx];
  const bundle = await fetch(`data/geo/${type}/${idx}.json`).then(r => r.json());
  const normalized = { year: bundle.yearly, month: bundle.monthly, week: bundle.weekly, day: bundle.daily };
  geoCache[type][idx] = normalized;
  return normalized;
}

async function applyGeoFilter() {
  const regionVal = regionSelect.value;
  const muniVal = muniSelect.value;
  let noteText = '';

  if (muniVal !== '') {
    const idx = Number(muniVal);
    activeGeoRaw = await fetchGeoBundle('muni', idx);
    const m = geoIndex.municipalities[idx];
    noteText = `Showing ${m.name} (${geoIndex.regions[m.regionIdx]}) only.`;
  } else if (regionVal !== '') {
    const idx = Number(regionVal);
    activeGeoRaw = await fetchGeoBundle('region', idx);
    noteText = `Showing the ${geoIndex.regions[idx]} region only.`;
  } else {
    activeGeoRaw = null;
  }

  geoNote.hidden = !noteText;
  geoNote.textContent = noteText;
  renderChart(currentRange);
}

function wireWeatherToggle() {
  const checkbox = document.getElementById('weatherCheckbox');
  const text = document.getElementById('weatherToggleText');
  checkbox.addEventListener('change', async () => {
    const turningOn = checkbox.checked;
    if (turningOn && !weatherData) {
      text.textContent = 'Loading…';
      checkbox.disabled = true;
      try {
        await ensureWeatherLoaded();
      } catch (e) {
        checkbox.checked = false;
        checkbox.disabled = false;
        text.textContent = 'Weather (failed)';
        return;
      }
      checkbox.disabled = false;
    }
    weatherEnabled = turningOn;
    text.textContent = 'Weather';
    renderChart(currentRange);
  });
}

function wireNormToggle() {
  const normNote = document.getElementById('normNote');
  document.getElementById('normToggle').addEventListener('click', (e) => {
    const btn = e.target.closest('.norm-btn');
    if (!btn) return;
    normMode = btn.dataset.mode;
    document.querySelectorAll('.norm-btn').forEach(b => b.classList.toggle('active', b === btn));
    normNote.hidden = normMode !== 'per1000';
    renderChart(currentRange);
  });
}

function wireGeoFilter() {
  regionSelect.addEventListener('change', () => {
    rebuildMuniOptions(regionSelect.value);
    muniSelect.value = '';
    applyGeoFilter();
  });
  muniSelect.addEventListener('change', () => {
    if (muniSelect.value !== '') {
      const m = geoIndex.municipalities[Number(muniSelect.value)];
      const targetMuni = muniSelect.value;
      regionSelect.value = String(m.regionIdx);
      rebuildMuniOptions(regionSelect.value);
      muniSelect.value = targetMuni;
    }
    applyGeoFilter();
  });
}

function wireRangePicker() {
  rangeTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (rangePopover.hidden) openPopover(); else closePopover();
  });
  document.addEventListener('click', (e) => {
    // Use composedPath (fixed at dispatch time) rather than contains(e.target):
    // preset/day clicks can rebuild the DOM mid-bubble, detaching e.target before
    // this listener runs, which would make a same-popover click look "outside".
    if (!rangePopover.hidden && !e.composedPath().includes(rangePicker)) closePopover();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !rangePopover.hidden) closePopover();
  });
  presetSelect.addEventListener('click', () => {
    const expanded = presetSelect.getAttribute('aria-expanded') === 'true';
    presetListEl.hidden = expanded;
    presetSelect.setAttribute('aria-expanded', String(!expanded));
  });
  fromTextEl.addEventListener('change', commitTextInputs);
  toTextEl.addEventListener('change', commitTextInputs);
  calPrevBtn.addEventListener('click', () => { calendarMonth = addMonthsClamped(calendarMonth, -1); renderCalendar(); });
  calNextBtn.addEventListener('click', () => { calendarMonth = addMonthsClamped(calendarMonth, 1); renderCalendar(); });
  granularityRow.addEventListener('click', (e) => {
    const btn = e.target.closest('.gran-btn');
    if (!btn) return;
    pendingRange = btn.dataset.range;
    document.querySelectorAll('#granularityRow .gran-btn').forEach(b => b.classList.toggle('active', b === btn));
  });
  applyBtn.addEventListener('click', () => {
    currentWindow = pendingWindow;
    currentRange = pendingRange;
    updateTriggerLabel();
    closePopover();
    renderChart(currentRange);
  });
  document.getElementById('toggleTable').addEventListener('click', () => {
    document.querySelector('.table-scroll').classList.toggle('show');
  });
}

async function init() {
  const [year, month, week, day, geoIndexData] = await Promise.all([
    fetch('data/yearly.json').then(r => r.json()),
    fetch('data/monthly.json').then(r => r.json()),
    fetch('data/weekly.json').then(r => r.json()),
    fetch('data/daily.json').then(r => r.json()),
    fetch('data/geo/index.json').then(r => r.json()),
  ]);
  raw = { year, month, week, day };
  datasetMin = parseISODate(day[0].date);
  datasetMax = parseISODate(day[day.length - 1].date);
  geoIndex = geoIndexData;

  currentWindow = clampWindow(PRESETS.find(p => p.key === 'all').compute());
  currentRange = 'year';

  wireRangePicker();
  rangeTrigger.disabled = false;
  updateTriggerLabel();

  populateGeoSelects();
  wireGeoFilter();
  regionSelect.disabled = false;
  muniSelect.disabled = false;

  wireNormToggle();
  wireWeatherToggle();

  renderChart(currentRange);
}

init();

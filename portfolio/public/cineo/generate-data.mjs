import fs from "node:fs";
import path from "node:path";

const source = process.argv[2];
const output = process.argv[3];
if (!source || !output) throw new Error("Usage: node generate-data.mjs metadata.xml data.js");

const xml = fs.readFileSync(source, "utf8");
const decode = (value = "") => value
  .replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">")
  .replaceAll("&quot;", '"').replaceAll("&apos;", "'");

const films = [...xml.matchAll(/<FileSet>([\s\S]*?)<\/FileSet>/g)].map(([, block]) => {
  const filename = block.match(/<FileName>(.*?)<\/FileName>/)?.[1]?.replace("\\.", ".") ?? "";
  const values = {};
  for (const match of block.matchAll(/<Metadata(?:\s+mode="[^"]+")?\s+name="([^"]+)">([\s\S]*?)<\/Metadata>/g)) {
    const [, key, raw] = match;
    (values[key] ??= []).push(decode(raw.trim()));
  }
  const one = (key) => values[key]?.[0] ?? "";
  const id = one("dc.Identifier");
  const stem = filename.replace(/\.jpg$/i, "");
  return {
    id,
    stem,
    title: one("film.Title") || one("dc.Title"),
    director: one("film.Director"),
    year: one("film.Year") || one("dc.Date"),
    genre: one("film.Genre") || one("dc.Subject"),
    subjects: values["dc.Subject"] ?? [],
    country: one("film.Country"),
    production: one("film.Production"),
    composer: one("film.Composer"),
    screenwriters: values["film.Screenwriter"] ?? [],
    plot: one("film.Plot") || one("dc.Description"),
    quotes: values["film.Quote"] ?? [],
    recommendedBy: (values["film.RecommendedBy"] ?? []).filter((name) => name !== "Francisco"),
    trailerUrl: one("film.TrailerUrl"),
    trailerTitle: one("film.TrailerTitle"),
    poster: `assets/posters/${filename}`,
    audio: one("film.HasSoundtrack") === "true" ? `assets/audio/${stem}-colonna.mp3` : "",
    script: one("film.HasScript") === "true" ? `assets/scripts/${stem}-script.pdf` : "",
  };
}).filter((film) => film.id && film.title);

fs.writeFileSync(output, `window.CINEO_FILMS = ${JSON.stringify(films, null, 2)};\n`);
console.log(`Generated ${films.length} films`);

// bun run build: scene/main.ts → dist/scene.js, the scene module EarthRT loads (SPEC § 5): one CommonJS file,
// `@threert/scene` left to the loader's `require`, everything else bundled. Commit dist/: the mirror serves the
// repository's files as they are, nothing builds them there.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import type { SceneContent } from "../earthrt/core/places.ts";
import { readManifest, root } from "./lib/scene.ts";

export async function buildScene(o: { quiet?: boolean } = {}): Promise<{ entry: string; bytes: number } | null> {
  const m = readManifest();
  const sc = m.content.find((c) => c.type === "scene") as SceneContent | undefined;
  if (!sc) {
    if (!o.quiet) console.log("no scene content in earthrt.json: nothing to build");
    return null;
  }
  const source = join(root, sc.source ?? "scene/main.ts");
  const r = await Bun.build({ entrypoints: [source], format: "cjs", target: "browser", external: ["@threert/scene"], minify: { syntax: true, whitespace: false, identifiers: false } });
  if (!r.success) throw new Error(r.logs.map((l) => String(l)).join("\n"));
  const text = `// Built from ${sc.source ?? "scene/main.ts"} by \`bun run build\`: edit the source, not this file.\n` + (await r.outputs[0].text());
  const out = join(root, sc.entry);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, text);
  if (!o.quiet) console.log(`✓ ${sc.entry}: ${(text.length / 1024).toFixed(1)} KiB`);
  return { entry: sc.entry, bytes: text.length };
}

if (import.meta.main) {
  buildScene().catch((e) => {
    console.error(`✗ ${e instanceof Error ? e.message : e}`);
    process.exit(1);
  });
}

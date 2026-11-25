// An andon: a floor lamp of paper on a wooden frame, lit from inside (the paper is the light: 140 nits, warm).
// Made in code and baked to assets/models/andon.glb by `bun tools/models.ts`; earthrt.json places it as `glb`
// content, so the web shows it too and the client lights the room with it.
import { BoxGeometry, Group, Mesh, MeshStandardMaterial, type Object3D } from "@threert/scene";

export function andon(): Object3D {
  const g = new Group();
  g.name = "andon";
  const wood = new MeshStandardMaterial({ name: "andon frame", color: 0x2a1a12, roughness: 0.4 });
  const paper = new MeshStandardMaterial({ name: "andon paper", color: 0xf3e9d2, roughness: 0.85, emissive: 0xffb764, emissiveIntensity: 140, side: "double" });
  const add = (w: number, h: number, d: number, m: MeshStandardMaterial, x: number, y: number, z: number) => {
    const o = new Mesh(new BoxGeometry(w, h, d), m);
    o.position.set(x, y, z);
    g.add(o);
  };
  const s = 0.32, h = 0.62, base = 0.12;
  // a low square base on four feet, four corner posts, rails top and bottom, a paper box between them
  add(s + 0.06, 0.03, s + 0.06, wood, 0, base, 0);
  for (const x of [-1, 1]) for (const z of [-1, 1]) {
    add(0.035, base, 0.035, wood, (x * (s + 0.02)) / 2, base / 2, (z * (s + 0.02)) / 2);
    add(0.025, h, 0.025, wood, (x * s) / 2, base + h / 2, (z * s) / 2);
  }
  for (const y of [base + 0.03, base + h]) {
    for (const z of [-1, 1]) add(s, 0.02, 0.02, wood, 0, y, (z * s) / 2);
    for (const x of [-1, 1]) add(0.02, 0.02, s, wood, (x * s) / 2, y, 0);
  }
  add(s - 0.03, h - 0.08, s - 0.03, paper, 0, base + 0.04 + (h - 0.08) / 2, 0);
  // a carrying handle over the top
  add(0.02, 0.18, 0.02, wood, -s / 2, base + h + 0.09, 0);
  add(0.02, 0.18, 0.02, wood, s / 2, base + h + 0.09, 0);
  add(s + 0.02, 0.02, 0.02, wood, 0, base + h + 0.18, 0);
  return g;
}

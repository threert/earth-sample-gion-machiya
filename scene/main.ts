// The back parlour (oku-zashiki) of a Kyoto machiya off Hanamikoji, Gion: eight tatami, shoji onto a small walled
// garden (tsubo-niwa) to the west, a tokonoma with a hanging scroll and staggered shelves to the north, fusuma to
// the east, a plastered south wall with a lattice window, a board ceiling, a tiled roof. Built in the place's frame
// (metres; x east, y up, z south; the room's centre at the anchor). The floor lamp (andon) is the place's GLB.
import {
  BoxGeometry, CylinderGeometry, DataTexture, Group, InstancedMesh, Matrix4, Mesh, MeshPhysicalMaterial, MeshStandardMaterial,
  Object3D, PlaneGeometry, Quaternion, SphereGeometry, Vector3, type BufferGeometry,
} from "@threert/scene";
import type { PlaceContext } from "./context.ts";

/** Kyoto tatami (kyōma): 1.91 × 0.955 m. The room is 2 × 2 mat lengths: 3.82 m square. */
const MAT = 1.91;
const HALF = MAT;
/** The raised floor of the house, above the street's level. */
const FLOOR = 0.45;
/** Lintel (kamoi) and ceiling heights above the floor. */
const LINTEL = 1.76;
const CEIL = 2.5;
const WALL = 0.12;

// ---- materials
const wood = new MeshStandardMaterial({ name: "aged hinoki", color: 0x5a3e2b, roughness: 0.55 });
const darkWood = new MeshStandardMaterial({ name: "lacquer", color: 0x24160f, roughness: 0.3 });
const postWood = new MeshStandardMaterial({ name: "toko-bashira", color: 0x8b6a4c, roughness: 0.6 });
const ceilWood = new MeshStandardMaterial({ name: "sugi ceiling", color: 0x9a7655, roughness: 0.7 });
const plaster = new MeshStandardMaterial({ name: "juraku wall", color: 0xb79c74, roughness: 0.95 });
const whitePlaster = new MeshStandardMaterial({ name: "white plaster", color: 0xe6e0d2, roughness: 0.9 });
const tatami = new MeshStandardMaterial({ name: "tatami", color: 0xc4b27a, roughness: 0.85 });
const heri = new MeshStandardMaterial({ name: "tatami border", color: 0x1d2433, roughness: 0.7 });
const shojiPaper = new MeshPhysicalMaterial({ name: "shoji paper", color: 0xf4efe2, roughness: 0.9, transmission: 0.85, ior: 1.3, side: "double" });
const fusumaPaper = new MeshStandardMaterial({ name: "fusuma", color: 0xd8ccb0, roughness: 0.75 });
const stone = new MeshStandardMaterial({ name: "stone", color: 0x8a857c, roughness: 0.9 });
const moss = new MeshStandardMaterial({ name: "moss", color: 0x3f5a22, roughness: 1 });
const gravel = new MeshStandardMaterial({ name: "gravel", color: 0xb3ab9c, roughness: 1 });
const tile = new MeshStandardMaterial({ name: "kawara", color: 0x3b3d40, roughness: 0.45 });
const earth = new MeshStandardMaterial({ name: "foundation", color: 0x4a4038, roughness: 1 });
const leaf = new MeshStandardMaterial({ name: "maple", color: 0xb8361c, roughness: 0.8, side: "double" });
const bark = new MeshStandardMaterial({ name: "bark", color: 0x3a2c22, roughness: 0.9 });
const ceramic = new MeshStandardMaterial({ name: "celadon", color: 0x8fa596, roughness: 0.25 });
const cushion = new MeshStandardMaterial({ name: "zabuton", color: 0x6b2430, roughness: 0.9 });

/** A hanging scroll: off-white paper, an ink circle (ensō), a brocade border. */
function scrollTexture(): DataTexture {
  const w = 128, h = 320, px = new Uint8Array(w * h * 4);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4;
    const border = x < 10 || x >= w - 10 || y < 40 || y >= h - 50;
    let r = 236, g = 228, b = 208;
    if (border) [r, g, b] = [92, 78, 52];
    else {
      // the ensō: a brush circle, heavier on its left, open at the top right
      const cx = w / 2, cy = h * 0.42, rr = 34;
      const d = Math.hypot(x - cx, y - cy), a = Math.atan2(y - cy, x - cx);
      const width = 5 + 4 * Math.cos(a - Math.PI);
      if (Math.abs(d - rr) < width && !(a > -1.3 && a < -0.6)) [r, g, b] = [28, 26, 24];
      // a short column of brush strokes below it
      if (Math.abs(x - cx) < 3 && y > h * 0.62 && y < h * 0.78 && Math.floor(y / 9) % 2 === 0) [r, g, b] = [40, 36, 32];
    }
    px[i] = r; px[i + 1] = g; px[i + 2] = b; px[i + 3] = 255;
  }
  return new DataTexture(w, h, px);
}

export default function build(ctx: PlaceContext): Object3D {
  const root = new Group();
  root.name = ctx.place.id;
  const box = (w: number, h: number, d: number, m: MeshStandardMaterial, x: number, y: number, z: number) => {
    const o = new Mesh(new BoxGeometry(w, h, d), m);
    o.position.set(x, y, z);
    root.add(o);
    return o;
  };
  const instanced = (geo: BufferGeometry, m: MeshStandardMaterial, mats: Matrix4[]) => {
    const im = new InstancedMesh(geo, m, mats.length);
    mats.forEach((x, i) => im.setMatrixAt(i, x));
    root.add(im);
    return im;
  };
  const at = (x: number, y: number, z: number, ry = 0) => new Matrix4().compose(new Vector3(x, y, z), new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), ry), new Vector3(1, 1, 1));

  const top = FLOOR + CEIL;

  // ---- the house under the room: its foundation and floor (the house runs east to the street, west to the garden)
  box(2 * HALF + 2.2, FLOOR + 1, 2 * HALF + 2 * WALL, earth, 0.2, (FLOOR - 1) / 2, 0);
  box(2 * HALF, 0.02, 2 * HALF, wood, 0, FLOOR - 0.06, 0);

  // ---- tatami: two mats running north-south on each side, four running east-west in the middle
  const mats: Matrix4[] = [];
  const borders: Matrix4[] = [];
  const lay = (cx: number, cz: number, alongZ: boolean) => {
    mats.push(at(cx, FLOOR - 0.0275, cz, alongZ ? Math.PI / 2 : 0));
    // the cloth borders along the two long edges
    for (const s of [-1, 1]) borders.push(alongZ ? at(cx + s * (MAT / 4 - 0.014), FLOOR + 0.0008, cz, Math.PI / 2) : at(cx, FLOOR + 0.0008, cz + s * (MAT / 4 - 0.014)));
  };
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) lay(sx * (HALF - MAT / 4), sz * (MAT / 2), true);
  for (let k = 0; k < 4; k++) lay(0, -HALF + MAT / 4 + (k * MAT) / 2, false);
  instanced(new BoxGeometry(MAT - 0.006, 0.055, MAT / 2 - 0.006), tatami, mats);
  instanced(new BoxGeometry(MAT - 0.006, 0.002, 0.028), heri, borders);

  // ---- posts at the corners and between the alcoves, the lintels, the upper rail (nageshi), the ceiling
  for (const [x, z] of [[-HALF, -HALF], [HALF, -HALF], [-HALF, HALF], [HALF, HALF], [-HALF, 0], [HALF, 0]]) box(0.12, CEIL, 0.12, wood, x, FLOOR + CEIL / 2, z);
  for (const s of [-1, 1]) {
    box(2 * HALF, 0.05, 0.1, wood, 0, FLOOR + LINTEL + 0.025, s * HALF); // north / south kamoi
    box(0.1, 0.05, 2 * HALF, wood, s * HALF, FLOOR + LINTEL + 0.025, 0); // east / west kamoi
    box(2 * HALF, 0.1, 0.05, wood, 0, FLOOR + LINTEL + 0.22, s * (HALF - 0.03));
    box(0.05, 0.1, 2 * HALF, wood, s * (HALF - 0.03), FLOOR + LINTEL + 0.22, 0);
    box(0.1, 0.03, 2 * HALF, wood, s * HALF, FLOOR + 0.015, 0); // shiki (sills)
  }
  box(2 * HALF + 0.2, 0.02, 2 * HALF + 0.2, ceilWood, 0, top + 0.01, 0);
  const battens: Matrix4[] = [];
  for (let x = -HALF + 0.45; x < HALF; x += 0.45) battens.push(at(x, top - 0.015, 0));
  instanced(new BoxGeometry(0.03, 0.03, 2 * HALF), wood, battens);
  box(2 * HALF, 0.06, 0.06, wood, 0, top - 0.03, -HALF + 0.03); // mawaribuchi
  box(2 * HALF, 0.06, 0.06, wood, 0, top - 0.03, HALF - 0.03);

  // walls above the lintels (plaster), all round
  const above = CEIL - LINTEL - 0.05;
  for (const s of [-1, 1]) {
    box(2 * HALF, above, WALL, plaster, 0, FLOOR + LINTEL + 0.05 + above / 2, s * (HALF + WALL / 2));
    box(WALL, above, 2 * HALF, plaster, s * (HALF + WALL / 2), FLOOR + LINTEL + 0.05 + above / 2, 0);
  }

  // ---- west: four shoji onto the engawa and the garden; the middle two slid open behind their neighbours
  const shoji = (x: number, z: number) => {
    const g = new Group();
    const w = MAT / 2, h = LINTEL;
    const frame = (fw: number, fh: number, fx: number, fy: number) => {
      const o = new Mesh(new BoxGeometry(0.03, fh, fw), wood);
      o.position.set(0, fy, fx);
      g.add(o);
    };
    frame(w, 0.05, 0, 0.025);
    frame(w, 0.04, 0, h - 0.02);
    frame(0.03, h, -w / 2 + 0.015, h / 2);
    frame(0.03, h, w / 2 - 0.015, h / 2);
    for (let i = 1; i < 3; i++) frame(0.012, h - 0.1, -w / 2 + (i * w) / 3, h / 2);
    for (let j = 1; j < 9; j++) frame(w - 0.04, 0.012, 0, 0.2 + ((h - 0.25) * j) / 9);
    // a waist board of wood (koshi), paper above it
    const koshi = new Mesh(new BoxGeometry(0.02, 0.3, w - 0.05), wood);
    koshi.position.set(0, 0.2, 0);
    g.add(koshi);
    const paper = new Mesh(new PlaneGeometry(w - 0.05, h - 0.4), shojiPaper);
    paper.rotation.y = Math.PI / 2;
    paper.position.set(0.012, 0.35 + (h - 0.4) / 2, 0);
    g.add(paper);
    g.position.set(x, FLOOR, z);
    root.add(g);
  };
  const xs = -HALF;
  shoji(xs - 0.02, -HALF + MAT / 4);
  shoji(xs + 0.02, -HALF + MAT / 4 + 0.6); // slid north, behind the first
  shoji(xs + 0.02, HALF - MAT / 4 - 0.6); // slid south, behind the last
  shoji(xs - 0.02, HALF - MAT / 4);

  // ---- the engawa (veranda) beyond them, its posts and eave, and the garden
  const eng = 0.95;
  box(eng, 0.04, 2 * HALF + 0.24, wood, xs - eng / 2 - 0.05, FLOOR - 0.02, 0);
  for (let k = 0; k < 9; k++) box(eng, 0.005, 0.005, darkWood, xs - eng / 2 - 0.05, FLOOR + 0.001, -HALF + (k * 2 * HALF) / 8);
  for (const s of [-1, 1]) box(0.11, CEIL + 0.3, 0.11, wood, xs - eng - 0.05, FLOOR + (CEIL + 0.3) / 2, s * (HALF + 0.06));
  box(0.1, 0.12, 2 * HALF + 0.3, wood, xs - eng - 0.05, top + 0.36, 0);

  const gx0 = xs - eng - 0.1, gx1 = gx0 - 3.6;
  const gcx = (gx0 + gx1) / 2, gw = gx0 - gx1, gd = 2 * HALF + 0.4;
  box(gw, 0.08, gd, moss, gcx, 0.04, 0);
  box(1.4, 0.09, 1.2, gravel, gcx + 0.5, 0.045, 0.6);
  // stepping stones from the veranda's foot, and its shoe stone
  box(0.7, FLOOR - 0.12, 0.45, stone, gx0 - 0.15, (FLOOR - 0.12) / 2, 0.2);
  for (const [dx, dz, r] of [[0.9, 0.5, 0.24], [1.45, 0.95, 0.21], [2.0, 0.6, 0.23], [2.6, 0.2, 0.2]]) {
    const s = new Mesh(new CylinderGeometry(r, r * 1.05, 0.1, 9), stone);
    s.position.set(gx0 - dx, 0.09, dz);
    root.add(s);
  }
  // a small stone lantern and a water basin (tsukubai)
  const lx = gx1 + 0.7, lz = -1.0;
  box(0.32, 0.12, 0.32, stone, lx, 0.14, lz);
  box(0.12, 0.6, 0.12, stone, lx, 0.5, lz);
  box(0.36, 0.08, 0.36, stone, lx, 0.84, lz);
  const fireBox = box(0.24, 0.22, 0.24, stone, lx, 0.99, lz);
  fireBox.name = "garden lantern";
  const roofL = new Mesh(new CylinderGeometry(0.04, 0.34, 0.16, 4), stone);
  roofL.position.set(lx, 1.18, lz);
  roofL.rotation.y = Math.PI / 4;
  root.add(roofL);
  const basin = new Mesh(new CylinderGeometry(0.3, 0.26, 0.32, 20), stone);
  basin.position.set(gx1 + 1.1, 0.24, 1.05);
  root.add(basin);
  const water = new Mesh(new CylinderGeometry(0.22, 0.22, 0.01, 20), new MeshPhysicalMaterial({ name: "water", color: 0x1c2a2a, roughness: 0.02, ior: 1.33 }));
  water.position.set(gx1 + 1.1, 0.38, 1.05);
  root.add(water);
  // a maple: a leaning trunk, a few branches, a crown of red leaves
  const tx = gx1 + 1.3, tz = -0.2;
  const trunk = new Mesh(new CylinderGeometry(0.05, 0.09, 2.4, 10), bark);
  trunk.position.set(tx, 1.2, tz);
  trunk.rotation.z = 0.12;
  root.add(trunk);
  const leaves: Matrix4[] = [];
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 520; i++) {
    const a = rnd() * Math.PI * 2, r = Math.sqrt(rnd()) * 1.3, h = 2.0 + rnd() * 1.1 - r * 0.35;
    const q = new Quaternion().setFromAxisAngle(new Vector3(rnd() - 0.5, 1, rnd() - 0.5).normalize(), rnd() * Math.PI);
    leaves.push(new Matrix4().compose(new Vector3(tx - 0.25 + Math.cos(a) * r, h, tz + Math.sin(a) * r * 0.9), q, new Vector3(1, 1, 1)));
  }
  instanced(new PlaneGeometry(0.11, 0.09), leaf, leaves);
  for (let i = 0; i < 5; i++) {
    const b = new Mesh(new CylinderGeometry(0.012, 0.025, 1.1, 6), bark);
    const a = (i / 5) * Math.PI * 2;
    b.position.set(tx - 0.2 + Math.cos(a) * 0.35, 2.15, tz + Math.sin(a) * 0.35);
    b.rotation.set(Math.sin(a) * 0.9, 0, -Math.cos(a) * 0.9);
    root.add(b);
  }
  // garden walls: plaster with a tiled cap, on the north, south and west
  const gwH = 2.3;
  for (const s of [-1, 1]) {
    box(gw, gwH, 0.15, whitePlaster, gcx, gwH / 2, s * (gd / 2 + 0.075));
    box(gw + 0.1, 0.08, 0.34, tile, gcx, gwH + 0.04, s * (gd / 2 + 0.075));
  }
  box(0.15, gwH, gd + 0.3, whitePlaster, gx1 - 0.075, gwH / 2, 0);
  box(0.34, 0.08, gd + 0.4, tile, gx1 - 0.075, gwH + 0.04, 0);

  // ---- north: the tokonoma (west half) and the staggered shelves (east half), each 0.7 m deep
  const dep = 0.7, zn = -HALF;
  box(2 * HALF + 2 * WALL, CEIL, WALL, plaster, 0, FLOOR + CEIL / 2, zn - dep - WALL / 2);
  box(WALL, CEIL, dep, plaster, -HALF - WALL / 2, FLOOR + CEIL / 2, zn - dep / 2);
  box(WALL, CEIL, dep, plaster, HALF + WALL / 2, FLOOR + CEIL / 2, zn - dep / 2);
  box(0.06, CEIL, dep, plaster, 0, FLOOR + CEIL / 2, zn - dep / 2); // between the two
  box(2 * HALF, 0.02, dep, ceilWood, 0, FLOOR + 2.15, zn - dep / 2); // the alcoves' lower ceiling
  box(2 * HALF, CEIL - 2.15, 0.06, plaster, 0, FLOOR + 2.15 + (CEIL - 2.15) / 2, zn - 0.03);
  box(2 * HALF, 0.06, 0.06, wood, 0, FLOOR + 2.12, zn - 0.03); // otoshigake
  // the toko: a raised polished board, its post a natural trunk
  box(HALF, 0.12, dep, darkWood, -HALF / 2, FLOOR + 0.06, zn - dep / 2);
  const tokoPost = new Mesh(new CylinderGeometry(0.06, 0.07, CEIL, 10), postWood);
  tokoPost.position.set(0, FLOOR + CEIL / 2, zn);
  root.add(tokoPost);
  // the scroll
  const scroll = new Mesh(new PlaneGeometry(0.46, 1.15), new MeshStandardMaterial({ name: "scroll", color: 0xffffff, roughness: 0.85, map: scrollTexture() }));
  scroll.position.set(-HALF / 2, FLOOR + 1.3, zn - dep + 0.01);
  root.add(scroll);
  box(0.52, 0.025, 0.025, darkWood, -HALF / 2, FLOOR + 0.72, zn - dep + 0.02);
  // a celadon vase with a maple branch
  const vase = new Mesh(new CylinderGeometry(0.06, 0.08, 0.26, 24), ceramic);
  vase.position.set(-HALF / 2 + 0.25, FLOOR + 0.25, zn - dep / 2);
  root.add(vase);
  const twig = new Mesh(new CylinderGeometry(0.006, 0.009, 0.6, 5), bark);
  twig.position.set(-HALF / 2 + 0.33, FLOOR + 0.62, zn - dep / 2);
  twig.rotation.z = -0.4;
  root.add(twig);
  for (let i = 0; i < 14; i++) {
    const l = new Mesh(new SphereGeometry(0.03, 6, 4), leaf);
    l.scale.set(1, 0.35, 1);
    l.position.set(-HALF / 2 + 0.37 + rnd() * 0.22, FLOOR + 0.7 + rnd() * 0.25, zn - dep / 2 + (rnd() - 0.5) * 0.2);
    root.add(l);
  }
  // the shelves: two boards stepped, a little cupboard above
  box(HALF - 0.06, 0.03, dep - 0.05, darkWood, HALF / 2, FLOOR + 0.03, zn - dep / 2);
  box(HALF / 2, 0.03, dep - 0.1, darkWood, HALF * 0.3, FLOOR + 0.95, zn - dep / 2);
  box(HALF / 2, 0.03, dep - 0.1, darkWood, HALF * 0.7, FLOOR + 1.12, zn - dep / 2);
  box(0.02, 0.17, 0.02, darkWood, HALF / 2, FLOOR + 1.035, zn - dep / 2);
  box(HALF - 0.06, 0.36, dep - 0.08, fusumaPaper, HALF / 2, FLOOR + 1.9, zn - dep / 2 + 0.02);
  box(HALF - 0.06, 0.02, dep - 0.06, darkWood, HALF / 2, FLOOR + 1.71, zn - dep / 2 + 0.02);
  const bowl = new Mesh(new SphereGeometry(0.07, 20, 10), ceramic);
  bowl.scale.set(1, 0.5, 1);
  bowl.position.set(HALF * 0.75, FLOOR + 1.16, zn - dep / 2);
  root.add(bowl);

  // ---- east: four fusuma (to the middle room, toward the street)
  for (let k = 0; k < 4; k++) {
    const z = -HALF + MAT / 4 + (k * MAT) / 2;
    const x = HALF + (k % 2 ? 0.02 : -0.02);
    const panel = new Mesh(new BoxGeometry(0.02, LINTEL - 0.01, MAT / 2), fusumaPaper);
    panel.position.set(x, FLOOR + LINTEL / 2, z);
    root.add(panel);
    for (const s of [-1, 1]) {
      const edge = new Mesh(new BoxGeometry(0.03, LINTEL - 0.01, 0.02), darkWood);
      edge.position.set(x, FLOOR + LINTEL / 2, z + s * (MAT / 4 - 0.01));
      root.add(edge);
    }
    const pull = new Mesh(new CylinderGeometry(0.028, 0.028, 0.034, 16), darkWood);
    pull.rotation.z = Math.PI / 2;
    pull.position.set(x, FLOOR + 0.8, z + (k % 2 ? -1 : 1) * (MAT / 4 - 0.12));
    root.add(pull);
  }
  box(0.1, LINTEL, 2 * HALF, earth, HALF + 0.12, FLOOR + LINTEL / 2, 0); // the next room, dark behind them

  // ---- south: plaster, with a lattice window low in it (shitaji-mado)
  const zs = HALF + WALL / 2, wy0 = FLOOR + 0.55, wy1 = FLOOR + 1.25, wx0 = -0.9, wx1 = 0.1;
  box(2 * HALF, wy0 - FLOOR, WALL, plaster, 0, (FLOOR + wy0) / 2, zs);
  box(2 * HALF, FLOOR + LINTEL - wy1, WALL, plaster, 0, (wy1 + FLOOR + LINTEL) / 2, zs);
  box(wx0 + HALF, wy1 - wy0, WALL, plaster, (-HALF + wx0) / 2, (wy0 + wy1) / 2, zs);
  box(HALF - wx1, wy1 - wy0, WALL, plaster, (wx1 + HALF) / 2, (wy0 + wy1) / 2, zs);
  for (let i = 0; i <= 6; i++) box(0.012, wy1 - wy0, 0.012, bark, wx0 + ((wx1 - wx0) * i) / 6, (wy0 + wy1) / 2, zs);
  for (let j = 1; j < 4; j++) box(wx1 - wx0, 0.012, 0.012, bark, (wx0 + wx1) / 2, wy0 + ((wy1 - wy0) * j) / 4, zs);
  const sp = new Mesh(new PlaneGeometry(wx1 - wx0, wy1 - wy0), shojiPaper);
  sp.position.set((wx0 + wx1) / 2, (wy0 + wy1) / 2, zs - WALL / 2 + 0.01);
  sp.rotation.y = Math.PI;
  root.add(sp);
  box(2 * HALF + 1.2, 2.6, 0.12, whitePlaster, 0.2, FLOOR + 1.3, zs + 1.2); // the neighbour's wall, a lane between
  box(2 * HALF + 1.2, 0.04, 1.08, gravel, 0.2, 0.02, zs + 0.6);

  // ---- the roof: kawara tiles on a gable over the room and the veranda, ridge east to west
  const rx0 = xs - eng - 0.5, rx1 = HALF + 0.3, rl = rx1 - rx0, pitch = 0.42;
  const span = HALF + dep + 0.6, rise = Math.tan(pitch) * span, slope = span / Math.cos(pitch);
  for (const s of [-1, 1]) {
    const r = new Mesh(new BoxGeometry(rl, 0.08, slope), tile);
    r.position.set((rx0 + rx1) / 2, top + 0.45 + rise / 2, s * (span / 2) - (dep / 2) * 0);
    r.rotation.x = s * pitch;
    root.add(r);
    const ribs: Matrix4[] = [];
    for (let x = rx0 + 0.12; x < rx1; x += 0.27) {
      const m = new Matrix4().compose(new Vector3(x, top + 0.5 + rise / 2, s * (span / 2)), new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), s * pitch), new Vector3(1, 1, 1));
      ribs.push(m);
    }
    instanced(new CylinderGeometry(0.05, 0.05, slope, 8).rotateX(Math.PI / 2), tile, ribs);
  }
  box(rl + 0.1, 0.16, 0.24, tile, (rx0 + rx1) / 2, top + 0.5 + rise, 0); // ridge
  box(rl, 0.25, 2 * span, earth, (rx0 + rx1) / 2, top + 0.15, 0); // the roof's underside, between ceiling and tiles

  // ---- in the room: a low table, two cushions, a tea bowl
  box(0.9, 0.03, 0.6, darkWood, 0.2, FLOOR + 0.33, 0.35);
  for (const [x, z] of [[-0.2, 0.1], [0.6, 0.1], [-0.2, 0.6], [0.6, 0.6]]) box(0.05, 0.31, 0.05, darkWood, x, FLOOR + 0.155, z);
  box(0.55, 0.07, 0.6, cushion, -0.6, FLOOR + 0.035, 0.35);
  box(0.55, 0.07, 0.6, cushion, 1.0, FLOOR + 0.035, 0.35);
  const cup = new Mesh(new CylinderGeometry(0.05, 0.035, 0.07, 20), ceramic);
  cup.position.set(0.05, FLOOR + 0.38, 0.3);
  root.add(cup);

  return root;
}

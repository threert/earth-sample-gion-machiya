// Built from scene/main.ts by `bun run build`: edit the source, not this file.
var { defineProperty: __defProp, getOwnPropertyNames: __getOwnPropNames, getOwnPropertyDescriptor: __getOwnPropDesc } = Object, __hasOwnProp = Object.prototype.hasOwnProperty;
function __accessProp(key) {
  return this[key];
}
var __toCommonJS = (from) => {
  var entry = (__moduleCache ??= /* @__PURE__ */ new WeakMap).get(from), desc;
  if (entry)
    return entry;
  if (entry = __defProp({}, "__esModule", { value: !0 }), from && typeof from === "object" || typeof from === "function") {
    for (var key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(entry, key))
        __defProp(entry, key, {
          get: __accessProp.bind(from, key),
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
  }
  return __moduleCache.set(from, entry), entry;
}, __moduleCache;
var __returnValue = (v) => v;
function __exportSetter(name, newValue) {
  this[name] = __returnValue.bind(null, newValue);
}
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: !0,
      configurable: !0,
      set: __exportSetter.bind(all, name)
    });
};

// scene/main.ts
var exports_main = {};
__export(exports_main, {
  default: () => build
});
module.exports = __toCommonJS(exports_main);
var import_scene = require("@threert/scene"), MAT = 1.91, HALF = MAT, FLOOR = 0.45, LINTEL = 1.76, CEIL = 2.5, WALL = 0.12, wood = new import_scene.MeshStandardMaterial({ name: "aged hinoki", color: 5914155, roughness: 0.55 }), darkWood = new import_scene.MeshStandardMaterial({ name: "lacquer", color: 2364943, roughness: 0.3 }), postWood = new import_scene.MeshStandardMaterial({ name: "toko-bashira", color: 9136716, roughness: 0.6 }), ceilWood = new import_scene.MeshStandardMaterial({ name: "sugi ceiling", color: 10122837, roughness: 0.7 }), plaster = new import_scene.MeshStandardMaterial({ name: "juraku wall", color: 12033140, roughness: 0.95 }), whitePlaster = new import_scene.MeshStandardMaterial({ name: "white plaster", color: 15130834, roughness: 0.9 }), tatami = new import_scene.MeshStandardMaterial({ name: "tatami", color: 12890746, roughness: 0.85 }), heri = new import_scene.MeshStandardMaterial({ name: "tatami border", color: 1909811, roughness: 0.7 }), shojiPaper = new import_scene.MeshPhysicalMaterial({ name: "shoji paper", color: 16052194, roughness: 0.9, transmission: 0.85, ior: 1.3, side: "double" }), fusumaPaper = new import_scene.MeshStandardMaterial({ name: "fusuma", color: 14208176, roughness: 0.75 }), stone = new import_scene.MeshStandardMaterial({ name: "stone", color: 9078140, roughness: 0.9 }), moss = new import_scene.MeshStandardMaterial({ name: "moss", color: 4151842, roughness: 1 }), gravel = new import_scene.MeshStandardMaterial({ name: "gravel", color: 11774876, roughness: 1 }), tile = new import_scene.MeshStandardMaterial({ name: "kawara", color: 3882304, roughness: 0.45 }), earth = new import_scene.MeshStandardMaterial({ name: "foundation", color: 4866104, roughness: 1 }), leaf = new import_scene.MeshStandardMaterial({ name: "maple", color: 12072476, roughness: 0.8, side: "double" }), bark = new import_scene.MeshStandardMaterial({ name: "bark", color: 3812386, roughness: 0.9 }), ceramic = new import_scene.MeshStandardMaterial({ name: "celadon", color: 9414038, roughness: 0.25 }), cushion = new import_scene.MeshStandardMaterial({ name: "zabuton", color: 7021616, roughness: 0.9 });
function scrollTexture() {
  let px = new Uint8Array(163840);
  for (let y = 0;y < 320; y++)
    for (let x = 0;x < 128; x++) {
      let i = (y * 128 + x) * 4, border = x < 10 || x >= 118 || y < 40 || y >= 270, r = 236, g = 228, b = 208;
      if (border)
        [r, g, b] = [92, 78, 52];
      else {
        let d = Math.hypot(x - 64, y - 134.4), a = Math.atan2(y - 134.4, x - 64), width = 5 + 4 * Math.cos(a - Math.PI);
        if (Math.abs(d - 34) < width && !(a > -1.3 && a < -0.6))
          [r, g, b] = [28, 26, 24];
        if (Math.abs(x - 64) < 3 && y > 198.4 && y < 249.60000000000002 && Math.floor(y / 9) % 2 === 0)
          [r, g, b] = [40, 36, 32];
      }
      px[i] = r, px[i + 1] = g, px[i + 2] = b, px[i + 3] = 255;
    }
  return new import_scene.DataTexture(128, 320, px);
}
function build(ctx) {
  let root = new import_scene.Group;
  root.name = ctx.place.id;
  let box = (w, h, d, m, x, y, z) => {
    let o = new import_scene.Mesh(new import_scene.BoxGeometry(w, h, d), m);
    return o.position.set(x, y, z), root.add(o), o;
  }, instanced = (geo, m, mats2) => {
    let im = new import_scene.InstancedMesh(geo, m, mats2.length);
    return mats2.forEach((x, i) => im.setMatrixAt(i, x)), root.add(im), im;
  }, at = (x, y, z, ry = 0) => new import_scene.Matrix4().compose(new import_scene.Vector3(x, y, z), new import_scene.Quaternion().setFromAxisAngle(new import_scene.Vector3(0, 1, 0), ry), new import_scene.Vector3(1, 1, 1)), top = FLOOR + CEIL;
  box(2 * HALF + 2.2, FLOOR + 1, 2 * HALF + 2 * WALL, earth, 0.2, (FLOOR - 1) / 2, 0), box(2 * HALF, 0.02, 2 * HALF, wood, 0, FLOOR - 0.06, 0);
  let mats = [], borders = [], lay = (cx, cz, alongZ) => {
    mats.push(at(cx, FLOOR - 0.0275, cz, alongZ ? Math.PI / 2 : 0));
    for (let s of [-1, 1])
      borders.push(alongZ ? at(cx + s * (MAT / 4 - 0.014), FLOOR + 0.0008, cz, Math.PI / 2) : at(cx, FLOOR + 0.0008, cz + s * (MAT / 4 - 0.014)));
  };
  for (let sx of [-1, 1])
    for (let sz of [-1, 1])
      lay(sx * (HALF - MAT / 4), sz * (MAT / 2), !0);
  for (let k = 0;k < 4; k++)
    lay(0, -HALF + MAT / 4 + k * MAT / 2, !1);
  instanced(new import_scene.BoxGeometry(MAT - 0.006, 0.055, MAT / 2 - 0.006), tatami, mats), instanced(new import_scene.BoxGeometry(MAT - 0.006, 0.002, 0.028), heri, borders);
  for (let [x, z] of [[-HALF, -HALF], [HALF, -HALF], [-HALF, HALF], [HALF, HALF], [-HALF, 0], [HALF, 0]])
    box(0.12, CEIL, 0.12, wood, x, FLOOR + CEIL / 2, z);
  for (let s of [-1, 1])
    box(2 * HALF, 0.05, 0.1, wood, 0, FLOOR + LINTEL + 0.025, s * HALF), box(0.1, 0.05, 2 * HALF, wood, s * HALF, FLOOR + LINTEL + 0.025, 0), box(2 * HALF, 0.1, 0.05, wood, 0, FLOOR + LINTEL + 0.22, s * (HALF - 0.03)), box(0.05, 0.1, 2 * HALF, wood, s * (HALF - 0.03), FLOOR + LINTEL + 0.22, 0), box(0.1, 0.03, 2 * HALF, wood, s * HALF, FLOOR + 0.015, 0);
  box(2 * HALF + 0.2, 0.02, 2 * HALF + 0.2, ceilWood, 0, top + 0.01, 0);
  let battens = [];
  for (let x = -HALF + 0.45;x < HALF; x += 0.45)
    battens.push(at(x, top - 0.015, 0));
  instanced(new import_scene.BoxGeometry(0.03, 0.03, 2 * HALF), wood, battens), box(2 * HALF, 0.06, 0.06, wood, 0, top - 0.03, -HALF + 0.03), box(2 * HALF, 0.06, 0.06, wood, 0, top - 0.03, HALF - 0.03);
  let above = CEIL - LINTEL - 0.05;
  for (let s of [-1, 1])
    box(2 * HALF, above, WALL, plaster, 0, FLOOR + LINTEL + 0.05 + above / 2, s * (HALF + WALL / 2)), box(WALL, above, 2 * HALF, plaster, s * (HALF + WALL / 2), FLOOR + LINTEL + 0.05 + above / 2, 0);
  let shoji = (x, z) => {
    let g = new import_scene.Group, w = MAT / 2, h = LINTEL, frame = (fw, fh, fx, fy) => {
      let o = new import_scene.Mesh(new import_scene.BoxGeometry(0.03, fh, fw), wood);
      o.position.set(0, fy, fx), g.add(o);
    };
    frame(w, 0.05, 0, 0.025), frame(w, 0.04, 0, h - 0.02), frame(0.03, h, -w / 2 + 0.015, h / 2), frame(0.03, h, w / 2 - 0.015, h / 2);
    for (let i = 1;i < 3; i++)
      frame(0.012, h - 0.1, -w / 2 + i * w / 3, h / 2);
    for (let j = 1;j < 9; j++)
      frame(w - 0.04, 0.012, 0, 0.2 + (h - 0.25) * j / 9);
    let koshi = new import_scene.Mesh(new import_scene.BoxGeometry(0.02, 0.3, w - 0.05), wood);
    koshi.position.set(0, 0.2, 0), g.add(koshi);
    let paper = new import_scene.Mesh(new import_scene.PlaneGeometry(w - 0.05, h - 0.4), shojiPaper);
    paper.rotation.y = Math.PI / 2, paper.position.set(0.012, 0.35 + (h - 0.4) / 2, 0), g.add(paper), g.position.set(x, FLOOR, z), root.add(g);
  }, xs = -HALF;
  shoji(xs - 0.02, -HALF + MAT / 4), shoji(xs + 0.02, -HALF + MAT / 4 + 0.6), shoji(xs + 0.02, HALF - MAT / 4 - 0.6), shoji(xs - 0.02, HALF - MAT / 4);
  let eng = 0.95;
  box(eng, 0.04, 2 * HALF + 0.24, wood, xs - eng / 2 - 0.05, FLOOR - 0.02, 0);
  for (let k = 0;k < 9; k++)
    box(eng, 0.005, 0.005, darkWood, xs - eng / 2 - 0.05, FLOOR + 0.001, -HALF + k * 2 * HALF / 8);
  for (let s of [-1, 1])
    box(0.11, CEIL + 0.3, 0.11, wood, xs - eng - 0.05, FLOOR + (CEIL + 0.3) / 2, s * (HALF + 0.06));
  box(0.1, 0.12, 2 * HALF + 0.3, wood, xs - eng - 0.05, top + 0.36, 0);
  let gx0 = xs - eng - 0.1, gx1 = gx0 - 3.6, gcx = (gx0 + gx1) / 2, gw = gx0 - gx1, gd = 2 * HALF + 0.4;
  box(gw, 0.08, gd, moss, gcx, 0.04, 0), box(1.4, 0.09, 1.2, gravel, gcx + 0.5, 0.045, 0.6), box(0.7, FLOOR - 0.12, 0.45, stone, gx0 - 0.15, (FLOOR - 0.12) / 2, 0.2);
  for (let [dx, dz, r] of [[0.9, 0.5, 0.24], [1.45, 0.95, 0.21], [2, 0.6, 0.23], [2.6, 0.2, 0.2]]) {
    let s = new import_scene.Mesh(new import_scene.CylinderGeometry(r, r * 1.05, 0.1, 9), stone);
    s.position.set(gx0 - dx, 0.09, dz), root.add(s);
  }
  let lx = gx1 + 0.7, lz = -1;
  box(0.32, 0.12, 0.32, stone, lx, 0.14, lz), box(0.12, 0.6, 0.12, stone, lx, 0.5, lz), box(0.36, 0.08, 0.36, stone, lx, 0.84, lz);
  let fireBox = box(0.24, 0.22, 0.24, stone, lx, 0.99, lz);
  fireBox.name = "garden lantern";
  let roofL = new import_scene.Mesh(new import_scene.CylinderGeometry(0.04, 0.34, 0.16, 4), stone);
  roofL.position.set(lx, 1.18, lz), roofL.rotation.y = Math.PI / 4, root.add(roofL);
  let basin = new import_scene.Mesh(new import_scene.CylinderGeometry(0.3, 0.26, 0.32, 20), stone);
  basin.position.set(gx1 + 1.1, 0.24, 1.05), root.add(basin);
  let water = new import_scene.Mesh(new import_scene.CylinderGeometry(0.22, 0.22, 0.01, 20), new import_scene.MeshPhysicalMaterial({ name: "water", color: 1845802, roughness: 0.02, ior: 1.33 }));
  water.position.set(gx1 + 1.1, 0.38, 1.05), root.add(water);
  let tx = gx1 + 1.3, tz = -0.2, trunk = new import_scene.Mesh(new import_scene.CylinderGeometry(0.05, 0.09, 2.4, 10), bark);
  trunk.position.set(tx, 1.2, tz), trunk.rotation.z = 0.12, root.add(trunk);
  let leaves = [], seed = 7, rnd = () => (seed = seed * 16807 % 2147483647) / 2147483647;
  for (let i = 0;i < 520; i++) {
    let a = rnd() * Math.PI * 2, r = Math.sqrt(rnd()) * 1.3, h = 2 + rnd() * 1.1 - r * 0.35, q = new import_scene.Quaternion().setFromAxisAngle(new import_scene.Vector3(rnd() - 0.5, 1, rnd() - 0.5).normalize(), rnd() * Math.PI);
    leaves.push(new import_scene.Matrix4().compose(new import_scene.Vector3(tx - 0.25 + Math.cos(a) * r, h, tz + Math.sin(a) * r * 0.9), q, new import_scene.Vector3(1, 1, 1)));
  }
  instanced(new import_scene.PlaneGeometry(0.11, 0.09), leaf, leaves);
  for (let i = 0;i < 5; i++) {
    let b = new import_scene.Mesh(new import_scene.CylinderGeometry(0.012, 0.025, 1.1, 6), bark), a = i / 5 * Math.PI * 2;
    b.position.set(tx - 0.2 + Math.cos(a) * 0.35, 2.15, tz + Math.sin(a) * 0.35), b.rotation.set(Math.sin(a) * 0.9, 0, -Math.cos(a) * 0.9), root.add(b);
  }
  let gwH = 2.3;
  for (let s of [-1, 1])
    box(gw, gwH, 0.15, whitePlaster, gcx, gwH / 2, s * (gd / 2 + 0.075)), box(gw + 0.1, 0.08, 0.34, tile, gcx, gwH + 0.04, s * (gd / 2 + 0.075));
  box(0.15, gwH, gd + 0.3, whitePlaster, gx1 - 0.075, gwH / 2, 0), box(0.34, 0.08, gd + 0.4, tile, gx1 - 0.075, gwH + 0.04, 0);
  let dep = 0.7, zn = -HALF;
  box(2 * HALF + 2 * WALL, CEIL, WALL, plaster, 0, FLOOR + CEIL / 2, zn - dep - WALL / 2), box(WALL, CEIL, dep, plaster, -HALF - WALL / 2, FLOOR + CEIL / 2, zn - dep / 2), box(WALL, CEIL, dep, plaster, HALF + WALL / 2, FLOOR + CEIL / 2, zn - dep / 2), box(0.06, CEIL, dep, plaster, 0, FLOOR + CEIL / 2, zn - dep / 2), box(2 * HALF, 0.02, dep, ceilWood, 0, FLOOR + 2.15, zn - dep / 2), box(2 * HALF, CEIL - 2.15, 0.06, plaster, 0, FLOOR + 2.15 + (CEIL - 2.15) / 2, zn - 0.03), box(2 * HALF, 0.06, 0.06, wood, 0, FLOOR + 2.12, zn - 0.03), box(HALF, 0.12, dep, darkWood, -HALF / 2, FLOOR + 0.06, zn - dep / 2);
  let tokoPost = new import_scene.Mesh(new import_scene.CylinderGeometry(0.06, 0.07, CEIL, 10), postWood);
  tokoPost.position.set(0, FLOOR + CEIL / 2, zn), root.add(tokoPost);
  let scroll = new import_scene.Mesh(new import_scene.PlaneGeometry(0.46, 1.15), new import_scene.MeshStandardMaterial({ name: "scroll", color: 16777215, roughness: 0.85, map: scrollTexture() }));
  scroll.position.set(-HALF / 2, FLOOR + 1.3, zn - dep + 0.01), root.add(scroll), box(0.52, 0.025, 0.025, darkWood, -HALF / 2, FLOOR + 0.72, zn - dep + 0.02);
  let vase = new import_scene.Mesh(new import_scene.CylinderGeometry(0.06, 0.08, 0.26, 24), ceramic);
  vase.position.set(-HALF / 2 + 0.25, FLOOR + 0.25, zn - dep / 2), root.add(vase);
  let twig = new import_scene.Mesh(new import_scene.CylinderGeometry(0.006, 0.009, 0.6, 5), bark);
  twig.position.set(-HALF / 2 + 0.33, FLOOR + 0.62, zn - dep / 2), twig.rotation.z = -0.4, root.add(twig);
  for (let i = 0;i < 14; i++) {
    let l = new import_scene.Mesh(new import_scene.SphereGeometry(0.03, 6, 4), leaf);
    l.scale.set(1, 0.35, 1), l.position.set(-HALF / 2 + 0.37 + rnd() * 0.22, FLOOR + 0.7 + rnd() * 0.25, zn - dep / 2 + (rnd() - 0.5) * 0.2), root.add(l);
  }
  box(HALF - 0.06, 0.03, dep - 0.05, darkWood, HALF / 2, FLOOR + 0.03, zn - dep / 2), box(HALF / 2, 0.03, dep - 0.1, darkWood, HALF * 0.3, FLOOR + 0.95, zn - dep / 2), box(HALF / 2, 0.03, dep - 0.1, darkWood, HALF * 0.7, FLOOR + 1.12, zn - dep / 2), box(0.02, 0.17, 0.02, darkWood, HALF / 2, FLOOR + 1.035, zn - dep / 2), box(HALF - 0.06, 0.36, dep - 0.08, fusumaPaper, HALF / 2, FLOOR + 1.9, zn - dep / 2 + 0.02), box(HALF - 0.06, 0.02, dep - 0.06, darkWood, HALF / 2, FLOOR + 1.71, zn - dep / 2 + 0.02);
  let bowl = new import_scene.Mesh(new import_scene.SphereGeometry(0.07, 20, 10), ceramic);
  bowl.scale.set(1, 0.5, 1), bowl.position.set(HALF * 0.75, FLOOR + 1.16, zn - dep / 2), root.add(bowl);
  for (let k = 0;k < 4; k++) {
    let z = -HALF + MAT / 4 + k * MAT / 2, x = HALF + (k % 2 ? 0.02 : -0.02), panel = new import_scene.Mesh(new import_scene.BoxGeometry(0.02, LINTEL - 0.01, MAT / 2), fusumaPaper);
    panel.position.set(x, FLOOR + LINTEL / 2, z), root.add(panel);
    for (let s of [-1, 1]) {
      let edge = new import_scene.Mesh(new import_scene.BoxGeometry(0.03, LINTEL - 0.01, 0.02), darkWood);
      edge.position.set(x, FLOOR + LINTEL / 2, z + s * (MAT / 4 - 0.01)), root.add(edge);
    }
    let pull = new import_scene.Mesh(new import_scene.CylinderGeometry(0.028, 0.028, 0.034, 16), darkWood);
    pull.rotation.z = Math.PI / 2, pull.position.set(x, FLOOR + 0.8, z + (k % 2 ? -1 : 1) * (MAT / 4 - 0.12)), root.add(pull);
  }
  box(0.1, LINTEL, 2 * HALF, earth, HALF + 0.12, FLOOR + LINTEL / 2, 0);
  let zs = HALF + WALL / 2, wy0 = FLOOR + 0.55, wy1 = FLOOR + 1.25, wx0 = -0.9, wx1 = 0.1;
  box(2 * HALF, wy0 - FLOOR, WALL, plaster, 0, (FLOOR + wy0) / 2, zs), box(2 * HALF, FLOOR + LINTEL - wy1, WALL, plaster, 0, (wy1 + FLOOR + LINTEL) / 2, zs), box(wx0 + HALF, wy1 - wy0, WALL, plaster, (-HALF + wx0) / 2, (wy0 + wy1) / 2, zs), box(HALF - wx1, wy1 - wy0, WALL, plaster, (wx1 + HALF) / 2, (wy0 + wy1) / 2, zs);
  for (let i = 0;i <= 6; i++)
    box(0.012, wy1 - wy0, 0.012, bark, wx0 + (wx1 - wx0) * i / 6, (wy0 + wy1) / 2, zs);
  for (let j = 1;j < 4; j++)
    box(wx1 - wx0, 0.012, 0.012, bark, (wx0 + wx1) / 2, wy0 + (wy1 - wy0) * j / 4, zs);
  let sp = new import_scene.Mesh(new import_scene.PlaneGeometry(wx1 - wx0, wy1 - wy0), shojiPaper);
  sp.position.set((wx0 + wx1) / 2, (wy0 + wy1) / 2, zs - WALL / 2 + 0.01), sp.rotation.y = Math.PI, root.add(sp), box(2 * HALF + 1.2, 2.6, 0.12, whitePlaster, 0.2, FLOOR + 1.3, zs + 1.2), box(2 * HALF + 1.2, 0.04, 1.08, gravel, 0.2, 0.02, zs + 0.6);
  let rx0 = xs - eng - 0.5, rx1 = HALF + 0.3, rl = rx1 - rx0, pitch = 0.42, span = HALF + dep + 0.6, rise = Math.tan(pitch) * span, slope = span / Math.cos(pitch);
  for (let s of [-1, 1]) {
    let r = new import_scene.Mesh(new import_scene.BoxGeometry(rl, 0.08, slope), tile);
    r.position.set((rx0 + rx1) / 2, top + 0.45 + rise / 2, s * (span / 2) - dep / 2 * 0), r.rotation.x = s * pitch, root.add(r);
    let ribs = [];
    for (let x = rx0 + 0.12;x < rx1; x += 0.27) {
      let m = new import_scene.Matrix4().compose(new import_scene.Vector3(x, top + 0.5 + rise / 2, s * (span / 2)), new import_scene.Quaternion().setFromAxisAngle(new import_scene.Vector3(1, 0, 0), s * pitch), new import_scene.Vector3(1, 1, 1));
      ribs.push(m);
    }
    instanced(new import_scene.CylinderGeometry(0.05, 0.05, slope, 8).rotateX(Math.PI / 2), tile, ribs);
  }
  box(rl + 0.1, 0.16, 0.24, tile, (rx0 + rx1) / 2, top + 0.5 + rise, 0), box(rl, 0.25, 2 * span, earth, (rx0 + rx1) / 2, top + 0.15, 0), box(0.9, 0.03, 0.6, darkWood, 0.2, FLOOR + 0.33, 0.35);
  for (let [x, z] of [[-0.2, 0.1], [0.6, 0.1], [-0.2, 0.6], [0.6, 0.6]])
    box(0.05, 0.31, 0.05, darkWood, x, FLOOR + 0.155, z);
  box(0.55, 0.07, 0.6, cushion, -0.6, FLOOR + 0.035, 0.35), box(0.55, 0.07, 0.6, cushion, 1, FLOOR + 0.035, 0.35);
  let cup = new import_scene.Mesh(new import_scene.CylinderGeometry(0.05, 0.035, 0.07, 20), ceramic);
  return cup.position.set(0.05, FLOOR + 0.38, 0.3), root.add(cup), root;
}

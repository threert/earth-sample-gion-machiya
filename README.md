# The back parlour of a machiya in Gion

A sample place for [EarthRT](https://github.com/threert/EarthRT): the eight-tatami back room of a Kyoto townhouse
off Hanamikoji, with shoji onto a walled moss garden and its maple, a tokonoma with an ensō scroll and a vase, staggered
shelves, fusuma, and an andon that lights the room in the evening. Made from
[threert/earth-place-template](https://github.com/threert/earth-place-template).

| day | evening |
| --- | --- |
| ![](docs/day.jpg) | ![](docs/dusk.jpg) |

*Path-traced in ThreeRT (the preview: `threert dev`).*

- The room is a ThreeRT scene module ([scene/main.ts](scene/main.ts)): the client traces it; the web shows its baked
  GLB (`assets/models/scene.glb`).
- The andon is a GLB of its own ([scene/andon.ts](scene/andon.ts), baked by `bun tools/models.ts`), shown by both.
- Kind `interior`, topic `interior:gion-machiya`. Everything is made in code: CC0.

Make your own version of it: Remix it in ThreeRT (`threert remix https://github.com/threert/earth-sample-gion-machiya`)
and read [AGENTS.md](AGENTS.md).

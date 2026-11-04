# play.bihari.xyz

Old Flash and Shockwave games, playable in the browser again.

**Play:** https://play.bihari.xyz

## Games

| Series | Games |
|---|---|
| Commando Assault | Commando Assault |
| Metal Mayhem (Shockwave 3D) | Metal Mayhem 2, Metal Mayhem World Tour |
| Fancy Pants Adventures | World 1, World 2, World 3, World 4 Parts 1–3 |
| Crush the Castle | Crush the Castle, 2, Players Pack, 2: Players Pack, Adventures, TD |
| Age of War | Age of War, Age of War 2 |
| Territory War | Territory War, Territory War 3, Territory War Online |
| Raft Wars | Raft Wars, Raft Wars 2 |

All rights to the games belong to their creators. This is only a fan-made way to keep playing them.

## How it runs

Browsers dropped Flash years ago. Every game page uses [Ruffle](https://ruffle.rs), a free Flash emulator that runs in the browser, so there's nothing to install.

Each game lives in its own folder (`/age-of-war/`, `/fancy-pants-1/` …). Its files sit under `content/<original website>/<original path>`, the same layout [Flashpoint](https://flashpointarchive.org) uses. The shared `play.js` loads the game by its original web address and tells Ruffle to fetch any original address from `content/` instead. So the game thinks it's on its original site, and the files it asks the dead sites for (level packs, Armor Games' API) still load.

### Shockwave games (Metal Mayhem)

Metal Mayhem 2 and World Tour aren't Flash. They're Adobe Director / Shockwave 3D games with Havok physics and Flash menus. They run on [dirplayer-rs](https://github.com/igorlira/dirplayer-rs), a Shockwave emulator, through the shared `shockwave.js`.

- The player in `dirplayer/` is a custom build: dirplayer-rs [PR #244](https://github.com/igorlira/dirplayer-rs/pull/244), which adds most of the 3D and Havok support, plus the fixes from [sewerrun-browser-port](https://github.com/Suleiman700/sewerrun-browser-port), plus one fix of mine: `_movie.systemDate()` was missing, and both games call it at startup. The full source change is `dirplayer/dirplayer-rs.patch`.
- Each game starts the way [Flashpoint](https://flashpointarchive.org) launches it: Miniclip's wrapper movie, plus a launch command that tells it which game file to load.
- The games only run if their own address contains `shockwave.com`, so their files keep the original folder layout (`content/www.shockwave.com/...`), the same as the Flash games.
- The stage is 800×600. The menus' buttons sit along the bottom edge.

## What I changed

- **Commando Assault.** Removed the Miniclip "localhost only" check (`isLocal()`), and added a custom play.bihari.xyz title screen (`assault/title.jpg`). The original buttons sit invisibly over the ones drawn in the new image.
- **Crush the Castle TD and Adventures.** Both refuse to run anywhere except armorgames.com. In each one I edited the single function that reads the site's domain so it always answers `armorgames.com`. The edits were made with the [JPEXS Flash decompiler](https://github.com/jindrapetrik/jpexs-decompiler).
- **Made every game fill the screen** and added a small "menu" button in the corner.

Nothing else in the games was changed.

## Licences

The player in `dirplayer/` is built from dirplayer-rs and is licensed under the **GPL-3.0** (`dirplayer/LICENSE`). Its source is the upstream commit named in `dirplayer/README.md` plus `dirplayer/dirplayer-rs.patch`. The Ruffle files bundled with it are MIT/Apache-2.0 (`dirplayer/ruffle/`). Online-only features (Armor Games logins, high-score servers, shared player levels, Territory War Online's multiplayer) don't work, because those servers are gone.

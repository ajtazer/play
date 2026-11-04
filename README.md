# play.bihari.xyz

Old Flash games, playable in the browser again.

**Play:** https://play.bihari.xyz

## Games

| Series | Games |
|---|---|
| Commando Assault | Commando Assault |
| Fancy Pants Adventures | World 1, World 2, World 3, World 4 Parts 1–3 |
| Crush the Castle | Crush the Castle, 2, Players Pack, 2: Players Pack, Adventures, TD |
| Age of War | Age of War, Age of War 2 |
| Territory War | Territory War, Territory War 3, Territory War Online |
| Raft Wars | Raft Wars, Raft Wars 2 |

All rights to the games belong to their creators. This is only a fan-made way to keep playing them.

## How it runs

Browsers dropped Flash years ago. Every game page uses [Ruffle](https://ruffle.rs), a free Flash emulator that runs in the browser, so there's nothing to install.

Each game lives in its own folder (`/age-of-war/`, `/fancy-pants-1/` …). Its files sit under `content/<original website>/<original path>`, the same layout [Flashpoint](https://flashpointarchive.org) uses. The shared `play.js` loads the game by its original web address and tells Ruffle to fetch any original address from `content/` instead. So the game thinks it's on its original site, and the files it asks the dead sites for (level packs, Armor Games' API) still load.

## What I changed

- **Commando Assault.** Removed the Miniclip "localhost only" check (`isLocal()`), and added a custom play.bihari.xyz title screen (`assault/title.jpg`). The original buttons sit invisibly over the ones drawn in the new image.
- **Crush the Castle TD and Adventures.** Both refuse to run anywhere except armorgames.com. In each one I edited the single function that reads the site's domain so it always answers `armorgames.com`. The edits were made with the [JPEXS Flash decompiler](https://github.com/jindrapetrik/jpexs-decompiler).
- **Made every game fill the screen** and added a small "menu" button in the corner.

Nothing else in the games was changed. Online-only features (Armor Games logins, high-score servers, shared player levels, Territory War Online's multiplayer) don't work, because those servers are gone.

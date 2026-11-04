// Shared Shockwave loader (dirplayer). Usage:
// <script src="../shockwave.js" data-dir="content/<original host>/<path>/"
//   data-launch='"{dir}wrapper.dcr" --do "member(&apos;gameUrl&apos;).text = &apos;{dir}game.dcr&apos;"'></script>
// data-launch is the game's Flashpoint launch command; {dir} becomes the absolute URL of data-dir.
// Keeping the original host in the path matters: these games only run if their path contains it.
const s = document.currentScript;
const dir = new URL(s.dataset.dir, location.href).href;
const command = s.dataset.launch.replaceAll("{dir}", dir);

document.head.insertAdjacentHTML("beforeend",
  "<style>html,body{margin:0;min-height:100%;background:#000}body{display:flex;align-items:center;justify-content:center;min-height:100vh}" +
  "#menu{position:fixed;top:8px;left:8px;z-index:9;font:600 13px sans-serif;color:#fff;background:#000a;" +
  "border:1px solid #fff4;border-radius:4px;padding:4px 10px;text-decoration:none;opacity:.5}#menu:hover{opacity:1}</style>");

addEventListener("DOMContentLoaded", () => {
  document.body.insertAdjacentHTML("afterbegin", '<a id="menu" href="../">&larr; menu</a>');
  const host = document.createElement("div");
  host.dataset.launchCommand = command;
  const embed = document.createElement("embed");
  embed.src = command.match(/^"([^"]+)"/)[1];
  embed.width = 800; embed.height = 600; embed.type = "application/x-director";
  host.append(embed);
  document.body.append(host);

  const player = document.createElement("script");
  player.src = "../dirplayer/dirplayer-polyfill.js";
  player.dataset.manualInit = "";
  player.onload = () => {
    // The menus' Flash never answers dirplayer's ActionScript probe; skip the 3 s wait for it.
    DirPlayer.configureFlash({ asInitWaitMs: 0 });
    DirPlayer.init();
  };
  document.body.append(player);
});

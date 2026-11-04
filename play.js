// Shared Ruffle loader. Usage: <script src="../play.js" data-swf="https://original.host/path/game.swf"></script>
// Game files live under ./content/<original host>/<path>, so any absolute URL the game asks for
// (including its own, which keeps sitelocks happy) is served from there instead of the dead original site.
const swf = document.currentScript.dataset.swf;
const content = new URL("content/", location.href).href;
const esc = location.host.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

window.RufflePlayer = {
  config: {
    urlRewriteRules: [[new RegExp(`^https?://(?!${esc}/)(.*)$`), content + "$1"]],
    scale: "showAll", forceScale: true, salign: "", forceAlign: true,
    letterbox: "on", autoplay: "on", unmuteOverlay: "hidden",
  },
};

document.head.insertAdjacentHTML("beforeend",
  "<style>body{margin:0;background:#000}ruffle-player{width:100vw;height:100vh;display:block}" +
  "#menu{position:fixed;top:8px;left:8px;z-index:9;font:600 13px sans-serif;color:#fff;background:#000a;" +
  "border:1px solid #fff4;border-radius:4px;padding:4px 10px;text-decoration:none;opacity:.5}#menu:hover{opacity:1}</style>");
addEventListener("DOMContentLoaded", () => document.body.insertAdjacentHTML("afterbegin", '<a id="menu" href="../">&larr; menu</a>'));
const s = document.createElement("script");
s.src = "https://unpkg.com/@ruffle-rs/ruffle@0.7.1/ruffle.js";
s.onload = () => {
  const p = RufflePlayer.newest().createPlayer();
  document.body.append(p);
  p.load({ url: swf });
};
document.head.append(s);

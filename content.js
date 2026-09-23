const extensionApi = globalThis.browser ?? globalThis.chrome;

function ensureDarkStyle() {
  if (document.getElementById("jugadu-dark-style")) return;

  const style = document.createElement("style");
  style.id = "jugadu-dark-style";
  style.textContent = `
    html.jugadu-dark-mode,
    html.jugadu-dark-mode body,
    html.jugadu-dark-mode div,
    html.jugadu-dark-mode section,
    html.jugadu-dark-mode header,
    html.jugadu-dark-mode main,
    html.jugadu-dark-mode footer,
    html.jugadu-dark-mode table,
    html.jugadu-dark-mode tbody,
    html.jugadu-dark-mode tr,
    html.jugadu-dark-mode td,
    html.jugadu-dark-mode th,
    html.jugadu-dark-mode input,
    html.jugadu-dark-mode select,
    html.jugadu-dark-mode textarea,
    html.jugadu-dark-mode .card,
    html.jugadu-dark-mode .panel,
    html.jugadu-dark-mode .panel-body {
      background-color: #121212 !important;
      color: #e0e0e0 !important;
      border-color: #333 !important;
    }

    html.jugadu-dark-mode a { color: #bb86fc !important; }
    html.jugadu-dark-mode .btn { background-color: #333 !important; color: #fff !important; }
  `;
  (document.head || document.documentElement).appendChild(style);
}

function addOverlay() {
  const topLeftDivId = "jugadu-top-left-overlay";

  const create = () => {
    if (document.getElementById(topLeftDivId)) return;
    const topLeftDiv = document.createElement('div');
    topLeftDiv.id = topLeftDivId;
    topLeftDiv.style.position = 'fixed';
    topLeftDiv.style.top = '0';
    topLeftDiv.style.left = '0';
    topLeftDiv.style.width = '300px';
    topLeftDiv.style.height = '80px';
    topLeftDiv.style.backgroundColor = '#000';
    topLeftDiv.style.zIndex = '9999';
    topLeftDiv.style.pointerEvents = 'none';
    document.body.appendChild(topLeftDiv);
  };

  if (document.body) {
    create();
  } else {
    document.addEventListener('DOMContentLoaded', create, { once: true });
  }
}

function removeOverlay() {
  const overlay = document.getElementById("jugadu-top-left-overlay");
  if (overlay) overlay.remove();
}

function DarkModeMainFunction(enable) {
  ensureDarkStyle();

  const shouldEnable = typeof enable === "boolean"
    ? enable
    : !document.documentElement.classList.contains("jugadu-dark-mode");

  document.documentElement.classList.toggle("jugadu-dark-mode", shouldEnable);

  if (shouldEnable) {
    addOverlay();
  } else {
    removeOverlay();
  }
}

(async () => {
  console.log("[Jugaadu Flex] content.js loaded (dark-mode-fix build)");
  const result = await extensionApi.storage.local.get("darkMode");
  console.log("[Jugaadu Flex] darkMode from storage:", result.darkMode);
  if (result.darkMode) DarkModeMainFunction(true);
})();

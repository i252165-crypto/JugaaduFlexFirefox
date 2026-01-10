async function DarkModeMainFunction(enable) {
  const topLeftDivId = "jugadu-top-left-overlay";

  if (!document.getElementById("jugadu-dark-style")) {
    const style = document.createElement("style");
    style.id = "jugadu-dark-style";
    style.textContent = `
      body.jugadu-dark-mode,
      body.jugadu-dark-mode div,
      body.jugadu-dark-mode section,
      body.jugadu-dark-mode header,
      body.jugadu-dark-mode main,
      body.jugadu-dark-mode footer,
      body.jugadu-dark-mode table,
      body.jugadu-dark-mode tbody,
      body.jugadu-dark-mode tr,
      body.jugadu-dark-mode td,
      body.jugadu-dark-mode th,
      body.jugadu-dark-mode input,
      body.jugadu-dark-mode select,
      body.jugadu-dark-mode textarea,
      body.jugadu-dark-mode .card,
      body.jugadu-dark-mode .panel,
      body.jugadu-dark-mode .panel-body {
        background-color: #121212 !important;
        color: #e0e0e0 !important;
        border-color: #333 !important;
      }

      body.jugadu-dark-mode a { color: #bb86fc !important; }
      body.jugadu-dark-mode .btn { background-color: #333 !important; color: #fff !important; }
    `;
    document.head.appendChild(style);
  }

  if (enable === true) {
    document.body.classList.add("jugadu-dark-mode");

    if (!document.getElementById(topLeftDivId)) {
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
    }

  } else if (enable === false) {
    document.body.classList.remove("jugadu-dark-mode");

    const overlay = document.getElementById(topLeftDivId);
    if (overlay) overlay.remove();

  } else {
    const isDark = document.body.classList.toggle("jugadu-dark-mode");

    if (isDark) {
      if (!document.getElementById(topLeftDivId)) {
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
      }
    } else {
      const overlay = document.getElementById(topLeftDivId);
      if (overlay) overlay.remove();
    }
  }
}

(async () => {
  const result = await chrome.storage.local.get("darkMode");
  if (result.darkMode) DarkModeMainFunction(true);
})();

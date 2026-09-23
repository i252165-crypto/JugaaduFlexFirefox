const extensionApi = globalThis.browser ?? globalThis.chrome;

const DARK_MODE_STORAGE_KEY = "darkMode";
const DARK_MODE_MESSAGE_TYPE = "jugadu:set-dark-mode";

function applyDarkMode(enabled) {
  if (enabled) {
    // The public API invokes the same Dynamic Theme engine as Dark Reader.
    // Use defaults
    DarkReader.enable();
  } else {
    DarkReader.disable();
  }
}

extensionApi.runtime.onMessage.addListener((message) => {
  if (message?.type !== DARK_MODE_MESSAGE_TYPE) return undefined;

  applyDarkMode(Boolean(message.enabled));
  return Promise.resolve({ applied: true });
});

(async () => {
  const { darkMode = false } = await extensionApi.storage.local.get(DARK_MODE_STORAGE_KEY);
  applyDarkMode(darkMode);
})();

const STORAGE_KEY = "hideShortsEnabled";
const enabledToggle = document.getElementById("enabledToggle");
const statusText = document.getElementById("statusText");

function setStatus(enabled) {
  statusText.textContent = enabled
    ? "Shorts are hidden."
    : "Shorts blocking is disabled.";
}

chrome.storage.local.get({ [STORAGE_KEY]: true }, (result) => {
  const enabled = Boolean(result[STORAGE_KEY]);
  enabledToggle.checked = enabled;
  setStatus(enabled);
});

enabledToggle.addEventListener("change", () => {
  const enabled = enabledToggle.checked;
  chrome.storage.local.set({ [STORAGE_KEY]: enabled }, () => {
    setStatus(enabled);
  });
});

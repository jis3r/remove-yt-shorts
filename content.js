const STORAGE_KEY = "hideShortsEnabled";

let enabled = true;
let styleElement = null;
let observer = null;
let lastUrl = location.href;

const STYLE_ID = "yt-shorts-cleaner-style";
const SHORTS_PAGE_REGEX = /^\/shorts\//;

const SHORTS_STYLE = `
  ytd-reel-shelf-renderer,
  ytd-rich-shelf-renderer[is-shorts],
  ytd-rich-section-renderer:has(a[href*="/shorts/"]),
  ytd-guide-entry-renderer:has(a[href^="/shorts"]),
  ytd-mini-guide-entry-renderer:has(a[href^="/shorts"]),
  ytd-video-renderer:has(a[href*="/shorts/"]),
  ytd-grid-video-renderer:has(a[href*="/shorts/"]),
  ytd-rich-item-renderer:has(a[href*="/shorts/"]),
  ytd-compact-video-renderer:has(a[href*="/shorts/"]),
  ytm-reel-shelf-renderer,
  ytm-rich-item-renderer:has(a[href*="/shorts/"]),
  ytm-shorts-lockup-view-model {
    display: none !important;
  }
`;

function redirectIfOnShortsPage() {
  if (!enabled) return;
  if (SHORTS_PAGE_REGEX.test(location.pathname)) {
    location.replace(`${location.origin}/`);
  }
}

function ensureStyle() {
  if (!enabled) return;

  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = STYLE_ID;
    styleElement.textContent = SHORTS_STYLE;
    document.documentElement.appendChild(styleElement);
  }
}

function removeStyle() {
  if (styleElement) {
    styleElement.remove();
    styleElement = null;
  }
}

function hideShortsLinksFallback() {
  if (!enabled) return;

  const anchors = document.querySelectorAll('a[href*="/shorts/"]');
  for (const anchor of anchors) {
    const card = anchor.closest(
      "ytd-rich-item-renderer, ytd-video-renderer, ytd-grid-video-renderer, ytd-compact-video-renderer, ytm-rich-item-renderer"
    );
    if (card) {
      card.style.display = "none";
      continue;
    }

    const shelf = anchor.closest(
      "ytd-reel-shelf-renderer, ytd-rich-shelf-renderer, ytd-rich-section-renderer, ytm-reel-shelf-renderer"
    );
    if (shelf) {
      shelf.style.display = "none";
    }
  }
}

function startObserver() {
  if (observer || !enabled) return;

  observer = new MutationObserver(() => {
    hideShortsLinksFallback();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
}

function stopObserver() {
  if (!observer) return;
  observer.disconnect();
  observer = null;
}

function applyState() {
  if (enabled) {
    ensureStyle();
    hideShortsLinksFallback();
    startObserver();
    redirectIfOnShortsPage();
  } else {
    removeStyle();
    stopObserver();
  }
}

function syncState() {
  chrome.storage.local.get({ [STORAGE_KEY]: true }, (result) => {
    enabled = Boolean(result[STORAGE_KEY]);
    applyState();
  });
}

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "local" || !(STORAGE_KEY in changes)) return;
  enabled = Boolean(changes[STORAGE_KEY].newValue);
  applyState();
});

document.addEventListener("yt-navigate-finish", () => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    redirectIfOnShortsPage();
    hideShortsLinksFallback();
  }
});

setInterval(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    redirectIfOnShortsPage();
    hideShortsLinksFallback();
  }
}, 750);

syncState();

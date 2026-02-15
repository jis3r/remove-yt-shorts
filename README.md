# Remove YouTube Shorts (Chrome Extension)

Removes YouTube Shorts surfaces when enabled, and redirects direct `/shorts/*` URLs back to the YouTube home page.

## Features

- Toggle on/off from the extension popup
- Persists state with `chrome.storage.local`
- Hides common Shorts shelves/cards/entries on desktop and mobile YouTube
- Redirects direct Shorts page visits (for example `https://www.youtube.com/shorts/...`) to `https://www.youtube.com/`

## Install locally

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select this folder: `remove-yt-shorts`

## Notes

YouTube regularly changes markup, so selector updates may be needed over time.


# Bookmark Bundle Chrome Extension

Bookmark Bundle is a Chrome extension that helps you save and organize your bookmarks into categories.

## Project info

**URL**: https://lovable.dev/projects/2604b598-70a8-4738-8b64-9abcd5e884dc

## How to install the Chrome extension

### Development mode
1. Clone this repository or download it as a ZIP file
2. Install dependencies: `npm install`
3. Build the extension: `npm run build`
4. Open Chrome and navigate to `chrome://extensions/`
5. Enable "Developer mode" using the toggle in the top-right corner
6. Click "Load unpacked" and select the `dist` folder from this project
7. The Bookmark Bundle extension should now appear in your Chrome toolbar

### Using the extension
- Click on the Bookmark Bundle icon in your Chrome toolbar to open the extension
- Add new bookmarks by clicking the "Add current page" button or entering a URL manually
- Create and manage categories to organize your bookmarks
- Click on a bookmark to open it in a new tab
- Delete bookmarks or categories as needed

## Development

```sh
# Install dependencies
npm i

# Start the development server
npm run dev

# Build the extension
npm run build
```

## Technologies used

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Created with Lovable

This project was created with [Lovable](https://lovable.dev/projects/2604b598-70a8-4738-8b64-9abcd5e884dc).

[![unit-test](https://github.com/muleyuck/Text2QR/actions/workflows/unit-test.yml/badge.svg)](https://github.com/muleyuck/Text2QR/actions/workflows/unit-test.yml)

# Text2QR

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/public/logo-dark.svg">
  <img width="512" src="/public/logo-light.svg">
</picture>

## Overview

A simple Chrome extension that generates QR codes from selected text on any webpage.  
Perfect for quickly sharing text content, URLs, or any other information through QR codes.

## Features

- **Right-click Context Menu**: Generate QR codes directly from selected text

## Installation

### From Source

1. Clone this repository:
```bash
git clone https://github.com/muleyuck/Text2QR
cd text2qr
```

2. Install dependencies:
```bash
npm install
```

3. Build the extension:
```bash
npm run build
```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the `dist` folder


## Usage

1. **Select text** on any webpage
2. **Right-click** on the selected text
3. **Choose "Generate QR Code"** from the context menu
4. **Scan the QR code** with any QR code reader

The QR code will contain the exact text you selected and can be scanned by any device with a QR code reader.

## Technology Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **qrcode.react** - QR code generation library

## QR Code Settings

- **Error Correction Level**: L (Low) - ~7% error correction
- **Size**: 256x256 pixels
- **Margin**: 4 modules
- **Logo**: Custom favicon embedded and excavated

## Browser Compatibility

- Chrome (Manifest V3)
- Edge (Chromium-based)
- Other Chromium-based browsers

## LICENCE

[The MIT Licence](https://github.com/muleyuck/Text2QR/blob/main/LICENSE)


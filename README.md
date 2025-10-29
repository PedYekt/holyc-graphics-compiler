# HolyC Graphics Compiler

> **Show N' Tell Challenge** - *Claude Code Builder Club*
>
> Built with Claude Code to demonstrate TempleOS-style graphics programming in the browser!

A graphics-focused online environment for HolyC-style programming with TempleOS graphics primitives. This is **not a full HolyC compiler**, but rather a specialized tool for creating TempleOS-style graphics and visual programs using JavaScript syntax.

![HolyC Online](https://img.shields.io/badge/HolyC-Online-purple)
![Vue 3](https://img.shields.io/badge/Vue-3-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-orange)

## 🚀 [Live Demo](https://flourishing-axolotl-3ed6b5.netlify.app/)

Try it out now: **https://flourishing-axolotl-3ed6b5.netlify.app**

## Features

- **Monaco Editor Integration**: Full-featured code editor with HolyC syntax highlighting
- **Real-time Execution**: Execute HolyC code directly in your browser
- **TempleOS Graphics**: Support for TempleOS-style graphics primitives with 16-color palette
- **Code Sharing**: Share your code via compressed URL parameters
- **Example Programs**: Gallery of example programs showcasing HolyC features
- **Graphics Primitives**:
  - `GrClear(color)` - Clear screen
  - `GrPixel(x, y, color)` - Draw pixel
  - `GrLine(x1, y1, x2, y2, color)` - Draw line
  - `GrRect(x, y, w, h, color)` - Draw rectangle
  - `GrCircle(x, y, r, color)` - Draw circle
  - `GrText(x, y, text, color)` - Draw text

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:5173/ in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Usage

### Basic Hello World

```javascript
Print("Hello from HolyC!");
```

### Graphics Example

```javascript
// Clear screen to blue
GrClear(1);

// Draw a yellow rectangle
GrRect(100, 100, 200, 150, 14);

// Draw a red circle
GrCircle(320, 240, 80, 4);

// Draw white lines
GrLine(0, 0, 640, 480, 15);

// Draw text
GrText(220, 30, "HolyC Graphics!", 15);

Print("Graphics rendered!");
```

### TempleOS Color Palette

| Index | Color | Index | Color |
|-------|-------|-------|-------|
| 0 | BLACK | 8 | DKGRAY |
| 1 | BLUE | 9 | LTBLUE |
| 2 | GREEN | 10 | LTGREEN |
| 3 | CYAN | 11 | LTCYAN |
| 4 | RED | 12 | LTRED |
| 5 | MAGENTA | 13 | LTMAGENTA |
| 6 | BROWN | 14 | YELLOW |
| 7 | LTGRAY | 15 | WHITE |

## Keyboard Shortcuts

- `Ctrl+Enter` (or `Cmd+Enter` on Mac) - Run code

## Architecture

### Components

- **CodeEditor.vue**: Monaco editor with HolyC language support
- **GraphicsCanvas.vue**: HTML5 canvas for rendering TempleOS graphics
- **OutputConsole.vue**: Console for stdout/stderr output

### Interpreter

- **Lexer**: Tokenizes HolyC source code
- **Runtime**: Executes code with built-in graphics and print functions
- **Graphics Engine**: Renders TempleOS-style graphics primitives

## Implementation Notes

This is a **graphics-focused compiler**, not a complete HolyC implementation. It provides:
- Direct JavaScript execution with HolyC-style graphics functions
- TempleOS 16-color palette graphics primitives
- Browser-based rendering without requiring TempleOS

**Important:** This tool uses JavaScript syntax and is designed specifically for graphics programming. It does not aim to be a fully-compliant HolyC compiler but rather provides an accessible way to experiment with TempleOS-style graphics programming.

## In Memory of Terry A. Davis (1969-2018)

This project is dedicated to Terry A. Davis, the creator of TempleOS and HolyC. His unique vision and dedication to creating an entire operating system from scratch continues to inspire programmers worldwide.

> "An idiot admires complexity, a genius admires simplicity." - Terry A. Davis

## License

MIT

## Credits

- Based on the HolyC interpreter by leozamboni
- Inspired by TempleOS and Terry A. Davis's work
- Built with Vue 3, TypeScript, and Monaco Editor

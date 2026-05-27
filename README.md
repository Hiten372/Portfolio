# Personal — Portfolio Website

A personal portfolio website built with HTML, Tailwind CSS, and JavaScript. Features a responsive design, dark/light mode toggle, smooth scroll navigation, and a working contact form.

---

## Live Demo

https://connect-hiten-portfolio.vercel.app/

---

## Features

- Responsive layout — works on mobile, tablet, and desktop
- Dark / light mode with preference saved to `localStorage`
- Smooth scroll navigation with active nav highlight on scroll
- Mobile side menu with open/close animation
- Contact form powered by [Web3Forms](https://web3forms.com)
- Sections — Hero, About, Services, My Work, Contact

---

## Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Structure and markup |
| Tailwind CSS (CDN) | Styling and responsive layout |
| JavaScript | Theme toggle, mobile menu, scroll behaviour |
| Google Fonts | Outfit + Ovo typefaces |
| Web3Forms | Contact form submission |

---

## Project Structure

```
portfolio/
│
├── index.html              # Main HTML file
├── script.js               # Theme toggle, nav scroll, mobile menu
├── tailwind.config.js      # Custom Tailwind config (fonts, colors, animations)
│
├── images/                 # All icons and images
│   ├── logo.png
│   ├── logo-white.png
│   ├── hand-icon.png
│   ├── header-bg-color.png
│   ├── circular-text.png
│   ├── developer.png
│   ├── code-icon.png
│   ├── edu-icon.png
│   ├── project-icon.png
│   ├── mobile-icon.png
│   ├── ui-icon.png
│   ├── graphics-icon.png
│   ├── web-icon.png
│   ├── vscode.png
│   ├── firebase.png
│   ├── mongodb.png
│   ├── figma.png
│   ├── git.png
│   ├── work-1.png
│   ├── work-2.png
│   ├── work-3.png
│   ├── work-4.png
│   ├── send-icon.png
│   ├── mail_icon.png
│   ├── moon_icon.png
│   ├── sun_icon.png
│   ├── arrow-icon.png
│   ├── right-arrow.png
│   ├── right-arrow-white.png
│   ├── right-arrow-bold.png
│   ├── download-icon.png
│   ├── menu-black.png
│   ├── menu-white.png
│   ├── close-black.png
│   └── close-white.png
│
└── files/
    └── Hiten Prasad Resume.pdf   # Downloadable resume
```
---

## Contact Form Setup

This project uses [Web3Forms](https://web3forms.com) for the contact form — no backend needed.

1. Go to [web3forms.com](https://web3forms.com) and get a free access key
2. Replace the value in this line inside `index.html`:
```html
<input type="hidden" name="access_key" value="YOUR_KEY_HERE" />
```

---
## License

This project is open source and available under the [MIT License](LICENSE).

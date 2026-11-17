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
# Hiten Prasad — Modern Full-Stack Developer Portfolio

A modern, high-performance developer portfolio built with HTML5, Tailwind CSS, and vanilla JavaScript. Features dark/light mode, dynamic typing effect, interactive card spotlight glow, project category filtering, scroll spy navigation, copy-to-clipboard toasts, and a verified contact form powered by Web3Forms.

---

## 🌐 Live Demo

[connect-hiten-portfolio.vercel.app](https://connect-hiten-portfolio.vercel.app/)

---

## ✨ Features

- **Modern Glassmorphic Design**: Clean obsidian dark theme paired with crisp light mode, layered specular highlights, and ambient glowing mesh orbs.
- **Dynamic Spotlight Cards**: Cards track mouse movement with a subtle radial glow for an interactive, cutting-edge UI feel.
- **Scroll Progress & ScrollSpy**: Real-time reading progress bar at the viewport edge and active section highlighting in the floating navbar.
- **Interactive Role Typing Ticker**: Smooth typing/deleting animation highlighting core specializations.
- **Project Category Filtering**: Instant filtering between *All Projects*, *Full-Stack & AI*, *API & Web Apps*, and *Frontend & Forms*.
- **One-Click Quick Actions**: Copy email to clipboard with animated toast notification alerts.
- **Back-to-Top Floating Button**: Smooth auto-appearance and scroll-to-top interaction.
- **Mobile Responsive Drawer**: Frosted glass slide-out menu with backdrop overlay and smooth animations.
- **Working Contact Form**: Powered by [Web3Forms](https://web3forms.com) with hCaptcha bot protection and visual loading feedback.

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| **HTML5** | Semantic structure, accessibility, and SEO meta tags |
| **Tailwind CSS (CDN)** | Modern styling, utility classes, and responsive design |
| **Vanilla JavaScript** | Theme toggle, dynamic typing, spotlight hover, toast alerts, scroll handlers |
| **Google Fonts** | Outfit, Ovo, and JetBrains Mono |
| **Web3Forms & hCaptcha** | Contact form submission with spam protection |

---

## 📁 Project Structure

```
portfolio/
│
├── index.html              # Main HTML markup with all sections
├── script.js               # Theme toggle, typing ticker, spotlight, toast, filters
├── tailwind.config.js      # Custom theme colors, animations, keyframes, shadows
├── README.md               # Documentation and setup instructions
│
├── images/                 # All portfolio assets and project screenshots
│   ├── logo.png            # Dark text logo (Light mode)
│   ├── logo-white.png      # Light text logo (Dark mode)
│   ├── profile.png         # Hero avatar portrait
│   ├── profile-full.png    # About section portrait
│   ├── circular-text.png   # Rotating badge text
│   ├── developer.png       # Rotating badge inner icon
│   ├── work-1.png          # AI Chat project preview
│   ├── work-2.png          # Movies Finder project preview
│   ├── work-3.png          # Task Manager project preview
│   ├── work-4.png          # Survey Form project preview
│   └── ...                 # Brand icons and UI assets
│
└── files/                  # Downloadable assets (e.g. resume)
```

---

## 📬 Contact Form Setup

This project uses [Web3Forms](https://web3forms.com) for serverless form submissions.

1. Obtain an access key at [web3forms.com](https://web3forms.com)
2. Update the hidden input in `index.html`:
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY" />
   ```

---

## 📄 License

Open source and available under the [MIT License](LICENSE).

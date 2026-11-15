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

// DOM Elements
const sideMenu = document.querySelector("#sideMenu");
const menuOverlay = document.querySelector("#menuOverlay");
const navBar = document.querySelector("nav");
const navAnchors = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const scrollProgressBar = document.querySelector("#scrollProgressBar");
const backToTopBtn = document.querySelector("#backToTop");
const typingTextElement = document.querySelector("#typingText");

// ---------- Mobile Navigation Menu ----------
function openMenu() {
  if (sideMenu) sideMenu.style.transform = "translateX(0)";
  if (menuOverlay) {
    menuOverlay.classList.remove("opacity-0", "pointer-events-none");
    menuOverlay.classList.add("opacity-100", "pointer-events-auto");
  }
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  if (sideMenu) sideMenu.style.transform = "translateX(100%)";
  if (menuOverlay) {
    menuOverlay.classList.remove("opacity-100", "pointer-events-auto");
    menuOverlay.classList.add("opacity-0", "pointer-events-none");
  }
  document.body.style.overflow = "";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

// Close drawer if window is resized to desktop width
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) closeMenu();
});

// ---------- Scroll Progress & Navigation Handler ----------
const navScrolledClasses = [
  "bg-white/80",
  "dark:bg-[#09090b]/80",
  "backdrop-blur-xl",
  "shadow-sm",
  "border-b",
  "border-zinc-200/80",
  "dark:border-white/[0.08]",
];
const activeLinkClasses = [
  "text-violet-600",
  "dark:text-violet-400",
  "font-semibold",
];

function handleScroll() {
  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

  if (scrollProgressBar) scrollProgressBar.style.width = `${scrollPercent}%`;

  if (backToTopBtn) {
    const show = scrollY > 400;
    backToTopBtn.classList.toggle("opacity-0", !show);
    backToTopBtn.classList.toggle("pointer-events-none", !show);
    backToTopBtn.classList.toggle("translate-y-4", !show);
    backToTopBtn.classList.toggle("opacity-100", show);
    backToTopBtn.classList.toggle("pointer-events-auto", show);
    backToTopBtn.classList.toggle("translate-y-0", show);
  }

  if (navBar) {
    const scrolled = scrollY > 40;
    navScrolledClasses.forEach((c) => navBar.classList.toggle(c, scrolled));
  }

  // ScrollSpy
  let currentId = "";
  sections.forEach((section) => {
    if (scrollY >= section.offsetTop - 180) {
      currentId = section.getAttribute("id");
    }
  });
  // Last section (contact) may never reach its offset on tall screens
  if (
    window.innerHeight + scrollY >=
    document.documentElement.scrollHeight - 4
  ) {
    currentId = "contact";
  }

  navAnchors.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentId}`;
    activeLinkClasses.forEach((c) => link.classList.toggle(c, isActive));
  });
}

window.addEventListener("scroll", handleScroll, { passive: true });

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ---------- Dark / Light Mode ----------
function initTheme() {
  let stored = null;
  try {
    stored = localStorage.getItem("theme");
  } catch (e) {}
  const isDark =
    stored === "dark" ||
    (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", isDark);
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch (e) {}
  showToast(
    isDark ? "Switched to Dark Mode" : "Switched to Light Mode",
    "info",
  );
}

initTheme();

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    let stored = null;
    try {
      stored = localStorage.getItem("theme");
    } catch (err) {}
    if (!stored) document.documentElement.classList.toggle("dark", e.matches);
  });

// ---------- Dynamic Typing / Rotating Tagline ----------
const phrases = [
  "MERN Stack Developer",
  "Clean UI/UX Design",
  "RESTful API Architect",
  "Open Source Enthusiast",
  "Scalable Web Solutions",
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
  if (!typingTextElement) return;

  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typingSpeed = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 400;
  }

  setTimeout(typeEffect, typingSpeed);
}

// ---------- Spotlight Hover Effect on Cards ----------
function initSpotlightCards() {
  document.querySelectorAll(".spotlight-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    });
  });
}

// ---------- Project Category Filter Tabs ----------
function initProjectFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (!filterBtns.length || !projectCards.length) return;

  const activeCls = [
    "bg-violet-600",
    "text-white",
    "shadow-md",
    "shadow-violet-500/25",
  ];
  const inactiveCls = [
    "bg-zinc-100",
    "text-zinc-600",
    "hover:bg-zinc-200",
    "dark:bg-white/[0.05]",
    "dark:text-zinc-400",
    "dark:hover:bg-white/[0.1]",
  ];

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-filter");

      filterBtns.forEach((b) => {
        b.classList.remove(...activeCls);
        b.classList.add(...inactiveCls);
      });
      btn.classList.remove(...inactiveCls);
      btn.classList.add(...activeCls);

      projectCards.forEach((card) => {
        const cats = (card.getAttribute("data-category") || "").split(" ");
        const match = category === "all" || cats.includes(category);

        clearTimeout(card._filterTimer);

        if (match) {
          // Cards are flex-col, so restore "flex" (NOT "block")
          card.style.display = "flex";
          card._filterTimer = setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.96)";
          card._filterTimer = setTimeout(() => {
            card.style.display = "none";
          }, 250);
        }
      });
    });
  });
}

// ---------- Toast Notification System ----------
function showToast(message, type = "success") {
  let toastContainer = document.querySelector("#toastContainer");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toastContainer";
    // bottom-24 so toasts don't sit on top of the Back-to-Top button
    toastContainer.className =
      "fixed bottom-24 right-6 z-[110] flex flex-col gap-2 pointer-events-none";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className =
    "pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-900/95 dark:bg-white/95 text-white dark:text-zinc-900 shadow-xl backdrop-blur-md border border-white/10 dark:border-black/10 text-sm font-medium transition-all duration-300 transform translate-y-4 opacity-0";

  let iconSvg = "";
  if (type === "success") {
    iconSvg = `<svg class="w-5 h-5 text-emerald-400 dark:text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`;
  } else if (type === "error") {
    iconSvg = `<svg class="w-5 h-5 text-rose-400 dark:text-rose-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`;
  } else {
    iconSvg = `<svg class="w-5 h-5 text-violet-400 dark:text-violet-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
  }

  // Use textContent for the message (avoids HTML injection from server messages)
  toast.innerHTML = iconSvg;
  const span = document.createElement("span");
  span.textContent = message;
  toast.appendChild(span);
  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove("translate-y-4", "opacity-0");
    toast.classList.add("translate-y-0", "opacity-100");
  });

  setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("translate-y-4", "opacity-0");
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ---------- Copy to Clipboard Helper ----------
function copyToClipboard(text, customMessage = "Copied to clipboard!") {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => showToast(customMessage, "success"))
      .catch(() => fallbackCopyTextToClipboard(text, customMessage));
  } else {
    fallbackCopyTextToClipboard(text, customMessage);
  }
}

function fallbackCopyTextToClipboard(text, customMessage) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
    showToast(customMessage, "success");
  } catch (err) {
    showToast("Failed to copy", "error");
  }
  document.body.removeChild(textArea);
}

// ---------- Contact Form (Web3Forms, no captcha) ----------
function initContactForm() {
  const form = document.getElementById("form");
  const result = document.getElementById("formResult");
  const submitBtn = document.getElementById("contactSubmit");
  const buttonText = document.getElementById("buttonText");
  const buttonSpinner = document.getElementById("buttonSpinner");

  if (!form) return;

  const setResult = (text, cls) => {
    if (!result) return;
    result.textContent = text;
    result.className = `text-center text-sm font-medium ${cls}`;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const json = JSON.stringify(Object.fromEntries(new FormData(form)));

    if (submitBtn) submitBtn.disabled = true;
    if (buttonText) buttonText.textContent = "Sending...";
    if (buttonSpinner) buttonSpinner.classList.remove("hidden");
    setResult("Sending your message...", "text-zinc-500 dark:text-zinc-400");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });
      const data = await response.json();

      if (response.status === 200 && data.success !== false) {
        setResult(
          "Message sent successfully! I'll get back to you shortly.",
          "text-emerald-600 dark:text-emerald-400",
        );
        showToast("Message sent successfully!", "success");
        form.reset();
      } else {
        const msg = data.message || "Failed to send message. Please try again.";
        setResult(msg, "text-rose-500");
        showToast(msg, "error");
      }
    } catch (err) {
      const msg = "Something went wrong. Please reach out via email directly.";
      setResult(msg, "text-rose-500");
      showToast(msg, "error");
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      if (buttonText) buttonText.textContent = "Send Message";
      if (buttonSpinner) buttonSpinner.classList.add("hidden");
    }
  });
}

// ---------- Init ----------
function initializePortfolio() {
  typeEffect();
  initSpotlightCards();
  initProjectFilters();
  initContactForm();
  handleScroll(); // set initial nav / progress state
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializePortfolio);
} else {
  initializePortfolio();
}

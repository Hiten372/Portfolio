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
  if (sideMenu) {
    sideMenu.style.transform = "translateX(0)";
  }
  if (menuOverlay) {
    menuOverlay.classList.remove("opacity-0", "pointer-events-none");
    menuOverlay.classList.add("opacity-100", "pointer-events-auto");
  }
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  if (sideMenu) {
    sideMenu.style.transform = "translateX(100%)";
  }
  if (menuOverlay) {
    menuOverlay.classList.remove("opacity-100", "pointer-events-auto");
    menuOverlay.classList.add("opacity-0", "pointer-events-none");
  }
  document.body.style.overflow = "";
}

// Close mobile menu on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMenu();
  }
});

// ---------- Scroll Progress & Navigation Handler ----------
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

  // Scroll Progress Bar
  if (scrollProgressBar) {
    scrollProgressBar.style.width = `${scrollPercent}%`;
  }

  // Back to Top Button visibility
  if (backToTopBtn) {
    if (scrollY > 400) {
      backToTopBtn.classList.remove(
        "opacity-0",
        "pointer-events-none",
        "translate-y-4",
      );
      backToTopBtn.classList.add(
        "opacity-100",
        "pointer-events-auto",
        "translate-y-0",
      );
    } else {
      backToTopBtn.classList.add(
        "opacity-0",
        "pointer-events-none",
        "translate-y-4",
      );
      backToTopBtn.classList.remove(
        "opacity-100",
        "pointer-events-auto",
        "translate-y-0",
      );
    }
  }

  // Navbar glassmorphism & background refinement
  if (navBar) {
    if (scrollY > 40) {
      navBar.classList.add(
        "bg-white/80",
        "dark:bg-[#09090b]/80",
        "backdrop-blur-xl",
        "shadow-sm",
        "border-b",
        "border-zinc-200/80",
        "dark:border-white/[0.08]",
      );
    } else {
      navBar.classList.remove(
        "bg-white/80",
        "dark:bg-[#09090b]/80",
        "backdrop-blur-xl",
        "shadow-sm",
        "border-b",
        "border-zinc-200/80",
        "dark:border-white/[0.08]",
      );
    }
  }

  // Active Navigation Link Highlight (ScrollSpy)
  let currentId = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 180;
    if (scrollY >= sectionTop) {
      currentId = section.getAttribute("id");
    }
  });

  navAnchors.forEach((link) => {
    const href = link.getAttribute("href");
    const isActive = href === `#${currentId}`;
    if (isActive) {
      link.classList.add(
        "text-violet-600",
        "dark:text-violet-400",
        "font-semibold",
      );
      link.classList.remove("text-zinc-600", "dark:text-zinc-400");
    } else {
      link.classList.remove(
        "text-violet-600",
        "dark:text-violet-400",
        "font-semibold",
      );
      link.classList.add("text-zinc-600", "dark:text-zinc-400");
    }
  });
});

// Smooth Scroll to Top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// ---------- Dark / Light Mode ----------
function initTheme() {
  const isDark =
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  document.documentElement.classList.toggle("dark", isDark);
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.theme = isDark ? "dark" : "light";
  showToast(
    isDark ? "Switched to Dark Mode" : "Switched to Light Mode",
    "info",
  );
}

initTheme();

// Listen for system theme changes if user hasn't explicitly set preference
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!("theme" in localStorage)) {
      document.documentElement.classList.toggle("dark", e.matches);
    }
  });

// ---------- Dynamic Typing / Rotating Tagline ----------
const phrases = [
  "MERN Stack Specialist",
  "Frontend & UI/UX Engineer",
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
    typingSpeed = 2000; // Pause at full word
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 400; // Pause before typing new word
  }

  setTimeout(typeEffect, typingSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
  initSpotlightCards();
  initProjectFilters();
});

// ---------- Spotlight Hover Effect on Cards ----------
function initSpotlightCards() {
  const cards = document.querySelectorAll(".spotlight-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
}

// ---------- Project Category Filter Tabs ----------
function initProjectFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-filter");

      // Update active button styling
      filterBtns.forEach((b) => {
        b.classList.remove(
          "bg-violet-600",
          "text-white",
          "shadow-md",
          "shadow-violet-500/25",
        );
        b.classList.add(
          "bg-zinc-100",
          "text-zinc-600",
          "hover:bg-zinc-200",
          "dark:bg-white/[0.05]",
          "dark:text-zinc-400",
          "dark:hover:bg-white/[0.1]",
        );
      });

      btn.classList.add(
        "bg-violet-600",
        "text-white",
        "shadow-md",
        "shadow-violet-500/25",
      );
      btn.classList.remove(
        "bg-zinc-100",
        "text-zinc-600",
        "hover:bg-zinc-200",
        "dark:bg-white/[0.05]",
        "dark:text-zinc-400",
        "dark:hover:bg-white/[0.1]",
      );

      // Filter project cards
      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        if (category === "all" || cardCategory.includes(category)) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.96)";
          setTimeout(() => {
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
    toastContainer.className =
      "fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none";
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

  toast.innerHTML = `${iconSvg}<span>${message}</span>`;
  toastContainer.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.remove("translate-y-4", "opacity-0");
    toast.classList.add("translate-y-0", "opacity-100");
  });

  // Remove toast after delay
  setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("translate-y-4", "opacity-0");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3200);
}

// ---------- Copy to Clipboard Helper ----------
function copyToClipboard(text, customMessage = "Copied to clipboard!") {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showToast(customMessage, "success");
      })
      .catch(() => {
        fallbackCopyTextToClipboard(text, customMessage);
      });
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

// ---------- Contact Form (Web3Forms) ----------
const form = document.getElementById("form");
const result = document.getElementById("formResult");
const submitBtn = document.getElementById("contactSubmit");
const buttonText = document.getElementById("buttonText");
const buttonSpinner = document.getElementById("buttonSpinner");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Check hCaptcha response if present
    const hcaptchaVal = form.querySelector('[name="h-captcha-response"]');
    if (hcaptchaVal && !hcaptchaVal.value) {
      if (result) {
        result.textContent = "Please complete the captcha verification.";
        result.className =
          "text-center text-sm mb-4 text-amber-500 font-medium";
      }
      showToast("Please complete the captcha verification", "error");
      return;
    }

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    if (submitBtn) submitBtn.disabled = true;
    if (buttonText) buttonText.textContent = "Sending...";
    if (buttonSpinner) buttonSpinner.classList.remove("hidden");

    if (result) {
      result.style.display = "block";
      result.textContent = "Sending your message...";
      result.className =
        "text-center text-sm mb-4 text-zinc-500 dark:text-zinc-400";
    }

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then(async (response) => {
        const jsonResponse = await response.json();
        if (response.status === 200) {
          if (result) {
            result.textContent =
              "Message sent successfully! I'll get back to you shortly.";
            result.className =
              "text-center text-sm mb-4 text-emerald-600 dark:text-emerald-400 font-medium";
          }
          showToast("Message sent successfully!", "success");
          form.reset();
        } else {
          const errMessage =
            jsonResponse.message || "Failed to send message. Please try again.";
          if (result) {
            result.textContent = errMessage;
            result.className = "text-center text-sm mb-4 text-rose-500";
          }
          showToast(errMessage, "error");
        }
      })
      .catch(() => {
        const errMsg =
          "Something went wrong. Please reach out via email directly.";
        if (result) {
          result.textContent = errMsg;
          result.className = "text-center text-sm mb-4 text-rose-500";
        }
        showToast(errMsg, "error");
      })
      .finally(() => {
        if (submitBtn) submitBtn.disabled = false;
        if (buttonText) buttonText.textContent = "Send Message";
        if (buttonSpinner) buttonSpinner.classList.add("hidden");
      });
  });
}

(function () {
  const STORAGE_KEY = "lk-theme";

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const toggle = document.getElementById("theme-toggle");
    if (toggle) {
      const next = theme === "dark" ? "light" : "dark";
      toggle.setAttribute("aria-label", `Switch to ${next} mode`);
      toggle.setAttribute("title", `Switch to ${next} mode`);
    }
  }

  applyTheme(getPreferredTheme());

  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(getPreferredTheme());

    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    const toggle = document.getElementById("theme-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
        const next = current === "dark" ? "light" : "dark";
        localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
      });
    }
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (event) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(event.matches ? "dark" : "light");
    }
  });
})();

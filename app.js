(function () {
  var KEY = "lk-site-theme";

  function preferred() {
    var saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    var next = theme === "dark" ? "light" : "dark";
    btn.setAttribute("aria-label", "Switch to " + next + " mode");
  }

  apply(preferred());

  document.addEventListener("DOMContentLoaded", function () {
    apply(preferred());

    var year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    var btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        var current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
        var next = current === "dark" ? "light" : "dark";
        localStorage.setItem(KEY, next);
        apply(next);
      });
    }
  });
})();

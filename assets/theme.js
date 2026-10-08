// Color theme picker. Loaded in <head> on every page so the saved theme
// applies before the page paints (no flash of the default colors).
(function () {
  var THEMES = [
    { id: "gunmetal", name: "Gunmetal and cyan", bg: "#1b2129", accent: "#38d0ff" },
    { id: "charcoal", name: "Charcoal and orange", bg: "#1e1f22", accent: "#ff7a1f" },
    { id: "graphite", name: "Graphite and volt green", bg: "#1c211f", accent: "#d4ff3a" },
    { id: "plum", name: "Plum and lilac", bg: "#1f1b26", accent: "#c4a4ff" }
  ];
  var KEY = "formly-theme";
  var root = document.documentElement;

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function apply(id) {
    if (id === "gunmetal") root.removeAttribute("data-theme"); // default lives in :root
    else root.setAttribute("data-theme", id);
  }

  var current = saved();
  if (!THEMES.some(function (t) { return t.id === current; })) current = "gunmetal";
  apply(current);

  document.addEventListener("DOMContentLoaded", function () {
    var header = document.querySelector(".header-inner");
    var nav = header && header.querySelector("nav");
    if (!nav) return;

    var tools = document.createElement("div");
    tools.className = "header-tools";
    header.insertBefore(tools, nav);
    tools.appendChild(nav);

    var picker = document.createElement("div");
    picker.className = "theme-picker";
    picker.setAttribute("role", "group");
    picker.setAttribute("aria-label", "Color theme");
    var label = document.createElement("span");
    label.className = "theme-label";
    label.setAttribute("aria-hidden", "true");
    label.textContent = "Theme";
    picker.appendChild(label);

    THEMES.forEach(function (t) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "theme-swatch";
      b.title = t.name;
      b.setAttribute("aria-label", t.name);
      b.setAttribute("aria-pressed", String(t.id === current));
      b.style.setProperty("--sw-bg", t.bg);
      b.style.setProperty("--sw-accent", t.accent);
      b.addEventListener("click", function () {
        current = t.id;
        apply(t.id);
        try { localStorage.setItem(KEY, t.id); } catch (e) {}
        picker.querySelectorAll(".theme-swatch").forEach(function (s) {
          s.setAttribute("aria-pressed", String(s === b));
        });
      });
      picker.appendChild(b);
    });
    tools.appendChild(picker);
  });
})();

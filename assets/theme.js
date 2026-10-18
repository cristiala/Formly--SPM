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
    if (id === "gunmetal") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", id);
  }

  function initSprintSectionSidebar() {
    var groups = document.querySelectorAll(".sprint-sections");
    groups.forEach(function (group) {
      if (group.closest(".sprint-layout") || group.dataset.sidebarReady === "true") return;

      var sections = Array.from(group.querySelectorAll("section[id], section:not([id])"));
      if (sections.length < 2) return;

      var layout = document.createElement("div");
      layout.className = "sprint-layout";

      var content = document.createElement("div");
      content.className = "sprint-content";

      var sidebar = document.createElement("aside");
      sidebar.className = "sprint-sidebar";
      sidebar.setAttribute("aria-label", "Section navigation");

      var label = document.createElement("p");
      label.className = "eyebrow sidebar-label";
      label.textContent = "On this page";

      var nav = document.createElement("nav");
      nav.className = "section-nav";

      sections.forEach(function (section, index) {
        var heading = section.querySelector("h2");
        var headingId = section.id || (heading && heading.id);
        if (!headingId) return;

        if (!section.id) section.id = headingId;

        var link = document.createElement("a");
        link.href = "#" + headingId;
        link.className = "section-link" + (index === 0 ? " active" : "");
        link.textContent = heading ? heading.textContent.trim() : headingId.replace(/-/g, " ");
        nav.appendChild(link);
      });

      if (!nav.children.length) return;

      sidebar.appendChild(label);
      sidebar.appendChild(nav);

      var parent = group.parentNode;
      parent.insertBefore(layout, group);
      content.appendChild(group);
      layout.appendChild(content);
      layout.appendChild(sidebar);
      group.dataset.sidebarReady = "true";

      var links = Array.from(nav.querySelectorAll(".section-link"));
      var setActiveLink = function (id) {
        links.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + id);
        });
      };

      var observer = new IntersectionObserver(function (entries) {
        var visible = entries
          .filter(function (entry) { return entry.isIntersecting; })
          .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];

        if (visible) setActiveLink(visible.target.id);
      }, {
        rootMargin: "-20% 0px -50% 0px",
        threshold: [0.2, 0.5, 0.8]
      });

      sections.forEach(function (section) {
        if (section.id) observer.observe(section);
      });
    });
  }

  var current = saved();
  if (!THEMES.some(function (t) { return t.id === current; })) current = "gunmetal";
  apply(current);

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".nav-dropdown").forEach(function (dropdown) {
      dropdown.removeAttribute("open");
    });

    initSprintSectionSidebar();

    var header = document.querySelector(".header-inner");
    var nav = header && header.querySelector("nav");
    if (!nav) return;

    var tools = document.createElement("div");
    tools.className = "header-tools";
    header.insertBefore(tools, nav);
    tools.appendChild(nav);

    var picker = document.createElement("details");
    picker.className = "nav-dropdown theme-dropdown";
    picker.setAttribute("aria-label", "Color theme");

    var summary = document.createElement("summary");
    summary.className = "theme-summary";
    summary.setAttribute("aria-label", "Pick a theme");

    var preview = document.createElement("span");
    preview.className = "theme-visual";
    preview.setAttribute("aria-hidden", "true");
    preview.style.setProperty("--sw-bg", THEMES.find(function (t) { return t.id === current; }).bg);
    preview.style.setProperty("--sw-accent", THEMES.find(function (t) { return t.id === current; }).accent);
    summary.appendChild(preview);
    picker.appendChild(summary);

    var menu = document.createElement("div");
    menu.className = "nav-dropdown-menu theme-menu";

    THEMES.forEach(function (t) {
      var option = document.createElement("button");
      option.type = "button";
      option.className = "theme-option";
      option.title = t.name;
      option.setAttribute("aria-label", t.name);
      option.style.setProperty("--sw-bg", t.bg);
      option.style.setProperty("--sw-accent", t.accent);
      option.setAttribute("data-theme-id", t.id);
      option.setAttribute("aria-pressed", String(t.id === current ? "true" : "false"));
      option.addEventListener("click", function () {
        current = t.id;
        apply(t.id);
        try { localStorage.setItem(KEY, t.id); } catch (e) {}
        preview.style.setProperty("--sw-bg", t.bg);
        preview.style.setProperty("--sw-accent", t.accent);
        menu.querySelectorAll(".theme-option").forEach(function (buttonNode) {
          buttonNode.setAttribute("aria-pressed", String(buttonNode.getAttribute("data-theme-id") === t.id));
        });
        if (picker) picker.removeAttribute("open");
      });
      menu.appendChild(option);
    });

    picker.appendChild(menu);
    tools.appendChild(picker);

    document.addEventListener("click", function (event) {
      var dropdowns = document.querySelectorAll(".nav-dropdown");
      dropdowns.forEach(function (dropdown) {
        if (!dropdown.contains(event.target)) {
          dropdown.removeAttribute("open");
        }
      });
    });

    document.querySelectorAll(".nav-dropdown-menu a").forEach(function (link) {
      link.addEventListener("click", function () {
        var details = link.closest(".nav-dropdown");
        if (details) {
          details.removeAttribute("open");
        }
      });
    });

    document.querySelectorAll(".nav-dropdown summary").forEach(function (summary) {
      summary.addEventListener("click", function () {
        var details = summary.closest(".nav-dropdown");
        if (!details) return;

        setTimeout(function () {
          if (!details.open) return;
          var menuLinks = details.querySelectorAll("a");
          menuLinks.forEach(function (menuLink) {
            menuLink.addEventListener("click", function () {
              details.removeAttribute("open");
            }, { once: true });
          });
        }, 0);
      });
    });
  });
})();

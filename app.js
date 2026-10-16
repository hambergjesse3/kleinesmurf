
"use strict";

(() => {
  const config = window.LINKS_CONFIG;

  const $ = (selector) => document.querySelector(selector);

  const icons = {
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/>',
    tiktok: '<path d="M14 3v11a4 4 0 1 1-4-4"/><path d="M14 3c1 3 3 4 6 4"/>',
    youtube: '<rect x="3" y="5" width="18" height="14" rx="4"/><path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none"/>',
    facebook: '<path d="M15 21v-8h3l.5-4H15V7c0-1.2.4-2 2-2h2V1.4A25 25 0 0 0 16 1c-3 0-5 1.8-5 5v3H8v4h3v8z"/>',
    discord: '<path d="M7 7c3-2 7-2 10 0l2 10c-2 2-4 3-7 3s-5-1-7-3L7 7Z"/><path d="M9 12h.1M15 12h.1M9 16c2 1 4 1 6 0"/>',
    github: '<path d="M9 19c-5 1-5-3-7-3m14 6v-3a3 3 0 0 0-1-2c4 0 7-2 7-7 0-2-1-4-2-5 0-1 0-3-1-4-2 0-3 1-4 2a12 12 0 0 0-6 0C8 2 7 1 5 1c-1 1-1 3-1 4-1 1-2 3-2 5 0 5 3 7 7 7-1 1-1 2-1 3v3"/>',
    linkedin: '<path d="M4 9v11M4 4v.1M10 20v-7a4 4 0 0 1 8 0v7M10 10v10"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    shopping: '<path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.1 0l3-3A5 5 0 0 0 13 2.9l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.1 0l-3 3A5 5 0 0 0 11 21.1l1.7-1.7"/>',
    external: '<path d="M14 3h7v7M21 3 11 13"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>'
  };

  function setText(selector, value) {
    const element = $(selector);
    if (element) element.textContent = value || "";
  }

  function setVisible(selector, visible) {
    const element = $(selector);
    if (element) element.hidden = !visible;
  }

  function setIcon(element, name) {
    const svgContent = icons[name] || icons.link;
    element.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ' +
      'aria-hidden="true" focusable="false">' +
      svgContent +
      "</svg>";
  }

  function safeUrl(value) {
    if (typeof value !== "string" || value.length > 2048) {
      return null;
    }

    try {
      const url = new URL(value.trim(), window.location.href);
      const protocol = url.protocol.toLowerCase();

      if (["https:", "http:", "mailto:", "tel:"].includes(protocol)) {
        if (
          (protocol === "mailto:" || protocol === "tel:") &&
          !url.pathname
        ) {
          return null;
        }

        return url.href;
      }
    } catch {
      return null;
    }

    return null;
  }

  function setStyles(appearance) {
    const root = document.documentElement;
    const body = document.body;
    const a = appearance;

    const px = (value, fallback, min, max) => {
      const number = Number(value);
      return Number.isFinite(number)
        ? `${Math.min(max, Math.max(min, number))}px`
        : fallback;
    };

    const colors = {
      "--accent": a.accent || "#8b5cf6",
      "--accent-hover": a.accentHover || "#a78bfa",
      "--text": a.text || "#f8fafc",
      "--muted": a.mutedText || "#b6bdd1",
      "--button-bg": a.buttonBackground || "rgba(255,255,255,0.09)",
      "--button-border": a.buttonBorder || "rgba(255,255,255,0.13)",
      "--button-text": a.buttonText || "#ffffff",
      "--button-radius": px(a.buttonRadius, "16px", 0, 48),
      "--card-radius": px(a.cardRadius, "24px", 0, 60),
      "--content-width": px(a.contentWidth, "520px", 280, 900),
      "--button-spacing": px(a.buttonSpacing, "12px", 0, 48),
      "--button-padding": px(a.buttonPadding, "18px", 8, 36),
      "--avatar-size": px(a.avatarSize, "104px", 48, 220),
      "--blur": px(a.blur, "14px", 0, 40)
    };

    Object.entries(colors).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    const background1 = a.backgroundColor || "#0b1020";
    const background2 = a.backgroundColor2 || "#312e81";

    root.style.setProperty("--page-background", background1);
    root.style.setProperty(
      "--page-image",
      `url("${String(a.backgroundImage || "assets/background.webp")
        .replace(/["\\\n\r]/g, "")}")`
    );

    body.style.backgroundImage = "";
    body.dataset.background = ["gradient", "solid", "image"].includes(a.backgroundType)
      ? a.backgroundType
      : "gradient";

    if (body.dataset.background === "gradient") {
      body.style.backgroundImage =
        `radial-gradient(ellipse at top, ${background2} 0%, transparent 65%), ` +
        `linear-gradient(150deg, ${background1}, ${background2})`;
    }

    const theme = a.theme === "light" ? "light" : "dark";
    body.dataset.theme = theme;
    root.style.colorScheme = theme;

    if (theme === "light") {
      root.style.setProperty("--text", a.text || "#171923");
      root.style.setProperty("--muted", a.mutedText || "#5c6172");
      root.style.setProperty("--button-bg",
        a.buttonBackground || "rgba(255,255,255,0.75)");
      root.style.setProperty("--button-border",
        a.buttonBorder || "rgba(30,30,50,0.14)");
      root.style.setProperty("--button-text", a.buttonText || "#171923");
      body.style.backgroundColor = background1;
    }

    body.dataset.buttonStyle = ["solid", "outline", "glass"].includes(a.buttonStyle)
      ? a.buttonStyle
      : "glass";

    body.dataset.hover = ["lift", "glow", "none"].includes(a.hoverEffect)
      ? a.hoverEffect
      : "lift";

    body.dataset.entrance = String(a.entranceAnimation !== false);
    body.dataset.bgAnimation = String(a.backgroundAnimation !== false);

    body.dataset.shadow = String(a.shadow !== false);

    const fontFamilies = {
      system: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      modern: 'Arial, Helvetica, sans-serif',
      serif: 'Georgia, "Times New Roman", serif',
      mono: 'ui-monospace, SFMono-Regular, Consolas, monospace'
    };

    root.style.setProperty("--font", fontFamilies[a.fontFamily] || fontFamilies.system);
  }

  function renderLinks(links, page) {
    const container = $("#links");
    if (!container) return;

    container.replaceChildren();

    if (!Array.isArray(links)) {
      container.textContent = "De links konden niet worden geladen.";
      return;
    }

    let count = 0;

    links.forEach((item) => {
      if (!item || item.enabled === false) return;
      if (typeof item.title !== "string" || !item.title.trim()) return;

      const href = safeUrl(item.url);
      if (!href) return;

      const link = document.createElement("a");
      link.className = "link-button";
      link.href = href;
      link.style.setProperty("--delay", `${Math.min(count * 65, 700)}ms`);

      if (item.featured === true) {
        link.classList.add("featured");
      }

      const externalProtocol = /^https?:/i.test(href);
      const newTab = page.openLinksInNewTab === true && externalProtocol;

      if (newTab) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }

      const icon = document.createElement("span");
      icon.className = "link-icon";
      setIcon(icon, item.icon);

      const copy = document.createElement("span");
      copy.className = "link-copy";

      const title = document.createElement("span");
      title.className = "link-title";
      title.textContent = item.title.trim();
      copy.append(title);

      if (typeof item.description === "string" && item.description.trim()) {
        const description = document.createElement("span");
        description.className = "link-description";
        description.textContent = item.description.trim();
        copy.append(description);
      }

      const external = document.createElement("span");
      external.className = "external-icon";

      if (page.showExternalIcon !== false) {
        setIcon(external, "external");
        if (newTab) {
          link.setAttribute("aria-label", `${item.title}, opent in een nieuw tabblad`);
        }
      } else {
        external.setAttribute("aria-hidden", "true");
      }

      link.append(icon, copy, external);
      container.append(link);
      count += 1;
    });

    if (count === 0) {
      const message = document.createElement("p");
      message.className = "loading";
      message.textContent = "Er zijn momenteel geen links beschikbaar.";
      container.append(message);
    }
  }

  function init() {
    if (!config || typeof config !== "object") {
      $("#links").textContent =
        "Configuratie ontbreekt. Controleer het bestand config.js.";
      return;
    }

    const profile = config.profile || {};
    const appearance = config.appearance || {};
    const page = config.page || {};

    setStyles(appearance);

    setText("#profile-name", profile.name || "Mijn links");
    setText("#profile-username", profile.username || "");
    setText("#profile-bio", profile.bio || "");
    setText("#footer-text", page.footer || "");

    setVisible("#profile-username",
      profile.showUsername !== false && Boolean(profile.username));
    setVisible("#profile-bio",
      profile.showBio !== false && Boolean(profile.bio));
    setVisible("#verified", profile.verified === true);
    setVisible("#page-footer", page.showFooter !== false && Boolean(page.footer));

    const avatar = $("#avatar");
    if (avatar) {
      avatar.alt = `Profielfoto van ${profile.name || "de eigenaar"}`;
      avatar.addEventListener("error", () => {
        avatar.hidden = true;
      }, { once: true });

      if (typeof profile.avatar === "string" && profile.avatar.trim()) {
        avatar.src = profile.avatar;
      } else {
        avatar.hidden = true;
      }
    }

    const description = typeof page.description === "string"
      ? page.description
      : "Alle links op één plek.";

    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = description;

    document.title = page.title || `${profile.name || "Mijn links"} | Mijn links`;

    renderLinks(config.links, page);
  }

  try {
    init();
  } catch (error) {
    console.error("Fout bij het laden van de website:", error);
    const container = $("#links");
    if (container) {
      container.textContent =
        "Er ging iets mis bij het laden. Controleer config.js.";
    }
  }
})();

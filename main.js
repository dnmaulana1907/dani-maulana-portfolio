const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    });
  });
}

const viewer = document.querySelector("#doc-viewer");
const frame = viewer?.querySelector(".doc-viewer-frame");
const viewerTitle = viewer?.querySelector("#doc-viewer-title");
const viewerClose = viewer?.querySelector(".doc-viewer-close");
let openHref = "";

function closeViewer() {
  if (!viewer?.open) return;
  viewer.close();
}

if (viewer && frame && viewerTitle) {
  document.querySelectorAll("a.js-view-doc").forEach((link) => {
    link.setAttribute("aria-expanded", "false");
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const href = link.getAttribute("href");
      if (!href) return;

      if (viewer.open && openHref === href) {
        closeViewer();
        return;
      }

      openHref = href;
      viewerTitle.textContent = link.dataset.title || "Document";
      frame.title = viewerTitle.textContent;
      frame.src = href;
      document.querySelectorAll("a.js-view-doc").forEach((item) => {
        item.setAttribute("aria-expanded", item === link ? "true" : "false");
      });
      if (!viewer.open) viewer.showModal();
    });
  });

  viewer.addEventListener("close", () => {
    frame.removeAttribute("src");
    openHref = "";
    document.querySelectorAll("a.js-view-doc").forEach((link) => {
      link.setAttribute("aria-expanded", "false");
    });
  });

  viewer.addEventListener("click", (event) => {
    if (event.target === viewer) closeViewer();
  });

  viewerClose?.addEventListener("click", closeViewer);
}

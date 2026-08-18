import "./style.css";
import content from "./data/content.json";
import mailIconRaw from "lucide-static/icons/mail.svg?raw";
import githubIconRaw from "simple-icons/icons/github.svg?raw";
import xIconRaw from "simple-icons/icons/x.svg?raw";

const STORAGE_KEY = "portfolio-lang";
const ICON_SIZE = "w-[18px] h-[18px]";

// lucide icons already carry a class attribute; simple-icons brand marks don't.
function withIconClass(svg, cls) {
  return svg.includes('class="')
    ? svg.replace('class="', `class="${cls} `)
    : svg.replace("<svg", `<svg class="${cls}"`);
}

const icons = {
  email: withIconClass(mailIconRaw, ICON_SIZE),
  github: withIconClass(githubIconRaw, `${ICON_SIZE} fill-current`),
  x: withIconClass(xIconRaw, `${ICON_SIZE} fill-current`),
};

function renderLinks() {
  const container = document.querySelector("#links");
  const linkClass = "inline-flex text-ink-faint hover:text-ink transition-colors";
  container.innerHTML = `
    <a class="${linkClass}" href="mailto:${content.links.email}" aria-label="Email">${icons.email}</a>
    <a class="${linkClass}" href="${content.links.github}" target="_blank" rel="noopener" aria-label="GitHub">${icons.github}</a>
    <a class="${linkClass}" href="${content.links.x}" target="_blank" rel="noopener" aria-label="X (Twitter)">${icons.x}</a>
  `;
}

function renderStack() {
  const container = document.querySelector("#stack-list");
  container.innerHTML = content.stack
    .map(
      (group) => `
        <div>
          <h3 class="font-meta text-[0.85rem] text-ink-faint font-medium mb-2.5">${group.category}</h3>
          <div class="text-ink-soft text-[0.98rem] leading-relaxed">${group.items.join("<br>")}</div>
        </div>
      `
    )
    .join("");
}

function renderAbout(lang) {
  const container = document.querySelector("#about-list");
  container.innerHTML = content.about.map((p) => `<p>${p[lang]}</p>`).join("");
}

function renderExperience(lang) {
  const container = document.querySelector("#experience-list");
  const last = content.experience.length - 1;
  container.innerHTML = content.experience
    .map(
      (job, i) => `
        <div class="${i === last ? "" : "mb-[60px]"}">
          <div class="flex justify-between items-baseline flex-wrap gap-x-4 gap-y-1 mb-1">
            <span class="text-[1.08rem] font-bold">${job.org[lang]}</span>
            <span class="font-meta text-[0.85rem] text-ink-faint whitespace-nowrap">${job.period}</span>
          </div>
          <div class="text-[0.88rem] text-ink-soft mb-3.5">${job.role[lang]}</div>
          <div class="job-body"><p>${job.description[lang]}</p></div>
          <div class="font-meta mt-[18px] text-[0.85rem] text-ink-faint">${job.techStack}</div>
        </div>
      `
    )
    .join("");
}

function applyLang(lang) {
  document.documentElement.lang = lang;
  document.title = content.meta.title[lang];

  document.querySelector("#role").textContent = content.hero.role[lang];
  document.querySelector("#name-en").textContent = content.hero.name[lang];

  renderAbout(lang);
  renderExperience(lang);

  document.querySelectorAll(".lang-switch button").forEach((btn) => {
    btn.setAttribute("aria-current", btn.dataset.lang === lang ? "true" : "false");
  });

  localStorage.setItem(STORAGE_KEY, lang);
}

function init() {
  document.querySelector("#footer-text").textContent = content.footer;
  renderLinks();
  renderStack();

  document.querySelectorAll(".lang-switch button").forEach((btn) => {
    btn.addEventListener("click", () => applyLang(btn.dataset.lang));
  });

  const saved = localStorage.getItem(STORAGE_KEY);
  applyLang(saved === "en" ? "en" : "ja");
}

init();

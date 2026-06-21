(function(){
"use strict";

/* ============ PRELOADER ============ */
window.addEventListener("load", () => {
  const pre = document.getElementById("preloader");
  if(pre){
    setTimeout(() => pre.classList.add("hide"), 500);
  }
});

/* ============ THEME (Day / Night) ============ */
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const iconSun = document.getElementById("iconSun");
const iconMoon = document.getElementById("iconMoon");

function applyTheme(theme){
  root.setAttribute("data-theme", theme);
  if(themeToggle) themeToggle.setAttribute("aria-pressed", theme === "day");
  if(iconSun && iconMoon){
    iconSun.hidden = theme !== "day";
    iconMoon.hidden = theme === "day";
  }
  try{ localStorage.setItem("moxit-theme", theme); }catch(e){}
}

(function initTheme(){
  let saved = null;
  try{ saved = localStorage.getItem("moxit-theme"); }catch(e){}
  applyTheme(saved === "day" ? "day" : "night");
})();

if(themeToggle){
  themeToggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "day" ? "night" : "day";
    applyTheme(next);
  });
}

/* ============ MOBILE MENU ============ */
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

function closeMenu(){
  if(!mobileMenu || !menuToggle) return;
  mobileMenu.classList.remove("open");
  menuToggle.classList.remove("open");
  menuToggle.setAttribute("aria-expanded","false");
  menuToggle.setAttribute("aria-label","Open menu");
}

if(menuToggle && mobileMenu){
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => { if(window.innerWidth > 900) closeMenu(); });
}

/* ============ TYPING EFFECT ============ */
const roles = [
  "Minecraft Gamer 🎮",
  "YouTuber 🎥",
  "Web Developer 💻",
  "Game Developer 🕹️"
];

let roleIndex = 0, charIndex = 0, deleting = false;

function typeEffect(){
  const typing = document.getElementById("typing");
  if(!typing) return;

  const word = roles[roleIndex];

  if(!deleting){
    typing.textContent = word.slice(0, charIndex + 1);
    charIndex++;
    if(charIndex === word.length){
      deleting = true;
      setTimeout(typeEffect, 1400);
      return;
    }
    setTimeout(typeEffect, 90);
  }else{
    typing.textContent = word.slice(0, charIndex - 1);
    charIndex--;
    if(charIndex === 0){
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 300);
      return;
    }
    setTimeout(typeEffect, 45);
  }
}
typeEffect();

/* ============ SCROLL PROGRESS BAR ============ */
const progressBar = document.getElementById("progress-bar");
function updateProgress(){
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  if(progressBar) progressBar.style.width = pct + "%";
}
window.addEventListener("scroll", updateProgress, { passive:true });
updateProgress();

/* ============ BACK TO TOP ============ */
const topBtn = document.getElementById("topBtn");
function updateTopBtn(){
  if(!topBtn) return;
  topBtn.classList.toggle("show", document.documentElement.scrollTop > 400);
}
window.addEventListener("scroll", updateTopBtn, { passive:true });
updateTopBtn();
if(topBtn){
  topBtn.addEventListener("click", () => window.scrollTo({ top:0, behavior:"smooth" }));
}

/* ============ GENERIC REVEAL ON SCROLL ============ */
const revealTargets = document.querySelectorAll(".card, .panel, .about-text, .about-facts, .skill, .timeline-item");
revealTargets.forEach(el => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("in");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

/* ============ COUNTERS ============ */
const counters = document.querySelectorAll(".counter");

function animateCounter(el){
  const target = parseInt(el.getAttribute("data-target"), 10) || 0;
  const suffix = el.getAttribute("data-suffix") || "";
  const duration = 1400;
  const start = performance.now();

  function step(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if(progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

counters.forEach(c => counterObserver.observe(c));

/* ============ SKILL BARS ============ */
const skillEls = document.querySelectorAll(".skill");
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("in-view");
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
skillEls.forEach(s => skillObserver.observe(s));

/* ============ JOURNEY: ACHIEVEMENT TOASTS ============ */
const toastContainer = document.getElementById("toastContainer");
const toastQueue = [];
let toastBusy = false;

function queueToast(title){
  toastQueue.push(title);
  processToastQueue();
}

function processToastQueue(){
  if(toastBusy || toastQueue.length === 0) return;
  toastBusy = true;

  const title = toastQueue.shift();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML =
    '<span class="toast-icon">🏆</span>' +
    '<span><span class="toast-title">Advancement Unlocked</span>' +
    '<span class="toast-body"></span></span>';
  toast.querySelector(".toast-body").textContent = title;
  toastContainer.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("show"));

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
      toastBusy = false;
      processToastQueue();
    }, 450);
  }, 2400);
}

const timelineItems = document.querySelectorAll(".timeline-item");
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("unlocked");
      if(toastContainer) queueToast(entry.target.getAttribute("data-title") || "Milestone reached");
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
timelineItems.forEach(t => timelineObserver.observe(t));

/* ============ ACTIVE NAV LINK ============ */
const sections = document.querySelectorAll("main section[id], .hero[id]");
const navLinks = document.querySelectorAll(".nav-links a, .mobile-menu a");

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const id = entry.target.getAttribute("id");
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + id);
      });
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });

sections.forEach(s => navObserver.observe(s));

/* ============ PROJECT FILTER ============ */
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => { b.classList.remove("active"); b.setAttribute("aria-selected","false"); });
    btn.classList.add("active");
    btn.setAttribute("aria-selected","true");

    const filter = btn.getAttribute("data-filter");
    projectCards.forEach(card => {
      const match = filter === "all" || card.getAttribute("data-tag") === filter;
      card.classList.toggle("hide", !match);
    });
  });
});

/* ============ ACCORDION (FAQ) ============ */
document.querySelectorAll(".accordion-item").forEach(item => {
  const head = item.querySelector(".accordion-head");
  const body = item.querySelector(".accordion-body");

  head.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    document.querySelectorAll(".accordion-item.open").forEach(other => {
      if(other !== item){
        other.classList.remove("open");
        other.querySelector(".accordion-head").setAttribute("aria-expanded","false");
        other.querySelector(".accordion-body").style.maxHeight = null;
      }
    });

    item.classList.toggle("open", !isOpen);
    head.setAttribute("aria-expanded", String(!isOpen));
    body.style.maxHeight = !isOpen ? body.scrollHeight + "px" : null;
  });
});

/* ============ CONTACT FORM -> MAILTO ============ */
const contactForm = document.getElementById("contactForm");
if(contactForm){
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("cf-name").value.trim();
    const email = document.getElementById("cf-email").value.trim();
    const message = document.getElementById("cf-message").value.trim();

    const subject = encodeURIComponent("Portfolio message from " + (name || "a visitor"));
    const body = encodeURIComponent(
      "Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message
    );

    window.location.href = "mailto:moxitsonwal618@gmail.com?subject=" + subject + "&body=" + body;
  });
}

/* ============ CUSTOM CURSOR (desktop, fine pointer only) ============ */
const cursorRing = document.getElementById("cursor-ring");
const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if(cursorRing && hasFinePointer && !reducedMotion){
  document.body.classList.add("cursor-active");
  let cx = 0, cy = 0, tx = 0, ty = 0;

  window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });

  function loop(){
    cx += (tx - cx) * 0.2;
    cy += (ty - cy) * 0.2;
    cursorRing.style.left = cx + "px";
    cursorRing.style.top = cy + "px";
    requestAnimationFrame(loop);
  }
  loop();

  document.querySelectorAll("a, button, .card, input, textarea").forEach(el => {
    el.addEventListener("mouseenter", () => cursorRing.classList.add("grow"));
    el.addEventListener("mouseleave", () => cursorRing.classList.remove("grow"));
  });
}else{
  document.body.classList.add("no-hover");
}

/* ============ AMBIENT CANVAS: FLOATING PIXEL BLOCKS ============ */
const canvas = document.getElementById("bg-canvas");
if(canvas && !reducedMotion){
  const ctx = canvas.getContext("2d");
  let w, h, blocks = [];

  function getParticleColor(){
    const styles = getComputedStyle(document.documentElement);
    return styles.getPropertyValue("--canvas-particle").trim() || "90,209,255";
  }

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function initBlocks(){
    const count = Math.min(40, Math.floor((w * h) / 35000));
    blocks = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: 4 + Math.random() * 8,
      speed: 0.15 + Math.random() * 0.35,
      drift: (Math.random() - 0.5) * 0.3,
      alpha: 0.12 + Math.random() * 0.28
    }));
  }

  function draw(){
    ctx.clearRect(0, 0, w, h);
    const color = getParticleColor();
    blocks.forEach(b => {
      ctx.fillStyle = "rgba(" + color + "," + b.alpha + ")";
      ctx.fillRect(b.x, b.y, b.size, b.size);
      b.y -= b.speed;
      b.x += b.drift;
      if(b.y < -10){ b.y = h + 10; b.x = Math.random() * w; }
      if(b.x < -10) b.x = w + 10;
      if(b.x > w + 10) b.x = -10;
    });
    requestAnimationFrame(draw);
  }

  resize();
  initBlocks();
  draw();

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); initBlocks(); }, 200);
  });
}

})();

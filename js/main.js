function renderPackageCards(packages, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = packages
    .map(
      (pkg) => `
    <article class="package-card">
      <div class="package-card__image">
        <img src="${pkg.image}" alt="${pkg.title}" loading="lazy" />
      </div>
      <div class="package-card__body">
        <h3>${pkg.title}</h3>
        <div class="package-card__meta">
          <span class="package-card__duration">${pkg.duration}</span>
          <span class="package-card__price">${pkg.price}</span>
        </div>
        <a href="${pkg.url}" class="package-card__link">View Details</a>
      </div>
    </article>
  `
    )
    .join("");
}

function renderAttractions() {
  const container = document.getElementById("attractionsGrid");
  if (!container || typeof ATTRACTIONS === "undefined") return;

  container.innerHTML = ATTRACTIONS.map(
    (item) => `
    <a href="${item.url}" class="attraction-card attraction-card--linked" style="background-image: url('${item.cardImage}')">
      <div class="attraction-card__overlay"></div>
      <div class="attraction-card__content">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        <span class="attraction-card__link-text">Explore →</span>
      </div>
    </a>
  `
  ).join("");
}

function renderGallery() {
  const container = document.getElementById("galleryGrid");
  if (!container) return;

  container.innerHTML = GALLERY.map(
    (src, i) => `
    <div class="gallery__item">
      <img src="${src}" alt="Gallery image ${i + 1}" loading="lazy" />
    </div>
  `
  ).join("");
}

function initHeroSlider() {
  const slides = document.querySelectorAll(".hero__slide");
  const indicatorsContainer = document.getElementById("heroIndicators");
  if (!slides.length || !indicatorsContainer) return;

  let current = 0;

  slides.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.className = `hero__indicator${i === 0 ? " hero__indicator--active" : ""}`;
    btn.setAttribute("aria-label", `Go to slide ${i + 1}`);
    btn.addEventListener("click", () => goToSlide(i));
    indicatorsContainer.appendChild(btn);
  });

  const indicators = indicatorsContainer.querySelectorAll(".hero__indicator");

  function goToSlide(index) {
    slides[current].classList.remove("hero__slide--active");
    indicators[current].classList.remove("hero__indicator--active");
    current = index;
    slides[current].classList.add("hero__slide--active");
    indicators[current].classList.add("hero__indicator--active");
  }

  setInterval(() => {
    goToSlide((current + 1) % slides.length);
  }, 5000);
}

function initMobileMenu() {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    nav.classList.toggle("nav--open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.classList.remove("active");
      nav.classList.remove("nav--open");
    });
  });
}

function initHeaderScroll() {
  const header = document.getElementById("header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    header.classList.toggle("header--scrolled", window.scrollY > 50);
  });
}

function initBookingForm() {
  const form = document.getElementById("bookingForm");
  const success = document.getElementById("formSuccess");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.reset();
    if (success) {
      success.hidden = false;
      setTimeout(() => {
        success.hidden = true;
      }, 5000);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderPackageCards(DESTINATIONS, "destinationsGrid");
  renderAttractions();
  renderGallery();
  initHeroSlider();
  initMobileMenu();
  initHeaderScroll();
  initBookingForm();
});

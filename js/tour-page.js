function renderTourDays(days) {
  return days
    .map(
      (day) => `
    <div class="tour-day">
      <h3 class="tour-day__title">${day.title}</h3>
      <ul class="tour-day__list">
        ${day.items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </div>
  `
    )
    .join("");
}

function renderRelatedTours(currentSlug, base) {
  const others = TOURS.filter((t) => t.slug !== currentSlug);
  return `
    <section class="related-tours section section--alt">
      <div class="container">
        <div class="section-header">
          <span class="section-label">More Packages</span>
          <h2>Other Tour Packages</h2>
        </div>
        <div class="packages__grid packages__grid--three">
          ${others
            .map(
              (tour) => `
            <article class="package-card">
              <div class="package-card__image">
                <img src="${tour.cardImage}" alt="${tour.title}" loading="lazy" />
              </div>
              <div class="package-card__body">
                <h3>${tour.title}</h3>
                <div class="package-card__meta">
                  <span class="package-card__duration">${tour.duration}</span>
                  <span class="package-card__price">From ${tour.price}</span>
                </div>
                <a href="${tour.slug}.html" class="package-card__link">View Details</a>
              </div>
            </article>
          `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function initTourPage(slug) {
  const tour = getTourBySlug(slug);
  const base = getBasePath();
  const app = document.getElementById("app");

  if (!tour || !app) {
    if (app) {
      app.innerHTML = `<div class="container" style="padding:4rem 0"><h1>Page not found</h1><a href="${base}/index.html">Back to home</a></div>`;
    }
    return;
  }

  document.title = `${tour.pageTitle} | ${SITE.name}`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = tour.intro;

  app.innerHTML = `
    ${renderTopBar(base)}
    ${renderHeader(base, "tours")}
    <section class="page-hero" style="background-image: url('${tour.image}')">
      <div class="page-hero__overlay"></div>
      <div class="container page-hero__content">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="${base}/index.html">Home</a>
          <span>/</span>
          <a href="${base}/index.html#destinations">Tours</a>
          <span>/</span>
          <span>${tour.title}</span>
        </nav>
        <p class="page-hero__eyebrow">${tour.tagline}</p>
        <h1>${tour.pageTitle}</h1>
      </div>
    </section>

    <article class="tour-detail section">
      <div class="container tour-detail__inner">
        <div class="tour-meta">
          <div class="tour-meta__item">
            <span>Duration</span>
            <strong>${tour.duration}</strong>
          </div>
          <div class="tour-meta__item">
            <span>Destination</span>
            <strong>${tour.destination}</strong>
          </div>
          <div class="tour-meta__item tour-meta__item--price">
            <span>Starting Price</span>
            <strong>${tour.price}</strong>
          </div>
        </div>

        <p class="detail-intro">${tour.intro}</p>

        <h2 class="tour-section-title">✅ Day-wise Itinerary</h2>
        ${renderTourDays(tour.days)}

        <div class="tour-info-grid">
          <div class="tour-info-box tour-info-box--include">
            <h3>✅ Package Inclusions</h3>
            <ul>${tour.inclusions.map((i) => `<li>${i}</li>`).join("")}</ul>
          </div>
          <div class="tour-info-box tour-info-box--exclude">
            <h3>❌ Package Exclusions</h3>
            <ul>${tour.exclusions.map((i) => `<li>${i}</li>`).join("")}</ul>
          </div>
        </div>

        <div class="tour-highlights">
          <h3>⭐ Package Highlights</h3>
          <ul>${tour.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>
        </div>

        <div class="tour-cta">
          <p class="tour-cta__price">${tour.priceLabel}</p>
          <p class="tour-cta__text">${tour.cta}</p>
          <a href="#booking" class="btn btn--primary btn--lg">Book This Tour</a>
        </div>
      </div>
    </article>

    ${renderRelatedTours(slug, base)}
    ${renderBookingForm()}
    ${renderFooter(base)}
  `;

  initCommonUI();
}

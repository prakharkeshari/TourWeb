function renderSection(section) {
  switch (section.type) {
    case "intro":
      return `<p class="detail-intro">${section.text}</p>`;
    case "text":
      return `<p class="detail-text">${section.text}</p>`;
    case "heading":
      return `<h3 class="detail-heading">${section.title}</h3>`;
    case "list":
      return `<ul class="detail-list">${section.items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
    case "cards":
      return `<div class="detail-cards">${section.items
        .map(
          (item) => `
          <article class="detail-card">
            <h4>${item.title}</h4>
            <p>${item.text}</p>
          </article>
        `
        )
        .join("")}</div>`;
    case "grid":
      return `<div class="detail-grid">${section.items
        .map(
          (item) => `
          <article class="detail-grid-item">
            <h4>${item.title}</h4>
            <p>${item.desc}</p>
          </article>
        `
        )
        .join("")}</div>`;
    default:
      return "";
  }
}

function renderRelatedAttractions(currentSlug, base) {
  const others = ATTRACTIONS.filter((a) => a.slug !== currentSlug).slice(0, 3);
  return `
    <section class="related-attractions section section--alt">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Explore More</span>
          <h2>Other Attractions</h2>
        </div>
        <div class="attractions__grid attractions__grid--compact">
          ${others
            .map(
              (item) => `
            <a href="${item.slug}.html" class="attraction-card attraction-card--linked" style="background-image: url('${item.cardImage}')">
              <div class="attraction-card__overlay"></div>
              <div class="attraction-card__content">
                <h3>${item.title}</h3>
                <span class="attraction-card__link-text">Read More →</span>
              </div>
            </a>
          `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function initAttractionPage(slug) {
  const attraction = getAttractionBySlug(slug);
  const base = getBasePath();
  const app = document.getElementById("app");

  if (!attraction || !app) {
    if (app) {
      app.innerHTML = `<div class="container" style="padding:4rem 0"><h1>Page not found</h1><a href="${base}/index.html">Back to home</a></div>`;
    }
    return;
  }

  document.title = `${attraction.title} | kTours – Varanasi Travel`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = attraction.desc;

  const contentHtml = attraction.sections.map(renderSection).join("");

  app.innerHTML = `
    ${renderTopBar(base)}
    ${renderHeader(base, "attractions")}
    <section class="page-hero" style="background-image: url('${attraction.image}')">
      <div class="page-hero__overlay"></div>
      <div class="container page-hero__content">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="${base}/index.html">Home</a>
          <span>/</span>
          <a href="${base}/index.html#attractions">Attractions</a>
          <span>/</span>
          <span>${attraction.title}</span>
        </nav>
        <p class="page-hero__eyebrow">Varanasi: An Ancient City on Earth</p>
        <h1>${attraction.subtitle}</h1>
      </div>
    </section>
    <article class="detail-content section">
      <div class="container detail-content__inner">
        ${contentHtml}
      </div>
    </article>
    ${renderRelatedAttractions(slug, base)}
    ${renderBookingForm()}
    ${renderFooter(base)}
  `;

  initCommonUI();
}

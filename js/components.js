function getBasePath() {
  const path = window.location.pathname;
  if (path.includes("/attractions/") || path.includes("/tours/")) return "..";
  return ".";
}

const SITE = {
  name: "Kashi Tourist Service",
  email: "kashitouristservice@gmail.com",
  phones: [
    { display: "+91 95550 97512", tel: "+919555097512" },
    { display: "+91 93358 90906", tel: "+919335890906" },
  ],
};

function renderLogo(base, footer = false) {
  const home = `${base}/index.html`;
  const className = footer ? "logo logo--footer" : "logo";
  return `
    <a href="${home}" class="${className}">
      <img src="${base}/assets/logo.png" alt="${SITE.name}" class="logo__img" />
    </a>
  `;
}

function renderTopBar(base) {
  const phones = SITE.phones
    .map((p) => `<a href="tel:${p.tel}">📞 ${p.display}</a>`)
    .join("");
  return `
    <div class="top-bar">
      <div class="container top-bar__inner">
        <div class="top-bar__contact">
          ${phones}
          <a href="mailto:${SITE.email}">✉ ${SITE.email}</a>
        </div>
        <div class="top-bar__social">
          <a href="#" aria-label="Facebook">Facebook</a>
          <a href="#" aria-label="Instagram">Instagram</a>
          <a href="#" aria-label="WhatsApp">WhatsApp</a>
        </div>
      </div>
    </div>
  `;
}

function renderHeader(base, activePage) {
  const home = `${base}/index.html`;
  const prefix = activePage === "home" ? "" : `${base}/index.html`;
  return `
    <header class="header" id="header">
      <div class="container header__inner">
        ${renderLogo(base)}
        <nav class="nav" id="nav">
          <a href="${prefix}#home">Home</a>
          <a href="${prefix}#about">About</a>
          <a href="${prefix}#destinations">Destinations</a>
          <a href="${prefix}#destinations"${activePage === "tours" ? ' class="nav__active"' : ""}>Tours</a>
          <a href="${prefix}#attractions"${activePage === "attractions" ? ' class="nav__active"' : ""}>Attractions</a>
          <a href="${prefix}#gallery">Gallery</a>
          <a href="${prefix}#booking" class="nav__cta">Book Now</a>
        </nav>
        <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  `;
}

function renderFooter(base) {
  const home = `${base}/index.html`;
  return `
    <footer class="footer">
      <div class="container footer__grid">
        <div class="footer__brand">
          ${renderLogo(base, true)}
          <p>Your trusted partner for spiritual journeys, customized tours, and premium travel services in Varanasi and beyond.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="${home}#about">About Varanasi</a></li>
            <li><a href="${home}#destinations">Destinations</a></li>
            <li><a href="${home}#destinations">Popular Destinations</a></li>
            <li><a href="${home}#gallery">Gallery</a></li>
          </ul>
        </div>
        <div>
          <h4>Popular Tours</h4>
          <ul>
            <li><a href="${base}/tours/varanasi-tour.html">Varanasi Tour</a></li>
            <li><a href="${base}/tours/varanasi-ayodhya-tour.html">Varanasi – Ayodhya</a></li>
            <li><a href="${base}/tours/varanasi-ayodhya-prayag-tour.html">Varanasi – Ayodhya – Prayag</a></li>
            <li><a href="${home}#destinations">All Packages</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact Us</h4>
          <ul class="footer__contact">
            <li>📍 Varanasi, Uttar Pradesh, India</li>
            ${SITE.phones.map((p) => `<li><a href="tel:${p.tel}">${p.display}</a></li>`).join("")}
            <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <div class="container">
          <p>&copy; 2026 ${SITE.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
}

function renderBookingForm() {
  return `
    <section class="booking section" id="booking">
      <div class="container booking__grid">
        <div class="booking__info">
          <span class="section-label">Plan Your Trip</span>
          <h2>Request a Custom Quote</h2>
          <p>Fill in the details below and our team will get back to you within 24 hours with a personalized itinerary.</p>
          <ul class="booking__features">
            <li>✓ Free itinerary consultation</li>
            <li>✓ Flexible payment options</li>
            <li>✓ 24/7 on-trip support</li>
            <li>✓ Best price guarantee</li>
          </ul>
        </div>
        <form class="booking-form" id="bookingForm">
          <div class="form-row">
            <div class="form-group">
              <label for="fullName">Full Name *</label>
              <input type="text" id="fullName" name="fullName" required />
            </div>
            <div class="form-group">
              <label for="email">Email *</label>
              <input type="email" id="email" name="email" required />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="phone">Phone Number *</label>
              <input type="tel" id="phone" name="phone" required />
            </div>
            <div class="form-group">
              <label for="persons">No. of Persons</label>
              <input type="number" id="persons" name="persons" min="1" value="2" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="arrival">Arrival Date</label>
              <input type="date" id="arrival" name="arrival" />
            </div>
            <div class="form-group">
              <label for="departure">Departure Date</label>
              <input type="date" id="departure" name="departure" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="vehicle">Vehicle</label>
              <select id="vehicle" name="vehicle">
                <option value="">Select Vehicle</option>
                <option value="car">Car</option>
                <option value="bus">Bus</option>
                <option value="tempo">Tempo Traveller</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label for="hotel">Hotel Category</label>
              <select id="hotel" name="hotel">
                <option value="">Select Category</option>
                <option value="1">1 Star</option>
                <option value="2">2 Star</option>
                <option value="3">3 Star</option>
                <option value="4">4 Star</option>
                <option value="5">5 Star</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="arrivalRide">Arrival Ride</label>
              <select id="arrivalRide" name="arrivalRide">
                <option value="">Select Ride</option>
                <option value="airport">Airport</option>
                <option value="railway">Railway Station</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label for="departureRide">Departure Ride</label>
              <select id="departureRide" name="departureRide">
                <option value="">Select Ride</option>
                <option value="airport">Airport</option>
                <option value="railway">Railway Station</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="mealPlan">Hotel Meal Plan</label>
            <select id="mealPlan" name="mealPlan">
              <option value="">Select Meal Plan</option>
              <option value="ap">American Plan (AP)</option>
              <option value="map">Modified American Plan (MAP)</option>
              <option value="cp">Continental Plan (CP)</option>
              <option value="ep">European Plan (EP)</option>
            </select>
          </div>
          <div class="form-group">
            <label for="places">Places to Visit</label>
            <input type="text" id="places" name="places" placeholder="e.g. Kashi Vishwanath, Sarnath, Ayodhya" />
          </div>
          <div class="form-group">
            <label for="details">Other Details</label>
            <textarea id="details" name="details" rows="4" placeholder="Tell us about your preferences..."></textarea>
          </div>
          <button type="submit" class="btn btn--primary btn--full">Submit Enquiry</button>
          <p class="form-success" id="formSuccess" hidden>Thank you! We'll contact you shortly.</p>
        </form>
      </div>
    </section>
  `;
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

function initCommonUI() {
  initMobileMenu();
  initHeaderScroll();
  initBookingForm();
}

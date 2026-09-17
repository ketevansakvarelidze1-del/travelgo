/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-active");
});


/* =========================
   CLOSE MOBILE MENU
========================= */

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(item => {
    item.addEventListener("click", () => {
        navLinks.classList.remove("mobile-active");
    });
});


/* =========================
   SEARCH TOURS (Hero Section)
========================= */

const searchButton = document.querySelector(".search-btn");

searchButton.addEventListener("click", () => {
    const destination = document.getElementById("heroDestinationSelect").value;

    if (destination === "Where do you want to go?") {
        alert("Please choose a destination.");
        return;
    }

    // Auto fill tour search input
    const tourSearchInput = document.getElementById("tourSearchInput");
    if (tourSearchInput) {
        tourSearchInput.value = destination;
        renderTours();
    }

    document.getElementById("tours").scrollIntoView({
        behavior: "smooth"
    });
});


/* =========================
   DATA SETS
========================= */

const tours = [
    {
        id: 1,
        name: "Kazbegi Mountain Adventure",
        location: "Kazbegi",
        duration: "1 Day",
        rating: "4.9",
        price: 120,
        image: "/kazbg.jpg",
        description: "Explore the breathtaking Caucasus mountains and discover the beauty of Stepantsminda.",
        tag: "Popular"
    },
    {
        id: 2,
        name: "Kakheti Wine & Culture",
        location: "Kakheti",
        duration: "1 Day",
        rating: "4.8",
        price: 150,
        image: "/wine.jpg",
        description: "Taste traditional Georgian wine and explore beautiful Kakhetian villages."
    },
    {
        id: 3,
        name: "Batumi Coastal Escape",
        location: "Batumi",
        duration: "3 Days",
        rating: "4.9",
        price: 350,
        image: "/batumi.jpg",
        description: "Enjoy the Black Sea, modern architecture and the vibrant atmosphere of Batumi."
    },
    {
        id: 4,
        name: "Svaneti Discovery",
        location: "Svaneti",
        duration: "4 Days",
        rating: "5.0",
        price: 650,
        image: "/svanetiiii.webp",
        description: "Discover ancient towers, dramatic mountains and authentic Svan culture."
    }
];

const features = [
    {
        title: "Local Experts",
        description: "Experienced local guides who know every corner of Georgia."
    },
    {
        title: "Best Experiences",
        description: "Carefully selected tours designed for unforgettable moments."
    },
    {
        title: "24/7 Support",
        description: "Our team is always ready to help during your journey."
    }
];


/* =========================
   HELPER FUNCTIONS
========================= */

// Bonus Challenge: Highlight matching string using <mark>
function highlightMatch(text, searchTerm) {
    if (!searchTerm || !searchTerm.trim()) return text;
    const regex = new RegExp(`(${searchTerm.trim()})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Universal Filter Pattern (filterPlans-style)
function filterItems(items, searchTerm = '', maxPrice = Infinity) {
    const cleanSearch = searchTerm.toLowerCase().trim();

    return items.filter(item => {
        // Search in title/name, location, or description
        const nameMatch = item.name ? item.name.toLowerCase().includes(cleanSearch) : false;
        const titleMatch = item.title ? item.title.toLowerCase().includes(cleanSearch) : false;
        const locationMatch = item.location ? item.location.toLowerCase().includes(cleanSearch) : false;
        const descMatch = item.description ? item.description.toLowerCase().includes(cleanSearch) : false;

        const matchesSearch = nameMatch || titleMatch || locationMatch || descMatch;

        // Price filter (if object has price field)
        const matchesPrice = item.price ? item.price <= maxPrice : true;

        return matchesSearch && matchesPrice;
    });
}


/* =========================
   RENDER FUNCTIONS
========================= */

// 1. Live Search & Filter for Tours (with No-Results State)
function renderTours() {
    const tourGrid = document.getElementById("tourGrid");
    const searchVal = document.getElementById("tourSearchInput").value;
    const maxPriceVal = parseFloat(document.getElementById("tourMaxPriceInput").value) || Infinity;

    const filtered = filterItems(tours, searchVal, maxPriceVal);

    if (filtered.length === 0) {
        tourGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 40px; font-size: 18px; color: #777;">
                No tours found matching your search criteria.
            </div>
        `;
        return;
    }

    tourGrid.innerHTML = filtered.map(tour => {
        const highlightedName = highlightMatch(tour.name, searchVal);
        const highlightedLocation = highlightMatch(tour.location, searchVal);
        const highlightedDesc = highlightMatch(tour.description, searchVal);

        return `
            <article class="tour-card">
                <div class="tour-image">
                    <img src="${tour.image}" alt="${tour.name}">
                    ${tour.tag ? `<span class="tour-tag">${tour.tag}</span>` : ''}
                </div>
                <div class="tour-content">
                    <div class="tour-location">📍 ${highlightedLocation}</div>
                    <h3>${highlightedName}</h3>
                    <p>${highlightedDesc}</p>
                    <div class="tour-info">
                        <span>${tour.duration}</span>
                        <span>⭐ ${tour.rating}</span>
                    </div>
                    <div class="tour-bottom">
                        <div>
                            <small>From</small>
                            <strong>${tour.price}₾</strong>
                        </div>
                        <button onclick="handleBookingById(${tour.id})">
                            View Tour →
                        </button>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

// 2. Live Search for Feature Grid
function renderFeatures() {
    const featureGrid = document.getElementById("featureGrid");
    const searchVal = document.getElementById("featureSearchInput").value;

    const filtered = filterItems(features, searchVal);

    if (filtered.length === 0) {
        featureGrid.innerHTML = `
            <div class="no-results" style="padding: 20px; color: #777;">
                No features found.
            </div>
        `;
        return;
    }

    featureGrid.innerHTML = filtered.map(feature => {
        const highlightedTitle = highlightMatch(feature.title, searchVal);
        const highlightedDesc = highlightMatch(feature.description, searchVal);

        return `
            <div class="feature">
                <div>✓</div>
                <section>
                    <h4>${highlightedTitle}</h4>
                    <p>${highlightedDesc}</p>
                </section>
            </div>
        `;
    }).join('');
}


/* =========================
   EVENT LISTENERS FOR FILTERS
========================= */

document.getElementById("tourSearchInput").addEventListener("input", renderTours);
document.getElementById("tourMaxPriceInput").addEventListener("input", renderTours);
document.getElementById("featureSearchInput").addEventListener("input", renderFeatures);


/* =========================
   BOOKING MODAL
========================= */

function handleBookingById(id) {
    const tour = tours.find(t => t.id === id);
    if (tour) {
        openBookingModal(tour);
    }
}

function openBookingModal(tour) {

    const modal = document.createElement("div");
    modal.classList.add("booking-modal");

    modal.innerHTML = `
        <div class="booking-content">
            <button class="close-modal">×</button>
            <p class="section-label">BOOK YOUR EXPERIENCE</p>
            <h2>${tour.name}</h2>
            <p class="booking-location">
                📍 ${tour.location} &nbsp; • &nbsp; 🕐 ${tour.duration}
            </p>
            <div class="booking-price">
                From <strong>${tour.price}₾</strong>
            </div>
            <form id="bookingForm">
                <label>Full Name</label>
                <input type="text" placeholder="Your name" required>

                <label>Email</label>
                <input type="email" placeholder="Your email" required>

                <label>Date</label>
                <input type="date" required min="${new Date().toISOString().split("T")[0]}">

                <label>Guests</label>
                <select required>
                    <option value="">Select guests</option>
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4 Guests</option>
                    <option>5+ Guests</option>
                </select>

                <button type="submit" class="booking-submit">
                    Confirm Booking
                </button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    /* CLOSE BUTTON */
    const closeButton = modal.querySelector(".close-modal");
    closeButton.addEventListener("click", () => modal.remove());

    /* CLICK OUTSIDE */
    modal.addEventListener("click", (event) => {
        if (event.target === modal) modal.remove();
    });

    /* BOOKING FORM SUBMIT */
    const bookingForm = modal.querySelector("#bookingForm");
    bookingForm.addEventListener("submit", (event) => {
        event.preventDefault();
        alert(`Your booking request for "${tour.name}" has been received!`);
        modal.remove();
    });
}


/* =========================
   ADD MODAL STYLES
========================= */

const modalStyles = document.createElement("style");
modalStyles.innerHTML = `
.booking-modal {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(0,0,0,0.65);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.booking-content {
    position: relative;
    background: white;
    width: min(500px, 100%);
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 20px;
    padding: 35px;
    box-shadow: 0 25px 70px rgba(0,0,0,0.3);
}

.booking-content h2 {
    font-family: "Playfair Display", serif;
    font-size: 32px;
    line-height: 1.2;
    margin-bottom: 10px;
}

.booking-location {
    color: #777;
    font-size: 13px;
    margin-bottom: 15px;
}

.booking-price {
    background: #f7f5f0;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 25px;
    font-size: 13px;
}

.booking-price strong {
    font-size: 24px;
    color: #a07a2d;
}

.close-modal {
    position: absolute;
    top: 15px;
    right: 18px;
    border: none;
    background: none;
    font-size: 30px;
    color: #555;
    cursor: pointer;
}

#bookingForm {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

#bookingForm label {
    font-size: 12px;
    font-weight: 600;
    margin-top: 8px;
}

#bookingForm input,
#bookingForm select {
    width: 100%;
    padding: 13px;
    border: 1px solid #ddd;
    border-radius: 8px;
    outline: none;
    background: white;
}

#bookingForm input:focus,
#bookingForm select:focus {
    border-color: #d9a441;
}

.booking-submit {
    border: none;
    background: #18251f;
    color: white;
    padding: 14px;
    border-radius: 8px;
    margin-top: 15px;
    font-weight: 600;
    cursor: pointer;
}

.booking-submit:hover {
    background: #d9a441;
}
`;
document.head.appendChild(modalStyles);


/* =========================
   NEWSLETTER
========================= */

const newsletterForm = document.querySelector(".newsletter-form");
newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = newsletterForm.querySelector("input").value;

    if (email.trim() === "") {
        alert("Please enter your email.");
        return;
    }

    alert("Thank you for subscribing to Travelia!");
    newsletterForm.reset();
});


/* =========================
   DATE VALIDATION
========================= */

const dateInputs = document.querySelectorAll('input[type="date"]');
const today = new Date().toISOString().split("T")[0];

dateInputs.forEach(input => {
    input.setAttribute("min", today);
});


/* =========================
   NAVBAR SCROLL EFFECT
========================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.style.background = "rgba(16, 25, 20, 0.96)";
        header.style.backdropFilter = "blur(10px)";
    } else {
        header.style.background = "transparent";
        header.style.backdropFilter = "none";
    }
});


/* =========================
   INITIAL RENDER
========================= */

document.addEventListener("DOMContentLoaded", () => {
    renderTours();
    renderFeatures();
});
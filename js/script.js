// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const nav = document.querySelector(".nav");

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    const isActive = nav.classList.contains("mobile-nav-active");
    nav.classList.toggle("mobile-nav-active");

    // Close dropdown when closing mobile menu
    if (isActive) {
      const navDropdown = document.querySelector(".nav-dropdown");
      const dropdownMenu = document.querySelector(".dropdown-menu");
      const dropdownArrow = document.querySelector(".dropdown-arrow");

      if (navDropdown && dropdownMenu && dropdownArrow) {
        navDropdown.classList.remove("dropdown-active");
        dropdownMenu.classList.remove("dropdown-open");
        dropdownArrow.style.transform = "rotate(0deg)";
      }
    }
  });
}

// Mobile Dropdown Toggle
const navDropdown = document.querySelector(".nav-dropdown");
const dropdownLink = document.querySelector(".nav-dropdown .nav-link");
const dropdownMenu = document.querySelector(".dropdown-menu");
const dropdownArrow = document.querySelector(".dropdown-arrow");

function toggleDropdown() {
  if (!navDropdown || !dropdownMenu) return;

  const isActive = navDropdown.classList.contains("dropdown-active");

  if (isActive) {
    // Close dropdown
    navDropdown.classList.remove("dropdown-active");
    dropdownMenu.classList.remove("dropdown-open");
    if (dropdownArrow) {
      dropdownArrow.style.transform = "rotate(0deg)";
    }
  } else {
    // Open dropdown
    navDropdown.classList.add("dropdown-active");
    dropdownMenu.classList.add("dropdown-open");
    if (dropdownArrow) {
      dropdownArrow.style.transform = "rotate(180deg)";
    }
  }
}

function closeDropdown() {
  if (navDropdown && dropdownMenu) {
    navDropdown.classList.remove("dropdown-active");
    dropdownMenu.classList.remove("dropdown-open");
    if (dropdownArrow) {
      dropdownArrow.style.transform = "rotate(0deg)";
    }
  }
}

// Initialize dropdown functionality
if (navDropdown && dropdownLink && dropdownMenu) {
  // Handle click on Shop link
  dropdownLink.addEventListener("click", (e) => {
    // Only handle on mobile/tablet
    if (window.innerWidth <= 991) {
      e.preventDefault();
      e.stopPropagation();
      toggleDropdown();
    }
  });

  // Prevent dropdown menu items from closing the menu when clicked
  const dropdownItems = dropdownMenu.querySelectorAll("a");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      // Don't close dropdown when clicking menu items
    });
  });

  // Close dropdown when clicking outside on mobile/tablet
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 991) {
      if (
        navDropdown &&
        !navDropdown.contains(e.target) &&
        navDropdown.classList.contains("dropdown-active")
      ) {
        closeDropdown();
      }
    }
  });

  // Close dropdown when window is resized to desktop size
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 991) {
        closeDropdown();
      }
    }, 100);
  });
}

// Product Image Carousel
const thumbnails = document.querySelectorAll(".thumbnail");
const mainProductImage = document.getElementById("mainProductImage");
const carouselPrev = document.querySelector(".carousel-prev");
const carouselNext = document.querySelector(".carousel-next");

let currentImageIndex = 0;

if (thumbnails.length > 0 && mainProductImage) {
  // Thumbnail click handler
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
      const imageSrc = thumbnail.getAttribute("data-image");
      if (imageSrc) {
        mainProductImage.src = imageSrc;
        thumbnails.forEach((t) => t.classList.remove("active"));
        thumbnail.classList.add("active");
        currentImageIndex = index;
      }
    });
  });

  // Carousel navigation
  if (carouselPrev && carouselNext) {
    carouselPrev.addEventListener("click", () => {
      currentImageIndex =
        (currentImageIndex - 1 + thumbnails.length) % thumbnails.length;
      const thumbnail = thumbnails[currentImageIndex];
      thumbnail.click();
    });

    carouselNext.addEventListener("click", () => {
      currentImageIndex = (currentImageIndex + 1) % thumbnails.length;
      const thumbnail = thumbnails[currentImageIndex];
      thumbnail.click();
    });
  }

  // Auto-play carousel (optional)
  // setInterval(() => {
  //     currentImageIndex = (currentImageIndex + 1) % thumbnails.length;
  //     thumbnails[currentImageIndex].click();
  // }, 5000);
}

// Subscription Card Selection
const subscriptionCards = document.querySelectorAll(".subscription-card");
const subscriptionRadios = document.querySelectorAll(
  'input[name="subscription"]'
);

subscriptionCards.forEach((card, index) => {
  card.addEventListener("click", (e) => {
    // Don't toggle if clicking on radio or label
    if (e.target.type === "radio" || e.target.tagName === "LABEL") {
      return;
    }

    const radio = card.querySelector('input[type="radio"]');
    if (radio) {
      radio.checked = true;
      updateSubscriptionSelection();
    }
  });
});

subscriptionRadios.forEach((radio) => {
  radio.addEventListener("change", updateSubscriptionSelection);
});

function updateSubscriptionSelection() {
  subscriptionCards.forEach((card) => {
    const radio = card.querySelector('input[type="radio"]');
    if (radio && radio.checked) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });
}

// Collection Accordion
const collectionItems = document.querySelectorAll(".collection-item");

collectionItems.forEach((item) => {
  const header = item.querySelector(".collection-header");
  const body = item.querySelector(".collection-body");
  const toggleIcon = item.querySelector(".toggle-icon");

  if (header && body && toggleIcon) {
    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all items
      collectionItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          const otherBody = otherItem.querySelector(".collection-body");
          const otherIcon = otherItem.querySelector(".toggle-icon");
          if (otherBody && otherIcon) {
            otherBody.style.display = "none";
            otherIcon.textContent = "+";
          }
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove("active");
        body.style.display = "none";
        toggleIcon.textContent = "+";
      } else {
        item.classList.add("active");
        body.style.display = "block";
        toggleIcon.textContent = "−";
      }
    });
  }
});

// Newsletter Form Submission
const newsletterForm = document.querySelector(".newsletter-form");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value;

    if (email) {
      // Here you would typically send the email to your backend
      alert("Thank you for subscribing! We'll keep you updated.");
      emailInput.value = "";
    }
  });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add to Cart Functionality
const addToCartBtn = document.querySelector(".btn-cart");

if (addToCartBtn) {
  addToCartBtn.addEventListener("click", () => {
    const selectedSubscription = document.querySelector(
      'input[name="subscription"]:checked'
    );
    const selectedFragrance = document.querySelector(
      'input[name="fragrance"]:checked'
    );

    if (selectedSubscription && selectedFragrance) {
      const subscriptionType = selectedSubscription.id;
      const fragranceType = selectedFragrance.value;
      const price = selectedSubscription
        .closest(".subscription-card")
        .getAttribute("data-price");

      // Here you would typically send this data to your backend/cart system
      console.log("Added to cart:", {
        subscription: subscriptionType,
        fragrance: fragranceType,
        price: price,
      });

      // Visual feedback
      addToCartBtn.textContent = "Added to Cart!";
      addToCartBtn.style.background = "#2E7D32";

      setTimeout(() => {
        addToCartBtn.textContent = "Add to Cart";
        addToCartBtn.style.background = "";
      }, 2000);
    }
  });
}

// Counter Animation Function
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16); // 60fps
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + "%";
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + "%";
    }
  }, 16);
}

// Statistics Counter Animation
const statsSection = document.querySelector(".stats-section");
const statBoxes = document.querySelectorAll(".stat-box");
const statPercentages = document.querySelectorAll(
  ".stat-percentage[data-target]"
);
let statsAnimated = false;

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        // Make stat boxes visible
        statBoxes.forEach((box) => {
          box.classList.add("animate-in");
        });
        // Start counter animation
        statPercentages.forEach((stat) => {
          const target = parseInt(stat.getAttribute("data-target"));
          animateCounter(stat, target);
        });
      }
    });
  },
  {
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px",
  }
);

if (statsSection) {
  statsObserver.observe(statsSection);
}

// Intersection Observer for Other Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
    }
  });
}, observerOptions);

// Observe elements for animation (excluding stat-box to avoid conflicts)
document
  .querySelectorAll(".collection-item, .comparison-section")
  .forEach((el) => {
    observer.observe(el);
  });

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
  } else {
    header.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
  }

  lastScroll = currentScroll;
});

// Lazy Loading Images (if needed)
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// Prevent form submission on Enter key in search
const searchBtn = document.querySelector(".search-btn");
if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    // Implement search functionality here
    console.log("Search clicked");
  });
}

const accordionItemHeaders = document.querySelectorAll(
  ".accordion-item-header"
);

accordionItemHeaders.forEach((accordionItemHeader) => {
  accordionItemHeader.addEventListener("click", (event) => {
    // Uncomment in case you only want to allow for the display of only one collapsed item at a time!

    //     const currentlyActiveAccordionItemHeader = document.querySelector(".accordion-item-header.active");
    //     if(currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader!==accordionItemHeader) {
    //        currentlyActiveAccordionItemHeader.classList.toggle("active");
    //        currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
    //      }

    accordionItemHeader.classList.toggle("active");
    const accordionItemBody = accordionItemHeader.nextElementSibling;
    if (accordionItemHeader.classList.contains("active")) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
    } else {
      accordionItemBody.style.maxHeight = 0;
    }
  });
});

const items = document.querySelectorAll(".accordion button");

function toggleAccordion() {
  const itemToggle = this.getAttribute("aria-expanded");

  for (i = 0; i < items.length; i++) {
    items[i].setAttribute("aria-expanded", "false");
  }

  if (itemToggle == "false") {
    this.setAttribute("aria-expanded", "true");
  }
}

items.forEach((item) => item.addEventListener("click", toggleAccordion));

const IMAGES = [
  "images/original-1.png",
  "images/Lilly-1.png",
  "images/Rose-1.png",
];

const FRAGRANCES = [
  { id: "original", name: "Original", img: IMAGES[0] },
  { id: "lily", name: "Lily", img: IMAGES[1] },
  { id: "rose", name: "Rose", img: IMAGES[2] },
];

let state = {
  currentSlide: 0,
  activePlan: "single",
  selections: {
    single: "original",
    d1: "original",
    d2: "lily",
    onetime: "original",
  },
};

function init() {
  renderGallery();
  renderFragrances();
  selectPlan("single");
}

function renderGallery() {
  const thumbs = document.getElementById("thumbnails");
  const dots = document.getElementById("dots");

  IMAGES.forEach((url, i) => {
    const thumb = document.createElement("button");
    thumb.className = "thumbnail";
    thumb.onclick = (e) => {
      e.stopPropagation();
      goToSlide(i);
    };
    thumb.innerHTML = `<img src="${url}">`;
    thumbs.appendChild(thumb);

    const dot = document.createElement("button");
    dot.className = "dot";
    dot.onclick = (e) => {
      e.stopPropagation();
      goToSlide(i);
    };
    dots.appendChild(dot);
  });
  updateGalleryUI();
}

function goToSlide(i) {
  state.currentSlide = i;
  document.getElementById("main-image").src = IMAGES[i];
  updateGalleryUI();
}

function changeSlide(dir) {
  let next = (state.currentSlide + dir + IMAGES.length) % IMAGES.length;
  goToSlide(next);
}

function updateGalleryUI() {
  document
    .querySelectorAll(".thumbnail")
    .forEach((t, i) => t.classList.toggle("active", i === state.currentSlide));
  document
    .querySelectorAll(".dot")
    .forEach((d, i) => d.classList.toggle("active", i === state.currentSlide));
}

function renderFragrances() {
  ["grid-single", "grid-double1", "grid-double2"].forEach((id) => {
    const grid = document.getElementById(id);
    const key =
      id === "grid-single" ? "single" : id === "grid-double1" ? "d1" : "d2";

    FRAGRANCES.forEach((f) => {
      const btn = document.createElement("div");
      btn.className = `fragrance-btn ${
        state.selections[key] === f.id ? "selected" : ""
      }`;
      btn.onclick = (e) => {
        e.stopPropagation();
        updateFrag(key, f.id);
      };
      btn.innerHTML = `
              <div class="fragrance-img"><img src="${f.img}"></div>
              <div class="fragrance-name">${f.name}</div>
          `;
      grid.appendChild(btn);
    });
  });
}

function updateFrag(key, id) {
  state.selections[key] = id;
  const gridId =
    key === "single"
      ? "grid-single"
      : key === "d1"
      ? "grid-double1"
      : "grid-double2";
  const grid = document.getElementById(gridId);
  grid.querySelectorAll(".fragrance-btn").forEach((btn, i) => {
    btn.classList.toggle("selected", FRAGRANCES[i].id === id);
  });
  updateCTA();
}

function selectPlan(plan) {
  state.activePlan = plan;
  ["single", "double", "onetime"].forEach((p) => {
    document.getElementById(`item-${p}`).classList.toggle("active", p === plan);
  });
  updateCTA();
}

function updateCTA() {
  const btn = document.getElementById("cart-btn");
  const prices = { single: 99.99, double: 169.99, onetime: 119.99 };
  const price = prices[state.activePlan];

  let query = `?plan=${state.activePlan}`;
  if (state.activePlan === "double") {
    query += `&f1=${state.selections.d1}&f2=${state.selections.d2}`;
  } else {
    query += `&f1=${state.selections[state.activePlan]}`;
  }

  btn.innerText = `Add to Cart - $${price}`;
  btn.href = `/cart${query}`;
}

init();

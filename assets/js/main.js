const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
const closeMenuBtn = document.getElementById("closeMenuBtn");

if (menuBtn && mobileMenu && mobileMenuOverlay && closeMenuBtn) {
  function openMobileMenu() {
    mobileMenu.classList.remove("translate-x-full");
    mobileMenu.classList.add("translate-x-0");
    mobileMenuOverlay.classList.remove("opacity-0", "invisible");
    mobileMenuOverlay.classList.add("opacity-100", "visible");
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove("translate-x-0");
    mobileMenu.classList.add("translate-x-full");
    mobileMenuOverlay.classList.remove("opacity-100", "visible");
    mobileMenuOverlay.classList.add("opacity-0", "invisible");
    document.body.style.overflow = "auto";
  }

  menuBtn.addEventListener("click", openMobileMenu);
  closeMenuBtn.addEventListener("click", closeMobileMenu);
  mobileMenuOverlay.addEventListener("click", closeMobileMenu);
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileMenu();
  });
}

document.addEventListener("headerLoaded", function () {
  if (document.querySelector(".bannerSwiper")) {
    const bannerSwiper = new Swiper(".bannerSwiper", {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 1500,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".banner-next",
        prevEl: ".banner-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

  if (document.querySelector(".trendingSwiper") && document.querySelector(".trendingSwiper").swiper) {
    document.querySelector(".trendingSwiper").swiper.update();
  }

  if (document.querySelector(".recommendedSwiper")) {
    const recommendedSwiper = new Swiper(".recommendedSwiper", {
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 1,
      initialSlide: 1,
      spaceBetween: 20,
      speed: 800,
      loop: false, 
      navigation: {
        nextEl: ".recommended-next",
        prevEl: ".recommended-prev",
      },
      breakpoints: {
        768: { slidesPerView: 2, spaceBetween: 30 },
        1024: { slidesPerView: 3, spaceBetween: 30 }
      }
    });
  }

 

  if (document.querySelector(".testimonialSwiper")) {
    const testimonialSwiper = new Swiper(".testimonialSwiper", {
      slidesPerView: 1,
      spaceBetween: 24,
      speed: 1000,
      loop: false,
      navigation: {
        nextEl: ".testimonial-next",
        prevEl: ".testimonial-prev",
      },
      pagination: {
        el: ".testimonialSwiper .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        768: { slidesPerView: 1.5 },
        1024: { slidesPerView: 2 },
      },
    });
  }

  if (document.querySelector(".cityTabsSwiper")) {
    const cityTabsSwiper = new Swiper(".cityTabsSwiper", {
      slidesPerView: "auto",
      spaceBetween: 12,
      freeMode: true,
      navigation: {
        nextEl: ".city-tabs-next",
        prevEl: ".city-tabs-prev",
      },
    });
  
    const cityTabs = document.querySelectorAll(".city-tab");
    const trendCards = document.querySelectorAll(".trend-card");
  
    // Destroy the trending Swiper so we can rebuild it filtered
    let trendingSwiper = document.querySelector(".trendingSwiper").swiper;
    if (trendingSwiper) trendingSwiper.destroy(true, true);
  
    const trendingEl = document.querySelector(".trendingSwiper");
  
    function renderTrending(city) {
      // Remove any previous Swiper instance cleanly
      if (trendingEl.swiper) trendingEl.swiper.destroy(true, true);
  
      // Toggle visibility with a class (NOT inline display on slides)
      trendCards.forEach(card => {
        const match = card.getAttribute("data-city") === city;
        card.classList.toggle("hidden", !match);
      });
  
      // Let the DOM settle, then init a fresh Swiper
      requestAnimationFrame(() => {
        new Swiper(".trendingSwiper", {
          slidesPerView: 1,
          spaceBetween: 24,
          speed: 1000,
          loop: false,
          watchOverflow: true,
          observer: true,
          observeParents: true,
          navigation: {
            nextEl: ".trending-next",
            prevEl: ".trending-prev",
          },
          pagination: {
            el: ".trendingSwiper .swiper-pagination",
            clickable: true,
          },
          breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 3 },
          },
        });
      });
    }
  
    cityTabs.forEach(tab => {
      if (tab.getAttribute("data-filter-city") === "Gurugram") {
        tab.classList.add("!text-[#0da06a]");
        tab.querySelector("svg").classList.add("!fill-[#0da06a]");
      }
  
      tab.addEventListener("click", () => {
        cityTabs.forEach(t => {
          t.classList.remove("!text-[#0da06a]");
          t.querySelector("svg").classList.remove("!fill-[#0da06a]");
        });
        tab.classList.add("!text-[#0da06a]");
        tab.querySelector("svg").classList.add("!fill-[#0da06a]");
  
        const selectedCity = tab.getAttribute("data-filter-city");
        const slideIndex = Array.from(cityTabs).indexOf(tab);
        cityTabsSwiper.slideTo(slideIndex, 500, true);
  
        renderTrending(selectedCity);
      });
    });
  
    // Initial render
    renderTrending("Gurugram");
  }

  if (document.querySelector("[data-fancybox]")) {
    Fancybox.bind("[data-fancybox]", {
      autoStart: false,
      contentClick: "iterateZoom",
      zIndex: 99999,
      Images: {
        Panzoom: {
          maxScale: 3,
        },
      },
      keyboard: true,
      Thumbs: true,
      Toolbar: {
        display: {
          left: [""],
          middle: [""],
          right: ["close"],
          bottom: [],
        },
      },
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".cityTabsSwiper")) {
    const cityTabsSwiper = new Swiper(".cityTabsSwiper", {
      slidesPerView: "auto",
      spaceBetween: 12,
      freeMode: true,
      navigation: {
        nextEl: ".city-tabs-next",
        prevEl: ".city-tabs-prev",
      },
    });

    const cityTabs = document.querySelectorAll(".city-tab");
    const trendCards = document.querySelectorAll(".trend-card");

    cityTabs.forEach(tab => {
      if (tab.getAttribute("data-filter-city") === "Gurugram") {
        tab.classList.add("!text-[#0da06a]");
        tab.querySelector('svg').classList.add("!fill-[#0da06a]");
      }

      tab.addEventListener("click", () => {
        cityTabs.forEach(t => {
          t.classList.remove("!text-[#0da06a]");
          t.querySelector('svg').classList.remove("!fill-[#0da06a]");
        });

        tab.classList.add("!text-[#0da06a]");
        tab.querySelector('svg').classList.add("!fill-[#0da06a]");

        const selectedCity = tab.getAttribute("data-filter-city");

        const slideIndex = Array.from(cityTabs).indexOf(tab);
        cityTabsSwiper.slideTo(slideIndex, 500, true);

        trendCards.forEach(card => {
          if (card.getAttribute("data-city") === selectedCity) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
    });

    trendCards.forEach(card => {
      if (card.getAttribute("data-city") !== "Gurugram") {
        card.style.display = "none";
      }
    });
  }
});

document.addEventListener("headerLoaded", function () {
  const searchBarTrigger = document.getElementById("searchBarTrigger");

  if (searchBarTrigger) {
    const mainSearchTrigger = document.getElementById("mainSearchTrigger");
    const mainSearchIconTrigger = document.getElementById("mainSearchIconTrigger");
    const searchModal = document.getElementById("searchModal");

    const cityDropdownTrigger = document.getElementById("cityDropdownTrigger");
    const cityModal = document.getElementById("cityModal");
    const citySearchInput = document.getElementById("citySearchInput");
    const clearCitySearch = document.getElementById("clearCitySearch");
    const popularCitiesList = document.getElementById("popularCitiesList");
    const searchResultsList = document.getElementById("searchResultsList");
    const resultsContainer = document.getElementById("resultsContainer");

    const openMainSearch = (e) => {
      if (e) e.stopPropagation();
      closeCityModal();
      searchModal.classList.remove("opacity-0", "invisible", "translate-y-2");
      searchModal.classList.add("opacity-100", "visible", "translate-y-0");
    };

    const closeMainSearch = () => {
      searchModal.classList.remove("opacity-100", "visible", "translate-y-0");
      searchModal.classList.add("opacity-0", "invisible", "translate-y-2");
    };

    searchBarTrigger.addEventListener("click", (e) => {
      if (e.target.closest('button[type="submit"]')) return;
      if (mainSearchTrigger) mainSearchTrigger.focus();
      openMainSearch(e);
    });

    const heroForm = document.getElementById("heroSearchForm");
    if (heroForm) {
      heroForm.addEventListener("submit", () => {
        closeMainSearch();
      });
    }

    document.addEventListener("click", function (e) {
      if (searchModal && searchModal.classList.contains("opacity-100")) {
        const clickedSearchBar = searchBarTrigger.contains(e.target);
        if (!searchModal.contains(e.target) && !clickedSearchBar) {
          closeMainSearch();
        }
      }
    });

    const openCityModal = (e) => {
      e.stopPropagation();
      searchModal.classList.remove("opacity-100", "visible", "translate-y-0");
      searchModal.classList.add("opacity-0", "invisible", "translate-y-2");

      cityModal.classList.remove("opacity-0", "invisible", "translate-y-2");
      cityModal.classList.add("opacity-100", "visible", "translate-y-0");
      citySearchInput.focus();
    };

    const closeCityModal = () => {
      if (cityModal) {
        cityModal.classList.remove("opacity-100", "visible", "translate-y-0");
        cityModal.classList.add("opacity-0", "invisible", "translate-y-2");
      }
    };

    if (cityDropdownTrigger) cityDropdownTrigger.addEventListener("click", openCityModal);

    document.addEventListener("click", function (e) {
      if (cityModal && cityModal.classList.contains("opacity-100")) {
        if (!cityModal.contains(e.target) && !cityDropdownTrigger.contains(e.target)) {
          closeCityModal();
        }
      }
    });

    if (citySearchInput) {
      citySearchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase();

        if (query.length > 0) {
          clearCitySearch.classList.remove("hidden");
          popularCitiesList.classList.add("hidden");
          searchResultsList.classList.remove("hidden");

          const cities = Array.from(popularCitiesList.querySelectorAll('.city-item')).map(el => ({
            name: el.innerText,
            value: el.getAttribute('data-city')
          }));

          const matches = cities.filter(city => city.name.toLowerCase().includes(query));

          resultsContainer.innerHTML = '';
          if (matches.length > 0) {
            matches.forEach(match => {
              const div = document.createElement('div');
              div.className = "cursor-pointer hover:text-[#0da06a] py-1";
              div.innerText = match.name;
              div.addEventListener('click', () => {
                window.location.href = `project-listing.html?city=${encodeURIComponent(match.value)}`;
              });
              resultsContainer.appendChild(div);
            });
          } else {
            resultsContainer.innerHTML = '<div class="text-gray-400 py-4 text-center">No cities found</div>';
          }
        } else {
          clearCitySearch.classList.add("hidden");
          searchResultsList.classList.add("hidden");
          popularCitiesList.classList.remove("hidden");
        }
      });
    }

    if (clearCitySearch) {
      clearCitySearch.addEventListener("click", function () {
        citySearchInput.value = '';
        clearCitySearch.classList.add("hidden");
        searchResultsList.classList.add("hidden");
        popularCitiesList.classList.remove("hidden");
        citySearchInput.focus();
      });
    }

    const popularCityItems = document.querySelectorAll('#popularCitiesList .city-item');
    popularCityItems.forEach(item => {
      item.addEventListener('click', function () {
        const cityVal = this.getAttribute('data-city');
        window.location.href = `project-listing.html?city=${encodeURIComponent(cityVal)}`;
      });
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const cityParam = urlParams.get('city');
  const citySelectElement = document.getElementById('citySelect');

  if (cityParam && citySelectElement) {
    const optionExists = Array.from(citySelectElement.options).some(option => option.value === cityParam);

    if (optionExists) {
      citySelectElement.value = cityParam;
      citySelectElement.dispatchEvent(new Event('change'));
    }
  }
});

if (document.querySelector(".morePropertiesSwiper")) {
  new Swiper(".morePropertiesSwiper", {
    slidesPerView: 1,
    spaceBetween: 24,
    speed: 1000,
    loop: false,
    navigation: {
      nextEl: ".more-properties-next",
      prevEl: ".more-properties-prev",
    },
    pagination: {
      el: ".morePropertiesSwiper .swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 3 },
    },
  });
}

document.addEventListener("headerLoaded", function () {
    console.log("Header loaded. Setting up enquiry modal...");

    const modal = document.getElementById('enquiryModal');
    const openBtn = document.getElementById('openEnquiryBtn');
    const closeBtn = document.getElementById('closeEnquiryBtn');

    if (!modal) {
        console.error("ERROR: #enquiryModal not found even after headerLoaded.");
    }
    if (!openBtn) {
        console.error("ERROR: #openEnquiryBtn not found even after headerLoaded.");
    }

    if (!modal || !openBtn) return;

    function toggleEnquiryModal(show) {
        if (show) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    openBtn.addEventListener('click', function () {
        console.log("Enquire Now clicked.");
        toggleEnquiryModal(true);
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            toggleEnquiryModal(false);
        });
    }

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            toggleEnquiryModal(false);
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            toggleEnquiryModal(false);
        }
    });

    console.log("Enquiry modal setup complete.");
});

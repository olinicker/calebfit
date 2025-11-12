document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!carousel || !prevBtn || !nextBtn) {
    return;
  }

  const setInitialPosition = () => {
    if (window.innerWidth <= 650) {
      const initialIndex = 1;

      const itemWidth = carousel.clientWidth;

      const initialScroll = itemWidth * initialIndex;

      carousel.scrollTo({ left: initialScroll, behavior: "auto" });
    }
  };

  setInitialPosition();

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setInitialPosition, 100);
  });

  const scrollCarousel = (direction) => {
    const itemWidth = carousel.clientWidth;

    const currentScroll = carousel.scrollLeft;

    const maxScroll = carousel.scrollWidth - itemWidth;

    const tolerance = 5;

    if (direction === 1) {
      if (currentScroll >= maxScroll - tolerance) {
        carousel.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        carousel.scrollBy({ left: itemWidth, behavior: "smooth" });
      }
    } else if (direction === -1) {
      if (currentScroll <= tolerance) {
        carousel.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        carousel.scrollBy({ left: -itemWidth, behavior: "smooth" });
      }
    }
  };

  nextBtn.addEventListener("click", () => scrollCarousel(1));
  prevBtn.addEventListener("click", () => scrollCarousel(-1));
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".fade-in-section");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });
});

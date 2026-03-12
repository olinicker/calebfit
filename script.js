import * as prismic from "https://esm.sh/@prismicio/client";

const repositoryName = "caleb-fit-landing";
const client = prismic.createClient(repositoryName);
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

const init = async () => {
  try {
    const response = await client.getSingle("home");
    const responseData = response.data;

    const heroData = {
      title: prismic.asText(responseData.hero_title),
      description: prismic.asHTML(responseData.hero_description),
      buttonText: responseData.hero_button_text,
      heroTopRight: prismic.asText(responseData.hero_top_right),
    };

    const mainData = {
      mainTitle: prismic.asText(responseData.main_title),
      mainCoachText: prismic.asText(responseData.main_coach_text),
      mainCoachRichText: prismic.asHTML(responseData.main_coach_rich_text),
      mainIntagramText: responseData.instagram_text,
      mainCoachImage: responseData.coach_image.url,
    };

    const heroTitleElement = document.querySelector(".hero-text h1");
    const heroDescElement = document.querySelector(".hero-text p");
    const heroButtonElement = document.querySelector(".hero-text a");
    const heroTopRightElement = document.getElementById("consultoria");

    const mainTitleElement = document.getElementById("main-title-element");
    const mainCoachTextElement = document.getElementById("main-coach-text");
    const mainCoachRichTextElement = document.getElementById(
      "main-coach-rich-text",
    );
    const mainInstagramRotineElement =
      document.getElementById("rotina-instagram");
    const MaincoachImg = document.getElementById("coachImage");

    if (heroTitleElement) {
      heroTitleElement.textContent = heroData.title;
    }

    if (heroButtonElement) {
      heroButtonElement.textContent = heroData.buttonText;
    }

    if (heroDescElement) {
      heroDescElement.innerHTML = heroData.description;
    }

    if (mainTitleElement) {
      mainTitleElement.textContent = mainData.mainTitle;
    }

    if (mainCoachTextElement) {
      mainCoachTextElement.textContent = mainData.mainCoachText;
    }

    if (mainCoachRichTextElement) {
      mainCoachRichTextElement.innerHTML = mainData.mainCoachRichText;
    }

    if (heroTopRightElement) {
      heroTopRightElement.innerText = heroData.heroTopRight;
    }

    if (mainInstagramRotineElement) {
      mainInstagramRotineElement.innerHTML += mainData.mainIntagramText;
    }

    if (MaincoachImg) {
      MaincoachImg.src = mainData.mainCoachImage;
    }
  } catch (error) {
    console.error("Erro ao buscar dados do Prismic:", error);
  }
};

init();

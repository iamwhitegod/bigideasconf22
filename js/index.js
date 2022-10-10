const nav = document.querySelector(".navbar");
const navbar = document.querySelector(".navbar__nav");
const navList = document.querySelector(".navbar__list");

/////////////////////////////////////////
// Open and Close Mobile Navigation
const menuCtrl = function (className) {
  navbar.addEventListener("click", function (e) {
    const elem = e.target.closest(className);

    if (elem) {
      navList.classList.toggle("open--menu");
    }
  });
};

menuCtrl(".navbar__menu-open");
menuCtrl(".navbar__menu-close");
menuCtrl(".navbar__link");

///////////////////////////////////////
// Sticky navigation: Intersection Observer API

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

///////////////////////////////////////////
// Reveal Section on Scroll
const allSections = document.querySelectorAll("section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  threshold: 0.2,
  root: null,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

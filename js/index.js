const navbar = document.querySelector(".navbar__nav");
const navList = document.querySelector(".navbar__list");

navbar.addEventListener("click", function (e) {
  const elem = e.target.closest(".navbar__menu-open");

  if (elem) {
    navList.classList.toggle("open--menu");
  }
});

navbar.addEventListener("click", function (e) {
  const elem = e.target.closest(".navbar__menu-close");

  if (elem) {
    navList.classList.toggle("open--menu");
  }
});

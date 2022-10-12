import { createDoc, getSignup } from "./signups";
import { html } from "./markUp";
import ShortUniqueId from "short-unique-id";

// Dom Elements
const nav = document.querySelector(".navbar");
const navbar = document.querySelector(".navbar__nav");
const navList = document.querySelector(".navbar__list");
const form = document.querySelector(".js--register");

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

///////////////////////////////////////
// Sticky navigation: Intersection Observer API

const stickyNav = function () {
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
};

///////////////////////////////////////////
// Reveal Section on Scroll
const revealOnSection = function () {
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
};

/////////////////////////////////////////////////
// Handle Registration

const handleRegistration = function () {
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    form.querySelector(".btn").textContent = "Please Wait...";

    const suid = new ShortUniqueId({ length: 6, dictionary: "number" });
    const accessID = `BI${suid()}`;

    const data = Object.fromEntries(new FormData(form));
    data.accessID = accessID;
    const res = await createDoc(data);

    const sendEmail = await fetch(
      "https://bigideasconf.herokuapp.com/register",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const response = await sendEmail.json();
    sessionStorage.setItem("newData", JSON.stringify(res));

    // Clear Input values
    form.querySelectorAll("input").forEach((element) => (element.value = ""));
    window.location.replace(window.location.origin + "/success.html");
  });
};

const renderDetails = () => {
  const header = document.querySelector(".header");
  header.innerHTML = "";
  header.insertAdjacentHTML("afterbegin", html);
};

///////////////////////////////////////////////
// Init
const init = function () {
  menuCtrl(".navbar__menu-open");
  menuCtrl(".navbar__menu-close");
  menuCtrl(".navbar__link");

  stickyNav();
  revealOnSection();
  handleRegistration();

  if (
    window.location.pathname === "/success.html" &&
    sessionStorage.getItem("newData")
  )
    renderDetails();
  console.log("Initialized App");
};

init();

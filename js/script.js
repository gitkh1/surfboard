const openMenuButton = document.querySelector("#mobile-menu-open");
const closeMenuButton = document.querySelector("#mobile-menu-close");
const mobileMenu = document.querySelector(".mobile-menu");

openMenuButton.addEventListener("click", e => {
    e.preventDefault();

    mobileMenu.classList.add("is-active");
});

closeMenuButton.addEventListener("click", e => {
    e.preventDefault();

    mobileMenu.classList.remove("is-active");
});
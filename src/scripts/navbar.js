const socialsButton = document.getElementById("socials-button");
const socials = document.getElementById("socials");

// If we are using touch features
if (window.matchMedia("(hover: none)").matches) {
  socialsButton.addEventListener("click", () => {
    socials.classList.toggle("open");
  });
} else {
  socialsButton.addEventListener("mouseenter", () => {
    socials.classList.add("open");
  });
}

socialsButton.addEventListener("mouseleave", () => {
  socials.classList.remove("open");
});

let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-slide");
const indicators = document.querySelectorAll(".indicator");

function showSlide(index) {
  const track = document.querySelector(".carousel-track");
  currentSlide = index;

  if (currentSlide >= slides.length) currentSlide = 0;
  if (currentSlide < 0) currentSlide = slides.length - 1;

  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Update indicators
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle("active", i === currentSlide);
  });
}

// Auto-scroll slides every 5 seconds
setInterval(() => {
  showSlide(currentSlide + 1);
}, 5000);

// Navigation buttons
document.querySelector(".prev").addEventListener("click", () => {
  showSlide(currentSlide - 1);
});
document.querySelector(".next").addEventListener("click", () => {
  console.log("nextclick")
  showSlide(currentSlide + 1);
});

// Indicators click
indicators.forEach((indicator, i) => {
  indicator.addEventListener("click", () => showSlide(i));
});

// Initial slide
showSlide(currentSlide);
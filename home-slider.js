const prevButton = document.querySelector(".slider-control.prev");
  const nextButton = document.querySelector(".slider-control.next");
  const sliderTrack = document.querySelector(".slider-track");
  const sliderItems = document.querySelectorAll(".slider-item");
  const totalSlides = sliderItems.length;
  let currentSlide = 0;

  function updateSliderPosition() {
    const slideWidth = sliderItems[0].clientWidth;
    sliderTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  }

  nextButton.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSliderPosition();
  });

  prevButton.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSliderPosition();
  });

  // Adjust slider position on window resize
  window.addEventListener("resize", updateSliderPosition);


const allA = document.querySelectorAll(".collapse a");
allA.forEach((a) => {
  a.addEventListener("click", function () {
    // Remove 'active' class from all li elements
    allA.forEach((a) => {
      a.classList.remove("active");
    });
    // Add 'active' class to the clicked li element
    this.classList.add("active");
  });
});

const initSlider = () => {
  const imageList = document.querySelector(".img-list");
  const sliderButtons = document.querySelectorAll(".slider-button");
  const sliderScrollbar = document.querySelector(".slider-scrollbar");
  const ScrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  ScrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = ScrollbarThumb.offsetLeft;
    const handelMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newthumbPosition = thumbPosition + deltaX;
      const maxTumbPosition =
        sliderScrollbar.getBoundingClientRect().width -
        ScrollbarThumb.offsetWidth;
      const boundedPosition = Math.max(
        0,
        Math.min(maxTumbPosition, newthumbPosition)
      );
      const scrollPosition =
        (boundedPosition / maxTumbPosition) * maxScrollLeft;
      ScrollbarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollLeft = scrollPosition;
    };
    const handelMouseUp = () => {
      document.removeEventListener("mousemove", handelMouseMove);
      document.removeEventListener("mouseup", handelMouseUp);
    };
    document.addEventListener("mousemove", handelMouseMove);
    document.addEventListener("mouseup", handelMouseUp);
  });

  sliderButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev" ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });
  const handelSliderButton = () => {
    sliderButtons[0].style.display =
      imageList.scrollLeft <= 0 ? "none" : "block";
    sliderButtons[1].style.display =
      imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
  };

  const updateScrollThumbPosititon = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollLeft) *
      (sliderScrollbar.clientWidth - ScrollbarThumb.offsetWidth);
    ScrollbarThumb.style.left = `${thumbPosition}px`;
  };

  imageList.addEventListener("scroll", () => {
    handelSliderButton();
    updateScrollThumbPosititon();
  });
};

window.addEventListener("load", initSlider);

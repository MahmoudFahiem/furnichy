const navbarMenuBtn = () => {
  const menuBtn = document.querySelector("#menu-btn");
  const navMenu = document.querySelector("#nav-menu");

  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("is-active");
  });
};

const headerSlider = (speed) => {
  const headerSlider = document.querySelector("#header-slider");
  const slidesUI = document.querySelectorAll("#header-slider .slide");
  const prevBtnUI = document.querySelector("#header-slider .prev-slide");
  const nextBtnUI = document.querySelector("#header-slider .next-slide");

  const showSlide = (slideIndx) => {
    slidesUI[slideIndx].classList.add("is-active");
  };

  const hideSlide = (slideIndx) => {
    slidesUI[slideIndx].classList.remove("is-active");
  };

  const nextSlide = () => {
    hideSlide(currSlideInx);
    currSlideInx = currSlideInx !== slidesUI.length - 1 ? currSlideInx + 1 : 0;
    showSlide(currSlideInx);
  };

  const prevSlide = () => {
    hideSlide(currSlideInx);
    currSlideInx = currSlideInx !== 0 ? currSlideInx - 1 : slidesUI.length - 1;
    showSlide(currSlideInx);
  };

  const startSlideAnim = () => {
    slideAnimRef = setInterval(nextSlide, speed);
    return slideAnimRef;
  };

  const stopSlideAnim = () => {
    clearInterval(slideAnimRef);
  };

  currSlideInx = 0;
  let slideAnimRef = null;

  startSlideAnim();
  prevBtnUI.addEventListener("click", prevSlide);
  nextBtnUI.addEventListener("click", nextSlide);
  headerSlider.addEventListener("mouseenter", stopSlideAnim);
  headerSlider.addEventListener("mouseleave", startSlideAnim);
};

/**
 * Main
 */

const HEADER_SLIDER_SPEED = 3000;

navbarMenuBtn();
headerSlider(HEADER_SLIDER_SPEED);

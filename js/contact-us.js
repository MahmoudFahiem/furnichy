const addClass = (className, els) => {
  if (!(NodeList.prototype.isPrototypeOf(els) || Array.isArray(els)))
    return els.classList.add(className);
  els.forEach((el) => el.classList.add(className));
};

const removeClass = (className, els) => {
  if (!(NodeList.prototype.isPrototypeOf(els) || Array.isArray(els)))
    return els.classList.remove(className);
  els.forEach((el) => el.classList.remove(className));
};

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

const goToUpBtn = () => {
  const gotoBtnUI = document.querySelector("#goto-up-btn");

  gotoBtnUI.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

  document.addEventListener("scroll", () => {
    if (scrollY >= 800) return gotoBtnUI.classList.add("is-active");
    gotoBtnUI.classList.remove("is-active");
  });
};

const formValidation = () => {
  const form = document.querySelector("#contact-form form");
  const formValidated = false;

  const printError = (err, validationEl) => {
    if (err.length === 0) {
      validationEl.setCustomValidity("");
      return (formValidated = true);
    }

    const errPlaceholder =
      validationEl.nextElementSibling.querySelector(".error");
    validationEl.setCustomValidity(" ");
    errPlaceholder.textContent = err;
  };

  const validate = (type, el) => {
    printError(type.validate(), el);
  };

  const validation = {
    name: {
      el: document.querySelector("#name"),
      validate: function () {
        let nameErr = "";
        const nameInUI = this.el;
        const nameVal = nameInUI.value;
        const namePattern = /^[a-z A-Z]+$/g;
        if (nameVal === "") nameErr = "Name is required";
        else if (!namePattern.test(nameVal)) nameErr = "Enter a valid name";
        return nameErr;
      },
    },
    email: {
      el: document.querySelector("#email"),
      validate: function () {
        let emailErr = "";
        const emailInUI = this.el;
        const emailVal = emailInUI.value;
        const emailPattern =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.com$/g;
        if (emailVal === "") emailErr = "Email is required";
        else if (!emailPattern.test(emailVal)) emailErr = "Enter a valid email";
        return emailErr;
      },
    },
    phone: {
      el: document.querySelector("#phone"),
      validate: function () {
        let phoneErr = "";
        const phoneInUI = this.el;
        const phoneVal = phoneInUI.value;
        const phonePattern = /^01[0-2]\d{8}$/g;
        if (phoneVal === "") phoneErr = "Phone is required";
        else if (!phonePattern.test(phoneVal)) phoneErr = "Enter a valid phone";
        return phoneErr;
      },
    },
    message: {
      el: document.querySelector("#message"),
      validate: function () {
        let messageErr = "";
        const messageInUI = this.el;
        const messageVal = messageInUI.value;
        if (messageVal === "") messageErr = "Message is required";
        return messageErr;
      },
    },
  };

  for (let type in validation) {
    validation[type].el.addEventListener("blur", () => {
      validate(validation[type], validation[type].el);
    });
  }

  form.addEventListener("submit", (e) => {
    for (let type in validation) {
      validate(validation[type], validation[type].el);
    }

    if (!formValidated) e.preventDefault();
  });
};

const cart = () => {
  const counter = {
    counterVal: 0,
    counterUI: document.querySelector("#cart-counter"),
    incCounter: function () {
      this.counterVal++;
    },
    decCounter: function () {
      if (this.counterVal > 0) return this.counter--;
    },
    saveCounterVal: function () {
      localStorage.setItem("counter", this.counterVal);
    },
    getCounterVal: function () {
      return localStorage.getItem("counter");
    },
    setCounterVal: function (counterVal) {
      this.counterVal = counterVal;
    },
    printCounter: function () {
      return (this.counterUI.textContent = this.counterVal);
    },
  };

  const counterVal = counter.getCounterVal();
  if (counterVal) counter.setCounterVal(counterVal);
  else counter.saveCounterVal();
  counter.printCounter();
};

/**
 * Main
 */

const HEADER_SLIDER_SPEED = 3000;

navbarMenuBtn();
headerSlider(HEADER_SLIDER_SPEED);
goToUpBtn();
formValidation();
cart();

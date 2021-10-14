const container = document.querySelector("#cardContainer");
const card = document.querySelector(".card");
const textOne = document.querySelector("#firstText");
const dividerOne = document.querySelector("#firstDivider");
const textTwo = document.querySelector("#secondText");
const dividerTwo = document.querySelector("#secondDivider");

const marginRightParse = () => {
  const textOneMargin = window.getComputedStyle(textOne);
  const textOneParse = parseInt(textOneMargin.marginRight, 10);

  return textOneParse;
};

dividerOne.style.marginRight = `${marginRightParse() / 2}px`;

const marginLeftParse = () => {
  const textTwoMargin = window.getComputedStyle(textTwo);
  const textTwoParse = parseInt(textTwoMargin.marginLeft, 10);

  return textTwoParse;
};

dividerTwo.style.margin = `${marginLeftParse() / -2}px`;

const widthParse = () => {
  const parentDivWidth = window.getComputedStyle(card, null).getPropertyValue("width");
  const finalWidth = parseInt(parentDivWidth, 10);

  return finalWidth;
};

container.scrollLeft = widthParse() * 2;

let startX;
let scrollLeft;
let isDown;

container.addEventListener("mousedown", (e) => mouseIsDown(e));
container.addEventListener("mouseup", (e) => mouseUp(e));
container.addEventListener("mouseleave", (e) => mouseLeave(e));
container.addEventListener("mousemove", (e) => mouseMove(e));

function mouseIsDown(e) {
  isDown = true;
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
}

function mouseUp(e) {
  isDown = false;
}

function mouseLeave(e) {
  isDown = false;
}
function mouseMove(e) {
  if (isDown) {
    e.preventDefault();

    const x = e.pageX - container.offsetLeft;
    const walkX = x - startX;
    container.scrollLeft = scrollLeft - walkX;
  }
}

function ready(fn) {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

ready(() => {
  let mouseMoved = false;
  let isMouseDown = false;

  const containerChildren = document.querySelectorAll("#cardContainer .content .card");

  containerChildren.forEach((currentCard) => {
    currentCard.addEventListener("mousedown", (e) => {
      isMouseDown = true;
      mouseMoved = false;
    });

    currentCard.addEventListener("mouseup", (e) => {
      isMouseDown = false;
      if (!mouseMoved) {
        location.href = e.target.getAttribute("data-cool-link");
        console.log(e.target);
      }
    });
  });

  document.addEventListener("mousemove", (f) => {
    if (isMouseDown) {
      mouseMoved = true;
    }
  });
});

const container = document.querySelector("#cardContainer");
const card = document.querySelector(".card");

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

    // currentCard.addEventListener("click", () => {
    //   currentCard.classList.toggle("red");
    // });
  });

  document.addEventListener("mousemove", (f) => {
    if (isMouseDown) {
      mouseMoved = true;
    }
  });
});

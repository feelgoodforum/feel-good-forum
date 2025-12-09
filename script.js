// ================================
// CURRENT TIME DISPLAY
// ================================
function showTime() {
  var el = document.getElementById('currentTime');
  if (!el) return;
  el.innerHTML = new Date().toUTCString();
}
showTime();
setInterval(showTime, 1000);

// ================================
// TESTIMONIALS SLIDER
// ================================
let testimonialOffset = 0;
const scroller = document.getElementById("testScroll");

if (scroller) {
  const testimonials = document.querySelectorAll(".testimonial");

  function getSlideWidth() {
    return scroller.clientWidth;
  }

  function updatePosition() {
    scroller.style.transform = `translateX(-${testimonialOffset}px)`;
  }

  document.getElementById("nextTest").addEventListener("click", () => {
    const slideWidth = getSlideWidth();
    const maxOffset = (testimonials.length - 1) * slideWidth;
    testimonialOffset = Math.min(testimonialOffset + slideWidth, maxOffset);
    updatePosition();
  });

  document.getElementById("prevTest").addEventListener("click", () => {
    const slideWidth = getSlideWidth();
    testimonialOffset = Math.max(testimonialOffset - slideWidth, 0);
    updatePosition();
  });

  window.addEventListener("resize", () => {
    testimonialOffset = 0;
    updatePosition();
  });
}

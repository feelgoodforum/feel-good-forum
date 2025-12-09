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
// TESTIMONIAL AUTO ROTATOR
// ================================
const testimonials = document.querySelectorAll('.testimonial-slider .testimonial');
let testimonialIndex = 0;

if (testimonials.length) {
  function showTestimonial(index) {
    testimonials.forEach((t, i) => {
      t.classList.toggle('active', i === index);
    });
  }

  // initial
  showTestimonial(testimonialIndex);

  // rotate every 7 seconds
  setInterval(() => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    showTestimonial(testimonialIndex);
  }, 7000);
}

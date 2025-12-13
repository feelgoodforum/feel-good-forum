// ================================
// CURRENT TIME DISPLAY
// ================================

function showTime() {
  const el = document.getElementById('currentTime');
  if (!el) return;

  // Show UTC time; switch to toLocaleString() if you prefer local
  el.innerHTML = new Date().toUTCString();
}

// initial call + repeat every second
showTime();
setInterval(showTime, 1000);

// ================================
// TESTIMONIAL CAROUSEL (AUTO SLIDE)
// ================================

const track = document.querySelector('.testimonial-track');
const slides = document.querySelectorAll('.testimonial-slide');
const dotsContainer = document.querySelector('.testimonial-dots');

if (track && slides.length && dotsContainer) {
  let index = 0;

  // create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.testimonial-dot');

  function goToSlide(i) {
    index = i;
    const offset = -index * 100;
    track.style.transform = `translateX(${offset}%)`;
    dots.forEach((d, j) => d.classList.toggle('active', j === index));
  }

  // initial slide
  goToSlide(0);

  // auto‑play every 7 seconds (single interval)
  setInterval(() => {
    const next = (index + 1) % slides.length;
    goToSlide(next);
  }, 7000);

  // allow click on dots
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
  });
}

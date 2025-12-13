// ================================
// CURRENT TIME DISPLAY
// ================================

function showTime() {
  const el = document.getElementById('currentTime');
  if (!el) return;

  // Show local time for better user relevance
  el.innerHTML = new Date().toLocaleString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

showTime();
setInterval(showTime, 1000);

// ================================
// SMOOTH SCROLL NAVIGATION
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ================================
// ACTIVE NAVIGATION HIGHLIGHT
// ================================

window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 100) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
});

// ================================
// TESTIMONIAL CAROUSEL (AUTO SLIDE)
// ================================

const track = document.querySelector('.testimonial-track');
const slides = document.querySelectorAll('.testimonial-slide');
const dotsContainer = document.querySelector('.testimonial-dots');

if (track && slides.length && dotsContainer) {
  let index = 0;
  let autoplayInterval;

  // create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
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

  // auto‑play every 7 seconds
  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      const next = (index + 1) % slides.length;
      goToSlide(next);
    }, 7000);
  }

  startAutoplay();

  // pause on hover, resume on leave
  const carousel = document.querySelector('.testimonial-carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    carousel.addEventListener('mouseleave', startAutoplay);
  }

  // allow click on dots
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goToSlide(i);
      clearInterval(autoplayInterval);
      startAutoplay(); // restart timer
    });
  });
}

// ================================
// FADE-IN ANIMATIONS ON SCROLL
// ================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.service-card, .testimonial-slide, section > h2').forEach(el => {
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 50));

  // Mobile menu
  const burger = document.getElementById('burger');
  const navMenu = document.getElementById('navMenu');
  burger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const s = burger.querySelectorAll('span');
    if (navMenu.classList.contains('open')) {
      s[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      s[1].style.opacity = '0';
      s[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      s[0].style.transform = s[1].style.opacity = s[2].style.transform = '';
      s[1].style.opacity = '1';
    }
  });
  navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navMenu.classList.remove('open');
    const s = burger.querySelectorAll('span');
    s[0].style.transform = s[2].style.transform = '';
    s[1].style.opacity = '1';
  }));

  // Counters
  const counters = document.querySelectorAll('.sn');
  const co = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.t;
      let cur = 0;
      const step = target / 80;
      const timer = setInterval(() => {
        cur += step;
        if (cur >= target) { el.textContent = target.toLocaleString('fr-FR'); clearInterval(timer); }
        else el.textContent = Math.floor(cur).toLocaleString('fr-FR');
      }, 20);
      co.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => co.observe(c));

  // Fade in on scroll
  const fades = document.querySelectorAll('.v-card,.p-card,.post,.book,.ci');
  const fo = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('show'), i * 80);
        e.target.classList.add('fade-in');
        fo.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  fades.forEach(f => { f.classList.add('fade-in'); fo.observe(f); });

// Contact form
  const form = document.getElementById('contactForm');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button');
    btn.textContent = 'Message envoyé ! ✓';
    btn.style.background = '#25D366';
    setTimeout(() => { btn.textContent = 'Envoyer le Message →'; btn.style.background = ''; form.reset(); }, 4000);
  });

  // Slider vidéos
  const track = document.getElementById('videosTrack');
  const btnNext = document.getElementById('slNext');
  const btnPrev = document.getElementById('slPrev');
  if(track && btnNext && btnPrev){
    let pos = 0;
    const cardW = 316;
    const max = track.children.length - 3;
    btnNext.addEventListener('click', () => { if(pos < max){ pos++; track.style.transform = `translateX(-${pos * cardW}px)`; }});
    btnPrev.addEventListener('click', () => { if(pos > 0){ pos--; track.style.transform = `translateX(-${pos * cardW}px)`; }});
  }

});
const gallery = document.querySelector('.gallery-scroll');

let scrollSpeed = 1;

function autoScrollGallery() {
  if (!gallery) return;

  gallery.scrollLeft += scrollSpeed;

  // recommencer au début quand on arrive à la fin
  if (gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth) {
    gallery.scrollLeft = 0;
  }

  requestAnimationFrame(autoScrollGallery);
}

autoScrollGallery();
gallery.addEventListener("mouseenter", () => {
  scrollSpeed = 0;
});

gallery.addEventListener("mouseleave", () => {
  scrollSpeed = 1;
});

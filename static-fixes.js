(function () {
  function setupMenu() {
    var navToggle = document.getElementById('nav-toggle');
    var menu = document.querySelector('.main-navigation .onepress-menu');

    if (navToggle && menu) {
      navToggle.addEventListener('click', function (event) {
        event.preventDefault();
        menu.classList.toggle('is-open');
      });
    }

    document.querySelectorAll('.submenu-toggle').forEach(function (button) {
      var parent = button.closest('.menu-item-has-children');
      var submenu = parent ? parent.querySelector('.sub-menu') : null;
      if (submenu) {
        submenu.style.display = 'none';
      }

      button.addEventListener('click', function (event) {
        event.preventDefault();
        if (!parent || !submenu) return;

        var isOpen = parent.classList.toggle('is-open');
        button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        submenu.style.display = isOpen ? 'block' : 'none';
        submenu.style.opacity = isOpen ? '1' : '0';
        submenu.style.height = isOpen ? 'auto' : '1px';
        submenu.style.overflow = isOpen ? 'visible' : 'hidden';
        submenu.style.zIndex = isOpen ? '999' : '-1';
      });
    });
  }

  function activateSlider(sliderWrap) {
    var slides = Array.from(sliderWrap.querySelectorAll('.post'));
    if (!slides.length) return;

    sliderWrap.classList.add('static-slider');
    var wrapper = sliderWrap.querySelector('.tf_swiper-wrapper');
    if (wrapper) wrapper.classList.remove('tf_lazy');

    slides.forEach(function (slide) {
      slide.classList.remove('tf_swiper-slide');
      slide.style.removeProperty('content-visibility');
    });

    var currentIndex = 0;
    var dots = [];

    function render(index) {
      slides.forEach(function (slide, slideIndex) {
        slide.classList.toggle('is-active', slideIndex === index);
      });
      dots.forEach(function (dot, dotIndex) {
        dot.classList.toggle('is-active', dotIndex === index);
      });
      currentIndex = index;
    }

    if (slides.length > 1) {
      var nav = document.createElement('div');
      nav.className = 'static-slider-nav';

      slides.forEach(function (_, index) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'static-slider-dot';
        dot.setAttribute('aria-label', 'Ga naar quote ' + (index + 1));
        dot.addEventListener('click', function () {
          render(index);
        });
        nav.appendChild(dot);
        dots.push(dot);
      });

      sliderWrap.appendChild(nav);

      window.setInterval(function () {
        render((currentIndex + 1) % slides.length);
      }, 6000);
    }

    render(0);
  }

  function setupSliders() {
    document.querySelectorAll('.module-testimonial-slider').forEach(activateSlider);
  }

  function jumpToHashTarget(hash) {
    if (!hash || hash.charAt(0) !== '#') return;
    var target = document.getElementById(hash.slice(1));
    if (!target) return;
    target.scrollIntoView({ behavior: 'auto', block: 'start' });
  }

  function setupAnchorJumps() {
    document.querySelectorAll('.sub-menu a[href*="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        var url = new URL(link.href, window.location.href);
        if (url.pathname !== window.location.pathname || !url.hash) return;
        event.preventDefault();
        history.replaceState(null, '', url.hash);
        jumpToHashTarget(url.hash);
      });
    });

    window.setTimeout(function () {
      jumpToHashTarget(window.location.hash);
    }, 50);
  }

  document.addEventListener('DOMContentLoaded', function () {
    setupMenu();
    setupSliders();
    setupAnchorJumps();
  });
})();

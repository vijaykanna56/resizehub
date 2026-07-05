/* ==================================================================
   RESIZE HUB — SCRIPT
   Table of Contents:
   1. Init / Lucide Icons
   2. Sticky Navbar + Scroll Progress Bar
   3. Mobile Menu
   4. Smooth Scrolling + Active Nav Link
   5. Scroll To Top
   6. Intersection Observer Reveal Animations
   7. Animated Counters
   8. FAQ Accordion
   9. Contact Form Validation
   10. Misc (footer year)
=================================================================== */

(function () {
  'use strict';

  /* ----------------------------------------------------------------
     1. INIT / LUCIDE ICONS
  ---------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
    initFooterYear();
  });

  // Lucide loads via a separate <script defer> tag, so also try on window load
  // in case DOMContentLoaded fired before the icon library was ready.
  window.addEventListener('load', function () {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  });

  /* ----------------------------------------------------------------
     2. STICKY NAVBAR + SCROLL PROGRESS BAR
  ---------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scrollProgress');

  function handleScrollEffects() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    // Sticky navbar background swap
    if (navbar) {
      navbar.classList.toggle('is-scrolled', scrollY > 12);
    }

    // Scroll progress bar
    if (scrollProgress) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      scrollProgress.style.width = progress + '%';
    }

    toggleScrollTopButton(scrollY);
  }

  let scrollTicking = false;
  window.addEventListener('scroll', function () {
    if (!scrollTicking) {
      window.requestAnimationFrame(function () {
        handleScrollEffects();
        updateActiveNavLink();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  // Run once on load to set initial state
  handleScrollEffects();

  /* ----------------------------------------------------------------
     3. MOBILE MENU
  ---------------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  function closeMobileMenu() {
    if (!mobileMenu || !navToggle) return;
    mobileMenu.classList.remove('is-open');
    navToggle.classList.remove('is-active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleMobileMenu() {
    if (!mobileMenu || !navToggle) return;
    const isOpen = mobileMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', toggleMobileMenu);
  }

  if (mobileMenu) {
    mobileMenu.querySelectorAll('.mobile-link, .btn').forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // Close mobile menu with Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileMenu();
  });

  /* ----------------------------------------------------------------
     4. SMOOTH SCROLLING + ACTIVE NAV LINK
  ---------------------------------------------------------------- */
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const sections = navLinks
    .map(function (link) {
      const id = link.getAttribute('href');
      return id && id.startsWith('#') ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  // Native CSS `scroll-behavior: smooth` handles the actual scrolling;
  // this just ensures anchor clicks work consistently and close menus.
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 78; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
      closeMobileMenu();
    });
  });

  function updateActiveNavLink() {
    if (!sections.length) return;
    const scrollPos = window.scrollY + 120;
    let currentId = sections[0].id;

    for (let i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= scrollPos) {
        currentId = sections[i].id;
      }
    }

    navLinks.forEach(function (link) {
      const isActive = link.getAttribute('href') === '#' + currentId;
      link.classList.toggle('is-active', isActive);
    });
  }

  /* ----------------------------------------------------------------
     5. SCROLL TO TOP
  ---------------------------------------------------------------- */
  const scrollTopBtn = document.getElementById('scrollTop');

  function toggleScrollTopButton(scrollY) {
    if (!scrollTopBtn) return;
    scrollTopBtn.classList.toggle('is-visible', scrollY > 480);
  }

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ----------------------------------------------------------------
     6. INTERSECTION OBSERVER REVEAL ANIMATIONS
  ---------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.getAttribute('data-reveal-delay');
          if (delay) {
            el.style.transitionDelay = delay + 'ms';
          }
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ----------------------------------------------------------------
     7. ANIMATED COUNTERS
  ---------------------------------------------------------------- */
  const counterElements = document.querySelectorAll('[data-counter]');

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10) || 0;
    const duration = 1600; // ms
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      // easeOutCubic for a smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counterElements.forEach(function (el) {
    counterObserver.observe(el);
  });

  /* ----------------------------------------------------------------
     8. FAQ ACCORDION
  ---------------------------------------------------------------- */
  const accordionItems = document.querySelectorAll('.accordion__item');

  accordionItems.forEach(function (item) {
    const trigger = item.querySelector('.accordion__trigger');
    if (!trigger) return;

    trigger.addEventListener('click', function () {
      const isOpen = item.classList.contains('is-open');

      // Close all other items for a clean single-open accordion
      accordionItems.forEach(function (otherItem) {
        otherItem.classList.remove('is-open');
        const otherTrigger = otherItem.querySelector('.accordion__trigger');
        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ----------------------------------------------------------------
     9. CONTACT FORM VALIDATION
  ---------------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  const validators = {
    name: function (value) {
      return value.trim().length >= 2 ? '' : 'Please enter your full name.';
    },
    email: function (value) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(value.trim()) ? '' : 'Please enter a valid email address.';
    },
    phone: function (value) {
      const digits = value.replace(/\D/g, '');
      return digits.length >= 7 ? '' : 'Please enter a valid phone number.';
    },
    company: function (value) {
      return value.trim().length >= 2 ? '' : 'Please enter your company name.';
    },
    message: function (value) {
      return value.trim().length >= 10 ? '' : 'Please tell us a bit more (10+ characters).';
    }
  };

  function setFieldError(fieldName, message) {
    const input = document.getElementById(fieldName);
    const errorEl = document.getElementById(fieldName + 'Error');
    if (!input || !errorEl) return;

    const field = input.closest('.form-field');
    if (message) {
      if (field) field.classList.add('has-error');
      errorEl.textContent = message;
    } else {
      if (field) field.classList.remove('has-error');
      errorEl.textContent = '';
    }
  }

  function validateField(fieldName) {
    const input = document.getElementById(fieldName);
    if (!input || !validators[fieldName]) return true;
    const message = validators[fieldName](input.value);
    setFieldError(fieldName, message);
    return message === '';
  }

  if (contactForm) {
    // Live validation as the user leaves each field
    Object.keys(validators).forEach(function (fieldName) {
      const input = document.getElementById(fieldName);
      if (input) {
        input.addEventListener('blur', function () {
          validateField(fieldName);
        });
        input.addEventListener('input', function () {
          // Clear error as soon as the field becomes valid again
          const field = input.closest('.form-field');
          if (field && field.classList.contains('has-error')) {
            validateField(fieldName);
          }
        });
      }
    });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const fieldNames = Object.keys(validators);
      const results = fieldNames.map(validateField);
      const isFormValid = results.every(Boolean);

      if (!isFormValid) {
        if (formSuccess) {
          formSuccess.style.color = '#EF4444';
          formSuccess.textContent = 'Please correct the highlighted fields.';
        }
        const firstInvalid = contactForm.querySelector('.has-error input, .has-error textarea');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Simulate successful submission (no backend wired up in this build)
      if (formSuccess) {
        formSuccess.style.color = 'var(--color-accent)';
        formSuccess.textContent = 'Thank you! Your message has been sent — we\u2019ll be in touch within one business day.';
      }
      contactForm.reset();
    });
  }

  /* ----------------------------------------------------------------
     10. MISC
  ---------------------------------------------------------------- */
  function initFooterYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }
})();

/* ==========================================================================
   Iris Polymere — Site behaviour
   Mobile nav, mega menu (touch), language switching, form validation,
   certificate modal, scroll-reveal. No external dependencies.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     1. Mobile navigation
     ------------------------------------------------------------------- */
  function initMobileNav() {
    var toggle = document.querySelector("[data-hamburger]");
    var panel = document.querySelector("[data-mobile-nav]");
    if (!toggle || !panel) return;

    toggle.addEventListener("click", function () {
      var isOpen = panel.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    panel.querySelectorAll("[data-submenu-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = document.getElementById(btn.getAttribute("aria-controls"));
        if (!target) return;
        var isOpen = target.classList.toggle("open");
        btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    });

    panel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        panel.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------------------------------------------------------------------
     2. Language switcher (dropdown open/close)
     ------------------------------------------------------------------- */
  function initLangSwitch() {
    var switches = document.querySelectorAll("[data-lang-switch]");
    switches.forEach(function (el) {
      var btn = el.querySelector("[data-lang-btn]");
      if (!btn) return;
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        el.classList.toggle("open");
      });
    });
    document.addEventListener("click", function () {
      switches.forEach(function (el) { el.classList.remove("open"); });
    });
  }

  /* ---------------------------------------------------------------------
     3. i18n engine
     Applies translations from window.IRIS_I18N (per-page dictionary)
     to elements carrying [data-i18n]. Persists choice in localStorage.
     ------------------------------------------------------------------- */
  var LANG_META = {
    en: { dir: "ltr", label: "English", native: "English" },
    fr: { dir: "ltr", label: "French", native: "Français" },
    ar: { dir: "rtl", label: "Arabic", native: "العربية" }
  };

  function getStoredLang() {
    try {
      return localStorage.getItem("iris-lang") || "en";
    } catch (e) {
      return "en";
    }
  }

  function setStoredLang(lang) {
    try { localStorage.setItem("iris-lang", lang); } catch (e) { /* noop */ }
  }

  function applyLanguage(lang) {
    var dict = (window.IRIS_I18N && window.IRIS_I18N[lang]) || {};
    var meta = LANG_META[lang] || LANG_META.en;

    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", meta.dir);
    document.body.classList.toggle("lang-ar", lang === "ar");

    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      var key = node.getAttribute("data-i18n");
      if (Object.prototype.hasOwnProperty.call(dict, key)) {
        node.textContent = dict[key];
      }
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (node) {
      var key = node.getAttribute("data-i18n-html");
      if (Object.prototype.hasOwnProperty.call(dict, key)) {
        node.innerHTML = dict[key];
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (node) {
      var key = node.getAttribute("data-i18n-placeholder");
      if (Object.prototype.hasOwnProperty.call(dict, key)) {
        node.setAttribute("placeholder", dict[key]);
      }
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (node) {
      var key = node.getAttribute("data-i18n-aria-label");
      if (Object.prototype.hasOwnProperty.call(dict, key)) {
        node.setAttribute("aria-label", dict[key]);
      }
    });

    document.querySelectorAll("[data-lang-option]").forEach(function (node) {
      var isCurrent = node.getAttribute("data-lang-option") === lang;
      node.setAttribute("aria-current", isCurrent ? "true" : "false");
    });

    document.querySelectorAll("[data-lang-current-label]").forEach(function (node) {
      node.textContent = lang.toUpperCase();
    });

    setStoredLang(lang);
  }

  function initI18n() {
    document.querySelectorAll("[data-lang-option]").forEach(function (node) {
      node.addEventListener("click", function () {
        var lang = node.getAttribute("data-lang-option");
        applyLanguage(lang);
        document.querySelectorAll("[data-lang-switch].open").forEach(function (el) {
          el.classList.remove("open");
        });
      });
    });
    applyLanguage(getStoredLang());
  }

  /* ---------------------------------------------------------------------
     4. Certificate modal
     ------------------------------------------------------------------- */
  function initCertModal() {
    var overlay = document.querySelector("[data-cert-modal]");
    if (!overlay) return;
    var openers = document.querySelectorAll("[data-cert-open]");
    var closers = overlay.querySelectorAll("[data-cert-close]");

    openers.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var name = btn.getAttribute("data-cert-open");
        var nameEl = overlay.querySelector("[data-cert-name]");
        if (nameEl) nameEl.textContent = name;
        overlay.classList.add("open");
      });
    });
    closers.forEach(function (btn) {
      btn.addEventListener("click", function () { overlay.classList.remove("open"); });
    });
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) overlay.classList.remove("open");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") overlay.classList.remove("open");
    });
  }

  /* ---------------------------------------------------------------------
     5. Form validation (contact / quote) — no backend, client-side only
     ------------------------------------------------------------------- */
  function validateField(field) {
    var input = field.querySelector("input, select, textarea");
    if (!input) return true;
    var valid = true;

    if (input.hasAttribute("required")) {
      if (input.type === "checkbox") {
        valid = input.checked;
      } else {
        valid = input.value.trim().length > 0;
      }
    }
    if (valid && input.type === "email" && input.value.trim().length > 0) {
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
    }
    if (valid && input.hasAttribute("pattern") && input.value.trim().length > 0) {
      var re = new RegExp("^(?:" + input.getAttribute("pattern") + ")$");
      valid = re.test(input.value.trim());
    }

    field.classList.toggle("has-error", !valid);
    return valid;
  }

  function initForms() {
    document.querySelectorAll("[data-validate-form]").forEach(function (form) {
      var fields = form.querySelectorAll(".field");
      var success = form.parentElement.querySelector("[data-form-success]") ||
        form.querySelector("[data-form-success]");

      fields.forEach(function (field) {
        var input = field.querySelector("input, select, textarea");
        if (!input) return;
        input.addEventListener("blur", function () { validateField(field); });
        input.addEventListener("input", function () {
          if (field.classList.contains("has-error")) validateField(field);
        });
      });

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var allValid = true;
        fields.forEach(function (field) {
          if (!validateField(field)) allValid = false;
        });
        if (!allValid) {
          var firstError = form.querySelector(".field.has-error input, .field.has-error select, .field.has-error textarea");
          if (firstError) firstError.focus();
          return;
        }
        form.reset();
        form.style.display = "none";
        if (success) success.classList.add("visible");
      });
    });
  }

  /* ---------------------------------------------------------------------
     6. Scroll reveal (subtle, respects reduced motion via CSS)
     ------------------------------------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in-view"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------------------------------------------------------------
     7. Product variant switcher (masterbatch white/black variants)
     ------------------------------------------------------------------- */
  function initVariantSwitch() {
    document.querySelectorAll("[data-variant-group]").forEach(function (group) {
      var pills = group.querySelectorAll("[data-variant-target]");
      pills.forEach(function (pill) {
        pill.addEventListener("click", function () {
          var targetSel = pill.getAttribute("data-variant-target");
          pills.forEach(function (p) { p.setAttribute("aria-current", "false"); });
          pill.setAttribute("aria-current", "true");
          document.querySelectorAll("[data-variant-panel]").forEach(function (panel) {
            panel.hidden = panel.getAttribute("data-variant-panel") !== targetSel;
          });
        });
      });
    });
  }

  /* ---------------------------------------------------------------------
     Init
     ------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    initMobileNav();
    initLangSwitch();
    initI18n();
    initCertModal();
    initForms();
    initReveal();
    initVariantSwitch();
  });
})();

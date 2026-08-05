/* ==========================================================================
   Iris Polymere — Minimal Industrial Editorial concept
   Additive translation keys only. Does not modify dictionary.js or
   products.js — merges a small set of new keys required by the new page
   layout (processing notes panel, skip link) into window.IRIS_I18N.
   ========================================================================== */
(function () {
  var extra = {
    en: {
      "a11y.skipToContent": "Skip to content",
      "label.processingNotes": "Processing Notes",
      "label.processingNotesText": "Processing notes will be added after client approval, covering recommended parameters and handling guidance for this compound."
    },
    fr: {
      "a11y.skipToContent": "Aller au contenu",
      "label.processingNotes": "Notes de Transformation",
      "label.processingNotesText": "Les notes de transformation seront ajoutées après validation du client, couvrant les paramètres recommandés et les conseils de manipulation pour ce compound."
    },
    ar: {
      "a11y.skipToContent": "الانتقال إلى المحتوى",
      "label.processingNotes": "ملاحظات المعالجة",
      "label.processingNotesText": "ستُضاف ملاحظات المعالجة بعد موافقة العميل، وتغطي المعايير الموصى بها وإرشادات التعامل مع هذا المركّب."
    }
  };
  window.IRIS_I18N = window.IRIS_I18N || { en: {}, fr: {}, ar: {} };
  ["en", "fr", "ar"].forEach(function (lang) {
    for (var key in extra[lang]) {
      window.IRIS_I18N[lang][key] = extra[lang][key];
    }
  });
})();

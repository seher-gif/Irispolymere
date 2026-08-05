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
      "label.processingNotesText": "Processing notes will be added after client approval, covering recommended parameters and handling guidance for this compound.",

      "nav.blog": "Blog",
      "footer.blog": "Blog",
      "blog.hero.eyebrow": "Insights & Updates",
      "blog.hero.title": "Blog",
      "blog.hero.lead": "Perspectives on compound engineering, production practices and export-oriented manufacturing from the Iris Polymere technical team.",
      "blog.comingSoon": "Coming Soon",
      "blog.backToBlog": "Back to Blog",
      "blog.readTime": "6 min read",
      "blog.relatedTitle": "More on the Blog",

      "blog.article1.category": "PVC",
      "blog.article1.date": "June 2026",
      "blog.article1.title": "Choosing the Right PVC Compound for Cable Production",
      "blog.article1.excerpt": "A practical overview of how rigid, flexible and cable-grade PVC formulations are selected for different extrusion and cable production requirements.",
      "blog.article1.body.intro": "Selecting a PVC compound is rarely a single decision — it is a balance between processing behaviour, mechanical performance and the realities of a specific production line. For cable manufacturers in particular, small formulation differences can have a large impact on extrusion speed, surface quality and long-term cable performance.",
      "blog.article1.body.h1": "Start With the Application, Not the Material",
      "blog.article1.body.p1": "It is tempting to select a compound based on a general category — rigid, flexible or cable-grade — but the more useful starting point is the application itself. A pipe manufacturer, a profile extruder and a cable producer are solving different problems, even when all three use PVC as a base polymer.",
      "blog.article1.body.p2": "Cable-grade compounds, for example, are formulated around a different set of priorities than rigid profile compounds: consistent electrical performance, controlled hardness and flexibility, and stable behaviour across long, continuous extrusion runs.",
      "blog.article1.body.h2": "Key Selection Factors",
      "blog.article1.body.list1": "Target hardness and flexibility for the finished part",
      "blog.article1.body.list2": "Processing method and line speed",
      "blog.article1.body.list3": "Electrical or mechanical performance requirements",
      "blog.article1.body.list4": "Surface finish and dimensional stability expectations",
      "blog.article1.body.quote": "Consistency across batches often matters as much as the initial specification — a compound that performs well once but drifts over time creates more cost than it saves.",
      "blog.article1.body.p3": "This is why Iris Polymere works formulation-first with customers: understanding the processing line and end-use before finalising a compound, rather than fitting an application to an existing generic recipe.",
      "blog.article1.body.h3": "Key Takeaways",
      "blog.article1.body.takeaway1": "Match the compound to the application, not just the material family",
      "blog.article1.body.takeaway2": "Prioritise batch-to-batch consistency alongside initial performance",
      "blog.article1.body.takeaway3": "Involve your compound supplier early in the processing conversation",
      "blog.article1.body.takeaway4": "Review technical data against your specific line conditions, not general averages",
      "blog.article1.body.closing": "For a closer look at our PVC range, or to discuss a specific production requirement, our technical team is available to walk through formulation options in detail.",

      "blog.article2.category": "HFFR",
      "blog.article2.date": "Coming Soon",
      "blog.article2.title": "Understanding HFFR Compounds and CPR Compliance",
      "blog.article2.excerpt": "What halogen-free flame-retardant formulation means in practice, and how CPR-related requirements shape cable compound development.",

      "blog.article3.category": "Masterbatch",
      "blog.article3.date": "Coming Soon",
      "blog.article3.title": "Masterbatch Dosage: Getting Consistent Color at Scale",
      "blog.article3.excerpt": "Why dispersion and dosage control matter more than pigment concentration alone when scaling plastic production.",

      "blog.article4.category": "Export",
      "blog.article4.date": "Coming Soon",
      "blog.article4.title": "Export-Ready Manufacturing: What North African and Middle Eastern Buyers Look For",
      "blog.article4.excerpt": "A look at the technical documentation, consistency and support expectations that shape regional and export B2B purchasing decisions."
    },
    fr: {
      "a11y.skipToContent": "Aller au contenu",
      "label.processingNotes": "Notes de Transformation",
      "label.processingNotesText": "Les notes de transformation seront ajoutées après validation du client, couvrant les paramètres recommandés et les conseils de manipulation pour ce compound.",

      "nav.blog": "Blog",
      "footer.blog": "Blog",
      "blog.hero.eyebrow": "Actualités & Analyses",
      "blog.hero.title": "Blog",
      "blog.hero.lead": "Perspectives de l'équipe technique d'Iris Polymere sur la formulation des compounds, les pratiques de production et la fabrication orientée export.",
      "blog.comingSoon": "Bientôt Disponible",
      "blog.backToBlog": "Retour au Blog",
      "blog.readTime": "6 min de lecture",
      "blog.relatedTitle": "Plus d'articles",

      "blog.article1.category": "PVC",
      "blog.article1.date": "Juin 2026",
      "blog.article1.title": "Choisir le Bon Compound PVC pour la Production de Câbles",
      "blog.article1.excerpt": "Un aperçu pratique de la sélection des formulations PVC rigides, souples et pour câbles selon les besoins d'extrusion et de production.",
      "blog.article1.body.intro": "Choisir un compound PVC est rarement une décision unique — c'est un équilibre entre comportement de transformation, performance mécanique et réalités d'une ligne de production spécifique. Pour les fabricants de câbles en particulier, de petites différences de formulation peuvent avoir un impact important sur la vitesse d'extrusion, la qualité de surface et la performance du câble à long terme.",
      "blog.article1.body.h1": "Partir de l'Application, Pas du Matériau",
      "blog.article1.body.p1": "Il est tentant de choisir un compound selon une catégorie générale — rigide, souple ou pour câble — mais le point de départ le plus utile est l'application elle-même. Un fabricant de tubes, un extrudeur de profilés et un producteur de câbles résolvent des problèmes différents, même lorsque les trois utilisent le PVC comme polymère de base.",
      "blog.article1.body.p2": "Les compounds pour câbles, par exemple, sont formulés autour de priorités différentes de celles des compounds pour profilés rigides : performance électrique constante, dureté et flexibilité maîtrisées, et comportement stable sur de longues séries d'extrusion continue.",
      "blog.article1.body.h2": "Facteurs de Sélection Clés",
      "blog.article1.body.list1": "Dureté et flexibilité cibles pour la pièce finie",
      "blog.article1.body.list2": "Méthode de transformation et vitesse de ligne",
      "blog.article1.body.list3": "Exigences de performance électrique ou mécanique",
      "blog.article1.body.list4": "Attentes en matière d'aspect de surface et de stabilité dimensionnelle",
      "blog.article1.body.quote": "La constance d'un lot à l'autre compte souvent autant que la spécification initiale — un compound performant une fois mais qui dérive dans le temps coûte plus qu'il n'économise.",
      "blog.article1.body.p3": "C'est pourquoi Iris Polymere travaille d'abord sur la formulation avec ses clients : comprendre la ligne de transformation et l'usage final avant de finaliser un compound, plutôt que d'adapter une application à une recette générique existante.",
      "blog.article1.body.h3": "Points Clés à Retenir",
      "blog.article1.body.takeaway1": "Adapter le compound à l'application, pas seulement à la famille de matériau",
      "blog.article1.body.takeaway2": "Prioriser la constance d'un lot à l'autre autant que la performance initiale",
      "blog.article1.body.takeaway3": "Impliquer votre fournisseur de compound tôt dans la discussion sur la transformation",
      "blog.article1.body.takeaway4": "Comparer les données techniques aux conditions réelles de votre ligne, pas à des moyennes générales",
      "blog.article1.body.closing": "Pour en savoir plus sur notre gamme PVC, ou pour discuter d'un besoin de production spécifique, notre équipe technique est disponible pour détailler les options de formulation.",

      "blog.article2.category": "HFFR",
      "blog.article2.date": "Bientôt Disponible",
      "blog.article2.title": "Comprendre les Compounds HFFR et la Conformité CPR",
      "blog.article2.excerpt": "Ce que signifie concrètement une formulation ignifuge sans halogène, et comment les exigences liées au CPR façonnent le développement des compounds câbles.",

      "blog.article3.category": "Masterbatch",
      "blog.article3.date": "Bientôt Disponible",
      "blog.article3.title": "Dosage du Masterbatch : Obtenir une Couleur Constante à Grande Échelle",
      "blog.article3.excerpt": "Pourquoi la dispersion et le contrôle du dosage comptent plus que la seule concentration de pigment lors du passage à l'échelle industrielle.",

      "blog.article4.category": "Export",
      "blog.article4.date": "Bientôt Disponible",
      "blog.article4.title": "Fabrication Prête à l'Export : Ce que Recherchent les Acheteurs d'Afrique du Nord et du Moyen-Orient",
      "blog.article4.excerpt": "Un aperçu de la documentation technique, de la constance et du support attendus dans les décisions d'achat B2B régionales et export."
    },
    ar: {
      "a11y.skipToContent": "الانتقال إلى المحتوى",
      "label.processingNotes": "ملاحظات المعالجة",
      "label.processingNotesText": "ستُضاف ملاحظات المعالجة بعد موافقة العميل، وتغطي المعايير الموصى بها وإرشادات التعامل مع هذا المركّب.",

      "nav.blog": "المدونة",
      "footer.blog": "المدونة",
      "blog.hero.eyebrow": "رؤى وتحديثات",
      "blog.hero.title": "المدونة",
      "blog.hero.lead": "أفكار من فريق Iris Polymere التقني حول هندسة المركّبات، ممارسات الإنتاج، والتصنيع الموجّه نحو التصدير.",
      "blog.comingSoon": "قريباً",
      "blog.backToBlog": "العودة إلى المدونة",
      "blog.readTime": "٦ دقائق قراءة",
      "blog.relatedTitle": "المزيد من المقالات",

      "blog.article1.category": "PVC",
      "blog.article1.date": "يونيو ٢٠٢٦",
      "blog.article1.title": "اختيار مركّب PVC المناسب لإنتاج الكابلات",
      "blog.article1.excerpt": "نظرة عملية على كيفية اختيار تركيبات PVC الصلبة والمرنة ومركّبات الكابلات وفقًا لمتطلبات البثق والإنتاج المختلفة.",
      "blog.article1.body.intro": "اختيار مركّب PVC نادرًا ما يكون قرارًا واحدًا — بل هو توازن بين سلوك التصنيع والأداء الميكانيكي وواقع خط إنتاج محدد. بالنسبة لمصنّعي الكابلات على وجه الخصوص، يمكن أن يكون لفروقات صغيرة في التركيبة تأثير كبير على سرعة البثق وجودة السطح وأداء الكابل على المدى الطويل.",
      "blog.article1.body.h1": "ابدأ من التطبيق، لا من المادة",
      "blog.article1.body.p1": "من المغري اختيار مركّب بناءً على فئة عامة — صلب أو مرن أو مخصص للكابلات — لكن نقطة الانطلاق الأكثر فائدة هي التطبيق نفسه. فمصنّع الأنابيب ومُبثّق البروفيلات ومنتج الكابلات يحلّون مشكلات مختلفة، حتى عندما يستخدم الثلاثة PVC كبوليمر أساسي.",
      "blog.article1.body.p2": "تُصمَّم مركّبات الكابلات، على سبيل المثال، وفق أولويات مختلفة عن مركّبات البروفيلات الصلبة: أداء كهربائي متسق، صلابة ومرونة مضبوطة، وسلوك مستقر عبر عمليات بثق مستمرة وطويلة.",
      "blog.article1.body.h2": "عوامل الاختيار الرئيسية",
      "blog.article1.body.list1": "الصلابة والمرونة المستهدفة للقطعة النهائية",
      "blog.article1.body.list2": "طريقة التصنيع وسرعة الخط",
      "blog.article1.body.list3": "متطلبات الأداء الكهربائي أو الميكانيكي",
      "blog.article1.body.list4": "توقعات مظهر السطح والثبات الأبعادي",
      "blog.article1.body.quote": "غالبًا ما يكون الاتساق بين الدفعات مهمًا بقدر أهمية المواصفات الأولية — فالمركّب الذي يؤدي جيدًا مرة واحدة لكنه يتغير مع الوقت يكلّف أكثر مما يوفّر.",
      "blog.article1.body.p3": "لهذا السبب تعمل Iris Polymere مع عملائها بدءًا من التركيبة: فهم خط التصنيع والاستخدام النهائي قبل وضع الصيغة النهائية للمركّب، بدلاً من تكييف تطبيق مع وصفة عامة جاهزة.",
      "blog.article1.body.h3": "أهم النقاط",
      "blog.article1.body.takeaway1": "طابق المركّب مع التطبيق، وليس فقط مع عائلة المادة",
      "blog.article1.body.takeaway2": "امنح الأولوية للاتساق بين الدفعات إلى جانب الأداء الأولي",
      "blog.article1.body.takeaway3": "أشرك مورّد المركّبات الخاص بك مبكرًا في نقاش التصنيع",
      "blog.article1.body.takeaway4": "راجع البيانات التقنية مقارنة بظروف خطك الفعلية، لا بمتوسطات عامة",
      "blog.article1.body.closing": "للاطلاع عن قرب على مجموعة PVC لدينا، أو لمناقشة متطلب إنتاج محدد، فريقنا التقني متاح لشرح خيارات التركيبة بالتفصيل.",

      "blog.article2.category": "HFFR",
      "blog.article2.date": "قريباً",
      "blog.article2.title": "فهم مركّبات HFFR ومتطلبات لائحة CPR",
      "blog.article2.excerpt": "ماذا تعني التركيبة المثبطة للهب الخالية من الهالوجين عمليًا، وكيف تشكّل متطلبات CPR تطوير مركّبات الكابلات.",

      "blog.article3.category": "Masterbatch",
      "blog.article3.date": "قريباً",
      "blog.article3.title": "جرعة الماستربتش: تحقيق لون متسق على نطاق واسع",
      "blog.article3.excerpt": "لماذا يهم التشتّت والتحكم في الجرعة أكثر من تركيز الصبغة وحده عند التوسع في الإنتاج البلاستيكي.",

      "blog.article4.category": "التصدير",
      "blog.article4.date": "قريباً",
      "blog.article4.title": "تصنيع جاهز للتصدير: ماذا يبحث عنه المشترون في شمال أفريقيا والشرق الأوسط",
      "blog.article4.excerpt": "نظرة على التوثيق التقني والاتساق والدعم المتوقع الذي يشكّل قرارات الشراء الإقليمية والتصديرية بين الشركات."
    }
  };
  window.IRIS_I18N = window.IRIS_I18N || { en: {}, fr: {}, ar: {} };
  ["en", "fr", "ar"].forEach(function (lang) {
    for (var key in extra[lang]) {
      window.IRIS_I18N[lang][key] = extra[lang][key];
    }
  });
})();

/* ==========================================================================
   Iris Polymere — Technical Factory Grid concept
   Additive translation keys only. Does not modify dictionary.js,
   dictionary-extra.js or products.js — merges the small set of new keys
   required by this concept's layout (utility bar, factory hero, product
   systems, material/process flow, regional supply, technical data table,
   corporate section eyebrows) into window.IRIS_I18N.
   ========================================================================== */
(function () {
  var extra = {
    en: {
      "utility.tagline": "Compound & Masterbatch Solutions",
      "utility.region": "Algeria · North Africa · Middle East",

      "tech.hero.eyebrow": "Industrial Compound Manufacturing",
      "tech.hero.title": "Industrial Compounds Built for Consistent Production",
      "tech.hero.lead": "Iris Polymere supplies PVC, HFFR, masterbatch, and filler compound solutions developed for cable, plastics, extrusion, and industrial manufacturing processes.",

      "btn.viewProductRange": "View Product Range",
      "btn.requestTechnicalInfo": "Request Technical Information",

      "label.productFamily": "Product Family",
      "label.corporate": "Corporate",

      "systems.eyebrow": "01 / Product Systems",
      "systems.title": "A Structured Compound Portfolio",
      "systems.lead": "Three technical product groups, engineered for consistent processing and predictable output across manufacturing lines.",
      "systems.pvc.code": "01 / PVC",
      "systems.hffr.code": "02 / HFFR",
      "systems.mb.code": "03 / MASTERBATCH",
      "systems.viewFamily": "View Product Family",

      "benefits.eyebrow2": "02 / Performance Benefits",
      "applications.eyebrow2": "03 / Manufacturing Applications",

      "process.eyebrow": "04 / Material & Process",
      "process.title": "From Material Selection to Final Application",
      "process.lead": "Consistent production output depends on the chain between material selection, formulation, processing stability, and the performance of the finished application.",
      "process.step1.title": "Material Selection",
      "process.step1.text": "Raw material and additive selection matched to the target application requirements.",
      "process.step2.title": "Formulation",
      "process.step2.text": "Compound formulation developed for the intended processing method and end use.",
      "process.step3.title": "Processing",
      "process.step3.text": "Stable extrusion, injection, or molding behavior on standard industrial equipment.",
      "process.step4.title": "Final Application",
      "process.step4.text": "Consistent output supporting the performance of the finished product.",

      "compliance.eyebrow": "05 / Quality & Compliance",
      "compliance.note": "Detailed technical and compliance documentation can be requested directly from the Iris Polymere technical team.",

      "region.eyebrow": "06 / Regional Supply Focus",
      "region.title": "Supporting Manufacturers Across the Region",
      "region.lead": "Supporting manufacturers across regional and export-focused markets.",
      "region.algeria.title": "Algeria",
      "region.algeria.text": "Primary market focus for compound and masterbatch supply.",
      "region.northafrica.title": "North Africa",
      "region.northafrica.text": "Supporting manufacturers across the broader North African region.",
      "region.middleeast.title": "Middle East",
      "region.middleeast.text": "Technical compound solutions for Middle East manufacturing partners.",
      "region.export.title": "Export Markets",
      "region.export.text": "Export-oriented supply for qualified international partners.",

      "label.technicalData.property": "Property",
      "label.technicalData.unit": "Unit",
      "label.technicalData.typicalValue": "Typical Value",
      "label.technicalData.testMethod": "Test Method",
      "label.technicalData.tbc": "To be confirmed",
      "label.technicalData.caption": "Technical Data — values pending client confirmation",
      "label.materialCompatibility": "Material Compatibility",
      "label.materialCompatibilityText": "Material compatibility details will be added after client confirmation.",
      "label.availableVariants": "Available Variants",
      "label.keyBenefits": "Key Benefits",
      "label.typicalApplications": "Typical Applications",
      "label.technicalValuesPending": "Technical values will be added after client confirmation.",

      "quality.hero.eyebrow": "Corporate / Quality Policy",
      "sustain.hero.eyebrow": "Corporate / Sustainability",
      "vision.hero.eyebrow": "Corporate / Vision & Mission",
      "production.hero.eyebrow": "Corporate / Production & Technology",

      "cable.disclaimer": "Iris Polymere supplies compound solutions for cable manufacturers and does not manufacture finished cables.",

      "nav.blog": "Blog",
      "blog.hero.eyebrow": "Technical Insights",
      "blog.hero.title": "Blog & Technical Insights",
      "blog.hero.lead": "Practical articles on compound selection, processing, and industrial manufacturing from the Iris Polymere technical team.",
      "blog.readArticle": "Read Article",
      "blog.relatedArticles": "Related Articles",
      "blog.backToBlog": "Back to Blog",
      "blog.publishedOn": "Published",
      "blog.cat.process": "Material & Process",
      "blog.cat.quality": "Quality & Compliance",
      "blog.cat.regional": "Regional Supply",

      "blog.pvc-rigid-vs-flexible.title": "Choosing Between Rigid and Flexible PVC Compounds",
      "blog.pvc-rigid-vs-flexible.excerpt": "Rigid and flexible PVC compounds serve different production needs. Here is how processors typically evaluate which formulation fits their application.",
      "blog.pvc-rigid-vs-flexible.body1": "PVC compounds are broadly grouped into rigid and flexible formulations, and the right choice depends on the mechanical, thermal, and processing requirements of the finished part. Rigid PVC is generally selected for profiles, pipes, and fittings where dimensional stability and mechanical strength are priorities, while flexible PVC is formulated for hoses, seals, gaskets, and cable-related components that require controlled flexibility.",
      "blog.pvc-rigid-vs-flexible.body2": "Processors typically weigh factors such as target hardness, impact resistance, surface finish, and compatibility with their extrusion or injection equipment before selecting a compound. Flexible formulations introduce plasticizers and stabilizers that change processing behavior compared to rigid grades, so consistent dosing and mixing discipline become more important as flexibility increases.",
      "blog.pvc-rigid-vs-flexible.body3": "Because every production line has different tooling, temperature profiles, and output targets, compound selection is rarely a one-size-fits-all decision. Working with a compound partner who can adjust formulation details to a specific processing line — rather than offering a single fixed grade — helps manufacturers maintain consistent output as conditions change.",

      "blog.hffr-cable-compounds-explained.title": "Understanding HFFR Compounds for Cable Manufacturing",
      "blog.hffr-cable-compounds-explained.excerpt": "Halogen-free flame-retardant compounds are formulated around a balance of processability, mechanical performance, and fire behavior. Here is what that balance involves.",
      "blog.hffr-cable-compounds-explained.body1": "HFFR (Halogen-Free Flame-Retardant) compounds are developed for cable manufacturers who need flame-retardant performance without halogenated additives. The formulation challenge is balancing three factors at once: how the compound processes on extrusion lines, how it performs mechanically once installed, and how it behaves under fire-related test conditions.",
      "blog.hffr-cable-compounds-explained.body2": "Because these three factors can pull formulation decisions in different directions, HFFR compounds are typically developed and adjusted around the specific cable construction and application — insulation, sheathing, bedding, or filler layers each place different demands on the material. This is one reason cable compound suppliers usually work application-by-application rather than offering a single universal grade.",
      "blog.hffr-cable-compounds-explained.body3": "It is worth noting that a compound supplier develops and supplies the material — final cable compliance always depends on the complete cable design, the manufacturing process, and independent testing of the finished cable. Iris Polymere supplies HFFR compound solutions for cable manufacturers and does not manufacture finished cables.",

      "blog.masterbatch-dosage-consistency.title": "How Masterbatch Dosage Affects Production Consistency",
      "blog.masterbatch-dosage-consistency.excerpt": "Getting masterbatch dosage right is less about the pigment itself and more about repeatable, controlled addition across a production run.",
      "blog.masterbatch-dosage-consistency.body1": "Masterbatch is designed to be added to a base polymer at a defined ratio, and small variations in that ratio can visibly affect color consistency, opacity, or mechanical properties from batch to batch. Dosage accuracy depends on factors such as carrier resin compatibility, pigment concentration, and how well the dosing equipment is calibrated for the specific masterbatch being used.",
      "blog.masterbatch-dosage-consistency.body2": "White and black masterbatches illustrate this well: white masterbatch is typically offered at different TiO2 concentrations (for example 50% or 70%) specifically so processors can select a dosage that matches their cost and opacity targets, while black masterbatch formulations are adjusted depending on whether UV resistance or surface gloss is the priority for the finished part.",
      "blog.masterbatch-dosage-consistency.body3": "Consistent dosing is ultimately a combination of a well-formulated masterbatch, compatible carrier resin, and disciplined process control on the production line. Reviewing dosage settings whenever base resin, machinery, or target color changes helps maintain consistent results.",

      "blog.material-selection-process-stability.title": "Material Selection and Process Stability: What Manufacturers Should Know",
      "blog.material-selection-process-stability.excerpt": "Consistent output starts before the material reaches the machine — with how it was selected and formulated in the first place.",
      "blog.material-selection-process-stability.body1": "Production consistency is often treated as a processing-floor issue, but much of it is determined earlier, at the material selection and formulation stage. Choosing a compound that is appropriately matched to the target application — and not just to a general product category — reduces the number of adjustments needed once the material reaches the extruder, injection molder, or other processing equipment.",
      "blog.material-selection-process-stability.body2": "The relationship generally follows four stages: material selection based on application requirements, formulation of the compound to match the intended processing method, processing itself under stable and repeatable conditions, and the performance of the finished application. A weak link at any one stage tends to surface as inconsistency further down the line.",
      "blog.material-selection-process-stability.body3": "For manufacturers, this means production stability is not only about equipment settings — it also depends on working with a compound supplier that understands the intended processing method and application from the outset, rather than treating formulation and processing as separate, unrelated steps.",

      "blog.quality-compliance-iso-reach-rohs.title": "Quality and Compliance: What ISO 9001, REACH and RoHS Mean for Compound Buyers",
      "blog.quality-compliance-iso-reach-rohs.excerpt": "These three reference standards come up often in compound sourcing conversations. Here is a plain-language look at what each one covers.",
      "blog.quality-compliance-iso-reach-rohs.body1": "ISO 9001 is a quality management system standard — it relates to how a company organizes and controls its processes, not to a specific product's physical properties. When a compound supplier references ISO 9001, it is describing the discipline behind its production and quality processes, rather than a claim about the material itself.",
      "blog.quality-compliance-iso-reach-rohs.body2": "REACH is a European Union regulation concerning the registration and safe use of chemical substances, while RoHS restricts the use of certain hazardous substances in specific product categories, historically electrical and electronic equipment. Both are regulatory frameworks that compound formulations may need to align with, depending on where and how the finished product will be used.",
      "blog.quality-compliance-iso-reach-rohs.body3": "Because compliance requirements vary by market, application, and finished product, buyers should always request the specific documentation relevant to their use case rather than relying on general statements. Iris Polymere can provide detailed technical and compliance documentation on request for the applicable product range.",

      "blog.regional-supply-north-africa-middle-east.title": "Supporting Regional Manufacturing Across North Africa and the Middle East",
      "blog.regional-supply-north-africa-middle-east.excerpt": "Compound and masterbatch supply for manufacturers in Algeria, North Africa, and the Middle East involves more than logistics — it starts with understanding regional production conditions.",
      "blog.regional-supply-north-africa-middle-east.body1": "Manufacturers across Algeria, North Africa, and the Middle East operate a wide range of processing equipment, production scales, and application requirements. Supporting this region effectively means offering compound and masterbatch solutions that can be adapted to different production environments rather than a single fixed specification.",
      "blog.regional-supply-north-africa-middle-east.body2": "Proximity also matters for practical reasons: shorter lead times, more responsive technical support, and formulation adjustments that reflect regional climate and storage conditions all contribute to smoother production for manufacturers working with PVC, HFFR, and masterbatch compounds in cable, plastics, and extrusion applications.",
      "blog.regional-supply-north-africa-middle-east.body3": "Iris Polymere positions its compound and masterbatch range around this regional focus, supporting manufacturers across Algeria, North Africa, the Middle East, and export-focused markets with formulations developed for their specific production requirements."
    },
    fr: {
      "utility.tagline": "Solutions de Compounds et Masterbatch",
      "utility.region": "Algérie · Afrique du Nord · Moyen-Orient",

      "tech.hero.eyebrow": "Fabrication Industrielle de Compounds",
      "tech.hero.title": "Des Compounds Industriels Conçus pour une Production Constante",
      "tech.hero.lead": "Iris Polymere fournit des solutions de compounds PVC, HFFR, masterbatch et de charge développées pour les câbles, la plasturgie, l'extrusion et les procédés de fabrication industrielle.",

      "btn.viewProductRange": "Voir la Gamme de Produits",
      "btn.requestTechnicalInfo": "Demander une Information Technique",

      "label.productFamily": "Famille de Produits",
      "label.corporate": "Corporate",

      "systems.eyebrow": "01 / Systèmes de Produits",
      "systems.title": "Un Portefeuille de Compounds Structuré",
      "systems.lead": "Trois familles techniques de produits, conçues pour une transformation constante et un résultat prévisible sur les lignes de fabrication.",
      "systems.pvc.code": "01 / PVC",
      "systems.hffr.code": "02 / HFFR",
      "systems.mb.code": "03 / MASTERBATCH",
      "systems.viewFamily": "Voir la Famille de Produits",

      "benefits.eyebrow2": "02 / Avantages de Performance",
      "applications.eyebrow2": "03 / Applications de Fabrication",

      "process.eyebrow": "04 / Matériau & Procédé",
      "process.title": "De la Sélection du Matériau à l'Application Finale",
      "process.lead": "Un résultat de production constant dépend de la chaîne reliant la sélection du matériau, la formulation, la stabilité de transformation et la performance de l'application finale.",
      "process.step1.title": "Sélection du Matériau",
      "process.step1.text": "Sélection des matières premières et additifs adaptée aux exigences de l'application visée.",
      "process.step2.title": "Formulation",
      "process.step2.text": "Formulation du compound développée pour la méthode de transformation prévue et l'usage final.",
      "process.step3.title": "Transformation",
      "process.step3.text": "Comportement stable en extrusion, injection ou moulage sur équipement industriel standard.",
      "process.step4.title": "Application Finale",
      "process.step4.text": "Résultat constant soutenant la performance du produit fini.",

      "compliance.eyebrow": "05 / Qualité & Conformité",
      "compliance.note": "Une documentation technique et de conformité détaillée peut être demandée directement auprès de l'équipe technique d'Iris Polymere.",

      "region.eyebrow": "06 / Zone de Couverture Régionale",
      "region.title": "Au Service des Fabricants de la Région",
      "region.lead": "Au service des fabricants sur les marchés régionaux et à l'export.",
      "region.algeria.title": "Algérie",
      "region.algeria.text": "Marché prioritaire pour l'approvisionnement en compounds et masterbatch.",
      "region.northafrica.title": "Afrique du Nord",
      "region.northafrica.text": "Au service des fabricants dans l'ensemble de la région nord-africaine.",
      "region.middleeast.title": "Moyen-Orient",
      "region.middleeast.text": "Solutions de compounds techniques pour les partenaires industriels du Moyen-Orient.",
      "region.export.title": "Marchés Export",
      "region.export.text": "Approvisionnement orienté export pour les partenaires internationaux qualifiés.",

      "label.technicalData.property": "Propriété",
      "label.technicalData.unit": "Unité",
      "label.technicalData.typicalValue": "Valeur Typique",
      "label.technicalData.testMethod": "Méthode d'Essai",
      "label.technicalData.tbc": "À confirmer",
      "label.technicalData.caption": "Données Techniques — valeurs en attente de confirmation client",
      "label.materialCompatibility": "Compatibilité des Matériaux",
      "label.materialCompatibilityText": "Les détails de compatibilité des matériaux seront ajoutés après confirmation du client.",
      "label.availableVariants": "Variantes Disponibles",
      "label.keyBenefits": "Avantages Clés",
      "label.typicalApplications": "Applications Typiques",
      "label.technicalValuesPending": "Les valeurs techniques seront ajoutées après confirmation du client.",

      "quality.hero.eyebrow": "Corporate / Politique Qualité",
      "sustain.hero.eyebrow": "Corporate / Développement Durable",
      "vision.hero.eyebrow": "Corporate / Vision & Mission",
      "production.hero.eyebrow": "Corporate / Production & Technologie",

      "cable.disclaimer": "Iris Polymere fournit des solutions de compounds aux fabricants de câbles et ne fabrique pas de câbles finis.",

      "nav.blog": "Blog",
      "blog.hero.eyebrow": "Analyses Techniques",
      "blog.hero.title": "Blog et Analyses Techniques",
      "blog.hero.lead": "Des articles pratiques sur le choix des compounds, la transformation et la fabrication industrielle, rédigés par l'équipe technique d'Iris Polymere.",
      "blog.readArticle": "Lire l'Article",
      "blog.relatedArticles": "Articles Connexes",
      "blog.backToBlog": "Retour au Blog",
      "blog.publishedOn": "Publié le",
      "blog.cat.process": "Matériau & Procédé",
      "blog.cat.quality": "Qualité & Conformité",
      "blog.cat.regional": "Couverture Régionale",

      "blog.pvc-rigid-vs-flexible.title": "Compound PVC Rigide ou Flexible : Comment Choisir",
      "blog.pvc-rigid-vs-flexible.excerpt": "Les compounds PVC rigides et flexibles répondent à des besoins de production différents. Voici comment les transformateurs évaluent généralement la formulation adaptée à leur application.",
      "blog.pvc-rigid-vs-flexible.body1": "Les compounds PVC se répartissent globalement en formulations rigides et flexibles, et le bon choix dépend des exigences mécaniques, thermiques et de transformation de la pièce finale. Le PVC rigide est généralement retenu pour les profilés, tubes et raccords où la stabilité dimensionnelle et la résistance mécanique sont prioritaires, tandis que le PVC flexible est formulé pour les tuyaux, joints, garnitures et composants liés aux câbles nécessitant une flexibilité maîtrisée.",
      "blog.pvc-rigid-vs-flexible.body2": "Les transformateurs évaluent généralement des facteurs tels que la dureté cible, la résistance aux chocs, l'aspect de surface et la compatibilité avec leur équipement d'extrusion ou d'injection avant de choisir un compound. Les formulations flexibles intègrent des plastifiants et des stabilisants qui modifient le comportement de transformation par rapport aux qualités rigides, rendant le dosage et le mélange constants d'autant plus importants que la flexibilité augmente.",
      "blog.pvc-rigid-vs-flexible.body3": "Chaque ligne de production ayant son outillage, ses profils de température et ses objectifs de rendement propres, le choix du compound est rarement une décision universelle. Travailler avec un partenaire compound capable d'ajuster les détails de formulation à une ligne de transformation spécifique — plutôt que de proposer une seule qualité fixe — aide les fabricants à maintenir un résultat constant lorsque les conditions évoluent.",

      "blog.hffr-cable-compounds-explained.title": "Comprendre les Compounds HFFR pour la Fabrication de Câbles",
      "blog.hffr-cable-compounds-explained.excerpt": "Les compounds ignifuges sans halogène reposent sur un équilibre entre transformation, performance mécanique et comportement au feu. Voici en quoi consiste cet équilibre.",
      "blog.hffr-cable-compounds-explained.body1": "Les compounds HFFR (sans halogène, ignifuges) sont développés pour les fabricants de câbles ayant besoin d'une performance ignifuge sans additifs halogénés. Le défi de formulation consiste à équilibrer trois facteurs à la fois : le comportement du compound sur les lignes d'extrusion, sa performance mécanique une fois installé, et son comportement dans des conditions d'essai liées au feu.",
      "blog.hffr-cable-compounds-explained.body2": "Ces trois facteurs pouvant orienter les décisions de formulation dans des directions différentes, les compounds HFFR sont généralement développés et ajustés en fonction de la construction et de l'application spécifiques du câble — isolation, gainage, bourrage ou couches de charge imposent chacune des exigences différentes au matériau. C'est l'une des raisons pour lesquelles les fournisseurs de compounds câbles travaillent généralement application par application plutôt que de proposer une qualité universelle unique.",
      "blog.hffr-cable-compounds-explained.body3": "Il convient de noter qu'un fournisseur de compound développe et fournit le matériau — la conformité finale du câble dépend toujours de la conception complète du câble, du procédé de fabrication et des essais indépendants du câble fini. Iris Polymere fournit des solutions de compounds HFFR aux fabricants de câbles et ne fabrique pas de câbles finis.",

      "blog.masterbatch-dosage-consistency.title": "Comment le Dosage du Masterbatch Influence la Constance de Production",
      "blog.masterbatch-dosage-consistency.excerpt": "Un bon dosage de masterbatch dépend moins du pigment lui-même que d'une addition répétable et maîtrisée tout au long de la production.",
      "blog.masterbatch-dosage-consistency.body1": "Le masterbatch est conçu pour être ajouté à un polymère de base selon un taux défini, et de faibles variations de ce taux peuvent visiblement affecter la constance de la couleur, l'opacité ou les propriétés mécaniques d'un lot à l'autre. La précision du dosage dépend de facteurs tels que la compatibilité de la résine porteuse, la concentration en pigment et le calibrage de l'équipement de dosage pour le masterbatch utilisé.",
      "blog.masterbatch-dosage-consistency.body2": "Les masterbatch blancs et noirs illustrent bien ce principe : le masterbatch blanc est généralement proposé à différentes concentrations de TiO₂ (par exemple 50 % ou 70 %) précisément pour permettre aux transformateurs de choisir un dosage adapté à leurs objectifs de coût et d'opacité, tandis que les formulations de masterbatch noir sont ajustées selon que la résistance aux UV ou la brillance de surface est prioritaire pour la pièce finale.",
      "blog.masterbatch-dosage-consistency.body3": "Un dosage constant résulte finalement d'une combinaison entre un masterbatch bien formulé, une résine porteuse compatible et une maîtrise rigoureuse du procédé sur la ligne de production. Revoir les réglages de dosage à chaque changement de résine de base, de machine ou de couleur cible aide à maintenir des résultats constants.",

      "blog.material-selection-process-stability.title": "Sélection du Matériau et Stabilité du Procédé : Ce que les Fabricants Doivent Savoir",
      "blog.material-selection-process-stability.excerpt": "Un résultat constant commence avant même que le matériau n'atteigne la machine — dès sa sélection et sa formulation.",
      "blog.material-selection-process-stability.body1": "La constance de production est souvent perçue comme un enjeu propre à l'atelier de transformation, mais elle se joue en grande partie plus tôt, dès l'étape de sélection et de formulation du matériau. Choisir un compound véritablement adapté à l'application cible — et pas seulement à une catégorie de produit générale — réduit le nombre d'ajustements nécessaires une fois le matériau arrivé sur l'extrudeuse, la presse à injecter ou tout autre équipement de transformation.",
      "blog.material-selection-process-stability.body2": "Cette relation suit généralement quatre étapes : la sélection du matériau selon les exigences de l'application, la formulation du compound adaptée à la méthode de transformation prévue, la transformation elle-même dans des conditions stables et répétables, et enfin la performance de l'application finale. Un maillon faible à l'une de ces étapes se traduit généralement par une inconstance plus loin dans la chaîne.",
      "blog.material-selection-process-stability.body3": "Pour les fabricants, cela signifie que la stabilité de production ne dépend pas uniquement des réglages machine — elle dépend aussi du fait de travailler avec un fournisseur de compound qui comprend, dès le départ, la méthode de transformation et l'application visées, plutôt que de traiter formulation et transformation comme des étapes séparées et indépendantes.",

      "blog.quality-compliance-iso-reach-rohs.title": "Qualité et Conformité : Ce que Signifient ISO 9001, REACH et RoHS pour les Acheteurs de Compounds",
      "blog.quality-compliance-iso-reach-rohs.excerpt": "Ces trois références reviennent souvent dans les échanges sur l'approvisionnement en compounds. Voici, en termes simples, ce que chacune recouvre.",
      "blog.quality-compliance-iso-reach-rohs.body1": "ISO 9001 est une norme de système de management de la qualité — elle concerne la façon dont une entreprise organise et maîtrise ses processus, et non les propriétés physiques d'un produit donné. Lorsqu'un fournisseur de compound fait référence à ISO 9001, il décrit la rigueur de ses processus de production et de qualité, et non une allégation sur le matériau lui-même.",
      "blog.quality-compliance-iso-reach-rohs.body2": "REACH est un règlement de l'Union européenne relatif à l'enregistrement et à l'utilisation sûre des substances chimiques, tandis que RoHS restreint l'usage de certaines substances dangereuses dans des catégories de produits spécifiques, historiquement les équipements électriques et électroniques. Ce sont deux cadres réglementaires avec lesquels les formulations de compounds peuvent devoir s'aligner, selon le lieu et l'usage du produit fini.",
      "blog.quality-compliance-iso-reach-rohs.body3": "Les exigences de conformité variant selon le marché, l'application et le produit fini, les acheteurs doivent toujours demander la documentation spécifique pertinente pour leur cas d'usage plutôt que de se fier à des déclarations générales. Iris Polymere peut fournir, sur demande, une documentation technique et de conformité détaillée pour la gamme de produits concernée.",

      "blog.regional-supply-north-africa-middle-east.title": "Accompagner la Fabrication Régionale en Afrique du Nord et au Moyen-Orient",
      "blog.regional-supply-north-africa-middle-east.excerpt": "L'approvisionnement en compounds et masterbatch pour les fabricants d'Algérie, d'Afrique du Nord et du Moyen-Orient va au-delà de la logistique — tout commence par la compréhension des conditions de production régionales.",
      "blog.regional-supply-north-africa-middle-east.body1": "Les fabricants d'Algérie, d'Afrique du Nord et du Moyen-Orient exploitent une grande variété d'équipements de transformation, d'échelles de production et d'exigences applicatives. Accompagner efficacement cette région signifie proposer des solutions de compounds et de masterbatch adaptables à différents environnements de production plutôt qu'une spécification unique et figée.",
      "blog.regional-supply-north-africa-middle-east.body2": "La proximité compte également pour des raisons pratiques : délais plus courts, support technique plus réactif et ajustements de formulation tenant compte du climat et des conditions de stockage régionales contribuent tous à une production plus fluide pour les fabricants travaillant avec des compounds PVC, HFFR et masterbatch dans les applications câbles, plastiques et extrusion.",
      "blog.regional-supply-north-africa-middle-east.body3": "Iris Polymere structure sa gamme de compounds et de masterbatch autour de cette orientation régionale, en accompagnant les fabricants d'Algérie, d'Afrique du Nord, du Moyen-Orient et des marchés export avec des formulations développées pour leurs exigences de production spécifiques."
    },
    ar: {
      "utility.tagline": "حلول المركّبات والماستربات",
      "utility.region": "الجزائر · شمال أفريقيا · الشرق الأوسط",

      "tech.hero.eyebrow": "تصنيع صناعي للمركّبات",
      "tech.hero.title": "مركّبات صناعية مصمّمة لإنتاج ثابت",
      "tech.hero.lead": "توفّر شركة Iris Polymere حلول مركّبات PVC وHFFR والماستربات والحشو المطوّرة لصناعة الكابلات والبلاستيك والبثق وعمليات التصنيع الصناعي.",

      "btn.viewProductRange": "عرض مجموعة المنتجات",
      "btn.requestTechnicalInfo": "طلب معلومات تقنية",

      "label.productFamily": "عائلة المنتج",
      "label.corporate": "الشركة",

      "systems.eyebrow": "01 / أنظمة المنتجات",
      "systems.title": "محفظة مركّبات منظّمة",
      "systems.lead": "ثلاث مجموعات منتجات تقنية، مصمّمة لتصنيع ثابت وناتج يمكن التنبؤ به عبر خطوط التصنيع.",
      "systems.pvc.code": "01 / PVC",
      "systems.hffr.code": "02 / HFFR",
      "systems.mb.code": "03 / ماستربات",
      "systems.viewFamily": "عرض عائلة المنتج",

      "benefits.eyebrow2": "02 / مزايا الأداء",
      "applications.eyebrow2": "03 / تطبيقات التصنيع",

      "process.eyebrow": "04 / المادة والعملية",
      "process.title": "من اختيار المادة إلى التطبيق النهائي",
      "process.lead": "يعتمد ثبات ناتج الإنتاج على السلسلة الرابطة بين اختيار المادة والتركيبة واستقرار التصنيع وأداء التطبيق النهائي.",
      "process.step1.title": "اختيار المادة",
      "process.step1.text": "اختيار المواد الخام والإضافات بما يتوافق مع متطلبات التطبيق المستهدف.",
      "process.step2.title": "التركيبة",
      "process.step2.text": "تركيبة المركّب مطوّرة وفق طريقة التصنيع المقصودة والاستخدام النهائي.",
      "process.step3.title": "التصنيع",
      "process.step3.text": "سلوك مستقر في البثق أو الحقن أو القولبة على المعدات الصناعية القياسية.",
      "process.step4.title": "التطبيق النهائي",
      "process.step4.text": "ناتج متسق يدعم أداء المنتج النهائي.",

      "compliance.eyebrow": "05 / الجودة والامتثال",
      "compliance.note": "يمكن طلب الوثائق التقنية ووثائق الامتثال التفصيلية مباشرة من الفريق التقني لشركة Iris Polymere.",

      "region.eyebrow": "06 / التركيز على التوريد الإقليمي",
      "region.title": "دعم المصنّعين في المنطقة",
      "region.lead": "دعم المصنّعين في الأسواق الإقليمية والموجّهة للتصدير.",
      "region.algeria.title": "الجزائر",
      "region.algeria.text": "التركيز الأساسي لتوريد المركّبات والماستربات.",
      "region.northafrica.title": "شمال أفريقيا",
      "region.northafrica.text": "دعم المصنّعين في مختلف أنحاء منطقة شمال أفريقيا الأوسع.",
      "region.middleeast.title": "الشرق الأوسط",
      "region.middleeast.text": "حلول مركّبات تقنية لشركاء التصنيع في الشرق الأوسط.",
      "region.export.title": "أسواق التصدير",
      "region.export.text": "توريد موجّه للتصدير للشركاء الدوليين المؤهّلين.",

      "label.technicalData.property": "الخاصية",
      "label.technicalData.unit": "الوحدة",
      "label.technicalData.typicalValue": "القيمة النموذجية",
      "label.technicalData.testMethod": "طريقة الاختبار",
      "label.technicalData.tbc": "سيتم التأكيد لاحقًا",
      "label.technicalData.caption": "بيانات تقنية — القيم بانتظار تأكيد العميل",
      "label.materialCompatibility": "توافق المواد",
      "label.materialCompatibilityText": "ستُضاف تفاصيل توافق المواد بعد تأكيد العميل.",
      "label.availableVariants": "الأصناف المتاحة",
      "label.keyBenefits": "المزايا الرئيسية",
      "label.typicalApplications": "التطبيقات النموذجية",
      "label.technicalValuesPending": "ستُضاف القيم التقنية بعد تأكيد العميل.",

      "quality.hero.eyebrow": "الشركة / سياسة الجودة",
      "sustain.hero.eyebrow": "الشركة / الاستدامة",
      "vision.hero.eyebrow": "الشركة / الرؤية والرسالة",
      "production.hero.eyebrow": "الشركة / الإنتاج والتقنية",

      "cable.disclaimer": "توفّر شركة Iris Polymere حلول المركّبات لمصنّعي الكابلات ولا تقوم بتصنيع كابلات نهائية.",

      "nav.blog": "المدونة",
      "blog.hero.eyebrow": "رؤى تقنية",
      "blog.hero.title": "المدونة والرؤى التقنية",
      "blog.hero.lead": "مقالات عملية حول اختيار المركّبات والتصنيع والتصنيع الصناعي من فريق Iris Polymere التقني.",
      "blog.readArticle": "قراءة المقال",
      "blog.relatedArticles": "مقالات ذات صلة",
      "blog.backToBlog": "العودة إلى المدونة",
      "blog.publishedOn": "تاريخ النشر",
      "blog.cat.process": "المادة والعملية",
      "blog.cat.quality": "الجودة والامتثال",
      "blog.cat.regional": "التغطية الإقليمية",

      "blog.pvc-rigid-vs-flexible.title": "الاختيار بين مركّبات PVC الصلبة والمرنة",
      "blog.pvc-rigid-vs-flexible.excerpt": "تخدم مركّبات PVC الصلبة والمرنة احتياجات إنتاج مختلفة. إليك كيف يقيّم المصنّعون عادةً التركيبة الأنسب لتطبيقهم.",
      "blog.pvc-rigid-vs-flexible.body1": "تُصنَّف مركّبات PVC عمومًا إلى تركيبات صلبة ومرنة، ويعتمد الاختيار الصحيح على المتطلبات الميكانيكية والحرارية ومتطلبات التصنيع للقطعة النهائية. يُختار PVC الصلب عادةً للبروفيلات والأنابيب والوصلات حيث تكون ثبات الأبعاد والقوة الميكانيكية أولوية، بينما يُصمَّم PVC المرن للخراطيم وحشيات الإحكام والوصلات المطاطية والمكوّنات المرتبطة بالكابلات التي تتطلّب مرونة مضبوطة.",
      "blog.pvc-rigid-vs-flexible.body2": "يزن المصنّعون عادةً عوامل مثل الصلابة المستهدفة ومقاومة الصدمات ومظهر السطح والتوافق مع معدات البثق أو الحقن لديهم قبل اختيار المركّب. تُدخِل التركيبات المرنة ملدّنات ومثبّتات تغيّر سلوك التصنيع مقارنة بالأصناف الصلبة، ما يجعل دقة الجرعات والخلط أكثر أهمية كلما زادت المرونة.",
      "blog.pvc-rigid-vs-flexible.body3": "نظرًا لأن كل خط إنتاج له أدواته وبروفيلات حرارته وأهدافه الإنتاجية الخاصة، نادرًا ما يكون اختيار المركّب قرارًا موحّدًا يناسب الجميع. العمل مع شريك مركّبات قادر على تعديل تفاصيل التركيبة بما يلائم خط تصنيع محدّد — بدلاً من تقديم صنف ثابت واحد — يساعد المصنّعين على الحفاظ على نتائج متسقة مع تغيّر الظروف.",

      "blog.hffr-cable-compounds-explained.title": "فهم مركّبات HFFR في تصنيع الكابلات",
      "blog.hffr-cable-compounds-explained.excerpt": "تُبنى المركّبات المثبطة للهب الخالية من الهالوجين على توازن بين قابلية التصنيع والأداء الميكانيكي والسلوك تجاه الحريق. إليك ما يتضمنه هذا التوازن.",
      "blog.hffr-cable-compounds-explained.body1": "تُطوَّر مركّبات HFFR (الخالية من الهالوجين والمثبطة للهب) لمصنّعي الكابلات الذين يحتاجون إلى أداء مثبط للهب دون إضافات هالوجينية. يكمن تحدي التركيبة في موازنة ثلاثة عوامل في آن واحد: سلوك المركّب على خطوط البثق، وأداؤه الميكانيكي بعد التركيب، وسلوكه في ظروف الاختبار المرتبطة بالحريق.",
      "blog.hffr-cable-compounds-explained.body2": "ولأن هذه العوامل الثلاثة قد تدفع قرارات التركيبة في اتجاهات مختلفة، تُطوَّر مركّبات HFFR وتُعدَّل عادةً وفق بنية الكابل وتطبيقه المحدّد — إذ تفرض طبقات العزل والتغليف والتبطين أو الحشو متطلبات مختلفة على المادة. وهذا أحد أسباب عمل موردي مركّبات الكابلات تطبيقًا بتطبيق بدلاً من تقديم صنف عام واحد.",
      "blog.hffr-cable-compounds-explained.body3": "تجدر الإشارة إلى أن مورّد المركّب يطوّر المادة ويوفّرها — بينما يعتمد الامتثال النهائي للكابل دائمًا على التصميم الكامل للكابل وعملية التصنيع والاختبارات المستقلة للكابل النهائي. توفّر Iris Polymere حلول مركّبات HFFR لمصنّعي الكابلات ولا تقوم بتصنيع كابلات نهائية.",

      "blog.masterbatch-dosage-consistency.title": "كيف تؤثّر جرعة الماستربات على اتساق الإنتاج",
      "blog.masterbatch-dosage-consistency.excerpt": "ضبط جرعة الماستربات لا يتعلق بالصبغة نفسها بقدر ما يتعلق بإضافة متكرّرة ومضبوطة طوال دورة الإنتاج.",
      "blog.masterbatch-dosage-consistency.body1": "صُمِّم الماستربات لإضافته إلى بوليمر أساسي بنسبة محدّدة، ويمكن للتغيّرات الطفيفة في هذه النسبة أن تؤثّر بشكل ملحوظ على اتساق اللون أو التعتيم أو الخصائص الميكانيكية من دفعة إلى أخرى. تعتمد دقة الجرعة على عوامل مثل توافق الراتنج الحامل، وتركيز الصبغة، ومدى معايرة معدات الجرعات للماستربات المستخدم تحديدًا.",
      "blog.masterbatch-dosage-consistency.body2": "يوضّح الماستربات الأبيض والأسود هذا المبدأ جيدًا: يُقدَّم الماستربات الأبيض عادةً بتركيزات مختلفة من ثاني أكسيد التيتانيوم (مثل 50% أو 70%) تحديدًا لتمكين المصنّعين من اختيار جرعة تناسب أهدافهم من حيث التكلفة والتعتيم، بينما تُعدَّل تركيبات الماستربات الأسود حسب ما إذا كانت مقاومة الأشعة فوق البنفسجية أو لمعان السطح هي الأولوية للقطعة النهائية.",
      "blog.masterbatch-dosage-consistency.body3": "الجرعة المتسقة هي في النهاية ثمرة تركيبة ماستربات جيدة، وراتنج حامل متوافق، وضبط دقيق للعملية على خط الإنتاج. مراجعة إعدادات الجرعة عند كل تغيير في الراتنج الأساسي أو الآلات أو اللون المستهدف يساعد على الحفاظ على نتائج متسقة.",

      "blog.material-selection-process-stability.title": "اختيار المادة واستقرار العملية: ما يجب أن يعرفه المصنّعون",
      "blog.material-selection-process-stability.excerpt": "الناتج المتسق يبدأ قبل وصول المادة إلى الآلة — من طريقة اختيارها وتركيبها منذ البداية.",
      "blog.material-selection-process-stability.body1": "غالبًا ما يُنظر إلى اتساق الإنتاج على أنه مسألة تخص أرضية التصنيع، لكن جزءًا كبيرًا منه يتحدّد مبكرًا، في مرحلة اختيار المادة وتركيبها. اختيار مركّب ملائم فعليًا للتطبيق المستهدف — وليس فقط لفئة منتج عامة — يقلّل من عدد التعديلات المطلوبة بعد وصول المادة إلى آلة البثق أو الحقن أو أي معدات تصنيع أخرى.",
      "blog.material-selection-process-stability.body2": "تسير هذه العلاقة عمومًا عبر أربع مراحل: اختيار المادة وفق متطلبات التطبيق، وتركيبة المركّب بما يناسب طريقة التصنيع المقصودة، والتصنيع نفسه في ظروف مستقرة وقابلة للتكرار، وأداء التطبيق النهائي. أي ضعف في إحدى هذه المراحل يظهر عادةً كتذبذب في مرحلة لاحقة.",
      "blog.material-selection-process-stability.body3": "بالنسبة للمصنّعين، هذا يعني أن استقرار الإنتاج لا يعتمد فقط على إعدادات المعدات — بل يعتمد أيضًا على العمل مع مورّد مركّبات يفهم طريقة التصنيع والتطبيق المقصودين منذ البداية، بدلاً من التعامل مع التركيبة والتصنيع كخطوتين منفصلتين وغير مرتبطتين.",

      "blog.quality-compliance-iso-reach-rohs.title": "الجودة والامتثال: ماذا تعني ISO 9001 وREACH وRoHS لمشتري المركّبات",
      "blog.quality-compliance-iso-reach-rohs.excerpt": "تتكرر هذه المراجع الثلاثة كثيرًا في نقاشات توريد المركّبات. إليك نظرة مبسّطة على ما يغطيه كل منها.",
      "blog.quality-compliance-iso-reach-rohs.body1": "تُعد ISO 9001 معيارًا لنظام إدارة الجودة — وتتعلق بكيفية تنظيم الشركة لعملياتها وضبطها، وليس بخصائص فيزيائية لمنتج معيّن. عندما يشير مورّد مركّبات إلى ISO 9001، فهو يصف انضباط عمليات الإنتاج والجودة لديه، وليس ادّعاءً بشأن المادة نفسها.",
      "blog.quality-compliance-iso-reach-rohs.body2": "أما REACH فهو لائحة للاتحاد الأوروبي تتعلق بتسجيل المواد الكيميائية واستخدامها الآمن، في حين تقيّد RoHS استخدام مواد خطرة معيّنة في فئات منتجات محدّدة، تاريخيًا المعدات الكهربائية والإلكترونية. وكلاهما إطاران تنظيميان قد تحتاج تركيبات المركّبات للتوافق معهما، حسب مكان استخدام المنتج النهائي وطريقته.",
      "blog.quality-compliance-iso-reach-rohs.body3": "نظرًا لأن متطلبات الامتثال تختلف باختلاف السوق والتطبيق والمنتج النهائي، ينبغي للمشترين دائمًا طلب الوثائق المحدّدة ذات الصلة بحالة استخدامهم بدلاً من الاعتماد على تصريحات عامة. يمكن لشركة Iris Polymere تقديم وثائق تقنية ووثائق امتثال تفصيلية عند الطلب لمجموعة المنتجات المعنية.",

      "blog.regional-supply-north-africa-middle-east.title": "دعم التصنيع الإقليمي في شمال أفريقيا والشرق الأوسط",
      "blog.regional-supply-north-africa-middle-east.excerpt": "توريد المركّبات والماستربات لمصنّعي الجزائر وشمال أفريقيا والشرق الأوسط يتجاوز الخدمات اللوجستية — ويبدأ بفهم ظروف الإنتاج الإقليمية.",
      "blog.regional-supply-north-africa-middle-east.body1": "يشغّل المصنّعون في الجزائر وشمال أفريقيا والشرق الأوسط مجموعة واسعة من معدات التصنيع وأحجام الإنتاج ومتطلبات التطبيقات. دعم هذه المنطقة بفعالية يعني تقديم حلول مركّبات وماستربات قابلة للتكيّف مع بيئات إنتاج مختلفة بدلاً من مواصفة واحدة ثابتة.",
      "blog.regional-supply-north-africa-middle-east.body2": "كما يُعد القرب الجغرافي مهمًا لأسباب عملية: آجال تسليم أقصر، ودعم تقني أكثر استجابة، وتعديلات في التركيبة تراعي المناخ الإقليمي وظروف التخزين، وكلها عوامل تسهم في تصنيع أكثر سلاسة للمصنّعين العاملين بمركّبات PVC وHFFR والماستربات في تطبيقات الكابلات والبلاستيك والبثق.",
      "blog.regional-supply-north-africa-middle-east.body3": "تُنظّم Iris Polymere مجموعة مركّباتها وماستربتشها حول هذا التركيز الإقليمي، بدعم المصنّعين في الجزائر وشمال أفريقيا والشرق الأوسط والأسواق الموجّهة للتصدير بتركيبات مطوّرة وفق متطلبات إنتاجهم المحدّدة."
    }
  };
  window.IRIS_I18N = window.IRIS_I18N || { en: {}, fr: {}, ar: {} };
  ["en", "fr", "ar"].forEach(function (lang) {
    for (var key in extra[lang]) {
      window.IRIS_I18N[lang][key] = extra[lang][key];
    }
  });
})();

import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";
import path from "path";

const dbPath = path.join(process.cwd(), "dev.db");
const adapter = new PrismaLibSql({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

async function main() {
  // --- Admin user -----------------------------------------------------
  // NOTE: "admin" / "123456" is a placeholder for local development only —
  // this panel is never reachable from the internet (see ADMIN.md). Change
  // it directly in the database before using this for anything beyond a
  // local demo.
  const adminEmail = "admin@admin.com";
  const adminPassword = "123456";
  const existingAdmin = await prisma.adminUser.findUnique({ where: { email: adminEmail } });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.adminUser.create({
      data: { email: adminEmail, passwordHash, name: "Iris Polymere Admin" },
    });
  }

  // --- Categories -------------------------------------------------------
  const categories = [
    { slug: "pvc-compounds", nameEn: "PVC Compounds", nameFr: "Compounds PVC", nameAr: "مركّبات PVC" },
    { slug: "hffr-compounds", nameEn: "HFFR Compounds", nameFr: "Compounds HFFR", nameAr: "مركّبات HFFR" },
    { slug: "masterbatch", nameEn: "Masterbatch", nameFr: "Masterbatch", nameAr: "ماستربتش" },
  ];
  const categoryRecords: Record<string, string> = {};
  for (const c of categories) {
    const rec = await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
    categoryRecords[c.slug] = rec.id;
  }

  // --- Blog posts (migrated from the static site) -----------------------
  const posts = [
    {
      slug: "pvc-rigid-vs-flexible",
      categorySlug: "pvc-compounds",
      titleEn: "Choosing Between Rigid and Flexible PVC Compounds",
      titleFr: "Choisir Entre un Compound PVC Rigide et Souple",
      titleAr: "الاختيار بين مركّب PVC صلب ومرن",
      excerptEn: "A practical look at how manufacturers evaluate PVC compound options for profiles, pipes and cable applications.",
      excerptFr: "Un regard pratique sur la manière dont les fabricants évaluent les options de compound PVC pour les profilés, tubes et applications câbles.",
      excerptAr: "نظرة عملية على كيفية تقييم المصنّعين لخيارات مركّبات PVC الخاصة بالبروفيلات والأنابيب وتطبيقات الكابلات.",
      bodyEn: `<p>Selecting between rigid and flexible PVC compounds usually starts with the end application rather than the material itself. Profiles, pipes and structural components generally call for rigid formulations that prioritize dimensional stability and mechanical strength, while hoses, seals and flexible cable applications call for compounds formulated around controlled flexibility and consistent surface quality.</p><p>Processing conditions matter as much as the end use. Extrusion speed, tooling and cooling all interact with a compound's formulation, which is why Iris Polymere develops PVC compounds around the practical requirements of each production line rather than a single generic specification.</p><p>For manufacturers evaluating a switch between rigid and flexible PVC — or looking to qualify a new compound for an existing line — our technical team can walk through formulation options based on the application, machinery and target performance.</p><p>Technical data for specific PVC compound grades will be added after client approval. Contact our team for detailed technical documentation.</p>`,
    },
    {
      slug: "hffr-compounds-explained",
      categorySlug: "hffr-compounds",
      titleEn: "What Makes a Compound Halogen-Free Flame-Retardant?",
      titleFr: "Qu'est-ce qui Rend un Compound Ignifuge Sans Halogène ?",
      titleAr: "ما الذي يجعل المركّب مثبطًا للهب وخاليًا من الهالوجين؟",
      excerptEn: "An introduction to HFFR compounds and why cable manufacturers consider them for specific applications.",
      excerptFr: "Une introduction aux compounds HFFR et aux raisons pour lesquelles les fabricants de câbles les envisagent pour des applications spécifiques.",
      excerptAr: "مقدمة حول مركّبات HFFR وأسباب اعتماد مصنّعي الكابلات عليها في تطبيقات معينة.",
      bodyEn: `<p>Halogen-free flame-retardant (HFFR) compounds are formulated to reduce the amount of halogenated material in a cable jacket or insulation layer, generally in support of applications where fire performance and smoke behavior are a priority alongside standard mechanical and electrical requirements.</p><p>An HFFR compound's fire performance is only one part of the picture. Processability, mechanical properties and consistency across production runs all need to be balanced within the same formulation, which is why Iris Polymere's HFFR range — HM-2, HM-4, HM-5, Bedding and Filler — is organized around different production and application profiles rather than a single all-purpose grade.</p><p>It's worth being clear about scope: no single compound automatically guarantees a finished cable's regulatory compliance, including CPR-related requirements. Final cable performance depends on the complete formulation, cable design, processing conditions and testing carried out on the finished product.</p><p>Manufacturers working through CPR-related or other fire-performance-focused projects are welcome to contact our technical team to discuss compound options relevant to their formulation and testing plans.</p>`,
    },
    {
      slug: "masterbatch-guide",
      categorySlug: "masterbatch",
      titleEn: "Masterbatch 101: Color, White, Black and Filler Solutions",
      titleFr: "Masterbatch 101 : Solutions Couleur, Blanc, Noir et Charge",
      titleAr: "أساسيات الماستربتش: حلول اللون والأبيض والأسود والحشو",
      excerptEn: "A short guide to the four main masterbatch families and where each is typically used.",
      excerptFr: "Un guide court sur les quatre grandes familles de masterbatch et leurs usages typiques.",
      excerptAr: "دليل موجز حول العائلات الأربع الرئيسية للماستربتش ومجالات استخدامها المعتادة.",
      bodyEn: `<p>Masterbatch is, at its simplest, a concentrated mixture of pigment or additive carried in a polymer base, added to a natural resin during processing to deliver color or a specific property at a controlled dosage. The four broad families — color, white, black and filler — cover most day-to-day requirements across plastics manufacturing.</p><p>Color masterbatch is used where a specific, repeatable shade is required across production runs. White masterbatch is typically differentiated by TiO₂ concentration — a 50% loading balances opacity, dispersion and cost, while a 70% loading is suited to applications that need stronger opacity at a lower dosage. Black masterbatch is often selected for either UV resistance in outdoor applications or a high-gloss surface finish, depending on the end product's requirements.</p><p>Filler masterbatch, built around calcium carbonate in a PE or PP carrier, plays a different role — it's primarily a cost and process optimization tool rather than a coloring agent, reducing dependency on higher-cost polymer input while maintaining consistent processing.</p><p>Performance across all four families depends on the base polymer, dosage, processing equipment and end-product requirements, so results can vary from one production line to another. Our team is available to discuss formulation options for a specific application.</p>`,
    },
  ];

  for (const p of posts) {
    const { categorySlug, ...data } = p;
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        ...data,
        categoryId: categoryRecords[categorySlug],
        published: true,
        publishedAt: new Date(),
      },
    });
  }

  // --- Certificates -------------------------------------------------------
  const certs = [
    {
      key: "iso",
      titleEn: "ISO 9001", titleFr: "ISO 9001", titleAr: "ISO 9001",
      descEn: "ISO 9001 is the international reference standard for quality management systems, covering consistent process control, documentation and continuous improvement.",
      descFr: "L'ISO 9001 est la norme internationale de référence pour les systèmes de management de la qualité, couvrant la maîtrise des processus, la documentation et l'amélioration continue.",
      descAr: "معيار ISO 9001 هو المعيار المرجعي الدولي لأنظمة إدارة الجودة، ويشمل ضبط العمليات والتوثيق والتحسين المستمر.",
    },
    {
      key: "eco",
      titleEn: "Eco Friendly", titleFr: "Éco-Responsable", titleAr: "صديق للبيئة",
      descEn: "Reference marker for resource-efficient and lower-impact formulation approaches.",
      descFr: "Repère de référence pour des approches de formulation économes en ressources et à impact réduit.",
      descAr: "مرجع لنُهج التركيب الموفّرة للموارد والأقل تأثيرًا بيئيًا.",
    },
    {
      key: "reach",
      titleEn: "REACH", titleFr: "REACH", titleAr: "REACH",
      descEn: "REACH is the EU regulatory framework for the Registration, Evaluation, Authorisation and Restriction of Chemicals, relevant to raw material and compound handling.",
      descFr: "REACH est le cadre réglementaire européen relatif à l'enregistrement, l'évaluation, l'autorisation et la restriction des substances chimiques, pertinent pour la gestion des matières premières et des compounds.",
      descAr: "REACH هو الإطار التنظيمي الأوروبي لتسجيل المواد الكيميائية وتقييمها وترخيصها وتقييدها، وهو ذو صلة بمناولة المواد الخام والمركّبات.",
    },
    {
      key: "rohs",
      titleEn: "RoHS", titleFr: "RoHS", titleAr: "RoHS",
      descEn: "RoHS restricts the use of specific hazardous substances in materials, a reference point considered in relevant compound formulations.",
      descFr: "La directive RoHS restreint l'utilisation de certaines substances dangereuses, un point de référence pris en compte dans les formulations concernées.",
      descAr: "تقيّد لائحة RoHS استخدام مواد خطرة معيّنة، وهي مرجع يؤخذ بعين الاعتبار في التركيبات ذات الصلة.",
    },
  ];

  for (const c of certs) {
    await prisma.certificate.upsert({ where: { key: c.key }, update: {}, create: c });
  }

  console.log("Seed complete.");
  console.log("Categories:", categories.length, "| Posts:", posts.length, "| Certificates:", certs.length);
  if (!existingAdmin) {
    console.log("\n=== ADMIN LOGIN ===");
    console.log("URL:      http://localhost:3300/admin/login");
    console.log("Username: ", adminEmail);
    console.log("Password: ", adminPassword);
    console.log("====================\n");
  } else {
    console.log("Admin user already exists — skipped.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

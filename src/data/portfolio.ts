export type Link = {
  label: string;
  href: string;
};

export type CaseStudy = {
  slug: string;
  name: string;
  description: string;
  productType?: string;
  role?: string;
  technologies?: string[];
  impact?: string;
  overview?: string;
  problem?: string;
  responsibilities?: string[];
  approach?: string[];
  collaboration?: string;
  outcome?: string;
  screenshots?: { src: string; alt: string }[];
  links?: Link[];
  featured: boolean;
  accent: "slate" | "warm" | "steel" | "ink";
};

export type ExperienceEntry = {
  company: string;
  title: string;
  period: string;
  location: string;
  summary: string;
  achievements: string[];
  current?: boolean;
};

export type AlsoShipped = {
  name: string;
  productType: string;
  note: string;
  href?: string;
};

const contact = {
  email: "irfanakram825@gmail.com",
  linkedIn: "https://www.linkedin.com/in/helloirfan",
  github: "https://github.com/irfanadot",
  stackOverflow: "https://stackoverflow.com/users/10032857/irfan-akram",
  location: "Lahore, Pakistan",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://irfanadot.github.io";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const withBasePath = (path: string) => `${basePath}${path}`;
const absoluteUrl = (path: string) => `${siteUrl}${path}`;

export const portfolio = {
  site: {
    name: "Irfan Akram",
    domain: siteUrl,
    title: "Irfan Akram | Technical Lead & Lead Software Engineer",
    description:
      "Irfan Akram is a Technical Lead in Lahore with 7+ years in software architecture, backend and API systems, LLM integration and AI automation, and mobile delivery. Open to Gulf and remote roles.",
  },
  flags: {
    showExperience: true,
    portraitAvailable: true,
    resumeAvailable: false,
    analyticsEnabled: false,
  },
  navigation: [
    { label: "Expertise", href: "#expertise" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Experience", href: "#experience", requires: "showExperience" },
    { label: "Resume", href: "#resume" },
  ],
  hero: {
    name: "Irfan Akram",
    role: "Technical Lead | AI Automation & LLM Integration | Backend, API & System Architecture | Mobile Development",
    statement: "Architect. Lead. Ship.",
    summary:
      "Technical Lead with 7+ years across backend systems, software architecture, LLM integration, AI automation, and mobile engineering. I turn complex requirements into reliable systems, guide engineers through delivery, and stay hands-on in the code.",
    availability: "Open to relocation",
    portrait: {
      src: withBasePath("/images/irfan-profile.webp"),
      alt: "Portrait of Irfan Akram",
      objectPosition: "50% 20%",
      // Adjust objectPosition if a replacement portrait needs different framing.
    },
  },
  expertise: [
    {
      title: "Technical Leadership",
      description: "Set the technical direction, guide the engineers, and own what ships.",
      skills: [
        "Architecture ownership",
        "Code review",
        "Mentoring",
        "Delivery planning",
        "Stakeholder communication",
      ],
    },
    {
      title: "Software Architecture",
      description: "Design systems that hold up as the product and the team grow.",
      skills: [
        "Clean Architecture",
        "Modular design",
        "Multi-tenant systems",
        "Offline-first sync",
        "API and integration design",
      ],
    },
    {
      title: "Backend and APIs",
      description: "Build the services, data models, and integrations the product depends on.",
      skills: [
        "Node.js",
        "Express.js",
        "NestJS",
        "TypeScript",
        "MySQL and PostgreSQL",
        "REST APIs and webhooks",
      ],
    },
    {
      title: "AI and Automation",
      description: "Put language models where they remove real work.",
      skills: ["LLM integration", "Vector search", "n8n automation"],
    },
    {
      title: "Mobile Engineering",
      description: "Ship maintainable mobile products across platforms.",
      skills: ["Flutter and Dart", "Android", "iOS"],
    },
    {
      title: "Delivery and Release",
      description: "Take agreed scope through testing, release, and production support.",
      skills: ["GitHub Actions CI/CD", "App Store and Play", "Agile and Scrum"],
    },
  ],
  caseStudies: [
    {
      slug: "babel",
      name: "Babel",
      description:
        "A condo and property management platform built to Quebec regulation, with automated dues collection and an assistant that drafts the paperwork.",
      productType: "Condo and property management platform",
      role: "Technical Lead, architecture and delivery",
      overview:
        "Babel runs the day to day of managing condo buildings in Quebec: dues and rent collection, maintenance records, resident communication, and the reporting the province requires.",
      problem:
        "Quebec condo boards carry obligations under Law 25, PIPEDA, Bill 16, and Bill 141, while collections, maintenance history, and resident notices are usually handled by hand across spreadsheets and email.",
      responsibilities: [
        "Lead architecture and delivery across the API, admin panel, website, and mobile app.",
        "Architected the compliance and finance tooling, including automated Stripe dues and rent collection, reserve fund tracking, and the digital maintenance logbook.",
        "Built the AI assistant used for data analysis and for drafting notices and minutes.",
        "Own the backend and automation architecture, including LLM integration into product features and webhook and API automation across third-party services.",
      ],
      approach: [
        "TypeScript services on Node.js and Express with Sequelize over MySQL, and a migration workflow that checks for schema drift before a release goes out.",
        "Stripe handles recurring dues and rent, with reconciliation and reserve fund tracking in the finance module.",
        "The assistant answers questions over building records using vector search, then drafts notices and minutes from the same source.",
        "A Next.js admin panel and a Flutter app consume one API and one shared design token package, so board and resident views cannot drift apart.",
      ],
      technologies: [
        "Node.js",
        "Express.js",
        "TypeScript",
        "MySQL",
        "Sequelize",
        "Stripe",
        "OpenAI",
        "Vector search",
        "Next.js",
        "Flutter",
        "AWS Lambda",
      ],
      collaboration:
        "Built with a distributed engineering team. I set the technical scope, guide implementation across backend, web, and mobile, and surface delivery risk early.",
      outcome:
        "Babel runs in production for Quebec condo management, with dues collection, maintenance records, and compliance reporting handled in one system.",
      featured: true,
      accent: "slate",
    },
    {
      slug: "srvqube",
      name: "SrvQube",
      description:
        "An offline-first point of sale for Pakistani retail and electronics shops that keeps selling through load shedding.",
      productType: "POS and shop management platform",
      role: "Technical Lead, architecture and delivery",
      impact: "Counter checkout time down to 30 seconds.",
      overview:
        "SrvQube runs the counter: billing, inventory, and GST invoicing for retail and electronics shops, including the hours when the power or the connection is gone.",
      problem:
        "Shops in Pakistan lose selling time to load shedding and unreliable connectivity, and invoicing has to stay FBR ready either way.",
      responsibilities: [
        "Designed the offline-first billing architecture so sales continue during connectivity loss and sync automatically once service returns.",
        "Own the multi-tenant backend architecture, tenant isolation, and release readiness.",
        "Set the implementation approach across the counter app, the tenant admin panel, and the super admin console.",
      ],
      approach: [
        "NestJS services with TypeORM over PostgreSQL, split into a tenant API and a super admin API that share one master database.",
        "Each tenant gets its own database, with credentials encrypted in the master database and resolved per request.",
        "The counter app keeps a local IndexedDB store, so billing continues offline and reconciles when the connection returns.",
        "Redis and BullMQ carry background work such as reporting and sync, and thermal printing runs through the same service layer.",
      ],
      technologies: [
        "NestJS",
        "TypeScript",
        "PostgreSQL",
        "TypeORM",
        "Redis",
        "BullMQ",
        "Next.js",
        "IndexedDB",
      ],
      collaboration:
        "Built with the Byteimpulse engineering team. I own architecture, code quality direction, and release readiness.",
      outcome:
        "Counter checkout time is down to 30 seconds, and billing keeps working through load shedding with FBR ready GST invoicing.",
      featured: true,
      accent: "steel",
    },
    {
      slug: "ubq",
      name: "UBQ, Ultimate Business Quest",
      description:
        "A gamified business learning platform that scaled past 100,000 users, with quests, tiered content, and live messaging.",
      productType: "Gamified business learning platform",
      role: "Senior Software Engineer, led development and architecture",
      impact: "Scaled to more than 100,000 users worldwide.",
      overview:
        "UBQ turns business training into quests, rewards, and tiered content, with live messaging between learners.",
      responsibilities: [
        "Led development and architecture for the platform.",
        "Built the quest and reward engine, the multi-tier subscription and unlock system, and the real-time messaging layer behind the premium training content.",
        "Established the Flutter application architecture, state management patterns, and reusable patterns adopted across the codebase.",
        "Designed cross-platform offline and online data sync to keep the app reliable for a globally distributed user base.",
      ],
      approach: [
        "Flutter with GetX for state and routing, structured so new quest and content types could be added without touching the core.",
        "Firebase for authentication, Firestore and Realtime Database, messaging, and analytics, with a REST layer for business logic.",
        "Socket.IO carries live messaging, and in-app purchases drive the subscription tiers and content unlocks.",
        "Release support, crash analysis, and continuous performance work kept the app stable as the user base grew.",
      ],
      technologies: [
        "Flutter",
        "Dart",
        "GetX",
        "Firebase",
        "Socket.IO",
        "REST APIs",
        "In-app purchases",
      ],
      collaboration:
        "Delivered with a cross-functional team at Jovian Digital across product, design, and backend.",
      outcome: "The platform scaled to more than 100,000 users worldwide.",
      featured: true,
      accent: "ink",
    },
    {
      slug: "eezly",
      name: "eezly",
      description:
        "A grocery price comparison app used across Quebec, built on barcode lookup and multi-store list optimisation.",
      productType: "Grocery price comparison app",
      role: "Technical Lead, architecture and delivery",
      impact: "More than 10,000 downloads across Quebec.",
      overview:
        "eezly compares grocery prices across Quebec supermarkets, so a shopping list can be built around what each store actually charges that week.",
      responsibilities: [
        "Lead architecture and delivery for the app alongside the other Byteimpulse platforms.",
        "Own the backend and integration architecture behind barcode lookup and multi-store list optimisation.",
      ],
      approach: [
        "Barcode lookup resolves a product to its listings across nearby stores.",
        "List optimisation compares a full basket across stores rather than one item at a time.",
      ],
      technologies: ["Flutter", "Node.js"],
      collaboration:
        "Built with the Byteimpulse engineering team as one of the three platforms I lead.",
      outcome: "The app has passed 10,000 downloads across Quebec.",
      links: [
        {
          label: "Google Play",
          href: "https://play.google.com/store/apps/details?id=com.eezly.groceryapp",
        },
        {
          label: "App Store",
          href: "https://apps.apple.com/ca/app/eezly-compare-grocery-prices/id6446444139",
        },
      ],
      featured: true,
      accent: "warm",
    },
    {
      slug: "bookjane",
      name: "BookJane J360",
      description:
        "Android engineering on a healthcare workforce platform used across Canada, the US, and the UK.",
      productType: "Healthcare workforce platform",
      role: "Senior Mobile Engineer",
      overview:
        "J360 is the scheduling and staffing platform healthcare, long-term care, hospital, and staffing organisations use to fill shifts.",
      responsibilities: [
        "Provided Android engineering for J360 inside an established production codebase serving live scheduling operations.",
        "Delivered fixes, feature improvements, and release support with minimal disruption to live operations.",
        "Worked directly with remote stakeholders to clarify requirements and resolve technical issues.",
        "Took ownership from issue discovery through implementation, validation, and release.",
      ],
      technologies: ["Android", "Kotlin", "GraphQL", "REST APIs", "Firebase"],
      collaboration:
        "Worked as the Android engineer inside BookJane's existing product team, coordinating across time zones from Lahore.",
      outcome:
        "Shipped into a live platform used by healthcare, long-term care, hospital, and staffing organisations across Canada, the US, and the UK.",
      links: [{ label: "bookjane.com", href: "https://bookjane.com" }],
      featured: true,
      accent: "slate",
    },
  ] as CaseStudy[],
  alsoShipped: [
    {
      name: "YellowBeard",
      productType: "Smart coffee ordering platform",
      note: "Cross-platform mobile features for ordering and payments.",
      href: "https://play.google.com/store/apps/details?id=com.yellowbeard.yb",
    },
    {
      name: "Minplan",
      productType: "Mental health safety planning app",
      note: "Flutter features supporting personalised safety plans for healthcare organisations.",
    },
  ] as AlsoShipped[],
  workMethod: [
    {
      title: "Clarify",
      text: "Turn a vague requirement into scope, constraints, and a delivery plan.",
    },
    {
      title: "Design",
      text: "Choose the architecture and integration approach the product actually needs.",
    },
    {
      title: "Guide",
      text: "Support the team through implementation, review, and the hard problems.",
    },
    {
      title: "Deliver",
      text: "Take it through testing, release, and production support.",
    },
  ],
  // Verified against the corrected LinkedIn export of 28 August 2026.
  experience: [
    {
      company: "Byteimpulse",
      title: "Technical Lead",
      period: "Aug 2025 to Present",
      location: "Lahore, Pakistan",
      summary:
        "Architecture and delivery across three production platforms: Babel, SrvQube, and eezly.",
      achievements: [
        "Architected Babel's compliance and finance tooling, including automated Stripe dues collection, reserve fund tracking, and the AI assistant used for analysis and drafting.",
        "Designed SrvQube's offline-first billing architecture, which brought counter checkout time down to 30 seconds.",
        "Own backend and AI automation architecture on Node.js, Express.js, MySQL, and n8n, including LLM integration into product features.",
        "Own release engineering across the platforms, running services on Linux VPS infrastructure and building CI/CD pipelines in GitHub Actions.",
      ],
      current: true,
    },
    {
      company: "Jovian Digital",
      title: "Senior Software Engineer",
      period: "Jul 2023 to Jul 2025",
      location: "Fountain, CO, remote",
      summary:
        "Led development and architecture for UBQ, a gamified business learning platform that scaled past 100,000 users worldwide.",
      achievements: [
        "Built the quest and reward engine, the multi-tier subscription and unlock system, and the real-time messaging layer.",
        "Established the Flutter application architecture and state management patterns adopted across the codebase.",
        "Maintained production stability through release support, crash analysis, and continuous quality work at scale.",
      ],
    },
    {
      company: "BookJane",
      title: "Senior Mobile Engineer",
      period: "Jul 2023 to Jan 2024",
      location: "Toronto, ON, remote",
      summary:
        "Android engineering on the J360 workforce platform used across Canada, the US, and the UK.",
      achievements: [
        "Delivered fixes, feature improvements, and release support inside an established production codebase serving live scheduling operations.",
        "Worked directly with remote stakeholders to clarify requirements and resolve issues with minimal disruption.",
      ],
    },
    {
      company: "Tech Scale",
      title: "Senior Software Engineer",
      period: "Mar 2022 to Jul 2023",
      location: "Pakistan",
      summary:
        "Mobile and backend delivery across Flutter, Android, Node.js, Express.js, and MySQL.",
      achievements: [
        "Delivered features spanning payments, maps, chat, subscriptions, and early AI integrations.",
        "Owned delivery from planning through implementation, testing, deployment, and post-release support.",
      ],
    },
    {
      company: "Techsila",
      title: "Mobile Engineer",
      period: "Jun 2021 to Feb 2022",
      location: "Pakistan",
      summary: "Built a learning management system mobile app from the ground up.",
      achievements: [
        "Owned the work from initial architecture through release on a greenfield project with no existing codebase.",
      ],
    },
    {
      company: "Geeklone Technology",
      title: "Mobile Engineer",
      period: "May 2020 to Jun 2021",
      location: "Lahore, Pakistan",
      summary: "Delivered multiple Android and Flutter projects, new builds and existing codebases.",
      achievements: [
        "Worked across the full delivery cycle on each project, from implementation through release.",
      ],
    },
    {
      company: "Al Marhaba Cars and Bikes Rental",
      title: "Android Developer",
      period: "May 2019 to May 2020",
      location: "Lahore, Pakistan",
      summary: "Android applications for a UAE service provider operating in Dubai.",
      achievements: [
        "Delivered booking and service provider applications end to end, working with a Dubai-based team across time zones.",
      ],
    },
    {
      company: "NIC Lahore",
      title: "Android Application Developer",
      period: "Nov 2018 to Apr 2019",
      location: "Lahore, Pakistan",
      summary: "Sole mobile developer on a commercial sensor monitoring application.",
      achievements: [
        "Delivered features for real-time monitoring of water flow rate, volume, and velocity from connected sensor data.",
      ],
    },
  ] as ExperienceEntry[],
  education: {
    degree: "BS Computer Science",
    institution: "Government College University (GCU), Lahore",
    period: "2014 to 2018",
  },
  languages: ["English, professional working", "Urdu, native"],
  resume: {
    path: withBasePath("/Irfan-Akram-Resume.pdf"),
    lastUpdated: "",
    // Set flags.resumeAvailable to true once a PDF matching the timeline above is in public/.
  },
  contact: {
    ...contact,
    availability:
      "Open to full-time Technical Lead and Lead Software Engineer roles. Based in Lahore, available for Gulf relocation and international remote work.",
  },
  social: [
    { label: "LinkedIn", href: contact.linkedIn },
    { label: "GitHub", href: contact.github },
    { label: "Stack Overflow", href: contact.stackOverflow },
  ],
  assets: {
    ogImage: absoluteUrl("/images/irfan-akram-portfolio-og.png"),
    favicon: withBasePath("/favicon.svg"),
    screenshotDirectory: withBasePath("/images/projects/"),
  },
} as const;

export type Portfolio = typeof portfolio;

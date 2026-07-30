/**
 * All resume content lives here, mirrored from the EU CV
 * (career-eu-print-v3.html). Everything in this file is public:
 * deliberately NO email, phone, street address, birthdate, or
 * personal-status data (see the contact-details rule in the docs).
 */

export const bio = {
  name: "Marco Montesines",
  role: "Head of Software Development",
  tagline: "Senior Software Developer",
  about:
    "Innovative software development leader with 23+ years designing, building and operating scalable, high-performance systems across finance, search, travel, education and the non-profit sector. Versatile developer and hands-on architect — skilled in backend services, data platforms, distributed real-time systems and leading teams from concept to production. Known for bridging technology and business, mentoring developers, and delivering measurable results in every role since 2002.",
  languages: "English (Native) · Tagalog (Native) · German (B1 certificate)",
  links: [
    { label: "GitHub", href: "https://github.com/marco-montesines" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mamontesines" },
    { label: "GitLab", href: "https://gitlab.com/marco.montesines" },
    {
      label: "pkg.go.dev",
      href: "https://pkg.go.dev/github.com/marco-montesines/haveibeenpwned",
    },
  ],
};

export interface Station {
  period: string;
  role: string;
  org: string;
  note: string;
}

/**
 * Employers are deliberately generalized to industry descriptors and no
 * locations are shown — the named CV is shared directly, not published here.
 */
export const experience: Station[] = [
  {
    period: "12.2021 – Present",
    role: "Head of Software Development",
    org: "Financial-media group",
    note: "Leads the group's software development — sets technical strategy, manages the technical-infrastructure budget, licensing and vendors, and coaches the team. Architects, builds and operates the applications, services and data platforms behind 20+ financial portals: backend services, real-time market-data systems and self-hosted search/analytics on a self-managed multi-cloud. Drove a full migration off legacy hosting to a cost-optimised estate (−68% cloud cost), modernised CI/CD, and introduced AI-assisted development with humans in control. Has led a team of up to ~10 internal developers (incl. a reporting co-lead); directs external digital agencies and technical software consultants.",
  },
  {
    period: "03.2016 – 11.2021",
    role: "Lead / Senior Software Developer",
    org: "Digital agency",
    note: "Backend lead for a public search engine — one of Germany's largest local search engines (~10M page impressions/month) — and its data warehouse. Owned architecture, APIs, database design, indexing and data pipelines, plus machine learning (topic modeling, SVM classification) at scale. Also delivered web-fulfilment and Big-Data BI products for agency clients.",
  },
  {
    period: "03.2009 – 02.2016",
    role: "Technical Web Lead Europe / Technical Lead DACH",
    org: "Online travel group",
    note: "European technical lead for one of the continent's largest online travel groups — responsible for site usability, technical integrity, security and integration across 12 countries, 2 brands and 8 languages. Progressed from Webmaster (03.2009–11.2009) to Technical Lead DACH (11.2009–02.2015) and then Technical Web Lead Europe (02.2015–02.2016), guiding technical decisions with brand, product and country teams, coordinating on-/off-shore colleagues in Europe, the USA and India, and running feasibility reviews of new marketing and technology solutions. Owned security-server checks for the annual TÜV certification (complementary to SOX/PCI). 3i Innovation Award (2011).",
  },
  {
    period: "03.2006 – 12.2008",
    role: "Team Leader / Senior Software Developer",
    org: "Software development company",
    note: "Led a 5-developer team building a large financial mortgage-origination system — technical design, implementation, and international client delivery for customers in the Netherlands.",
  },
  {
    period: "09.2002 – 03.2006",
    role: "Early Career — Non-Profit & Academia",
    org: "International organizations & education",
    note: "Computer Science instructor and lab administrator; web/CMS development and intranet standards for international non-profit organizations.",
  },
];

export const education = [
  {
    period: "06.1997 – 03.2002",
    degree: "Bachelor of Science in Computer Engineering (five-year programme)",
    school: "Don Bosco Technical College",
    focus:
      "Software Engineering and Engineering Management; Microprocessors, Operating Systems, Management Information Systems; Data Communications & Design Project; Advanced Logic Circuits; Computer System Architecture & Design",
  },
  {
    period: "06.1993 – 03.1997",
    degree:
      "High School with Academic & Technical Secondary Course with Specialization in Computers",
    school: "Don Bosco Technical College",
    focus: "Computer System Architecture, Design & Programming",
  },
];

/** Weiterbildung — kept separate from formal education, as on the CV. */
export const training = [
  {
    period: "12.2008 – 10.2009",
    degree: "German Language Course",
    school: "Euro Schule",
    focus: "",
  },
  {
    period: "07.2004 – 09.2004",
    degree: "German Course I–II",
    school: "Institut für Sprachvermittlung",
    focus: "",
  },
];

export const achievements = [
  {
    title: "Real-Time Market-Data Platform",
    note: "Architected and delivered a real-time market-data platform across 20+ portals — 99% uptime for business-critical systems and 99.9% average availability across all production applications, with average incident-handling time down ~30%.",
  },
  {
    title: "Cloud Cost Optimization",
    note: "Migrated legacy hosting to a self-managed cloud with cost-aware routing, cutting cloud costs by 68% and external data-service costs by 84%.",
  },
  {
    title: "Search & Analytics at Scale",
    note: "Builds and operates self-hosted search and analytics over 2B+ documents and 1.64B rows, with millisecond-range queries and 100× faster indexing.",
  },
  {
    title: "CI/CD Modernization & Self-Healing Ops",
    note: "Modernized CI/CD (−35% pipeline duration) and stood up self-healing operations across 54 hosts with zero post-cutover failures.",
  },
  {
    title: "AI-Accelerated Engineering",
    note: "Adopted LLM/AI tooling (Claude Code, RAG) across development, code review and CI/CD to speed up delivery and automate routine work — with humans in control.",
  },
];

export const competencies = [
  { name: "Software Architecture & System Design", pct: 95 },
  { name: "Backend Development (Go · Python · PHP)", pct: 95 },
  { name: "Databases & Data Platforms", pct: 92 },
  { name: "Distributed & Real-time Systems", pct: 90 },
  { name: "Cloud, DevSecOps & AI", pct: 90 },
  { name: "Reliability, Observability & SLOs (SRE)", pct: 88 },
  { name: "Technical Leadership & Mentoring", pct: 92 },
  { name: "Application & Infrastructure Security", pct: 85 },
  { name: "Performance & Scalability", pct: 92 },
  { name: "Agile · Full Lifecycle Delivery", pct: 90 },
];

/** One rated skill. `level` is the CV's 5-dot self-assessment, mirrored exactly. */
export interface Skill {
  name: string;
  level: number;
}

/** The v3 CV replaced the chip list with a rated matrix: 8 categories, 42 skills. */
export const skills: Record<string, Skill[]> = {
  Languages: [
    { name: "Go (Golang)", level: 5 },
    { name: "Python", level: 5 },
    { name: "PHP", level: 5 },
    { name: "JavaScript / TypeScript", level: 4 },
    { name: "SQL", level: 5 },
    { name: "Bash / Shell", level: 4 },
    { name: "C/C++ · C#", level: 3 },
  ],
  "Data & Storage": [
    { name: "PostgreSQL", level: 5 },
    { name: "MySQL / MariaDB", level: 5 },
    { name: "ClickHouse", level: 4 },
    { name: "OpenSearch / Elasticsearch / SOLR", level: 4 },
    { name: "Redis / Dragonfly", level: 4 },
    { name: "MSSQL / SQLite", level: 4 },
  ],
  "Cloud & Containers": [
    { name: "Hetzner", level: 5 },
    { name: "AWS", level: 4 },
    { name: "Google Cloud", level: 3 },
    { name: "DigitalOcean", level: 4 },
    { name: "Cloudflare", level: 4 },
    { name: "Docker / Compose", level: 4 },
    { name: "Kubernetes", level: 3 },
  ],
  "DevSecOps & IaC": [
    { name: "GitLab CI/CD", level: 5 },
    { name: "Ansible", level: 4 },
    { name: "Terraform / OpenTofu / Terragrunt", level: 4 },
    { name: "Git / SVN", level: 5 },
    { name: "Prometheus / Grafana", level: 4 },
    { name: "S3 / Backblaze B2", level: 4 },
  ],
  Security: [
    { name: "AppSec & Hardening", level: 4 },
    { name: "SAST / secret-scan (gitleaks · govulncheck)", level: 4 },
    { name: "WireGuard / VPN", level: 4 },
  ],
  "AI / LLM Engineering": [
    { name: "AI-assisted dev (Claude Code)", level: 5 },
    { name: "RAG pipelines", level: 4 },
    { name: "Multi-model gateway (Portkey)", level: 4 },
    { name: "On-device / WebLLM", level: 3 },
  ],
  "APIs & Web": [
    { name: "REST / HTTP", level: 5 },
    { name: "gRPC", level: 4 },
    { name: "GraphQL", level: 3 },
    { name: "WebSocket / SSE", level: 4 },
    { name: "Nginx · Apache · Traefik · Caddy", level: 4 },
  ],
  "Frameworks & CMS": [
    { name: "Gin / Django", level: 4 },
    { name: "Laravel / Symfony / Yii", level: 4 },
    { name: "WordPress", level: 4 },
    { name: "jQuery", level: 4 },
  ],
};

/** The CV's legend under the matrix — without it the dots mean nothing. */
export const skillsNote: string =
  "Self-assessment · five dots = expert / daily use, three = solid working proficiency.";

export const recognition = [
  {
    title: "Grade-1 Work References",
    note: "All top grade (Note 1): “stets zu unserer vollsten Zufriedenheit” (financial-media group & travel group) and “in jeder Hinsicht unsere vollste Anerkennung” (agency) — both the top German mark; conduct rated “stets vorbildlich”.",
  },
  {
    title: "Direct Executive Recognition",
    note: "“Super Job Marco! Danke” — Managing Director, on a zero-downtime infrastructure cutover.",
  },
  {
    title: "23+ Years, Growing Trust",
    note: "From developer to Head of Software Development — repeatedly entrusted with mission-critical scope since 2002.",
  },
  {
    title: "Retained Through Leadership Change",
    note: "Kept and top-graded across repeated management changes — multiple managing directors at the online travel group, a CEO change at the digital agency; each interim reference triggered by their leadership change, never by his performance.",
  },
];

export const award = {
  title: "“3i Award — Innovation”",
  org: "2011",
  note: "Company-wide recognition for outstanding contribution and innovation at one of Europe's largest online travel groups.",
};

export const recommendations = [
  {
    quote:
      "His technical knowledge and willingness to innovate were always a breath of fresh air. Someone like him is a must-have in any development team.",
    who: "Woody Hennekam · Global eCommerce & Web Analytics · ebookers (2015)",
  },
  {
    quote:
      "Not just focused on his own tasks, but on improving tools and processes. A highly skilled technical leader with the rare ability to understand both technological and business drivers — a great performer!",
    who: "Patrick Arbus · Marketing Transformation Leader — CRM, Data & AI · ebookers (2011)",
  },
];

export const projects = [
  {
    name: "haveibeenpwned",
    href: "https://marco-montesines.github.io/haveibeenpwned/",
    note: "Unofficial Go client for the Have I Been Pwned API v3 — library, CLI, HTTP API, and FrankenPHP extension.",
  },
  {
    name: "maagaparuga",
    href: "https://marco-montesines.github.io/maagaparuga/",
    note: "Open-source research and educational care-platform framework — telemedicine records, biotelemetry ingest, and assessment scoring for care teams.",
  },
];

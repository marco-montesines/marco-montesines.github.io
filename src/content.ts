/**
 * All resume content lives here, mirrored from the EU CV
 * (career-eu-print-v2.html). Everything in this file is public:
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
    note: "Architects, manages and builds the group's software applications, services and data platforms across 20+ portals — backend services, real-time systems, search/analytics platforms and cloud infrastructure. Team of up to ~10 developers.",
  },
  {
    period: "03.2016 – 11.2021",
    role: "Lead / Senior Software Developer",
    org: "Internet agency",
    note: "Backend lead for a public search engine and its data warehouse — architecture, APIs, database design, and machine learning (topic modeling, SVM classification) at scale.",
  },
  {
    period: "03.2009 – 02.2016",
    role: "Technical Web Lead Europe / Technical Lead DACH",
    org: "Online travel group",
    note: "European technical lead across 12 countries, 2 brands and 8 languages — platform performance, security, and integration for one of Europe's largest online travel groups.",
  },
  {
    period: "03.2006 – 12.2008",
    role: "Team Leader / Senior Software Developer",
    org: "Software development company",
    note: "Led a 5-developer team building a large financial mortgage system — technical design, implementation, and international client delivery (Netherlands).",
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
    degree: "Bachelor of Science in Computer Engineering",
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
    note: "Architected and delivered a real-time market-data platform across 20+ portals, sustaining 99.9% uptime for business-critical systems.",
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
  { name: "Security & Compliance", pct: 85 },
  { name: "Performance & Scalability", pct: 92 },
  { name: "Agile · Full Lifecycle Delivery", pct: 90 },
];

export const skills: Record<string, string[]> = {
  Languages: [
    "Go",
    "Python",
    "PHP",
    "JavaScript",
    "C/C++",
    "C#",
    "Java",
    "Ruby",
    "Bash",
  ],
  "Data & Storage": [
    "PostgreSQL",
    "MySQL / MariaDB",
    "MSSQL",
    "ClickHouse",
    "Elasticsearch / OpenSearch / SOLR",
    "Redis / Dragonfly",
    "S3 / S3-compatible",
  ],
  "Cloud & Infrastructure": [
    "AWS",
    "Google Cloud",
    "Hetzner",
    "DigitalOcean",
    "Docker",
    "Ansible",
    "Terraform",
    "WireGuard",
  ],
  "CI/CD, DevSecOps & Observability": [
    "GitLab CI/CD",
    "Prometheus",
    "Grafana",
    "SLO-based Alerting",
    "Kibana / Logstash",
    "Jira / Confluence / Bitbucket",
    "fleet-scanner (Go)",
    "govulncheck",
    "gitleaks",
    "ClamAV",
  ],
  "AI & LLM Engineering": [
    "Portkey (LLM gateway)",
    "Claude",
    "Gemini",
    "GPT",
    "DeepSeek",
    "RAG (Exa · Brave)",
    "Fal.ai / FLUX",
    "Nano/Pico/ZeroClaw",
  ],
  "APIs, Web & Frameworks": [
    "Kong (API gateway)",
    "REST / HTTP",
    "gRPC",
    "GraphQL",
    "WebSocket",
    "Server-Sent Events",
    "TCP",
    "SOAP",
    "Gin",
    "jQuery",
    "Django",
    "Laravel / Symfony / Yii 2/3",
    "WordPress",
    "Nginx / Apache / Traefik / Caddy / LiteSpeed",
  ],
};

export const recognition = [
  {
    title: "Grade-1 Work References",
    note: "Consistently “stets zu unserer vollsten Zufriedenheit” (top mark) across all senior roles.",
  },
  {
    title: "Direct Executive Recognition",
    note: "“Super Job Marco! Danke” — Managing Director, on a zero-downtime infrastructure cutover.",
  },
  {
    title: "23+ Years, Growing Trust",
    note: "From developer to Head of Software Development — repeatedly entrusted with mission-critical scope since 2002.",
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

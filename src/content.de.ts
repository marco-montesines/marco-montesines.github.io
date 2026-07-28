import type { Content } from "./i18n";

/**
 * German resume content, mirrored from the DE CV (career-eu-print-de-v2.html)
 * under the same public-content rules as content.ts: employers generalized
 * to industry descriptors, NO contact data, locations, or personal-status
 * data — the named CV is shared directly, not published here.
 */
export const de: Content = {
  bio: {
    name: "Marco Montesines",
    role: "Head of Software Development",
    tagline: "Senior Softwareentwickler",
    about:
      "Innovative Führungskraft in der Softwareentwicklung mit über 23 Jahren in der Konzeption, Entwicklung und im Betrieb skalierbarer, hochperformanter Systeme in den Bereichen Finanzen, Suche, Touristik, Bildung und Non-Profit. Vielseitiger Entwickler und praxisnaher Architekt — versiert in Backend-Services, Datenplattformen, verteilten Echtzeitsystemen und der Führung von Teams von der Konzeption bis in die Produktion. Bekannt dafür, Technologie und Business zu verbinden, Entwickler zu fördern und messbare Ergebnisse zu liefern — in jeder Rolle seit 2002.",
    languages:
      "Englisch (Muttersprache) · Tagalog (Muttersprache) · Deutsch (Zertifikat B1)",
    links: [
      { label: "GitHub", href: "https://github.com/marco-montesines" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/mamontesines" },
      { label: "GitLab", href: "https://gitlab.com/marco.montesines" },
      {
        label: "pkg.go.dev",
        href: "https://pkg.go.dev/github.com/marco-montesines/haveibeenpwned",
      },
    ],
  },
  experience: [
    {
      period: "12.2021 – heute",
      role: "Head of Software Development",
      org: "Finanzmedien-Konzern",
      note: "Architektur, Leitung und Entwicklung der Software-Anwendungen, Services und Datenplattformen des Konzerns über 20+ Portale hinweg — Backend-Services, Echtzeit-Systeme, Such-/Analytics-Plattformen und Cloud-Infrastruktur. Team von bis zu ~10 Entwicklern.",
    },
    {
      period: "03.2016 – 11.2021",
      role: "Lead / Senior Softwareentwickler",
      org: "Internetagentur",
      note: "Backend-Lead für eine öffentliche Suchmaschine und ihr Data Warehouse — Architektur, APIs, Datenbankdesign und Machine Learning (Topic Modeling, SVM-Klassifikation) im großen Maßstab.",
    },
    {
      period: "03.2009 – 02.2016",
      role: "Technical Web Lead Europe / Technical Lead DACH",
      org: "Online-Reisekonzern",
      note: "Technischer Lead Europa über 12 Länder, 2 Marken und 8 Sprachen — Plattform-Performance, Sicherheit und Integration für einen der größten Online-Reisekonzerne Europas.",
    },
    {
      period: "03.2006 – 12.2008",
      role: "Teamleiter / Senior Softwareentwickler",
      org: "Softwareentwicklungs-Unternehmen",
      note: "Führung eines 5-köpfigen Entwicklerteams beim Aufbau eines großen Finanz-Hypothekensystems — technisches Design, Implementierung und internationale Kundenbetreuung (Niederlande).",
    },
    {
      period: "09.2002 – 03.2006",
      role: "Frühe Laufbahn — Non-Profit & Lehre",
      org: "Internationale Organisationen & Bildung",
      note: "Dozent für Informatik und Administrator des Computerlabors; Web-/CMS-Entwicklung und Intranet-Standards für internationale Non-Profit-Organisationen.",
    },
  ],
  education: [
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
  ],
  training: [
    {
      period: "12.2008 – 10.2009",
      degree: "Deutsch-Sprachkurs",
      school: "Euro Schule",
      focus: "",
    },
    {
      period: "07.2004 – 09.2004",
      degree: "Deutschkurs I–II",
      school: "Institut für Sprachvermittlung",
      focus: "",
    },
  ],
  achievements: [
    {
      title: "Echtzeit-Marktdatenplattform",
      note: "Aufbau und Bereitstellung einer Echtzeit-Marktdatenplattform über 20+ Portale mit 99,9 % Verfügbarkeit für geschäftskritische Systeme.",
    },
    {
      title: "Optimierung der Cloud-Kosten",
      note: "Migration von Legacy-Hosting auf eine self-managed Cloud mit cost-aware Routing: −68 % Cloud-Kosten und −84 % externe Datendienst-Kosten.",
    },
    {
      title: "Suche & Analytics im großen Maßstab",
      note: "Aufbau und Betrieb self-hosted Such- und Analytics-Systeme über 2 Mrd.+ Dokumente und 1,64 Mrd. Zeilen — Antworten im Millisekundenbereich, 100× schnellere Indexierung.",
    },
    {
      title: "CI/CD-Modernisierung & self-healing Ops",
      note: "Modernisierung der CI/CD (−35 % Pipeline-Dauer) und Aufbau von self-healing Operations über 54 Hosts — ohne Ausfälle nach der Umstellung.",
    },
    {
      title: "KI-gestützte Entwicklung",
      note: "LLM/AI-Tooling (Claude Code, RAG) in Entwicklung, Code-Review und CI/CD eingeführt — schnellere Auslieferung und automatisierte Routinearbeit bei voller menschlicher Kontrolle.",
    },
  ],
  competencies: [
    { name: "Softwarearchitektur & Systemdesign", pct: 95 },
    { name: "Backend-Entwicklung (Go · Python · PHP)", pct: 95 },
    { name: "Datenbanken & Datenplattformen", pct: 92 },
    { name: "Verteilte & Echtzeit-Systeme", pct: 90 },
    { name: "Cloud, DevSecOps & AI", pct: 90 },
    { name: "Zuverlässigkeit, Observability & SLOs (SRE)", pct: 88 },
    { name: "Technische Führung & Mentoring", pct: 92 },
    { name: "Sicherheit & Compliance", pct: 85 },
    { name: "Performance & Skalierbarkeit", pct: 92 },
    { name: "Agile · Full-Lifecycle-Delivery", pct: 90 },
  ],
  skills: {
    Sprachen: [
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
    "Daten & Storage": [
      "PostgreSQL",
      "MySQL / MariaDB",
      "MSSQL",
      "ClickHouse",
      "Elasticsearch / OpenSearch / SOLR",
      "Redis / Dragonfly",
      "S3 / S3-compatible",
    ],
    "Cloud & Infrastruktur": [
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
    "KI & LLM Engineering": [
      "Portkey (LLM-Gateway)",
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
  },
  recognition: [
    {
      title: "Arbeitszeugnisse der Note 1",
      note: "In allen Senior-Positionen durchgängig „stets zu unserer vollsten Zufriedenheit“ (Bestnote).",
    },
    {
      title: "Direkte Anerkennung der Führung",
      note: "„Super Job Marco! Danke“ — Geschäftsführer, zu einer Infrastruktur-Umstellung ohne Ausfallzeit.",
    },
    {
      title: "23+ Jahre, wachsendes Vertrauen",
      note: "Von der Entwicklung bis zur Leitung — wiederholt mit geschäftskritischen Aufgaben betraut, seit 2002.",
    },
  ],
  award: {
    title: "„3i Award — Innovation“",
    org: "2011",
    note: "Unternehmensweite Auszeichnung für herausragenden Beitrag und Innovation bei einem der größten Online-Reisekonzerne Europas.",
  },
  recommendations: [
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
  ],
  projects: [
    {
      name: "haveibeenpwned",
      href: "https://marco-montesines.github.io/haveibeenpwned/",
      note: "Inoffizieller Go-Client für die Have I Been Pwned API v3 — Bibliothek, CLI, HTTP-API und FrankenPHP-Extension.",
    },
    {
      name: "maagaparuga",
      href: "https://marco-montesines.github.io/maagaparuga/",
      note: "Open-Source-Framework für Forschung und Lehre rund um Pflegeplattformen — Telemedizin-Akten, Biotelemetrie-Ingest und Assessment-Scoring für Behandlungsteams.",
    },
  ],
};

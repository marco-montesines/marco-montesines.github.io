import { createContext, useContext } from "react";
import * as en from "./content";
import { de } from "./content.de";

export type Locale = "en" | "de";

export interface Content {
  bio: typeof en.bio;
  experience: typeof en.experience;
  education: typeof en.education;
  achievements: typeof en.achievements;
  competencies: typeof en.competencies;
  skills: typeof en.skills;
  recognition: typeof en.recognition;
  award: typeof en.award;
  recommendations: typeof en.recommendations;
  projects: typeof en.projects;
}

const EN: Content = {
  bio: en.bio,
  experience: en.experience,
  education: en.education,
  achievements: en.achievements,
  competencies: en.competencies,
  skills: en.skills,
  recognition: en.recognition,
  award: en.award,
  recommendations: en.recommendations,
  projects: en.projects,
};

export const CONTENT: Record<Locale, Content> = { en: EN, de };

/** Chrome/UI strings that aren't resume data. Terminal stays English. */
export const UI = {
  en: {
    // section headings
    professionalExperience: "Professional Experience",
    keyAchievements: "Key Achievements",
    education: "Education",
    recognition: "Recognition",
    coreCompetencies: "Core Competencies",
    techStack: "Technology Stack",
    languages: "Languages",
    recommendations: "Recommendations",
    focusLabel: "Focus",
    // Marco app notes
    aboutMe: "About Me",
    experienceTitle: "Experience",
    skillsTitle: "Skills",
    projectsTitle: "Projects",
    references: "References",
    certificates: "Certificates",
    diplomas: "Diplomas",
    lockedBody: "Shared privately on request — not published here.",
    lockedCta: "DM me on LinkedIn",
    // login
    passwordPlaceholder: "Enter Password",
    loginHint: "any password works — press Enter",
    // call banner
    caller: "Recruiter",
    callKind: "Harapan video call…",
    accept: "Accept",
    decline: "Decline",
    // camera app
    cameraIdle:
      "Uses your camera as a mirror. The video never leaves your device — no recording, no uploading, just you.",
    cameraOn: "Turn on camera",
    cameraOffline: "Camera feed offline — let’s connect instead.",
    // settings
    sections: {
      wallpaper: "Wallpaper",
      appearance: "Appearance",
      language: "Language & Region",
      storage: "Storage",
      about: "About",
    },
    wallpaperHint:
      "Click a wallpaper to apply it. Ones you add stay in this browser only — nothing is uploaded.",
    addWallpaper: "Add wallpaper…",
    appearanceHint: "Auto follows this device’s system preference.",
    themeAuto: "Auto",
    themeLight: "Light",
    themeDark: "Dark",
    languageLabel: "marcoOS language",
    marcoSpeaks: "Marco speaks",
    yourLocale: "Your locale",
    yourTimeZone: "Your time zone",
    yourCalendar: "Your calendar",
    storageHint: "23 years in production, allocated as:",
    storageEstimate: (usage: string, quota: string) =>
      `This site uses ${usage} MB of the ${quota} GB your browser allows it.`,
    financeTabs: ["Savings", "Loan", "Freedom"],
    contributionsLabel: "Contributions",
    interestLabel: "Interest",
    remainingDebt: "Remaining debt",
    interestPaid: "Interest paid",
    capitalLabel: "Capital",
    targetLabel: "Target",
    deTaxToggle: "German capital-gains tax (Abgeltungsteuer, 26.375 %)",
    allowanceLabel: "Saver's allowance / year",
    taxesLabel: "Taxes",
    afterTaxLabel: "After tax",
    monthlyExpenses: "Monthly expenses",
    withdrawalRate: "Withdrawal rate",
    neededCapital: "Capital needed",
    reachedIn: "Reached in",
    notReached: "not within 50 years",
    yearsWord: "years",
    startingAmount: "Starting amount",
    monthlyContribution: "Monthly contribution",
    annualReturn: "Annual return",
    years: "Years",
    futureValue: "Future value",
    totalInvested: "Total invested",
    growthEarned: "Growth earned",
    loanAmount: "Loan amount",
    annualInterest: "Annual interest",
    monthlyPayment: "Monthly payment",
    totalPaid: "Total paid",
    totalInterest: "Total interest",
    financeNote:
      "Quick estimates with monthly compounding — not financial advice.",
    // about dialog
    moreInfo: "More Info…",
    specs: [
      ["Chip", "Human Brain — 86 billion neurons"],
      ["Memory", "~2.5 PB associative (lossy, coffee-dependent)"],
      ["Power draw", "~20 W — outperforms any silicon per watt"],
      ["Uptime", "23+ years in production · 99.9%"],
      ["OS", "Marco 26.5 “Bayside”"],
      ["Languages", "English · Tagalog · German (B1)"],
    ] as [string, string][],
  },
  de: {
    professionalExperience: "Berufspraxis",
    keyAchievements: "Wesentliche Erfolge",
    education: "Ausbildung",
    recognition: "Anerkennung",
    coreCompetencies: "Kernkompetenzen",
    techStack: "Technologien",
    languages: "Sprachkenntnisse",
    recommendations: "Empfehlungen",
    focusLabel: "Schwerpunkte",
    aboutMe: "Über mich",
    experienceTitle: "Berufspraxis",
    skillsTitle: "Kompetenzen",
    projectsTitle: "Projekte",
    references: "Referenzen",
    certificates: "Zertifikate",
    diplomas: "Zeugnisse & Diplome",
    lockedBody: "Auf Anfrage persönlich — hier nicht veröffentlicht.",
    lockedCta: "Schreib mir auf LinkedIn",
    passwordPlaceholder: "Passwort eingeben",
    loginHint: "jedes Passwort funktioniert — Enter drücken",
    caller: "Recruiter",
    callKind: "Harapan-Videoanruf…",
    accept: "Annehmen",
    decline: "Ablehnen",
    cameraIdle:
      "Nutzt deine Kamera als Spiegel. Das Video verlässt dein Gerät nie — keine Aufnahme, kein Upload, nur du.",
    cameraOn: "Kamera einschalten",
    cameraOffline: "Kamera offline — lass uns stattdessen vernetzen.",
    sections: {
      wallpaper: "Hintergrundbild",
      appearance: "Darstellung",
      language: "Sprache & Region",
      storage: "Speicher",
      about: "Info",
    },
    wallpaperHint:
      "Klicke ein Hintergrundbild an, um es zu übernehmen. Eigene Bilder bleiben nur in diesem Browser — nichts wird hochgeladen.",
    addWallpaper: "Bild hinzufügen…",
    appearanceHint: "Auto folgt der Systemeinstellung dieses Geräts.",
    themeAuto: "Auto",
    themeLight: "Hell",
    themeDark: "Dunkel",
    languageLabel: "marcoOS-Sprache",
    marcoSpeaks: "Marco spricht",
    yourLocale: "Deine Locale",
    yourTimeZone: "Deine Zeitzone",
    yourCalendar: "Dein Kalender",
    storageHint: "23 Jahre in Produktion, aufgeteilt in:",
    storageEstimate: (usage: string, quota: string) =>
      `Diese Seite nutzt ${usage} MB von ${quota} GB, die dein Browser erlaubt.`,
    financeTabs: ["Sparen", "Kredit", "Freiheit"],
    contributionsLabel: "Einzahlungen",
    interestLabel: "Zinsen",
    remainingDebt: "Restschuld",
    interestPaid: "Gezahlte Zinsen",
    capitalLabel: "Kapital",
    targetLabel: "Ziel",
    deTaxToggle: "Abgeltungsteuer berücksichtigen (26,375 %)",
    allowanceLabel: "Sparerpauschbetrag / Jahr",
    taxesLabel: "Steuern",
    afterTaxLabel: "Nach Steuern",
    monthlyExpenses: "Monatliche Ausgaben",
    withdrawalRate: "Entnahmerate",
    neededCapital: "Benötigtes Kapital",
    reachedIn: "Erreicht in",
    notReached: "nicht innerhalb von 50 Jahren",
    yearsWord: "Jahren",
    startingAmount: "Startkapital",
    monthlyContribution: "Monatliche Sparrate",
    annualReturn: "Rendite p. a.",
    years: "Jahre",
    futureValue: "Endkapital",
    totalInvested: "Eingezahlt gesamt",
    growthEarned: "Erwirtschafteter Zuwachs",
    loanAmount: "Kreditsumme",
    annualInterest: "Zins p. a.",
    monthlyPayment: "Monatliche Rate",
    totalPaid: "Gesamt gezahlt",
    totalInterest: "Zinsen gesamt",
    financeNote:
      "Schnelle Schätzungen mit monatlicher Verzinsung — keine Finanzberatung.",
    moreInfo: "Weitere Infos…",
    specs: [
      ["Chip", "Menschliches Gehirn — 86 Milliarden Neuronen"],
      ["Speicher", "~2,5 PB assoziativ (verlustbehaftet, kaffeeabhängig)"],
      ["Leistung", "~20 W — schlägt jedes Silizium pro Watt"],
      ["Laufzeit", "23+ Jahre in Produktion · 99,9 %"],
      ["OS", "Marco 26.5 „Bayside“"],
      ["Sprachen", "Englisch · Tagalog · Deutsch (B1)"],
    ] as [string, string][],
  },
};

export type UIStrings = (typeof UI)["en"];

export const LocaleContext = createContext<Locale>("en");

export const useLocale = (): Locale => useContext(LocaleContext);
export const useContent = (): Content => CONTENT[useContext(LocaleContext)];
export const useUI = (): UIStrings => UI[useContext(LocaleContext)];

/** BCP-47 tag for Intl formatting under the chosen marcoOS language. */
export const intlLocale = (l: Locale): string =>
  l === "de" ? "de-DE" : "en-US";

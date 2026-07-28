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
    financeTabs: ["Savings", "Loan", "Withdrawal", "Freedom"],
    paidInLabel: "Paid in",
    gainLabel: "Capital gains",
    afterTaxTitle: "End value after taxes",
    netEarnings: "Total earnings after taxes",
    taxesWithheld: "Taxes withheld",
    infoEndValue: "Value of the plan at the end of the term, before taxes.",
    infoPaidIn: "Starting amount plus all deposits.",
    infoGain: "End value minus what you paid in — the market's contribution.",
    infoAfterTax: "End value after settling capital-gains tax at sale.",
    infoNetEarnings:
      "Your actual profit: end value after taxes minus everything you paid in — the true return on your money.",
    infoTaxesWithheld:
      "Capital-gains tax due at settlement: (gains − allowance) × the effective rate as displayed. In strict mode: gains × 70 % for ETFs, minus the allowance, × the unrounded base rate.",
    strictToggle: "Apply strict rules (unrounded tax rates)",
    infoStrict:
      "Off: the effective rates are applied exactly as displayed (e.g. 19.59 %) — like most calculators. On: the unrounded statutory chain — gains × 70 % for equity ETFs, minus allowance, × 27.99 % (= effectively 19.593 %).",
    infoStrictLoan:
      "On: the tax saving also includes the 5.5 % solidarity surcharge levied on the saved income tax (marginal rate × 1.055).",
    dynamicsToggle: "Increase savings rate yearly",
    dynamicsRate: "Yearly increase",
    infoDynamics:
      "Raises your savings rate once a year, e.g. along with salary raises.",
    faqTitle: "Questions & how this is calculated",
    faqSavings: [
      [
        "How is the final capital calculated?",
        "Interest is credited at the chosen compounding interval and immediately earns interest itself; deposits are added monthly. With the dynamics option on, the savings rate rises once a year. The chart splits the result into what you paid in and what the market added.",
      ],
      [
        "What is the German Abgeltungsteuer?",
        "A flat 25 % tax on investment gains, plus a 5.5 % solidarity surcharge on that tax — 26.375 % in total. With church tax it rises to 27.819 % (8 %) or 27.99 % (9 %). Your broker usually withholds it automatically.",
      ],
      [
        "What is the Sparerpauschbetrag?",
        "The first €1,000 of gains per person per year (€2,000 for jointly assessed couples) is tax-free, claimed via a Freistellungsauftrag. In an accumulating plan the gains realize in the year you sell, so the calculator strictly credits the allowance once, at that final settlement. If distributions or the Vorabpauschale already use it every year, the real tax can come out lower.",
      ],
      [
        "Why do ETFs have lower rates like 18.46 %?",
        "Equity funds holding at least 51 % stocks enjoy a 30 % Teilfreistellung — 30 % of the gains are tax-free, cutting the effective rate to 18.46 %. Note: accumulating ETFs also pay a small annual Vorabpauschale; this calculator simplifies by settling all tax at the end.",
      ],
      [
        "Why do other calculators show different results?",
        "Three settings explain any difference. ① Compounding: many Sparplan calculators silently compound monthly — pick the same Verzinsungsintervall. ② Allowance: most ignore the Sparerpauschbetrag — set it to 0 € to compare. ③ Rounding: by default this calculator applies the effective rates exactly as displayed (19.59 %), so with ① and ② aligned the results match parqet-style calculators to the cent; the strict-rules checkbox switches to the unrounded statutory chain (27.99 % × 0.7 = 19.593 %) instead.",
      ],
    ] as [string, string][],
    infoLoanAmount: "The amount you borrow.",
    infoLoanRate: "Nominal annual interest rate (Sollzins) of the loan.",
    infoLoanTerm: "How many years until the loan is fully repaid.",
    deductToggle: "Interest tax-deductible (rented property)",
    infoDeduct:
      "In Germany, loan interest for a rented-out property counts as Werbungskosten and reduces your taxable rental income. Owner-occupied homes get no deduction.",
    marginalRate: "Marginal income tax rate",
    infoMarginal:
      "Your top personal income tax rate — typically 30–45 %. The deduction saves interest × this rate.",
    taxSaved: "Tax saved",
    interestAfterTax: "Interest after tax",
    faqLoan: [
      [
        "How is the monthly payment calculated?",
        "As an annuity: the payment stays constant while its mix shifts — early on it is mostly interest, later mostly repayment. Formula: payment = loan × i ÷ (1 − (1+i)⁻ⁿ) with i as the monthly rate and n the number of months.",
      ],
      [
        "Are there tax options for a loan?",
        "Not the Abgeltungsteuer — that taxes investment gains, not borrowing. But if the financed property is rented out, the loan interest is deductible from rental income at your marginal income tax rate (Werbungskosten). Owner-occupied homes get no such deduction — that is what the toggle models. Strict mode additionally credits the 5.5 % solidarity surcharge on the saved tax.",
      ],
      [
        "Nominal vs. effective interest rate?",
        "The calculator uses the nominal rate (Sollzins) divided into monthly steps. The bank's advertised APR (Effektivzins) includes fees and compounding details, so a real offer is usually slightly more expensive.",
      ],
      [
        "What does the chart show?",
        "The blue line is the remaining debt per year; the olive line is the interest you have paid so far in total.",
      ],
    ] as [string, string][],
    faqWithdrawal: [
      [
        "How does a withdrawal plan work?",
        "Your capital keeps earning the assumed return while you withdraw a fixed amount every interval. The calculator solves any of the three values — needed capital, withdrawal amount, or duration — from the other two.",
      ],
      [
        "What does “deplete capital” change?",
        "On: the capital is deliberately used up over the withdrawal period — higher withdrawals, nothing left at the end. Off: you only withdraw what the returns generate, so the capital survives indefinitely.",
      ],
      [
        "How are taxes calculated here?",
        "Each period the plan earns returns; those gains are taxed at the chosen rate — after the 30 % ETF Teilfreistellung where applicable and after using up the yearly Sparerpauschbetrag — and only then is the withdrawal taken. Pick “0 % (tax-free)” to disable taxation entirely, e.g. outside Germany. This taxes gains as they accrue; a real fund sale defers part of the tax, so the result is slightly conservative.",
      ],
    ] as [string, string][],
    faqFreedom: [
      [
        "What is the 4 % rule?",
        "A rule of thumb from the US Trinity study: withdrawing about 4 % of your capital per year has historically sustained a portfolio for 30+ years. It implies you need roughly 25× your annual expenses.",
      ],
      [
        "Why is the withdrawal grossed up for taxes?",
        "You enter your desired net income, but capital gains are taxed. The calculator raises the withdrawal so that after the effective tax rate you keep the net amount — that is the “gross withdrawal / year”.",
      ],
      [
        "How is the effective tax rate composed?",
        "Base Abgeltungsteuer 26.375 % (25 % + Soli), church tax raises it to 27.819 %/27.99 %, and the 30 % ETF Teilfreistellung multiplies it by 0.7 — e.g. 26.375 % × 0.7 = 18.46 %. Austria applies a flat 27.5 % KESt. By default the rounded published ETF rates are used; the strict-rules checkbox computes the unrounded product (e.g. 19.593 %) instead.",
      ],
      [
        "How does inflation affect the target?",
        "Your target income is increased by the inflation rate for every year until freedom, and during capital depletion the plan uses the real (inflation-adjusted) return so withdrawals keep their purchasing power.",
      ],
    ] as [string, string][],
    // withdrawal calculator
    withdrawSolveOptions: ["Needed capital", "Withdrawal amount", "Duration"],
    infoWithdrawSolve: "Pick which value to calculate from the other two.",
    withdrawAmount: "Withdrawal amount",
    infoWithdrawAmount: "The amount you withdraw every interval.",
    withdrawInterval: "Withdrawal interval",
    withdrawIntervalOptions: ["Monthly", "Quarterly", "Yearly"],
    infoWithdrawInterval: "How often you withdraw money.",
    capitalDepletion: "Deplete capital",
    infoDepletion:
      "On: the capital is used up over the withdrawal period. Off: you only withdraw what the returns generate — the capital stays intact.",
    withdrawPeriod: "Withdrawal period",
    infoWithdrawPeriod: "How many years the withdrawals should last.",
    capitalLasts: "Capital lasts",
    forever: "forever — returns cover the withdrawals",
    durationFmt: (y: number, m: number) =>
      `${y} ${y === 1 ? "year" : "years"}${m ? `, ${m} ${m === 1 ? "month" : "months"}` : ""}`,
    perInterval: ["per month", "per quarter", "per year"],
    // financial freedom
    desiredNetIncome: "Desired net income / month",
    infoNetIncome:
      "What you want to live on later, after taxes, in today's money.",
    perYearApprox: (v: string) => `≈ ${v} per year`,
    ageNow: "Your age today",
    ageFree: "Age at financial freedom",
    yearsToFreedom: (n: number) =>
      `${n} ${n === 1 ? "year" : "years"} until financial freedom`,
    existingAssets: "Existing assets",
    infoAssets: "Everything already invested: stocks, ETFs, cash, real estate.",
    infoFreedomReturn:
      "Broadly diversified equity ETFs returned about 7–9 % per year before inflation over the long run.",
    inflationToggle: "Consider inflation",
    infoInflation:
      "Adjusts your target income upward so it keeps today's purchasing power.",
    inflationRate: "Inflation p. a.",
    countryTaxLabel: "Taxation",
    countryTaxOptions: ["Germany", "Austria", "Tax-free", "Custom"],
    etfRelief: "Equity ETFs: 30 % partial exemption",
    churchTaxLabel: "Church tax",
    churchTaxOptions: ["None", "8 %", "9 %"],
    effectiveTax: "Effective tax rate",
    grossPerYear: "Gross withdrawal / year",
    savingsNeeded: "Required savings rate / month",
    alreadyReached: "target already reached",
    contributionsLabel: "Contributions",
    interestLabel: "Interest",
    remainingDebt: "Remaining debt",
    interestPaid: "Interest paid",
    capitalLabel: "Capital",
    targetLabel: "Target",
    blockedNote: (host: string) =>
      `${host} doesn’t allow being embedded — open it in a new tab instead.`,
    openNewTab: "Open in new tab",
    calcTypeLabel: "Calculation type",
    calcTypeOptions: ["One-time investment", "Regular deposits"],
    intervalLabel: "Compounding interval",
    intervalOptions: ["Yearly", "Half-yearly", "Quarterly", "Monthly", "Daily"],
    infoCalcType:
      "Invest once at the start, or keep adding a savings rate on top.",
    infoStarting: "The amount you invest at the start.",
    infoMonthly: "The amount you add every month.",
    infoReturn: "Expected return per year, before taxes.",
    infoYears: "How long the money stays invested, in years.",
    infoInterval: "How often interest is credited and starts compounding.",
    infoTax:
      "Tax withheld on investment gains — pick your situation or a custom rate.",
    infoAllowance:
      "Sparerpauschbetrag: the first €1,000 of gains per person and year (€2,000 jointly) is tax-free. In the savings plan it is credited once — in the year the plan is sold and taxed.",
    infoWithdrawal:
      "The share of your capital you withdraw per year once financially free — 4 % is the classic rule of thumb.",
    taxRateLabel: "Capital-gains tax",
    taxOptions: [
      "26.375 % (DE — 25 % + solidarity surcharge)",
      "27.819 % (DE — incl. 8 % church tax)",
      "27.99 % (DE — incl. 9 % church tax)",
      "18.46 % (DE — ETF, 30 % partial exemption)",
      "19.47 % (DE — ETF + 8 % church tax)",
      "19.59 % (DE — ETF + 9 % church tax)",
      "27.5 % (AT — KESt)",
      "0 % (tax-free)",
      "Custom",
    ],
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
    financeTabs: ["Sparen", "Kredit", "Entnahme", "Freiheit"],
    paidInLabel: "Davon eingezahlt",
    gainLabel: "Kursgewinn",
    afterTaxTitle: "Endwert nach Steuern",
    netEarnings: "Gesamtertrag nach Steuern",
    taxesWithheld: "Abgeführte Steuern",
    infoEndValue: "Wert des Sparplans am Ende der Laufzeit, vor Steuern.",
    infoPaidIn: "Startkapital plus alle Einzahlungen.",
    infoGain: "Endwert minus Einzahlungen — der Beitrag des Marktes.",
    infoAfterTax:
      "Endwert nach Abzug der Kapitalertragsteuer beim Verkauf.",
    infoNetEarnings:
      "Dein tatsächlicher Gewinn: Endwert nach Steuern minus aller Einzahlungen — der echte Ertrag deines Geldes.",
    infoTaxesWithheld:
      "Fällige Kapitalertragsteuer bei der Schlussabrechnung: (Ertrag − Pauschbetrag) × Effektivsatz wie angezeigt. Im strengen Modus: Ertrag × 70 % bei ETFs, minus Pauschbetrag, × ungerundeter Basissatz.",
    strictToggle: "Strenge Regeln anwenden (ungerundete Steuersätze)",
    infoStrict:
      "Aus: Die Effektivsätze werden wie angezeigt angewendet (z. B. 19,59 %) — wie bei den meisten Rechnern. An: Die ungerundete gesetzliche Kette — Ertrag × 70 % bei Aktien-ETFs, minus Pauschbetrag, × 27,99 % (= effektiv 19,593 %).",
    infoStrictLoan:
      "An: Die Steuerersparnis berücksichtigt zusätzlich den Solidaritätszuschlag von 5,5 % auf die ersparte Einkommensteuer (Grenzsteuersatz × 1,055).",
    dynamicsToggle: "Einzahlungsdynamik aktivieren",
    dynamicsRate: "Jährliche Erhöhung",
    infoDynamics:
      "Erhöht deine Sparrate einmal pro Jahr, z. B. parallel zu Gehaltserhöhungen.",
    faqTitle: "Fragen & Berechnung",
    faqSavings: [
      [
        "Wie wird das Endkapital berechnet?",
        "Zinsen werden im gewählten Verzinsungsintervall gutgeschrieben und sofort mitverzinst; Einzahlungen fließen monatlich ein. Mit aktivierter Dynamik steigt die Sparrate einmal pro Jahr. Das Diagramm trennt Einzahlungen und Zinsertrag.",
      ],
      [
        "Was ist die Abgeltungsteuer?",
        "Eine pauschale Steuer von 25 % auf Kapitalerträge plus 5,5 % Solidaritätszuschlag auf die Steuer — insgesamt 26,375 %. Mit Kirchensteuer steigt sie auf 27,819 % (8 %) bzw. 27,99 % (9 %). Die Depotbank führt sie meist automatisch ab.",
      ],
      [
        "Was ist der Sparerpauschbetrag?",
        "Die ersten 1.000 € Ertrag pro Person und Jahr (2.000 € bei Zusammenveranlagung) sind steuerfrei — per Freistellungsauftrag. Bei einem thesaurierenden Plan realisieren sich die Gewinne im Verkaufsjahr; der Rechner rechnet den Pauschbetrag daher streng nur einmal an, bei der Schlussabrechnung. Nutzen Ausschüttungen oder die Vorabpauschale ihn schon jährlich, fällt die echte Steuer niedriger aus.",
      ],
      [
        "Warum haben ETFs niedrigere Sätze wie 18,46 %?",
        "Aktienfonds mit mindestens 51 % Aktienanteil genießen die 30-%-Teilfreistellung — 30 % der Erträge sind steuerfrei, effektiv also 18,46 %. Hinweis: Thesaurierende ETFs zahlen zusätzlich jährlich eine kleine Vorabpauschale; der Rechner vereinfacht und versteuert alles am Ende.",
      ],
      [
        "Warum zeigen andere Rechner andere Ergebnisse?",
        "Drei Einstellungen erklären jede Abweichung. ① Verzinsung: Viele Sparplanrechner rechnen stillschweigend monatlich — wähle dasselbe Verzinsungsintervall. ② Pauschbetrag: Die meisten ignorieren den Sparerpauschbetrag — setze ihn zum Vergleich auf 0 €. ③ Rundung: Standardmäßig wendet dieser Rechner die Effektivsätze exakt wie angezeigt an (19,59 %) — mit ① und ② gleichgestellt stimmen die Ergebnisse centgenau mit parqet-artigen Rechnern überein; die Checkbox „Strenge Regeln“ schaltet stattdessen auf die ungerundete gesetzliche Kette um (27,99 % × 0,7 = 19,593 %).",
      ],
    ] as [string, string][],
    infoLoanAmount: "Der Betrag, den du aufnimmst.",
    infoLoanRate: "Nominaler Jahreszins (Sollzins) des Kredits.",
    infoLoanTerm: "In wie vielen Jahren der Kredit vollständig getilgt ist.",
    deductToggle: "Zinsen steuerlich absetzbar (Vermietung)",
    infoDeduct:
      "Bei vermieteten Immobilien zählen Kreditzinsen als Werbungskosten und mindern die zu versteuernden Mieteinnahmen. Für selbstgenutztes Wohneigentum gibt es keinen Abzug.",
    marginalRate: "Persönlicher Grenzsteuersatz",
    infoMarginal:
      "Dein Spitzensteuersatz auf Einkommen — typischerweise 30–45 %. Der Abzug spart Zinsen × diesen Satz.",
    taxSaved: "Steuerersparnis",
    interestAfterTax: "Zinsen nach Steuern",
    faqLoan: [
      [
        "Wie wird die monatliche Rate berechnet?",
        "Als Annuität: Die Rate bleibt konstant, ihre Zusammensetzung verschiebt sich — anfangs überwiegen Zinsen, später die Tilgung. Formel: Rate = Kredit × i ÷ (1 − (1+i)⁻ⁿ) mit i als Monatszins und n als Monatszahl.",
      ],
      [
        "Gibt es Steuer-Optionen beim Kredit?",
        "Nicht die Abgeltungsteuer — sie besteuert Kapitalerträge, nicht das Leihen. Aber: Bei einer vermieteten Immobilie sind die Kreditzinsen als Werbungskosten von den Mieteinnahmen absetzbar — mit deinem persönlichen Grenzsteuersatz. Für selbstgenutztes Wohneigentum gilt das nicht — genau das bildet der Schalter ab. Der strenge Modus rechnet zusätzlich den Solidaritätszuschlag von 5,5 % auf die ersparte Steuer an.",
      ],
      [
        "Sollzins oder Effektivzins?",
        "Der Rechner nutzt den nominalen Sollzins in monatlichen Schritten. Der beworbene Effektivzins der Bank enthält Gebühren und Verrechnungsdetails — ein echtes Angebot ist daher meist etwas teurer.",
      ],
      [
        "Was zeigt das Diagramm?",
        "Die blaue Linie ist die Restschuld pro Jahr, die olivgrüne die bis dahin insgesamt gezahlten Zinsen.",
      ],
    ] as [string, string][],
    faqWithdrawal: [
      [
        "Wie funktioniert ein Entnahmeplan?",
        "Dein Kapital erwirtschaftet weiter die angenommene Rendite, während du pro Intervall einen festen Betrag entnimmst. Der Rechner bestimmt wahlweise Anlagevermögen, Entnahmebetrag oder Entnahmezeitraum aus den beiden anderen Werten.",
      ],
      [
        "Was ändert „Kapital aufbrauchen“?",
        "An: Das Kapital wird über den Zeitraum bewusst verbraucht — höhere Entnahmen, am Ende bleibt nichts übrig. Aus: Du entnimmst nur die Erträge, das Kapital bleibt dauerhaft erhalten.",
      ],
      [
        "Wie werden Steuern berechnet?",
        "In jeder Periode erwirtschaftet der Plan Erträge; diese werden mit dem gewählten Satz versteuert — nach der 30-%-Teilfreistellung bei ETFs und nach Verbrauch des jährlichen Sparerpauschbetrags — erst danach erfolgt die Entnahme. Mit „0 % (steuerbefreit)“ lässt sich die Besteuerung komplett abschalten, z. B. außerhalb Deutschlands. Versteuert werden die Erträge bei Entstehung; ein echter Fondsverkauf schiebt einen Teil der Steuer auf — das Ergebnis ist also leicht konservativ.",
      ],
    ] as [string, string][],
    faqFreedom: [
      [
        "Was ist die 4-%-Regel?",
        "Eine Faustregel aus der US-Trinity-Studie: Wer jährlich rund 4 % seines Kapitals entnimmt, dessen Portfolio hielt historisch 30+ Jahre durch. Daraus folgt: Du brauchst etwa das 25-Fache deiner Jahresausgaben.",
      ],
      [
        "Warum wird die Entnahme brutto gerechnet?",
        "Du gibst dein Wunsch-Nettoeinkommen an, Kapitalerträge werden aber besteuert. Der Rechner erhöht die Entnahme so, dass nach dem effektiven Steuersatz dein Netto übrig bleibt — das ist die „Brutto-Entnahme / Jahr“.",
      ],
      [
        "Wie setzt sich der effektive Steuersatz zusammen?",
        "Basis 26,375 % (25 % Abgeltungsteuer + Soli), Kirchensteuer erhöht auf 27,819 %/27,99 %, die 30-%-Teilfreistellung für Aktien-ETFs multipliziert mit 0,7 — z. B. 26,375 % × 0,7 = 18,46 %. Österreich: pauschal 27,5 % KESt. Standardmäßig gelten die gerundeten veröffentlichten ETF-Sätze; die Checkbox „Strenge Regeln“ rechnet stattdessen mit dem ungerundeten Produkt (z. B. 19,593 %).",
      ],
      [
        "Wie wirkt die Inflation?",
        "Dein Ziel-Einkommen wächst bis zur Freiheit jährlich mit der Inflationsrate; in der Verzehrphase rechnet der Plan mit der realen (inflationsbereinigten) Rendite, damit die Entnahmen ihre Kaufkraft behalten.",
      ],
    ] as [string, string][],
    // withdrawal calculator
    withdrawSolveOptions: ["Anlagevermögen", "Entnahmebetrag", "Entnahmezeitraum"],
    infoWithdrawSolve:
      "Wähle, welcher Wert aus den beiden anderen berechnet wird.",
    withdrawAmount: "Entnahmebetrag",
    infoWithdrawAmount: "Der Betrag, den du regelmäßig entnimmst.",
    withdrawInterval: "Entnahmeintervall",
    withdrawIntervalOptions: ["Monatlich", "Vierteljährlich", "Jährlich"],
    infoWithdrawInterval: "Wie oft du Geld entnimmst.",
    capitalDepletion: "Kapital aufbrauchen",
    infoDepletion:
      "An: Das Kapital wird über den Entnahmezeitraum verbraucht. Aus: Du entnimmst nur die Erträge — das Kapital bleibt erhalten.",
    withdrawPeriod: "Entnahmezeitraum",
    infoWithdrawPeriod: "Wie viele Jahre die Entnahmen reichen sollen.",
    capitalLasts: "Kapital reicht",
    forever: "für immer — die Erträge decken die Entnahmen",
    durationFmt: (y: number, m: number) =>
      `${y} ${y === 1 ? "Jahr" : "Jahre"}${m ? `, ${m} ${m === 1 ? "Monat" : "Monate"}` : ""}`,
    perInterval: ["pro Monat", "pro Quartal", "pro Jahr"],
    // financial freedom
    desiredNetIncome: "Gewünschtes Netto-Einkommen / Monat",
    infoNetIncome:
      "Wovon du später leben möchtest — nach Steuern, in heutiger Kaufkraft.",
    perYearApprox: (v: string) => `≈ ${v} pro Jahr`,
    ageNow: "Dein Alter heute",
    ageFree: "Alter bei finanzieller Freiheit",
    yearsToFreedom: (n: number) =>
      `${n} ${n === 1 ? "Jahr" : "Jahre"} bis zur finanziellen Freiheit`,
    existingAssets: "Vorhandenes Vermögen",
    infoAssets:
      "Alles bereits Investierte: Aktien, ETFs, Cash, Immobilien.",
    infoFreedomReturn:
      "Breit gestreute Aktien-ETFs erzielten langfristig etwa 7–9 % pro Jahr vor Inflation.",
    inflationToggle: "Inflation berücksichtigen",
    infoInflation:
      "Erhöht dein Ziel-Einkommen, damit es die heutige Kaufkraft behält.",
    inflationRate: "Inflation p. a.",
    countryTaxLabel: "Besteuerung",
    countryTaxOptions: ["Deutschland", "Österreich", "Steuerfrei", "Benutzerdefiniert"],
    etfRelief: "Aktien-ETFs: 30 % Teilfreistellung",
    churchTaxLabel: "Kirchensteuer",
    churchTaxOptions: ["Keine", "8 %", "9 %"],
    effectiveTax: "Effektiver Steuersatz",
    grossPerYear: "Brutto-Entnahme / Jahr",
    savingsNeeded: "Nötige Sparrate / Monat",
    alreadyReached: "Ziel bereits erreicht",
    contributionsLabel: "Einzahlungen",
    interestLabel: "Zinsen",
    remainingDebt: "Restschuld",
    interestPaid: "Gezahlte Zinsen",
    capitalLabel: "Kapital",
    targetLabel: "Ziel",
    blockedNote: (host: string) =>
      `${host} erlaubt kein Einbetten — öffne die Seite stattdessen in einem neuen Tab.`,
    openNewTab: "In neuem Tab öffnen",
    calcTypeLabel: "Berechnungsart",
    calcTypeOptions: ["Einmalige Anlage", "Regelmäßige Einzahlungen"],
    intervalLabel: "Verzinsungsintervall",
    intervalOptions: [
      "Jährlich",
      "Halbjährlich",
      "Vierteljährlich",
      "Monatlich",
      "Täglich",
    ],
    infoCalcType:
      "Einmal zu Beginn anlegen oder zusätzlich regelmäßig einzahlen.",
    infoStarting: "Der Betrag, den du zu Beginn anlegst.",
    infoMonthly: "Der Betrag, den du jeden Monat zusätzlich einzahlst.",
    infoReturn: "Erwartete Rendite pro Jahr, vor Steuern.",
    infoYears: "Wie lange das Geld angelegt bleibt, in Jahren.",
    infoInterval:
      "Wie oft Zinsen gutgeschrieben werden und mitverzinst werden.",
    infoTax:
      "Steuer auf Kapitalerträge — wähle deine Situation oder einen eigenen Satz.",
    infoAllowance:
      "Sparerpauschbetrag: Die ersten 1.000 € Ertrag pro Person und Jahr sind steuerfrei (2.000 € bei Zusammenveranlagung). Im Sparplan wird er einmal angerechnet — im Jahr des steuerpflichtigen Verkaufs.",
    infoWithdrawal:
      "Der Anteil deines Kapitals, den du nach der finanziellen Freiheit pro Jahr entnimmst — 4 % ist die klassische Faustregel.",
    taxRateLabel: "Kapitalertragsteuer",
    taxOptions: [
      "26,375 % (25 % + Solidaritätszuschlag)",
      "27,819 % (mit Kirchensteuer 8 %)",
      "27,99 % (mit Kirchensteuer 9 %)",
      "18,46 % (ETF mit 30 % Teilfreistellung)",
      "19,47 % (ETF + Kirchensteuer 8 %)",
      "19,59 % (ETF + Kirchensteuer 9 %)",
      "27,5 % (KESt, Österreich)",
      "0 % (steuerbefreit)",
      "Benutzerdefiniert",
    ],
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

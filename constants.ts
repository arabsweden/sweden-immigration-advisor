import React from 'react';
import { 
  Briefcase, 
  Users, 
  GraduationCap, 
  ShieldAlert, 
  Building,
  Scale, 
  TrendingUp,
  Heart
} from 'lucide-react';

export interface VisaStep {
  title: string;
  description: string;
}

export interface VisaFAQ {
  q: string;
  a: string;
}

export interface VisaDetail {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  requirements: string[];
  documents: string[];
  applicationSteps: VisaStep[];
  faqs: VisaFAQ[];
  processingTime: string;
  fees: string;
  maintenance: string;
  maintenanceDetails: {
    monthlyAmount: string;
    conditions: string[];
  };
  color: string;
  relatedQuestions: string[];
  officialLink: string;
}

export const getVisaData = (lang: 'ar' | 'en' | 'sv'): VisaDetail[] => {
  if (lang === 'sv') {
    return [
      {
        id: 'work',
        title: 'Arbetstillstånd',
        icon: React.createElement(Briefcase, { className: "text-blue-600" }),
        color: 'blue',
        description: 'För yrkesverksamma som har fått ett jobberbjudande från en svensk arbetsgivare.',
        requirements: [
          'Officiellt jobberbjudande med en lön på minst 80% av medianlönen (ca 28 000 SEK, stigande till 33 390 för permanent uppehållstillstånd).',
          'Arbetsgivaren måste ha annonserat tjänsten i Sverige/EU i minst 10 dagar.',
          'Försäkringar (hälsa, liv, pension) som matchar svenska fackliga standarder.',
          'Giltigt pass.'
        ],
        documents: [
          'Fullständiga kopior av pass.',
          'Anställningserbjudande signerat av arbetsgivaren.',
          'Yttrande från relevant fackförbund.',
          'Kvitto på betald ansökningsavgift.',
          'Bevis på svenskt bankkonto för löneinsättningar.',
          'Bekräftelse på arbetsgivarens registrering hos Skatteverket.'
        ],
        applicationSteps: [
          { title: 'Arbetsgivaren påbörjar', description: 'Din arbetsgivare startar ansökan via Migrationsverkets e-tjänst.' },
          { title: 'Arbetstagarens del', description: 'Du får ett e-postmeddelande för att slutföra din del, ladda upp dokument och betala avgiften.' },
          { title: 'Biometri', description: 'Boka tid hos en svensk ambassad eller Migrationsverket för fingeravtryck och foto.' },
          { title: 'Beslutet', description: 'Få besked via e-tjänsten eller post. Om beviljat skickas ditt uppehållstillståndskort.' }
        ],
        faqs: [
          { q: 'Vad händer om jag förlorar mitt jobb?', a: 'Du har 3 månader på dig att hitta ett nytt jobb. Om du inte gör det kan ditt tillstånd återkallas.' },
          { q: 'Kan jag byta arbetsgivare?', a: 'Under de första 24 månaderna är tillståndet bundet till en specifik arbetsgivare och ett specifikt yrke.' }
        ],
        processingTime: '2-4 månader (certifierade arbetsgivare) - upp till 12 månader för övriga.',
        fees: '2 200 SEK.',
        maintenance: 'Lönen i kontraktet är den primära måttstocken.',
        maintenanceDetails: {
          monthlyAmount: '28 000 SEK - 33 390 SEK',
          conditions: [
            'Lönen måste vara minst 80% av medianlönen för tillfälliga tillstånd.',
            'Lönen måste nå 90% (~33 390 SEK) för permanent uppehållstillstånd.',
            'Måste inkludera tjänstepension och sjukförsäkring.',
            'Lönen måste ligga i linje med svenska kollektivavtal.'
          ]
        },
        relatedQuestions: [
          'Kan jag ta med min familj på ett arbetstillstånd?',
          'Vad händer om jag förlorar jobbet innan jag får permanent tillstånd?',
          'Hur bevisar jag lönekraven för 2026 om jag jobbar per timme?'
        ],
        officialLink: 'https://www.migrationsverket.se/Privatpersoner/Arbeta-i-Sverige/Anstalld.html'
      },
      {
        id: 'family',
        title: 'Familjeåterförening',
        icon: React.createElement(Users, { className: "text-rose-600" }),
        color: 'rose',
        description: 'För att ansluta till en partner eller föräldrar som bor i Sverige.',
        requirements: [
          'Anknytningspersonen i Sverige måste ha permanent tillstånd, medborgarskap eller skyddsstatus.',
          'Försörjningskrav: Bevisa tillräcklig inkomst och bostad.',
          'Bevis på relation (äktenskapsintyg, födelseattester).',
          'Minsta ålder är 21 år för makar i vissa fall.'
        ],
        documents: [
          'Certifierat och översatt äktenskapsintyg.',
          'Födelseattester för barn.',
          'Hyres- eller ägarkontrakt som visar antal rum.',
          'Lönespecifikationer för anknytningspersonen de senaste 6 månaderna.'
        ],
        applicationSteps: [
          { title: 'Förbered bevis', description: 'Se till att anknytningspersonen uppfyller kraven för bostad och inkomst.' },
          { title: 'Onlineansökan', description: 'Skicka in via Migrationsverkets e-tjänst. Betala avgiften vid inskick.' },
          { title: 'Frågeformulär', description: 'Anknytningspersonen i Sverige får ett formulär för att verifiera uppgifter.' },
          { title: 'Intervju', description: 'Sökanden går på intervju vid svensk ambassad i sitt hemland.' }
        ],
        faqs: [
          { q: 'Finns det språkkrav för partners?', a: 'Från 2026 måste sökande till permanent uppehållstillstånd klara prov i svenska och samhällskunskap.' },
          { q: 'Vad räknas som tillräcklig bostad?', a: 'För ett par krävs minst ett rum och kök. För barn krävs ytterligare utrymme.' }
        ],
        processingTime: '12 till 18 månader i genomsnitt.',
        fees: '2 000 SEK för vuxna, 1 000 SEK för barn.',
        maintenance: 'Efter boendekostnad, ca 10 061 SEK kvar för par.',
        maintenanceDetails: {
          monthlyAmount: 'Hyra + 10 061 SEK (för par)',
          conditions: [
            'Sponsorn måste ha inkomst som täcker hyra och normalbeloppet.',
            'Bostaden måste vara av tillräcklig storlek.',
            'Ytterligare 3 055 SEK krävs för varje barn.',
            'Ensamstående föräldrar kräver hyra + 6 090 SEK.'
          ]
        },
        relatedQuestions: [
          'Krävs svenskkunskaper för makar före ankomst 2026?',
          'Vilka är de exakta bostadskraven för en familj på 4?',
          'Kan jag ansöka om återförening om jag har ett tillfälligt asyltillstånd?'
        ],
        officialLink: 'https://www.migrationsverket.se/Privatpersoner/Flytta-till-nagon-i-Sverige.html'
      }
      , {
        id: 'study',
        title: 'Studievisum',
        icon: React.createElement(GraduationCap, { className: "text-emerald-600" }),
        color: 'emerald',
        description: 'För studenter antagna till heltidsstudier vid universitet eller högskola.',
        requirements: ['Antagen till heltidsstudier', 'Tillräckliga medel för uppehälle (10 314 SEK/mån)', 'Sjukförsäkring', 'Betald studieavgift'],
        documents: ['Antagningsbesked', 'Bankutdrag', 'Passkopia', 'Kvitto på studieavgift'],
        applicationSteps: [{title: 'Antagning', description: 'Ansök via UniversityAdmissions.se'}, {title: 'Finansiella bevis', description: 'Visa tillräckliga medel på eget konto'}],
        faqs: [{q: 'Får jag jobba?', a: 'Ja, du får arbeta vid sidan av studierna.'}],
        processingTime: '2-4 månader',
        fees: '1 500 SEK',
        maintenance: 'Minst 10 314 SEK per månad.',
        maintenanceDetails: { monthlyAmount: '10 314 SEK / Mån', conditions: ['Måste visa medel för hela första perioden', 'Eget bankkonto krävs'] },
        relatedQuestions: ['Får jag jobba under studierna?', 'Hur ansöker jag om arbetssökande-visum efter examen?'],
        officialLink: 'https://www.migrationsverket.se/Privatpersoner/Studera-i-Sverige.html'
      },
      {
        id: 'investor',
        title: 'Investeringsvisum',
        icon: React.createElement(TrendingUp, { className: "text-purple-600" }),
        color: 'purple',
        description: 'För personer som planerar betydande kapitalinvesteringar i svenska företag.',
        requirements: ['10 000 000 SEK investering', 'Affärsplan', 'Skapa 5 heltidsjobb', 'Lagligt ursprung av medel'],
        documents: ['Bankcertifikat', '5-års budget', 'Anställningsplan', 'Skatteintyg'],
        applicationSteps: [{title: 'Validering', description: 'Få affärsplanen granskad'}, {title: 'Kapitalöverföring', description: 'Överför medel till svensk bank'}],
        faqs: [{q: 'Leder detta till medborgarskap?', a: 'Ja, men standardkraven på vistelsetid gäller.'}],
        processingTime: '10-18 månader',
        fees: '2 200 SEK',
        maintenance: 'Bevis på likvida medel för 2 år.',
        maintenanceDetails: { monthlyAmount: '300 000 SEK (initialt)', conditions: ['Huvudsökande: 200 000 SEK', 'Partner: 100 000 SEK'] },
        relatedQuestions: ['Kan jag investera i fastigheter?', 'Skatteförmåner 2026?'],
        officialLink: 'https://www.migrationsverket.se/Privatpersoner/Arbeta-i-Sverige/Eget-foretag.html'
      },
      {
        id: 'religious',
        title: 'Religiös medarbetare',
        icon: React.createElement(Heart, { className: "text-cyan-600" }),
        color: 'cyan',
        description: 'För missionärer och religiös personal inbjudna att arbeta i Sverige.',
        requirements: ['Ordination/meritlista', 'Inbjudan från registrerat samfund', 'Finansiellt stöd'],
        documents: ['Ordinationsbevis', 'Inbjudningsbrev', 'SST-certifikat'],
        applicationSteps: [{title: 'Inbjudan', description: 'Samfundet skickar en formell inbjudan'}],
        faqs: [{q: 'Får jag viga par?', a: 'Endast om du är behörig vigselförrättare i Sverige.'}],
        processingTime: '2-4 månader',
        fees: '2 200 SEK',
        maintenance: 'Tillräckliga medel utan offentligt stöd.',
        maintenanceDetails: { monthlyAmount: '~13 000 SEK / Mån', conditions: ['Täcker boende och mat', 'Kan tillhandahållas av organisationen'] },
        relatedQuestions: ['Kan jag volontärarbeta?', 'Vilka organisationer kvalificerar?'],
        officialLink: 'https://www.migrationsverket.se/Privatpersoner/Arbeta-i-Sverige/Religiosa-samfund.html'
      },
      {
        id: 'self-employed',
        title: 'Eget företag',
        icon: React.createElement(Building, { className: "text-indigo-600" }),
        color: 'indigo',
        description: 'För dig som planerar att driva eget företag i Sverige.',
        requirements: ['Erfarenhet av branschen', 'Lönsam affärsplan', 'Tillräckliga medel', 'Språkkunskaper'],
        documents: ['Affärsplan', 'Meritförteckning', 'Bankintyg', 'Registreringsbevis'],
        applicationSteps: [{title: 'Strategi', description: 'Gör en 2-års prognos'}, {title: 'Granskning', description: 'Planen granskas ofta av extern expert'}],
        faqs: [{q: 'Kan jag köpa ett befintligt företag?', a: 'Ja, om du har ett bestämmande inflytande.'}],
        processingTime: '12-24 månader',
        fees: '2 200 SEK',
        maintenance: 'Bevisa försörjning för 2 år.',
        maintenanceDetails: { monthlyAmount: 'Hyra + normalbelopp', conditions: ['Företaget måste generera vinst', 'Granskas vartannat år'] },
        relatedQuestions: ['Måste jag bo i Sverige?', 'Skatteregler 2026?'],
        officialLink: 'https://www.migrationsverket.se/Privatpersoner/Arbeta-i-Sverige/Eget-foretag.html'
      },
      {
        id: 'asylum',
        title: 'Asyl och skydd',
        icon: React.createElement(Scale, { className: "text-amber-600" }),
        color: 'amber',
        description: 'För personer som söker internationellt skydd.',
        requirements: ['Fysiskt närvarande i Sverige', 'Risk för förföljelse', 'Identitetshandlingar', 'Intervju'],
        documents: ['Pass/ID', 'Bevis på hot', 'Resehandlingar'],
        applicationSteps: [{title: 'Anmälan', description: 'Anmäl dig hos Migrationsverket direkt'}, {title: 'Utredning', description: 'Grundlig intervju om din situation'}],
        faqs: [{q: 'Får jag jobba under väntetiden?', a: 'Ja, om du har bevisat din identitet (AT-UND).'}],
        processingTime: 'Varierande (6 mån - 2 år)',
        fees: 'Gratis',
        maintenance: 'Stöd från Migrationsverket under processen.',
        maintenanceDetails: { monthlyAmount: '71 SEK / Dag', conditions: ['Lägre om mat ingår i boendet', 'Inkluderar akutvård'] },
        relatedQuestions: ['Skillnad på 13 mån och 3 år?', 'Hur fungerar återvandringsbidraget?'],
        officialLink: 'https://www.migrationsverket.se/Privatpersoner/Skydd-och-asyl-i-Sverige.html'
      }
    ];
  }

  if (lang === 'en') {
    return [
      {
        id: 'work',
        title: 'Work Visa (Arbetstillstånd)',
        icon: React.createElement(Briefcase, { className: "text-blue-600" }),
        color: 'blue',
        description: 'For professionals who have obtained a job offer from a Swedish employer.',
        requirements: [
          'Official job offer with a salary of at least 80% of the median wage (approx. 28,000 SEK currently, rising to 33,390 for PR).',
          'The employer must have advertised the position in Sweden/EU for at least 10 days.',
          'Insurances (health, life, pension) matching Swedish union standards.',
          'Valid passport.'
        ],
        documents: [
          'Full copies of passport.',
          'Job offer (Anställningserbjudande) signed by employer.',
          'Letter from the relevant trade union.',
          'Fee payment receipt.',
          'Proof of Swedish bank account for salary deposits.',
          'Confirmation of employer registration with Swedish Tax Agency (Skatteverket).'
        ],
        applicationSteps: [
          { title: 'Employer Initiates', description: 'Your employer starts the application on the Migrationsverket e-service portal.' },
          { title: 'Employee Input', description: 'You receive an email to complete your part, upload documents, and pay the fee.' },
          { title: 'Biometrics', description: 'Book an appointment at a Swedish Embassy or Migration Agency center for fingerprints and photos.' },
          { title: 'The Decision', description: 'Receive notification via the e-service or mail. If approved, your permit card is sent.' }
        ],
        faqs: [
          { q: 'What happens if I lose my job?', a: 'You have 3 months from the day your employment ended to find a new job. If you do not find one, your permit may be revoked.' },
          { q: 'Can I change my employer?', a: 'During the first 24 months, your permit is tied to a specific employer and occupation. If you change jobs, you must apply for a new permit.' }
        ],
        processingTime: '2-4 months (certified employers) - up to 12 months for others.',
        fees: '2,200 SEK (first application).',
        maintenance: 'The salary stated in the contract is the primary benchmark.',
        maintenanceDetails: {
          monthlyAmount: '28,000 SEK - 33,390 SEK',
          conditions: [
            'Salary must be at least 80% of the median wage for temporary permits.',
            'Salary must reach 90% (~33,390 SEK) for Permanent Residency track.',
            'Must include occupational pension and health insurance coverage.',
            'The salary must align with Swedish collective bargaining agreements.'
          ]
        },
        relatedQuestions: [
          'Can I bring my family on a work visa and what are their conditions?',
          'What happens to my permit if I lose my job before getting PR?',
          'How do I prove the 2026 salary requirements if I work hourly?'
        ],
        officialLink: 'https://www.migrationsverket.se/English/Private-individuals/Working-in-Sweden/Permit-for-employees.html'
      },
      {
        id: 'family',
        title: 'Family Reunification',
        icon: React.createElement(Users, { className: "text-rose-600" }),
        color: 'rose',
        description: 'To join a partner or parents residing in Sweden.',
        requirements: [
          'The resident must have a permanent permit, citizenship, or protection status.',
          'Maintenance requirement: Prove sufficient income and suitable housing.',
          'Proof of relationship (marriage cert, birth certs).',
          'Minimum age is 21 for spouses in some cases.'
        ],
        documents: [
          'Certified and translated marriage certificate.',
          'Birth certificates for children.',
          'Rental or ownership contract showing number of rooms.',
          'Pay slips for the resident in Sweden for the last 6 months.'
        ],
        applicationSteps: [
          { title: 'Prepare Proof', description: 'Ensure the sponsor in Sweden meets the housing and income threshold.' },
          { title: 'Online Application', description: 'Submit via the Migration Agency e-service. Pay the fee during submission.' },
          { title: 'The Questionnaire', description: 'The sponsor in Sweden receives a questionnaire to verify details.' },
          { title: 'Interview', description: 'Applicant attends an interview at the Swedish Embassy in their home country.' }
        ],
        faqs: [
          { q: 'Is there a language requirement for partners?', a: 'By 2026, applicants for permanent residency must pass Swedish language and civic knowledge tests. Initial entry does not yet require this.' },
          { q: 'What counts as "sufficient housing"?', a: 'For a couple, you need at least one room and a kitchen. For children, additional space is required so they have their own room or share appropriately.' }
        ],
        processingTime: '12 to 18 months on average.',
        fees: '2,000 SEK for adults, 1,000 SEK for children.',
        maintenance: 'After housing, approx 10,061 SEK left for couples and 3,055 per child.',
        maintenanceDetails: {
          monthlyAmount: 'Rent + 10,061 SEK (for couples)',
          conditions: [
            'Sponsor must have enough income to cover rent and the "standard amount".',
            'Housing must be of sufficient size (e.g., 2 rooms + kitchen for a couple).',
            'Additional 3,055 SEK required for each child.',
            'Single parents require Rent + 6,090 SEK for themselves.'
          ]
        },
        relatedQuestions: [
          'Is Swedish language proficiency required for spouses before arrival in 2026?',
          'What are the exact housing specs for a family of 4?',
          'Can I apply for reunification if I hold a temporary asylum permit?'
        ],
        officialLink: 'https://www.migrationsverket.se/English/Private-individuals/Moving-to-someone-in-Sweden.html'
      },
      {
        id: 'study',
        title: 'Study Visa (Studentvisum)',
        icon: React.createElement(GraduationCap, { className: "text-emerald-600" }),
        color: 'emerald',
        description: 'For students admitted to a full-time university program or higher education.',
        requirements: [
          'Admitted to full-time studies (minimum 30 credits/semester).',
          'Sufficient funds for living expenses (approx. 10,314 SEK per month for 2026).',
          'Comprehensive health insurance (if studies are less than a year).',
          'Tuition fee first installment paid.'
        ],
        documents: [
          'University acceptance letter.',
          'Bank statements showing personal funds.',
          'Passport copies.',
          'Receipt of tuition fee payment.'
        ],
        applicationSteps: [
          { title: 'Admissions', description: 'Apply via UniversityAdmissions.se and get your letter of acceptance.' },
          { title: 'Financial Proof', description: 'Transfer funds to a personal bank account and get a certified statement.' },
          { title: 'Agency E-Service', description: 'Submit application online to Migrationsverket. Upload insurance and fee proof.' },
          { title: 'Biometrics', description: 'Visit a Swedish mission abroad to provide fingerprints and take a photo.' }
        ],
        faqs: [
          { q: 'Can I work while studying?', a: 'Yes, as a student you have the right to work alongside your studies without any specific limit on hours, provided you continue to progress in your courses.' },
          { q: 'What happens after I graduate?', a: 'You can apply for a residence permit to stay in Sweden for up to 12 months to look for work or start your own business.' }
        ],
        processingTime: '2 to 4 months.',
        fees: '1,500 SEK.',
        maintenance: 'Minimum 10,314 SEK per month for the duration of the permit.',
        maintenanceDetails: {
          monthlyAmount: '10,314 SEK / Month',
          conditions: [
            'Must show total funds for the entire first permit period (usually 10-13 months).',
            'Funds must be in a personal bank account (not sponsor\'s account).',
            'If free housing is provided, the requirement is reduced.',
            'Scholarships or grants can count towards the total amount.'
          ]
        },
        relatedQuestions: [
          'Can I work while studying in Sweden?',
          'How do I apply for a job seeker permit after graduation?',
          'What is the minimum balance required in my bank account?'
        ],
        officialLink: 'https://www.migrationsverket.se/English/Private-individuals/Studying-in-Sweden/Universities-and-university-colleges.html'
      },
      {
        id: 'investor',
        title: 'Investor & Capital Visa',
        icon: React.createElement(TrendingUp, { className: "text-purple-600" }),
        color: 'purple',
        description: 'For individuals planning substantial capital investment in Swedish businesses or innovative startups.',
        requirements: [
          'Minimum capital investment of 10,000,000 SEK in a Swedish-registered entity.',
          'A comprehensive business plan validated by a Swedish industry expert or accountant.',
          'Direct or indirect creation of at least 5 full-time permanent positions for local residents.',
          'Documented legal origin of all investment funds (Anti-Money Laundering compliance).',
          'Focus on high-growth sectors: Tech, Green Energy, or Biotechnology.'
        ],
        documents: [
          'Proof of transferrable capital (bank certified).',
          '5-year financial forecast and market analysis.',
          'Employment contracts or recruitment plan for local staff.',
          'Tax certificates and clean criminal record from home country.',
          'Articles of Association for the Swedish company.'
        ],
        applicationSteps: [
          { title: 'Business Validation', description: 'Get your business plan audited by a Swedish firm for feasibility.' },
          { title: 'Capital Transfer', description: 'Transfer required funds to a Swedish commercial bank account.' },
          { title: 'Direct Application', description: 'Submit a detailed application via the specialized self-employed unit.' },
          { title: 'Expert Interview', description: 'Attend an in-depth interview to discuss job creation and economic impact.' }
        ],
        faqs: [
          { q: 'Does this lead directly to citizenship?', a: 'No, this visa grants residency. You must fulfill the standard 8-year residency requirement and other criteria for Swedish citizenship.' },
          { q: 'Can I invest in real estate?', a: 'Passive real estate investment generally does not qualify. The investment must be in an active Swedish business that creates jobs.' }
        ],
        processingTime: '10 to 18 months (Priority processing for high-impact sectors).',
        fees: '2,200 SEK (per applicant).',
        maintenance: 'Proof of liquid assets to cover 2 years of living expenses.',
        maintenanceDetails: {
          monthlyAmount: '300,000 SEK (Initial Liquidity)',
          conditions: [
            'Main applicant must show at least 200,000 SEK in immediate personal liquidity.',
            'Partner requires 100,000 SEK and each child 50,000 SEK.',
            'Investment must remain active and audit-ready for the duration of the permit.',
            'Regular reporting to the Migration Agency on job creation progress.'
          ]
        },
        relatedQuestions: [
          'Can I use real estate investment as a basis for this visa?',
          'What are the tax benefits for foreign investors in 2026?',
          'Is there a path to citizenship through investment?'
        ],
        officialLink: 'https://www.migrationsverket.se/English/Private-individuals/Working-in-Sweden/Self-employed.html'
      },
      {
        id: 'religious',
        title: 'Religious Worker Visa',
        icon: React.createElement(Heart, { className: "text-cyan-600" }),
        color: 'cyan',
        description: 'For missionaries, ministers, and other religious staff invited to work in Sweden.',
        requirements: [
          'Ordination or religious leadership credentials (e.g., theological degree).',
          'A formal invitation from a registered religious organization in Sweden.',
          'Proof of previous religious activities and competence.',
          'Financial support agreement signed by the host organization.'
        ],
        documents: [
          'Certified copies of ordination or religious certificates.',
          'Detailed invitation letter from the Swedish religious entity.',
          'Proof of the host organization’s registration (SST certificate).',
          'Evidence of financial maintenance (guarantee letter or bank statements).'
        ],
        applicationSteps: [
          { title: 'Invitation', description: 'The Swedish religious organization sends you a formal invitation.' },
          { title: 'E-Service Entry', description: 'The host organization initiates the request via the business portal.' },
          { title: 'Confirmation', description: 'You confirm the details online, provide personal info, and pay the fee.' },
          { title: 'Biometrics', description: 'Visit an embassy or consulate for photos and fingerprints.' }
        ],
        faqs: [
          { q: 'Can I perform weddings?', a: 'Only if your organization is authorized to perform legal marriages in Sweden and you are personally certified as a celebrant by the Legal, Financial and Administrative Services Agency.' },
          { q: 'What if I am a volunteer?', a: 'If you are not receiving a salary but are supported by the organization, you must still meet the financial maintenance requirement via a support agreement.' }
        ],
        processingTime: '2 to 4 months.',
        fees: '2,200 SEK.',
        maintenance: 'Sufficient funds to cover the duration of the stay without public assistance.',
        maintenanceDetails: {
          monthlyAmount: '~13,000 SEK / Month',
          conditions: [
            'Amount must cover basic living needs and housing.',
            'Can be provided via salary, stipend, or full support from the organization.',
            'Health insurance must be provided by the organization or the applicant.',
            'Does not lead to PR directly unless standard work permit criteria are met.'
          ]
        },
        relatedQuestions: [
          'Can I perform religious work while on a volunteer visa?',
          'What organizations qualify as "religious entities" in Sweden?',
          'Does the religious visa allow my family to accompany me?'
        ],
        officialLink: 'https://www.migrationsverket.se/English/Private-individuals/Working-in-Sweden/Religious-workers.html'
      },
      {
        id: 'self-employed',
        title: 'Self-Employed / Business',
        icon: React.createElement(Building, { className: "text-indigo-600" }),
        color: 'indigo',
        description: 'For individuals planning to run their own business in Sweden.',
        requirements: [
          'Solid experience in the industry and running a business.',
          'Detailed business plan showing profitability.',
          'Sufficient funds (200,000 SEK for you, 100,000 for partner, 50,000 per child).',
          'Swedish or English language skills.'
        ],
        documents: [
          'Comprehensive business plan.',
          'Documented relevant experience.',
          'Bank statements and funding proof.',
          'Company registration documents (if existing).'
        ],
        applicationSteps: [
          { title: 'Strategy', description: 'Draft a 2-year profit forecast and market analysis for Sweden.' },
          { title: 'Bank Verification', description: 'Acquire bank certificates proving you have the required personal funds.' },
          { title: 'Application', description: 'Apply via the specialized e-service for self-employed persons.' },
          { title: 'External Review', description: 'Migrationsverket often sends the plan to an external expert for review.' }
        ],
        faqs: [
          { q: 'Can I buy an existing business?', a: 'Yes, buying an existing business is a valid route, but you must prove you have a controlling influence (at least 50% ownership) and the business can support you.' },
          { q: 'Do I need to speak Swedish?', a: 'While not mandatory for initial entry, it is highly recommended for business success and will be required if you apply for Permanent Residency in 2026.' }
        ],
        processingTime: '12 to 24 months.',
        fees: '2,200 SEK.',
        maintenance: 'Must prove you can support yourself and family for 2 years.',
        maintenanceDetails: {
          monthlyAmount: 'Rent + Standard Amount (~10k SEK)',
          conditions: [
            'Business must generate enough profit to support applicant and family.',
            'Must prove experience in the specific field or industry.',
            'The applicant must have ultimate control over the business (at least 50%).',
            'Business results are reviewed every 2 years.'
          ]
        },
        relatedQuestions: [
          'Can I buy an existing business instead of starting one?',
          'Do I need to live in Sweden to maintain this permit?',
          'What are the tax implications for new businesses in 2026?'
        ],
        officialLink: 'https://www.migrationsverket.se/English/Private-individuals/Working-in-Sweden/Self-employed.html'
      },
      {
        id: 'asylum',
        title: 'Asylum & Protection',
        icon: React.createElement(Scale, { className: "text-amber-600" }),
        color: 'amber',
        description: 'For individuals seeking international protection due to well-founded fear of persecution.',
        requirements: [
          'Must be physically present in Sweden or at the border.',
          'Proven risk of persecution, war, or inhuman treatment.',
          'Identity documents (preferred but not always mandatory).',
          'Interview with Migration Agency officers.'
        ],
        documents: [
          'Original passport or identity cards.',
          'Evidence of threats or personal situation (reports, photos, etc.).',
          'Travel documents and route details.'
        ],
        applicationSteps: [
          { title: 'Report Presence', description: 'Report to a Migration Agency application unit or border control immediately.' },
          { title: 'Identity Check', description: 'Provide documents, have fingerprints and photos taken for your LMA card.' },
          { title: 'The Interview', description: 'A thorough investigation interview with a case officer to detail your situation.' },
          { title: 'Decision', description: 'Wait for a written decision. Appeals can be made if initial rejection occurs.' }
        ],
        faqs: [
          { q: 'Can I work while waiting for a decision?', a: 'If you have submitted your passport or otherwise proven your identity, you may receive a right to work (AT-UND) while your case is processed.' },
          { q: 'What happens if my application is rejected?', a: 'You can appeal to the Migration Court. If the final decision is a rejection, you are expected to leave Sweden. "Spårbyte" to work permit from within Sweden is no longer allowed.' }
        ],
        processingTime: 'Variable (6 months to 2 years).',
        fees: 'Free.',
        maintenance: 'Supported by the Migration Agency during the process.',
        maintenanceDetails: {
          monthlyAmount: '71 SEK / Day (Daily Allowance)',
          conditions: [
            'Amount is higher if housing is not provided by the Migration Agency.',
            'Reduced amount for those living in Agency accommodation with meals.',
            'Eligibility for "AT-UND" (Right to work) if ID is established.',
            'Includes access to emergency healthcare and dental care.'
          ]
        },
        relatedQuestions: [
          'What is the difference between a 13-month and 3-year permit?',
          'Can I apply for a work permit if my asylum is rejected (Spårbyte)?',
          'How does the new voluntary return bonus work?'
        ],
        officialLink: 'https://www.migrationsverket.se/English/Private-individuals/Protection-and-asylum-in-Sweden.html'
      }
    ];
  }

  // Arabic default data
  return [
    {
      id: 'work',
      title: 'تأشيرة العمل (Arbetstillstånd)',
      icon: React.createElement(Briefcase, { className: "text-blue-600" }),
      color: 'blue',
      description: 'للمهنيين الذين حصلوا على عرض عمل من صاحب عمل في السويد.',
      requirements: [
        'وجود عرض عمل رسمي براتب لا يقل عن 80% من متوسط الأجور (حوالي 28,000 كرون حالياً، ويرتفع لـ 33,390 للإقامة الدائمة).',
        'يجب أن يكون صاحب العمل قد أعلن عن الوظيفة في السويد والاتحاد الأوروبي لمدة 10 أيام على الأقل.',
        'توفير تأمينات (صحة، حياة، تقاعد) مطابقة لمعايير النقابات السويدية.',
        'جواز سفر ساري المفعول.'
      ],
      documents: [
        'نسخ كاملة من جواز السفر.',
        'عرض العمل (Anställningserbjudande) موقع من صاحب العمل.',
        'خطاب من النقابة العمالية ذات الصلة (يطلبه صاحب العمل).',
        'إيصال دفع الرسوم.',
        'إثبات وجود حساب بنكي سويدي لإيداع الراتب.',
        'تأكيد تسجيل صاحب العمل لدى مصلحة الضرائب السويدية (Skatteverket).'
      ],
      applicationSteps: [
        { title: 'بدء الطلب من صاحب العمل', description: 'يبدأ صاحب العمل الإجراءات عبر بوابة الخدمات الإلكترونية لمصلحة الهجرة.' },
        { title: 'إدخال بيانات الموظف', description: 'ستتلقى رسالة بريد إلكتروني لإكمال الجزء الخاص بك، وتحميل المستندات ودفع الرسوم.' },
        { title: 'البصمات والصورة', description: 'احجز موعداً في السفارة السويدية أو مراكز مصلحة الهجرة لأخذ البصمات والصور الشخصية.' },
        { title: 'القرار النهائي', description: 'ستتلقى إشعاراً بالقرار عبر البريد الإلكتروني. في حال الموافقة، سيتم إرسال بطاقة الإقامة.' }
      ],
      faqs: [
        { q: 'ماذا يحدث إذا فقدت عملي؟', a: 'لديك 3 أشهر من تاريخ انتهاء عملك للعثور على وظيفة جديدة. إذا لم تجد، قد يتم إلغاء تصريح إقامتك.' },
        { q: 'هل يمكنني تغيير صاحب العمل؟', a: 'خلال أول 24 شهراً، يكون تصريحك مرتبطاً بصاحب عمل ومهنة محددة. إذا غيرت العمل، يجب التقديم على تصريح جديد.' }
      ],
      processingTime: 'من 2 إلى 4 أشهر (لأصحاب العمل المعتمدين) - حتى 12 شهراً لغير المعتمدين.',
      fees: '2,200 كرون سويدي (للطلب الأول).',
      maintenance: 'الراتب المذكور في العقد هو المعيار الأساسي.',
      maintenanceDetails: {
        monthlyAmount: '28,000 - 33,390 كرون',
        conditions: [
          'يجب أن يغطي الراتب 80% من متوسط الأجور للتصاريح المؤقتة.',
          'يجب أن يصل الراتب لـ 90% (33,390 كرون) لمسار الإقامة الدائمة.',
          'يجب شمول تأمين التقاعد المهني والتأمين الصحي.',
          'يجب أن يطابق الراتب شروط الاتفاقيات الجماعية السويدية.'
        ]
      },
      relatedQuestions: [
        'هل يمكنني إحضار عائلتي بتأشيرة العمل وما هي شروطهم؟',
        'ماذا يحدث لإقامتي إذا فقدت عملي قبل الحصول على الإقامة الدائمة؟',
        'كيف أثبت الراتب المطلوب لعام 2026 في حال كان عملي بنظام الساعات؟'
      ],
      officialLink: 'https://www.migrationsverket.se/Other-languages/Al-rbyt/Al-ml-fy-alswyd.html'
    },
    {
      id: 'family',
      title: 'لم شمل الأسرة',
      icon: React.createElement(Users, { className: "text-rose-600" }),
      color: 'rose',
      description: 'للالتحاق بالشريك أو الوالدين المقيمين في السويد.',
      requirements: [
        'يجب أن يكون الشخص المقيم في السويد حاصلاً على إقامة دائمة أو جنسية أو حماية (بشروط).',
        'شرط الإعالة: يجب أن يثبت المقيم دخلاً كافياً وسكناً مناسباً.',
        'إثبات صلة القرابة (عقد زواج، شهادات ميلاد).',
        'الحد الأدنى للسن هو 21 عاماً للزوجين في بعض الحالات.'
      ],
      documents: [
        'عقد زواج مصدق ومترجم.',
        'شهادات ميلاد للأبناء.',
        'عقد إيجار أو ملكية سكن يوضح عدد الغرف والمساحة.',
        'كشوفات راتب للمقيم في السويد لآخر 6 أشهر.'
      ],
      applicationSteps: [
        { title: 'تجهيز الإثباتات', description: 'تأكد من أن الكفيل في السويد يستوفي شروط السكن والدخل المطلوبة.' },
        { title: 'التقديم الإلكتروني', description: 'قدم الطلب عبر الخدمة الإلكترونية لمصلحة الهجرة السويدية وادفع الرسوم.' },
        { title: 'استبيان الكفيل', description: 'يتلقى الكفيل في السويد استبياناً للتحقق من تفاصيل الإعالة والسكن.' },
        { title: 'المقابلة الشخصية', description: 'يحضر المتقدم مقابلة في السفارة السويدية في بلده الأصلي للتحقق من العلاقة.' }
      ],
      faqs: [
        { q: 'هل هناك شروط لغوية للشريك؟', a: 'بحلول عام 2026، يجب على المتقدمين للحصول على الإقامة الدائمة اجتياز اختبارات اللغة السويدية والمعرفة المدنية. الدخول الأولي لا يتطلب ذلك بعد.' },
        { q: 'ماذا يعتبر "سكناً كافياً"؟', a: 'للزوجين، تحتاج على الأقل لغرفة ومطبخ. للأطفال، يُطلب مساحة إضافية بحيث يكون لديهم غرفهم الخاصة أو يتشاركونها بشكل مناسب.' }
      ],
      processingTime: 'من 12 إلى 18 شهراً كمتوسط.',
      fees: '2,000 كرون للبالغين، 1,000 كرون للأطفال.',
      maintenance: 'بعد السكن، حوالي 10,061 كرون للزوجين و3,055 لكل طفل.',
      maintenanceDetails: {
        monthlyAmount: 'الإيجار + 10,061 كرون (للزوجين)',
        conditions: [
          'يجب أن يغطي دخل الكفيل الإيجار والمبلغ المعياري.',
          'يجب أن يكون السكن بمساحة كافية (غرفتين ومطبخ كحد أدنى للزوجين).',
          'يُطلب 3,055 كرون إضافية لكل طفل.',
          'يتطلب الوالد الوحيد الإيجار + 6,090 كرون لنفسه.'
        ]
      },
      relatedQuestions: [
        'هل يشترط تعلم اللغة السويدية للشريك قبل القدوم في عام 2026؟',
        'ما هي المواصفات الدقيقة للسكن المطلوب للم شمل عائلة مكونة من 4 أفراد؟',
        'هل يمكنني التقديم على لم الشمل إذا كنت أحمل إقامة لجوء مؤقتة؟'
      ],
      officialLink: 'https://www.migrationsverket.se/Other-languages/Al-rbyt/Al-antqal-aly-shkhs-fy-alswyd.html'
    },
    {
      id: 'study',
      title: 'تأشيرة الدراسة (Studentvisum)',
      icon: React.createElement(GraduationCap, { className: "text-emerald-600" }),
      color: 'emerald',
      description: 'للطلاب المقبولين في برامج جامعية بدوام كامل أو التعليم العالي.',
      requirements: [
        'القبول للدراسة بدوام كامل (30 ساعة معتمدة كحد أدنى في الفصل الدراسي).',
        'توفر أموال كافية لتكاليف المعيشة (حوالي 10,314 كرون شهرياً لعام 2026).',
        'تأمين صحي شامل (إذا كانت الدراسة أقل من عام).',
        'دفع القسط الأول من الرسوم الدراسية.'
      ],
      documents: [
        'خطاب قبول من الجامعة.',
        'كشوفات حساب بنكي توضح الأموال الشخصية.',
        'نسخ من جواز السفر.',
        'إيصال دفع الرسوم الدراسية.'
      ],
      applicationSteps: [
        { title: 'القبول الجامعي', description: 'قدم عبر موقع UniversityAdmissions.se واحصل على خطاب القبول الرسمي.' },
        { title: 'إثبات التمويل', description: 'حول المبالغ المطلوبة لحساب بنكي شخصي واستخرج كشف حساب مصدق.' },
        { title: 'التقديم الإلكتروني', description: 'قدم الطلب عبر موقع مصلحة الهجرة وارفق إثبات التأمين ودفع الرسوم.' },
        { title: 'أخذ البصمات', description: 'توجه إلى أقرب بعثة ديبلوماسية سويدية لتصوير الوجه وأخذ بصمات الأصابع.' }
      ],
      faqs: [
        { q: 'هل يمكنني العمل أثناء الدراسة؟', a: 'نعم، كطالب لديك الحق في العمل بجانب دراستك دون حد أقصى للساعات، بشرط الاستمرار في تحقيق النجاح الدراسي.' },
        { q: 'ماذا يحدث بعد التخرج؟', a: 'يمكنك التقديم على تصريح إقامة للبقاء في السويد لمدة تصل إلى 12 شهراً للبحث عن عمل أو مشروعك الخاص.' }
      ],
      processingTime: 'من 2 إلى 4 أشهر.',
      fees: '1,500 كرون سويدي.',
      maintenance: 'ما لا يقل عن 10,314 كرون شهرياً طوال فترة التصريح.',
      maintenanceDetails: {
        monthlyAmount: '10,314 كرون / شهرياً',
        conditions: [
          'يجب إثبات التمويل لكامل فترة التصريح الأولى (عادة 10-13 شهراً).',
          'يجب أن تكون الأموال في حساب شخصي (ليس حساب الكفيل).',
          'يتم تخفيض المبلغ في حال توفر سكن مجاني موثق.',
          'يمكن احتساب المنح الدراسية ضمن المبلغ المطلوب.'
        ]
      },
      relatedQuestions: [
        'هل يمكنني العمل أثناء الدراسة في السويد؟',
        'كيف أقدم على تصريح البحث عن عمل بعد التخرج؟',
        'ما هو الحد الأدنى للرصيد المطلوب في حسابي البنكي؟'
      ],
      officialLink: 'https://www.migrationsverket.se/Other-languages/Al-rbyt/Al-drast-fy-alswyd.html'
    },
    {
      id: 'investor',
      title: 'تأشيرة المستثمر ورأس المال',
      icon: React.createElement(TrendingUp, { className: "text-purple-600" }),
      color: 'purple',
      description: 'للأفراد الذين يخططون للقيام باستثمارات رأسمالية كبيرة في الشركات السويدية الناشئة أو القائمة.',
      requirements: [
        'استثمار رأسمالي بحد أدنى 10,000,000 كرون في كيان سويدي مسجل.',
        'خطة عمل شاملة ومصادق عليها من قبل خبير صناعي أو محاسب قانوني في السويد.',
        'خلق ما لا يقل عن 5 فرص عمل بدوام كامل لمواطنين أو مقيمين سويديين بشكل مباشر.',
        'إثبات مصدر الأموال المستثمرة بشكل قانوني (الامتثال لقوانين مكافحة غسل الأموال).',
        'التركيز على قطاعات النمو العالي: التكنولوجيا، الطاقة الخضراء، أو التكنولوجيا الحيوية.'
      ],
      documents: [
        'إثبات موثق لتوفر أموال الاستثمار القابلة للتحويل (شهادة بنكية).',
        'توقعات مالية لمدة 5 سنوات وتحليل شامل للسوق السويدي.',
        'خطة توظيف مفصلة أو عقود أولية للموظفين المحليين.',
        'شهادات براءة ذمة ضريبية وسجل جنائي نظيف من بلد المنشأ.',
        'النظام الأساسي للشركة السويدية المزمع الاستثمار فيها.'
      ],
      applicationSteps: [
        { title: 'تدقيق خطة العمل', description: 'تأكد من تدقيق خطة العمل من قبل شركة محاسبة سويدية معتمدة.' },
        { title: 'تحويل رأس المال', description: 'قم بتحويل المبالغ المطلوبة إلى حساب بنكي تجاري في السويد.' },
        { title: 'التقديم المباشر', description: 'قدم طلباً تفصيلياً عبر وحدة العمل الحر المتخصصة في مصلحة الهجرة.' },
        { title: 'مقابلة الخبراء', description: 'احضر مقابلة معمقة لمناقشة الأثر الاقتصادي وخطط خلق فرص العمل.' }
      ],
      faqs: [
        { q: 'هل يؤدي هذا المسار مباشرة للجنسية؟', a: 'لا، هذه التأشيرة تمنح الإقامة. يجب عليك استيفاء شرط الإقامة القياسي لمدة 8 سنوات والمعايير الأخرى للجنسية السويدية.' },
        { q: 'هل يمكنني الاستثمار في العقارات؟', a: 'الاستثمار العقاري السلبي لا يؤهل عادةً. يجب أن يكون الاستثمار في عمل سويدي نشط يخلق فرص عمل.' }
      ],
      processingTime: 'من 10 إلى 18 شهراً (معالجة ذات أولوية للقطاعات عالية التأثير).',
      fees: '2,200 كرون سويدي لكل متقدم.',
      maintenance: 'إثبات توفر سيولة شخصية لتغطية نفقات المعيشة لمدة عامين.',
      maintenanceDetails: {
        monthlyAmount: '300,000 كرون (سيولة أولية)',
        conditions: [
          'يجب إثبات سيولة شخصية فورية لا تقل عن 200,000 كرون للمتقدم الأساسي.',
          'يتطلب الشريك 100,000 كرون وكل طفل 50,000 كرون إضافية.',
          'يجب أن يظل الاستثمار نشطاً وجاهزاً للتدقيق طوال فترة التصريح.',
          'تقارير دورية لمصلحة الهجرة حول التقدم في خلق فرص العمل.'
        ]
      },
      relatedQuestions: [
        'هل يمكن اعتبار الاستثمار العقاري أساساً لهذه التأشيرة؟',
        'ما هي المزايا الضريبية للمستثمرين الأجانب في عام 2026؟',
        'هل يوجد مسار سريع للجنسية من خلال الاستثمار الكبير؟'
      ],
      officialLink: 'https://www.migrationsverket.se/Other-languages/Al-rbyt/Al-ml-fy-alswyd.html'
    },
    {
      id: 'religious',
      title: 'تأشيرة العاملين في المجال الديني',
      icon: React.createElement(Heart, { className: "text-cyan-600" }),
      color: 'cyan',
      description: 'للمبشرين، والوزراء، والموظفين الدينيين الآخرين المدعوين للعمل في السويد.',
      requirements: [
        'شهادة ترسيم أو وثائق تثبت الصفة القيادية الدينية (مثل شهادة في اللاهوت).',
        'دعوة رسمية من منظمة دينية مسجلة في السويد.',
        'إثبات ممارسة الأنشطة الدينية السابقة والكفاءة.',
        'اتفاقية دعم مالي موقعة من المنظمة المستضيفة.'
      ],
      documents: [
        'نسخ مصدقة من شهادات الترسيم أو الشهادات الدينية.',
        'خطاب دعوة مفصل من الكيان الديني السويدي.',
        'إثبات تسجيل المنظمة المستضيفة (شهادة SST).',
        'دليل على الإعالة المالية (خطاب ضمان أو كشوفات حساب).'
      ],
      applicationSteps: [
        { title: 'الحصول على الدعوة', description: 'ترسل لك المنظمة الدينية السويدية دعوة رسمية للعمل.' },
        { title: 'بدء الطلب إلكترونياً', description: 'تبدأ المنظمة المضيفة الطلب عبر بوابة الأعمال الخاصة بالمصلحة.' },
        { title: 'تأكيد البيانات', description: 'تؤكد بياناتك عبر الإنترنت وتدفع الرسوم وتقدم المعلومات الشخصية.' },
        { title: 'أخذ البصمات', description: 'قم بزيارة السفارة أو القنصلية السويدية لالتقاط الصور وأخذ البصمات.' }
      ],
      faqs: [
        { q: 'هل يمكنني إجراء عقود الزواج؟', a: 'فقط إذا كانت منظمتك مفوضة لإجراء الزيجات القانونية في السويد وأنت معتمد شخصياً من قبل هيئة الخدمات القانونية والمالية والإدارية.' },
        { q: 'ماذا لو كنت متطوعاً؟', a: 'إذا كنت لا تتقاضى راتباً ولكن المنظمة تدعمك، يجب أن تستوفي شرط الإعالة المالية عبر اتفاقية دعم رسمية.' }
      ],
      processingTime: 'من 2 إلى 4 أشهر.',
      fees: '2,200 كرون سويدي.',
      maintenance: 'أموال كافية لتغطية مدة الإقامة دون اللجوء للمساعدة العامة.',
      maintenanceDetails: {
        monthlyAmount: 'حوالي 13,000 كرون / شهرياً',
        conditions: [
          'يجب أن يغطي المبلغ احتياجات المعيشة الأساسية والسكن.',
          'يمكن توفيره عبر راتب، أو مكافأة، أو دعم كامل من المنظمة.',
          'يجب توفير تأمين صحي من قبل المنظمة أو المتقدم.',
          'لا تؤدي هذه التأشيرة للإقامة الدائمة مباشرة ما لم تستوف شروط العمل القياسية.'
        ]
      },
      relatedQuestions: [
        'هل يمكنني القيام بعمل ديني أثناء وجودي بتأشيرة متطوع؟',
        'ما هي المنظمات التي تعتبر "كيانات دينية" في السويد؟',
        'هل تسمح التأشيرة الدينية لعائلتي بمرافقتي؟'
      ],
      officialLink: 'https://www.migrationsverket.se/English/Private-individuals/Working-in-Sweden/Religious-workers.html'
    },
    {
      id: 'self-employed',
      title: 'العمل الحر / الاستثمار الناشئ',
      icon: React.createElement(Building, { className: "text-indigo-600" }),
      color: 'indigo',
      description: 'للأفراد الذين يخططون لإدارة أعمالهم الخاصة أو شركاتهم الناشئة في السويد.',
      requirements: [
        'خبرة قوية في المجال وإدارة الأعمال.',
        'خطة عمل مفصلة توضح الجدوى والربحية.',
        'أموال كافية (200 ألف كرون لك، 100 ألف للشريك، 50 ألف لكل طفل).',
        'مهارات في اللغة السويدية أو الإنجليزية.'
      ],
      documents: [
        'خطة عمل شاملة.',
        'خبرات موثقة ذات صلة.',
        'كشوفات حساب وإثبات تمويل.',
        'وثائق تسجيل الشركة (إن وجدت).'
      ],
      applicationSteps: [
        { title: 'صياغة الاستراتيجية', description: 'أعد توقعات الربح لمدة عامين وتحليلاً للسوق السويدي المستهدف.' },
        { title: 'إثبات البنك', description: 'احصل على شهادات بنكية تثبت توفر الأموال الشخصية المطلوبة.' },
        { title: 'تقديم الطلب', description: 'قدم عبر الخدمة الإلكترونية المتخصصة للأعمال الحرة في مصلحة الهجرة.' },
        { title: 'المراجعة الخارجية', description: 'تقوم مصلحة الهجرة غالباً بإرسال خطتك لخبير خارجي لتقييم جدواها.' }
      ],
      faqs: [
        { q: 'هل يمكنني شراء شركة قائمة؟', a: 'نعم، شراء شركة قائمة مسار صالح، لكن يجب إثبات أن لديك تأثيراً مسيطراً (50% على الأقل) وأن الشركة يمكنها إعالتك.' },
        { q: 'هل أحتاج للتحدث بالسويدية؟', a: 'رغم أنه ليس إلزامياً للدخول الأولي، إلا أنه يوصى به بشدة لنجاح العمل، وسيكون مطلوباً إذا تقدمت بطلب للحصول على الإقامة الدائمة في عام 2026.' }
      ],
      processingTime: 'من 12 إلى 24 شهراً.',
      fees: '2,200 كرون سويدي.',
      maintenance: 'يجب إثبات القدرة على إعالة نفسك وعائلتك لمدة عامين.',
      maintenanceDetails: {
        monthlyAmount: 'الإيجار + المبلغ المعياري (~10k)',
        conditions: [
          'يجب أن يولد العمل ربحاً كافياً لدعم المتقدم وعائلته.',
          'إثبات الخبرة في المجال المحدد.',
          'يجب أن يمتلك المتقدم السيطرة النهائية (50% على الأقل).',
          'تتم مراجعة نتائج العمل كل عامين.'
        ]
      },
      relatedQuestions: [
        'هل يمكنني شراء شركة قائمة بدلاً من البدء من الصفر؟',
        'هل أحتاج للعيش في السويد للحفاظ على هذا التصريح؟',
        'ما هي الضرائب المترتبة على الشركات الجديدة في 2026؟'
      ],
      officialLink: 'https://www.migrationsverket.se/Other-languages/Al-rbyt/Al-ml-fy-alswyd.html'
    },
    {
      id: 'asylum',
      title: 'اللجوء والحماية',
      icon: React.createElement(Scale, { className: "text-amber-600" }),
      color: 'amber',
      description: 'للأفراد الذين يسعون للحصول على حماية دولية بسبب خوف مبرر من الاضطهاد.',
      requirements: [
        'يجب التواجد جسدياً في السويد أو عند الحدود.',
        'إثبات خطر الاضطهاد أو الحرب أو المعاملة غير الإنسانية.',
        'وثائق الهوية (يفضل وجودها ولكنها ليست إلزامية دائماً).',
        'مقابلة مع مسؤولي مصلحة الهجرة.'
      ],
      documents: [
        'جواز السفر الأصلي أو بطاقات الهوية.',
        'أدلة على التهديدات أو الوضع الشخصي (تقارير، صور، إلخ).',
        'وثائق السفر وتفاصيل المسار.'
      ],
      applicationSteps: [
        { title: 'تسجيل الوجود', description: 'أبلغ عن وجودك لدى وحدة تقديم الطلبات في مصلحة الهجرة فوراً.' },
        { title: 'فحص الهوية', description: 'قدم وثائقك والتقط الصور والبصمات لاستخراج بطاقة LMA الخاصة بك.' },
        { title: 'المقابلة التفصيلية', description: 'مقابلة تحقيق شاملة مع مسؤول الحالة لشرح وضعك بالتفصيل.' },
        { title: 'انتظار القرار', description: 'انتظر صدور القرار كتابياً. يمكن تقديم استئناف في حال الرفض الأولي.' }
      ],
      faqs: [
        { q: 'هل يمكنني العمل أثناء انتظار القرار؟', a: 'إذا قمت بتسليم جواز سفرك أو أثبت هويتك بطريقة أخرى، فقد تحصل على حق العمل (AT-UND) أثناء معالجة قضيتك.' },
        { q: 'ماذا يحدث إذا رُفض طلبي؟', a: 'يمكنك الاستئناف أمام محكمة الهجرة. إذا كان القرار النهائي هو الرفض، فمن المتوقع أن تغادر السويد. لم يعد يُسمح بـ "تغيير المسار" إلى تصريح عمل من داخل السويد.' }
      ],
      processingTime: 'متغير (من 6 أشهر إلى سنتين).',
      fees: 'مجاني.',
      maintenance: 'مدعوم من مصلحة الهجرة خلال فترة المعالجة.',
      maintenanceDetails: {
        monthlyAmount: '71 كرون / يومياً (بدل يومي)',
        conditions: [
          'يكون المبلغ أعلى إذا لم يتم توفير سكن من مصلحة الهجرة.',
          'يقل المبلغ لمن يسكن في مراكز المصلحة مع توفير الوجبات.',
          'الحق في العمل (AT-UND) متاح إذا تم إثبات الهوية.',
          'يشمل الحصول على الرعاية الصحية الطارئة ورعاية الأسنان.'
        ]
      },
      relatedQuestions: [
        'ما الفرق بين إقامة الـ 13 شهراً والـ 3 سنوات؟',
        'هل يمكنني التقديم على إقامة عمل إذا رُفض طلبي للجوء (Spårbyte)؟',
        'كيف يعمل برنامج مكافأة العودة الطوعية الجديد؟'
      ],
      officialLink: 'https://www.migrationsverket.se/Other-languages/Al-rbyt/Al-hmayt-wal-l-jw-fy-alswyd.html'
    }
  ];
};

export const visaData = getVisaData('ar'); // Default to Arabic
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────
   INLINE SVG ICON LIBRARY — pure vectors, zero emojis, zero external packages
───────────────────────────────────────────────────────────────────────── */
const Icon = {
  Calendar: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Clock: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  MapPin: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Trophy: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  Award: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  ),
  GraduationCap: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  BookOpen: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  Sparkles: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
    </svg>
  ),
  ArrowRight: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  CheckCircle: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  Close: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Share: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
  User: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Quote: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  ),
  ChevronRight: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  Tag: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
  Download: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  FileText: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ─────────────────────────────────────────────────────────────────────────
   DATA: AUTHENTIC NEWS ARTICLES WITH FULL DETAILS FOR EXPANSION
───────────────────────────────────────────────────────────────────────── */
export interface NewsArticle {
  id: string;
  title: string;
  category: "Academic" | "Sports" | "Leadership" | "Cultural" | "STEM";
  categoryBadge: string;
  date: string;
  readTime: string;
  image: string;
  summary: string;
  content: string[];
  keyHighlights: string[];
  quote?: { text: string; author: string; role: string };
  venue: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: "icse-results-2025",
    title: "100% Pass Rate in ICSE Examinations with 44 Students Scoring Above 95%",
    category: "Academic",
    categoryBadge: "BOARD EXAM RESULTS",
    date: "May 2025",
    readTime: "3 min read",
    image: "/campus-sciencelab.jpg",
    summary: "Baldwin Girls' High School continues its stellar academic legacy with a 100% pass rate in the Council for the Indian School Certificate Examinations (CISCE). 89 students secured distinctions above 90%.",
    content: [
      "The Council for the Indian School Certificate Examinations (CISCE) declared the Class X ICSE examination results, marking another historic chapter of academic triumph for Baldwin Girls' High School.",
      "All students presented for the examination cleared with flying colours, upholding the institution's unbroken 100% pass tradition. Over 85% of the entire graduating batch secured First Class with Distinction, reflecting deep scholastic preparation and dedicated faculty mentorship.",
      "A remarkable 44 students scored aggregate percentages exceeding 95%, while 89 students achieved overall scores above 90%. Centum marks (100/100) were recorded across Mathematics, Computer Applications, Commercial Studies, and Science disciplines.",
      "The Principal and Board of Management commended the students, academic faculty, and parents for their steadfast dedication, highlighting that true education balances board excellence with ethical and social responsibility."
    ],
    keyHighlights: [
      "100% Pass Percentage across the entire Class X cohort",
      "44 students scored 95% and above aggregate",
      "89 students scored 90% and above aggregate",
      "Multiple perfect 100 scores in Computer Applications, Mathematics & Sciences",
      "Over 85% students graduated with Distinction honors"
    ],
    quote: {
      text: "Our girls have demonstrated that disciplined academic inquiry and genuine passion for learning will always yield exceptional outcomes. We congratulate each student and our tireless educators.",
      author: "Mrs. Das",
      role: "Principal, Baldwin Girls' High School"
    },
    venue: "Main Quadrangle & Examination Secretariat, Bengaluru",
  },
  {
    id: "investiture-2024-25",
    title: "Investiture Ceremony 2024–25: Student Council Takes Sacred Oath of Leadership",
    category: "Leadership",
    categoryBadge: "STUDENT GOVERNANCE",
    date: "July 2024",
    readTime: "4 min read",
    image: "/bghs-investiture.png",
    summary: "In a solemn and inspiring ceremony held in the School Auditorium, the newly elected Student Council for 2024–25 was formally invested with badges and sashes, led by School President Aaheli Dutta.",
    content: [
      "The annual Investiture Ceremony of Baldwin Girls' High School for the academic year 2024–25 was solemnised with traditional pageantry, musical hymns, and solemn oaths of allegiance to school values.",
      "The formal proceedings commenced with a guard of honour presented by the school's NCC Cadets, followed by an opening prayer and devotional song rendered by the renowned Baldwin Choir.",
      "Aaheli Dutta was formally badged and sworn in as the School President, with Aandrita G. taking office as School Vice-President. The office-bearers pledged to uphold the school motto 'Loyalty and Service' with integrity, empathy, and courage.",
      "Games Captain Harshini P. and Games Vice-Captain Priyadarshini Mansingh accepted the school sports standard, pledging to nurture sportsmanship and fair play across all inter-house athletic meets and CISCE tournaments."
    ],
    keyHighlights: [
      "School President: Aaheli Dutta formally sworn in",
      "School Vice-President: Aandrita G.",
      "School Secretary: Swara S.",
      "School Games Captain: Harshini P. & Games Vice-Captain: Priyadarshini Mansingh",
      "Full complement of House Captains and Prefects for Delph, Watson, Laura & Collins houses invested"
    ],
    quote: {
      text: "Leadership at Baldwin is not about privilege, but about selfless responsibility to uplift every sister in our school community. We stand united to serve.",
      author: "Aaheli Dutta",
      role: "School President, Student Council 2024–25"
    },
    venue: "School Grand Auditorium, #90 Richmond Road",
  },
  {
    id: "cisce-national-swimming",
    title: "BGHS Swimmers Clinch Gold & Silver Medals at CISCE National Swim Meet",
    category: "Sports",
    categoryBadge: "AQUATICS CHAMPIONSHIP",
    date: "September 2024",
    readTime: "3 min read",
    image: "/bghs-swimming.png",
    summary: "Competing against elite schools from all states of India, Baldwin Girls' High School swimming contingent bagged multiple podium finishes at the CISCE National Aquatics Championship.",
    content: [
      "Baldwin Girls' High School continued its illustrious swimming legacy by capturing prominent podium positions at the CISCE National Swimming Championship.",
      "Training in the school's international-standard heated racing pool under specialized female coaching, our swimmers dominated sprint and medley relay disciplines, showcasing exemplary stamina and stroke technique.",
      "The school's aquatics champions have historically featured national achievers including Loraine Verghese, Kirthi Rao, Natasha Sagar, and Aishwarya G.M. This year's junior squad added 3 individual golds and 2 silver medals in butterfly and freestyle events.",
      "The physical education department reiterated the school's commitment to providing top-tier aquatic conditioning from Standard III onwards, ensuring balanced physical and academic development."
    ],
    keyHighlights: [
      "3 Gold and 2 Silver medals won at National CISCE Aquatic Meet",
      "Dominant victories in 50m Butterfly and 100m Freestyle",
      "Baldwin 4x50m Medley Relay team secured silver in senior division",
      "Full contingent trained in BGHS International-Standard 25m Pool"
    ],
    quote: {
      text: "The rigorous daily morning training in our Olympic pool paired with scientific stroke correction enabled our swimmers to outperform tough competition from across the country.",
      author: "Head of Aquatics",
      role: "Physical Education Department, BGHS"
    },
    venue: "CISCE National Aquatics Complex",
  },
  {
    id: "national-gymnastics-silver",
    title: "Rhea Bhansali Wins National Silver Medal in Gymnastics at 65th National School Games",
    category: "Sports",
    categoryBadge: "NATIONAL SPORTS HONORS",
    date: "August 2024",
    readTime: "2 min read",
    image: "/bghs-sports-action.png",
    summary: "BGHS gymnast Rhea Bhansali performed with grace and athletic brilliance to win the Silver Medal in the Under-17 Category at the prestigious National School Games.",
    content: [
      "In a stellar testament to student athletic excellence, Rhea Bhansali brought tremendous honor to Baldwin Girls' High School by securing the Silver Medal in Gymnastics (Under-17 category) at the National School Games.",
      "Competing against top state contenders from across India, Rhea executed high-difficulty floor exercise and balance beam routines, receiving high scores for execution, artistic presentation, and technical perfection.",
      "The school felicitated Rhea in a special morning assembly where Principal Mrs. Das awarded her the Baldwin Scroll of Honor, recognizing her grueling regimen of early morning conditioning alongside maintaining top academic grades."
    ],
    keyHighlights: [
      "Silver Medal in Under-17 Floor and Beam Gymnastics",
      "Represented CISCE Karnataka Region at National Games",
      "Special felicitation and Scroll of Honor awarded in morning chapel"
    ],
    venue: "National Gymnastics Arena",
  },
  {
    id: "stem-ai-expo-2024",
    title: "Annual STEM & AI Robotics Expo: Students Showcase 60+ Automated Prototypes",
    category: "STEM",
    categoryBadge: "SCIENCE & INNOVATION",
    date: "November 2024",
    readTime: "4 min read",
    image: "/bghs-events.png",
    summary: "From automated flood alert sensors and sustainable smart campus models to healthcare diagnosis algorithms, BGHS young scientists presented over 60 working innovations.",
    content: [
      "The Baldwin Girls' High School Innovation Wing hosted its grand Annual STEM & Robotics Expo, transforming the auditorium quadrangle into an interactive showcase of student technology.",
      "Students from Standard III through Standard X presented working prototypes utilizing Arduino, Raspberry Pi, 3D printing, and Python-based machine learning models developed inside the BGHS Robotics & AI Makerspace.",
      "Key exhibits included an automated rainwater conservation monitor for Richmond Town residences, an AI-assisted sign language translator glove, and solar-powered smart classroom ventilation controllers.",
      "Distinguished guest judges from Indian Institute of Science (IISc) praised the students' articulate presentation skills, rigorous scientific methodology, and strong focus on community problem-solving."
    ],
    keyHighlights: [
      "60+ interactive student-built working robotics prototypes on display",
      "AI gesture-recognition glove and smart irrigation sensor won Top Honors",
      "Judged by faculty and researchers from premier Bengaluru research institutes",
      "Hands-on demonstration zones for primary students to learn block coding"
    ],
    venue: "School Innovation Center & Grand Quadrangle",
  },
  {
    id: "choir-regional-gold",
    title: "Baldwin Girls' Choir Wins Gold Trophy at Inter-School Youth Choral Showcase",
    category: "Cultural",
    categoryBadge: "PERFORMING ARTS",
    date: "December 2024",
    readTime: "3 min read",
    image: "/campus-auditorium.jpg",
    summary: "Reaffirming the school's centennial musical heritage, the 45-voice Baldwin Choir captured the first-place gold trophy with their four-part harmonic performance of classical and contemporary choral works.",
    content: [
      "The revered Baldwin Girls' High School Choir earned resounding standing ovations and the coveted Gold First Place Trophy at the Regional Inter-School Youth Choral Festival in Bengaluru.",
      "Comprising 45 choristers spanning Standard VI through Standard X, the choir performed intricate four-part harmonic renditions of Handel's chorales and a modern African-American spiritual arrangement.",
      "Music has stood as a founding pillar of character at Baldwin since 1880. The adjudicators commended the choir for vocal blend, dynamic nuance, pitch accuracy, and expressive emotional delivery.",
      "The choir will next lead the festive Carol Service in the historic Richmond Road chapel and perform at city civic concerts."
    ],
    keyHighlights: [
      "1st Place Gold Trophy in Senior Choral Division",
      "45 choristers performing four-part polyphony (Soprano, Mezzo, Alto)",
      "Special jury recognition for Best A Cappella Vocal Dynamic",
      "Directed by the BGHS Department of Performing Arts"
    ],
    venue: "St. Mark's Cathedral & City Auditorium, Bengaluru",
  },
  {
    id: "republic-day-ncc-2025",
    title: "All-Girls NCC Troupe Leads Ceremonial Parade at 76th Republic Day Celebration",
    category: "Leadership",
    categoryBadge: "NATIONAL CELEBRATION",
    date: "January 2025",
    readTime: "3 min read",
    image: "/campus-admin.jpg",
    summary: "Cadets of the Baldwin Girls' High School NCC Troop presented an impeccably synchronised march-past and rifle drill in celebration of India's 76th Republic Day.",
    content: [
      "Dressed in crisp ceremonial khaki uniforms with maroon berets, the Baldwin NCC Girl Cadets executed an awe-inspiring ceremonial parade to mark India's 76th Republic Day on the sprawling athletics grounds.",
      "The national tricolour was unfurled by the Chief Guest alongside Principal Mrs. Das, accompanied by the school brass band playing the National Anthem in solemn harmony.",
      "Cadets demonstrated precision unarmed combat drills, emergency rescue simulations, and patriotic cultural tableaux depicting women freedom fighters who shaped the Indian Constitution.",
      "The NCC training programme at BGHS instills discipline, leadership, physical endurance, and active civic duty, preparing young girls for leadership roles in public service and armed forces."
    ],
    keyHighlights: [
      "120 NCC girl cadets participated in ceremonial parade",
      "Special unarmed self-defense and crisis management demonstration",
      "Patriotic dance drama enacted by primary school wing",
      "Honored 12 senior cadets with NCC 'A' Certificate accomplishments"
    ],
    venue: "Main Athletics Grounds & Heritage Quadrangle",
  },
  {
    id: "green-campus-drive",
    title: "Eco-Club Plants 200 Native Saplings & Launches Zero-Waste Composting Unit",
    category: "STEM",
    categoryBadge: "ENVIRONMENT & SUSTAINABILITY",
    date: "June 2024",
    readTime: "2 min read",
    image: "/campus-garden.jpg",
    summary: "Marking World Environment Day, students and faculty planted 200 indigenous botanical species across the 7-acre campus and inaugurated a decentralized organic waste composter.",
    content: [
      "In harmony with the school's heritage green canopy of century-old rain trees, the Baldwin Eco-Club launched an expansive campus sustainability drive on World Environment Day.",
      "Students actively planted 200 indigenous flowering and medicinal saplings, creating educational botanical identification plaques with QR codes linking to botanical research data.",
      "The school also commissioned a zero-waste organic composting station that converts cafeteria vegetable peelings and garden leaf litter into organic compost for the campus gardens.",
      "The initiative reinforces BGHS's commitment to climate action, practical environmental stewardship, and nurturing an eco-conscious student body."
    ],
    keyHighlights: [
      "200 native and medicinal trees planted across campus perimeter",
      "Interactive QR-code botanical trail created for junior students",
      "Decentralized zero-waste composting unit operational",
      "Plastic-free campus audit completed by student eco-marshals"
    ],
    venue: "Centennial Botanical Gardens & Quadrangle, BGHS",
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   DATA: UPCOMING SCHOOL EVENTS
───────────────────────────────────────────────────────────────────────── */
export interface UpcomingEvent {
  id: string;
  title: string;
  category: "Academic" | "Sports" | "Cultural" | "Community";
  date: string;
  month: string;
  day: string;
  time: string;
  venue: string;
  description: string;
  audience: string;
  dressCode?: string;
  highlights: string[];
}

export const upcomingEvents: UpcomingEvent[] = [
  {
    id: "annual-theatrical-concert",
    title: "Grand Annual Day & Theatrical Concert 2026",
    category: "Cultural",
    date: "November 28, 2026",
    month: "NOV",
    day: "28",
    time: "4:30 PM – 8:00 PM",
    venue: "School Grand Auditorium (1,200 Seats)",
    description: "An evening of spellbinding drama, classical Indian orchestra, contemporary ballet, and choral symphonies presented by students of all divisions.",
    audience: "Parents, Alumni, Staff & Invited Guests",
    dressCode: "Formal / Festive Indian",
    highlights: ["Original Broadway-style musical adaptation", "Choir performance with brass ensemble", "Annual Roll of Honor awards presentation"],
  },
  {
    id: "inter-house-aquatics-2026",
    title: "Inter-House Swimming Gala & Aquatics Championship",
    category: "Sports",
    date: "December 12, 2026",
    month: "DEC",
    day: "12",
    time: "8:30 AM – 2:00 PM",
    venue: "BGHS Olympic Swimming Pool Complex",
    description: "Swimmers from Delph, Watson, Laura, and Collins houses compete across 24 sprint, backstroke, breaststroke, and medley relay heats.",
    audience: "Students, Faculty & Parent Cheer Squads",
    dressCode: "House Colors / Athletic Wear",
    highlights: ["24 competitive stroke categories", "Lifeguard safety exhibitions", "Presentation of the Aquatics Championship Shield"],
  },
  {
    id: "commencement-class-2027",
    title: "ICSE Valedictory Service & Commencement Exercises",
    category: "Academic",
    date: "January 29, 2027",
    month: "JAN",
    day: "29",
    time: "9:30 AM – 1:00 PM",
    venue: "Heritage Quadrangle & Assembly Hall",
    description: "The formal valedictory and candle-lighting service bidding farewell to the graduating Class X ICSE cohort with prayers, citations, and blessings.",
    audience: "Class X Graduating Batch & Parents",
    dressCode: "Formal Academic Uniform & Graduation Ribbons",
    highlights: ["Passing of the Sacred Lamp tradition", "Valedictory speech by School President", "Conferral of Graduation Scrolls & Mementos"],
  },
  {
    id: "bghs-mun-2027",
    title: "Baldwin Model United Nations Conference (BGHS MUN 2027)",
    category: "Academic",
    date: "February 14–15, 2027",
    month: "FEB",
    day: "14",
    time: "9:00 AM – 5:00 PM (2 Days)",
    venue: "Academic Block & Library Lecture Halls",
    description: "Over 350 student delegates from top schools across South India convene for two days of rigorous multilateral diplomacy, debate, and resolution drafting.",
    audience: "Registered Interschool Delegates & Observers",
    dressCode: "Western Formal Diplomatic Attire",
    highlights: ["Committees: UNHRC, UNSC, UNEP, Historic Crisis", "Renowned foreign affairs keynote speaker", "Executive Board training sessions"],
  },
  {
    id: "founders-day-thanksgiving",
    title: "146th Founder's Day & Thanksgiving Service",
    category: "Community",
    date: "March 18, 2027",
    month: "MAR",
    day: "18",
    time: "8:30 AM – 11:30 AM",
    venue: "School Chapel & Quadrangle Gardens",
    description: "Commemorating the visionary foundation of Baldwin Girls' High School in 1880 with thanksgiving hymns, alumni tributes, and fellowship tea.",
    audience: "Entire Baldwin School Community & Alumni",
    dressCode: "School Uniform / Smart Casuals",
    highlights: ["Thanksgiving sermon and choir anthem", "Floral tributes at John Baldwin memorial", "Alumni Golden Jubilee reunion reception"],
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   DATA: BALDWIN PERSPECTIVES BLOG POSTS WITH FULL DETAILS FOR EXPANSION
───────────────────────────────────────────────────────────────────────── */
export interface BlogPost {
  id: string;
  title: string;
  category: "Pedagogy & STEM" | "Student Voices" | "Wellbeing" | "Heritage & Arts" | "Athletics";
  author: string;
  authorRole: string;
  authorImage?: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "women-in-stem-bghs",
    title: "Empowering Young Women in STEM: How BGHS Nurtures Tomorrow's Scientists & Coders",
    category: "Pedagogy & STEM",
    author: "Dr. Rachel Mathews",
    authorRole: "Head of Sciences & Robotics Mentor",
    date: "October 14, 2025",
    readTime: "5 min read",
    image: "/campus-sciencelab.jpg",
    excerpt: "Why early hands-on laboratory discovery, computational robotics, and an encouraging all-girls environment erase the gender gap in technological innovation.",
    content: [
      "For decades, global research in educational psychology has shown a persistent gender disparity in STEM disciplines. At Baldwin Girls' High School, our pedagogical philosophy directly addresses this challenge by de-mystifying science from the primary years.",
      "Inside our physics, chemistry, and biology studios, every student is the primary investigator. There are no passive observers. When a girl calibrates a spectrometer, writes an Arduino routine to control a servo motor, or conducts quantitative volumetric titration with precision glassware, her confidence transforms fundamentally.",
      "Our curriculum intentionally integrates computational thinking starting from Standard III with visual block programming, progressing into Python, data structures, and embedded robotics by Standard VIII. Students encounter failure not as an intellectual limitation, but as natural debugging iterations.",
      "The result is palpable: over 65% of our graduating ICSE scholars choose higher secondary specialisations in pure sciences, engineering, biotechnology, and data sciences, proving that when girls are provided equal access and elevated expectations, they excel without boundaries."
    ],
    keyTakeaways: [
      "Early hands-on experiments from Standard III build enduring technical self-efficacy",
      "All-girls learning spaces encourage students to take intellectual risks without social stereotype threat",
      "Integrating coding with physical robotics makes abstract computational concepts tangible",
      "Mentorship from women scientists and alumni engineers inspires career trajectories in deep tech"
    ],
    tags: ["STEM Education", "Robotics", "Women in Science", "ICSE Curriculum", "Baldwin Pedagogy"],
  },
  {
    id: "legacy-of-baldwin-choir",
    title: "The Harmony of Discipline & Creativity: The Timeless Legacy of the Baldwin Choir",
    category: "Heritage & Arts",
    author: "Mrs. Jennifer Lawrence",
    authorRole: "Director of Performing Arts & Choral Master",
    date: "September 22, 2025",
    readTime: "4 min read",
    image: "/campus-auditorium.jpg",
    excerpt: "Beyond melodies and gold trophies, choral singing instills listening, teamwork, vocal poise, and deep spiritual expression in young women.",
    content: [
      "Step into the school auditorium at 7:45 on any weekday morning, and you will hear a soaring tapestry of soprano and alto voices tuning in precise acoustic unison. For over a century, the Baldwin Choir has remained the emotional heartbeat of our school.",
      "Choral singing is the ultimate exercise in collective humility. Unlike solo singing, where individual timbre dominates, a choral singer must continuously modulate her volume and tone to complement the sister standing beside her. It is an art form rooted in deep, active listening.",
      "Scientific studies have shown that singing in a choir releases endorphins and synchronises the heartbeats of the group. At Baldwin, our choristers learn polyphonic sight-reading, dynamic breathing control, and linguistic diction across Latin, English, Kannada, and Hindi.",
      "When our girls stand together on stage, whether winning gold at city festivals or leading the solemn carol service, they embody what Baldwin stands for: harmony born of discipline, and beauty nurtured through collective commitment."
    ],
    keyTakeaways: [
      "Choral singing teaches collaborative listening and emotional resonance",
      "Vocal training builds public speaking confidence and diaphragm breath control",
      "Musical performance at Baldwin connects current students with 140+ years of institutional heritage",
      "Participation in school choir enhances focus, memory retention, and scholastic endurance"
    ],
    tags: ["Choir", "Performing Arts", "Music Education", "School Heritage", "Baldwin Tradition"],
  },
  {
    id: "boarding-life-and-board-exams",
    title: "Balancing Boarding Life & Board Exams: A Guide for Residential Scholars",
    category: "Wellbeing",
    author: "Mrs. Sarah David",
    authorRole: "Senior Residential Warden & Pastoral Counsellor",
    date: "August 30, 2025",
    readTime: "6 min read",
    image: "/campus-boarding.jpg",
    excerpt: "How structured routines, peer study groups, wholesome nutrition, and pastoral mentorship create a peaceful sanctuary for outstation boarders to excel in ICSE.",
    content: [
      "Transitioning from home to boarding school is a profound milestone in a young girl's life. At Baldwin, our residential hostel is designed not merely as dormitory quarters, but as an affectionate, structured second home where independence thrives.",
      "One of the greatest advantages our boarders experience during critical examination years is the complete elimination of commute fatigue. Living on our 7-acre campus in the heart of Richmond Town, boarders enjoy seamless access to early morning library carrels, evening faculty tutorials, and green sports arenas for recreation.",
      "Our daily rhythm balances structured evening prep hours with communal relaxation. Nutritious, chef-curated meals in our FSSAI-certified dining hall provide the wholesome sustenance growing adolescent minds demand.",
      "Most importantly, our resident matrons and pastoral wardens maintain an open-door policy. Whether a girl is grappling with a difficult chemistry numerical or feeling homesick on a rainy evening, there is always a compassionate listening ear."
    ],
    keyTakeaways: [
      "Zero commute time preserves vital study hours and sleep cycles for boarders",
      "Supervised evening prep hours develop lifelong time-management and self-study habits",
      "Peer collaborative study groups transform daunting ICSE revision into supportive teamwork",
      "Dedicated pastoral female wardens ensure mental, emotional, and physical wellbeing 24/7"
    ],
    tags: ["Boarding Life", "Residential School", "Student Wellbeing", "ICSE Preparation", "Pastoral Care"],
  },
  {
    id: "athletic-mindset-podiums",
    title: "From Quadrangle to National Podiums: The Mindset of Baldwin Athletes",
    category: "Athletics",
    author: "Mr. Anand Kumar",
    authorRole: "Director of Physical Education",
    date: "July 18, 2025",
    readTime: "4 min read",
    image: "/bghs-sports-hero.png",
    excerpt: "Why the lessons of resilience, grit, and fair play learned on the track and in the pool are the most enduring life skills our students acquire.",
    content: [
      "Sport is not an extracurricular diversion at Baldwin Girls' High School; it is an indispensable co-curricular pillar of education. With 18 indoor and outdoor disciplines spanning our international-standard pool, FIBA basketball court, and 200m track, athletics is woven into daily life.",
      "When a swimmer plunges into the water at 6:30 AM for repeat sprint intervals, she learns something that no textbook can articulate: the power of quiet perseverance when no one is cheering.",
      "Athletics teaches young women that failure is never final. Dropping a baton in a relay or missing a crucial free-throw is not a defeat; it is feedback. That mental toughness transfers directly into the classroom and beyond into university boardrooms.",
      "We celebrate our CISCE national champions and medalists with immense pride, but we celebrate equally every young girl who laces up her running shoes for the first time and completes her first lap of the track with a radiant smile."
    ],
    keyTakeaways: [
      "Physical sport builds emotional grit and healthy stress resilience",
      "Competitive team sports cultivate leadership, communication, and unselfish cooperation",
      "Early morning aquatic and athletic routines develop lifelong healthy lifestyle habits",
      "Balanced athletics directly enhances cognitive processing speed and academic memory"
    ],
    tags: ["Sports Excellence", "Swimming", "Athletics", "Resilience", "Physical Education"],
  },
  {
    id: "student-leadership-aaheli",
    title: "Nurturing Voice & Vision: Why Student Council Leadership Matters Early",
    category: "Student Voices",
    author: "Aaheli Dutta",
    authorRole: "School President, Student Council 2024–25",
    date: "June 25, 2025",
    readTime: "5 min read",
    image: "/bghs-investiture.png",
    excerpt: "Reflections from the Head Girl on representing 2,500 students, mediating student initiatives with administration, and leading with empathy.",
    content: [
      "When I stood before the assembly on Investiture Day and received the School President badge, I felt both tremendous pride and a deep sense of humility. Leadership at Baldwin is not about a title; it is about serving as the voice for every girl who walks these heritage corridors.",
      "Serving on the Student Council has taught our entire cabinet invaluable lessons in diplomacy, logistics, and consensus-building. Organising inter-house festivals, coordinating sports schedules, and presenting student welfare proposals to the Principal's desk requires rigorous preparation.",
      "What makes Baldwin unique is the culture of sisterhood. Older students actively mentor junior girls, helping them navigate new academic subjects, choir auditions, and sports trials without intimidation.",
      "To any junior student reading this: never hesitate to raise your hand, share an idea, or stand up for what is fair. Your voice matters, and this school will give you the platform to make it resonate."
    ],
    keyTakeaways: [
      "True leadership is rooted in service, empathy, and active listening",
      "Student councils provide real-world training in organizational governance and negotiation",
      "Fostering a supportive sisterhood culture creates psychological safety for all learners",
      "Confidence is developed incrementally by participating in debate, assemblies, and house activities"
    ],
    tags: ["Student Leadership", "Student Council", "Head Girl Reflections", "Sisterhood", "Baldwin Life"],
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT: NEWS & EVENTS PAGE
───────────────────────────────────────────────────────────────────────── */
export default function NewsEventsPage() {
  const [newsFilter, setNewsFilter] = useState<string>("All");
  const [blogFilter, setBlogFilter] = useState<string>("All");

  // State for expanded news and blog items
  const [expandedNews, setExpandedNews] = useState<NewsArticle | null>(null);
  const [expandedBlog, setExpandedBlog] = useState<BlogPost | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<UpcomingEvent | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const { scrollYProgress } = useScroll();
  const heroParallax = useTransform(scrollYProgress, [0, 0.3], [0, -70]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Smooth scroll handler for anchor links
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location.hash, location.pathname]);

  // Lock body scroll when any modal/expanded view is open
  useEffect(() => {
    if (expandedNews || expandedBlog || selectedEvent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [expandedNews, expandedBlog, selectedEvent]);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpandedNews(null);
        setExpandedBlog(null);
        setSelectedEvent(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredNews = newsArticles.filter((item) => {
    if (newsFilter === "All") return true;
    return item.category === newsFilter;
  });

  const filteredBlogs = blogPosts.filter((item) => {
    if (blogFilter === "All") return true;
    return item.category === blogFilter;
  });

  return (
    <main className="relative bg-white overflow-x-hidden min-h-screen">
      {/* Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{
          width: progressWidth,
          background: "linear-gradient(90deg, #1E3A8A, #781428)",
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          HERO BANNER
      ═══════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} id="overview" className="relative min-h-[580px] lg:min-h-[660px] flex items-center overflow-hidden scroll-mt-24">
        {/* Parallax Background Photo */}
        <motion.div className="absolute inset-0" style={{ y: heroParallax }}>
          <img
            src="/bghs-events.png"
            alt="Baldwin Girls' High School Events and Celebrations"
            className="w-full h-[120%] object-cover object-center"
          />
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/95 via-[#0A1628]/85 to-[#781428]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/95 via-transparent to-[#0A1628]/40" />

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-[1380px] px-6 sm:px-10 lg:px-14 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white/90">News & Events</span>
            </div>

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 rounded-full bg-[#781428]/40 border border-[#781428]/60 px-5 py-2 mb-6 backdrop-blur-sm">
              <Icon.Sparkles className="w-4 h-4 text-[#F3C44E]" />
              <span className="text-xs font-bold tracking-[0.2em] text-[#F3C44E] uppercase">Baldwin Chronicle & Happenings</span>
            </div>

            {/* Title */}
            <h1 className="font-serif font-bold text-4xl sm:text-6xl lg:text-7xl text-white leading-[1.06] mb-6">
              Stories, Celebrations &{" "}
              <span className="bg-gradient-to-r from-[#38BDF8] to-[#93C5FD] bg-clip-text text-transparent">
                Perspectives.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-white/80 leading-relaxed max-w-2xl mb-10">
              Explore the latest campus news, academic honors, athletic championships, upcoming fixtures, and thought leadership articles from Baldwin Girls' High School.
            </p>

            {/* Quick Navigation Anchor Pills */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <a
                href="#latest-news"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 hover:bg-white/25 text-white px-5 py-2.5 text-xs sm:text-sm font-semibold border border-white/20 backdrop-blur-sm transition cursor-pointer"
              >
                <Icon.FileText className="w-4 h-4 text-[#38BDF8]" />
                <span>Latest News</span>
              </a>
              <a
                href="#upcoming-events"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 hover:bg-white/25 text-white px-5 py-2.5 text-xs sm:text-sm font-semibold border border-white/20 backdrop-blur-sm transition cursor-pointer"
              >
                <Icon.Calendar className="w-4 h-4 text-[#38BDF8]" />
                <span>Upcoming Events</span>
              </a>
              <a
                href="#school-blog"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 hover:bg-white/25 text-white px-5 py-2.5 text-xs sm:text-sm font-semibold border border-white/20 backdrop-blur-sm transition cursor-pointer"
              >
                <Icon.BookOpen className="w-4 h-4 text-[#38BDF8]" />
                <span>Baldwin Perspectives Blog</span>
              </a>
              <a
                href="#calendar"
                className="inline-flex items-center gap-2 rounded-full bg-[#3B82F6] hover:bg-[#2563EB] text-white px-5 py-2.5 text-xs sm:text-sm font-bold transition shadow-md cursor-pointer"
              >
                <Icon.Download className="w-4 h-4 text-white" />
                <span>Academic Calendar</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FEATURED BREAKING SPOTLIGHT (CLICKABLE TO EXPAND)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative -mt-10 z-20 mx-auto max-w-[1380px] px-6 lg:px-14">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onClick={() => setExpandedNews(newsArticles[0])}
          className="rounded-3xl bg-gradient-to-br from-[#0A1628] via-[#12233f] to-[#1E3A8A] text-white p-8 sm:p-10 lg:p-12 shadow-2xl border border-white/15 cursor-pointer group hover:border-[#38BDF8]/50 transition-all duration-300"
        >
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#781428] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                  Breaking News Spotlight
                </span>
                <span className="text-xs text-white/60">May 2025 · 3 min read</span>
              </div>

              <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight group-hover:text-[#38BDF8] transition-colors">
                100% Pass Rate in ICSE Examinations with 44 Students Scoring Above 95%
              </h2>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed line-clamp-3">
                Baldwin Girls' High School continues its stellar academic legacy with an unbroken 100% pass rate in the Council for the Indian School Certificate Examinations (CISCE). 89 students secured distinctions above 90%, with multiple centum scores across Mathematics and Sciences.
              </p>

              <div className="pt-2 flex items-center gap-3">
                <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#F3C44E] group-hover:translate-x-1 transition-transform">
                  <span>Read Full Story & Honor Roll</span>
                  <Icon.ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-slate-900">
              <img
                src="/campus-sciencelab.jpg"
                alt="ICSE Results 2025"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-xs font-bold text-white uppercase tracking-wider">CISCE Class X Toppers</p>
                <p className="text-xs text-white/80">Click to view comprehensive report & highlights</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1: LATEST NEWS (WITH CLICK-TO-EXPAND DETAIL VIEW)
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="latest-news" className="relative py-24 lg:py-32 bg-white scroll-mt-24">
        <div className="mx-auto max-w-[1380px] px-6 lg:px-14">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#1E3A8A]/10 px-5 py-2 mb-4 border border-[#1E3A8A]/20">
                <Icon.FileText className="w-4 h-4 text-[#1E3A8A]" />
                <span className="text-xs font-bold tracking-[0.16em] text-[#1E3A8A] uppercase">Campus Dispatch</span>
              </div>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0A1628] leading-tight">
                Latest News & Achievements
              </h2>
              <p className="text-base text-[#5A6778] mt-2 max-w-2xl">
                Click on any news story to expand the full article, student achievements, official quotes, and photo coverage.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {["All", "Academic", "Sports", "Leadership", "Cultural", "STEM"].map((cat) => {
                const isActive = newsFilter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setNewsFilter(cat)}
                    className={`rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#1E3A8A] text-white shadow-sm"
                        : "bg-[#F1F5F9] text-[#475569] hover:bg-[#DBEAFE] hover:text-[#1E3A8A]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* News Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((article, i) => (
              <motion.article
                key={article.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                onClick={() => setExpandedNews(article)}
                className="group rounded-3xl bg-white border border-[#E2E8F0] overflow-hidden hover:border-[#1E3A8A]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Photo with Badge */}
                  <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-900">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center rounded-full bg-[#0A1628]/85 backdrop-blur-md px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase border border-white/20">
                        {article.categoryBadge}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 text-xs font-semibold text-white/90">
                      {article.date} · {article.readTime}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-[#0A1628] leading-snug group-hover:text-[#1E3A8A] transition-colors mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5A6778] leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#1E3A8A]">
                  <span className="group-hover:underline">Read Full Story</span>
                  <Icon.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2: UPCOMING EVENTS & TIMELINE
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="upcoming-events" className="relative py-24 lg:py-32 bg-[#F8FAFC] scroll-mt-24">
        <div className="mx-auto max-w-[1380px] px-6 lg:px-14">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#781428]/10 px-5 py-2 mb-4 border border-[#781428]/20">
              <Icon.Calendar className="w-4 h-4 text-[#781428]" />
              <span className="text-xs font-bold tracking-[0.16em] text-[#781428] uppercase">Mark Your Calendar</span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0A1628] leading-tight mb-4">
              Upcoming School Events & Fixtures
            </h2>
            <p className="text-base text-[#5A6778] leading-relaxed">
              Stay informed about major theatrical concerts, aquatics galas, commencement services, and diplomatic Model UN conferences scheduled at Baldwin Girls'.
            </p>
          </div>

          {/* Events List */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {upcomingEvents.map((evt, i) => (
              <motion.div
                key={evt.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                onClick={() => setSelectedEvent(evt)}
                className="rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-7 hover:border-[#1E3A8A]/50 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-6 group"
              >
                <div className="flex items-start sm:items-center gap-5 min-w-0">
                  {/* Calendar Date Badge */}
                  <div className="flex flex-col items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#12233f] text-white shrink-0 shadow-md">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#38BDF8]">{evt.month}</span>
                    <span className="font-serif font-bold text-2xl sm:text-3xl leading-none">{evt.day}</span>
                  </div>

                  {/* Info */}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-[#DBEAFE] text-[#1E3A8A]">
                        {evt.category}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Icon.Clock className="w-3.5 h-3.5" />
                        <span>{evt.time}</span>
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-lg sm:text-xl text-[#0A1628] group-hover:text-[#1E3A8A] transition-colors leading-snug">
                      {evt.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5A6778] mt-1 flex items-center gap-1.5 truncate">
                      <Icon.MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{evt.venue}</span>
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-3 self-end sm:self-center">
                  <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 group-hover:bg-[#1E3A8A] text-slate-700 group-hover:text-white px-4 py-2.5 text-xs font-bold transition-all shadow-xs">
                    <span>View Schedule & Details</span>
                    <Icon.ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3: BALDWIN PERSPECTIVES BLOG (CLICKABLE TO EXPAND)
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="school-blog" className="relative py-24 lg:py-32 bg-white scroll-mt-24">
        <div className="mx-auto max-w-[1380px] px-6 lg:px-14">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#1E3A8A]/10 px-5 py-2 mb-4 border border-[#1E3A8A]/20">
                <Icon.BookOpen className="w-4 h-4 text-[#1E3A8A]" />
                <span className="text-xs font-bold tracking-[0.16em] text-[#1E3A8A] uppercase">Thought Leadership & Essays</span>
              </div>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0A1628] leading-tight">
                Baldwin Perspectives Blog
              </h2>
              <p className="text-base text-[#5A6778] mt-2 max-w-2xl">
                Insightful essays and reflections authored by educators, residential mentors, and student leaders on girl-child education, pedagogy, and character.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {["All", "Pedagogy & STEM", "Heritage & Arts", "Wellbeing", "Athletics", "Student Voices"].map((cat) => {
                const isActive = blogFilter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setBlogFilter(cat)}
                    className={`rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#781428] text-white shadow-sm"
                        : "bg-[#F1F5F9] text-[#475569] hover:bg-[#FFE4E6] hover:text-[#781428]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Blog Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((post, i) => (
              <motion.article
                key={post.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                onClick={() => setExpandedBlog(post)}
                className="group rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] overflow-hidden hover:border-[#781428]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="relative h-52 overflow-hidden bg-slate-900">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center rounded-full bg-[#781428] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider shadow-xs">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="font-serif font-bold text-xl text-[#0A1628] leading-snug group-hover:text-[#781428] transition-colors mb-3">
                      {post.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#5A6778] leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-3 pt-3 border-t border-slate-200/80">
                      <div className="h-8 w-8 rounded-full bg-[#1E3A8A]/10 text-[#1E3A8A] flex items-center justify-center font-bold text-xs">
                        {post.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#0A1628]">{post.author}</p>
                        <p className="text-[11px] text-slate-500">{post.authorRole}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs font-bold text-[#781428]">
                  <span className="group-hover:underline">Read Full Article</span>
                  <Icon.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4: SCHOOL CALENDAR 2026–27 OVERVIEW
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="calendar" className="relative py-20 bg-gradient-to-br from-[#0A1628] to-[#1E3A8A] text-white scroll-mt-24">
        <div className="mx-auto max-w-[1380px] px-6 lg:px-14">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 mb-4 border border-white/15">
                <Icon.Calendar className="w-4 h-4 text-[#F3C44E]" />
                <span className="text-xs font-bold tracking-[0.16em] text-[#F3C44E] uppercase">Term Dates & Schedules</span>
              </div>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white leading-tight mb-4">
                Academic Year 2026–27 Calendar
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6">
                Download the official consolidated calendar outlining term commencement, semester examinations, sports days, festival vacations, and parent-teacher conference dates.
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-white/80 mb-6">
                <div className="flex items-center gap-3">
                  <Icon.CheckCircle className="w-4 h-4 text-[#38BDF8]" />
                  <span><strong>First Term:</strong> June 1, 2026 – September 26, 2026</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon.CheckCircle className="w-4 h-4 text-[#38BDF8]" />
                  <span><strong>Second Term:</strong> October 12, 2026 – December 23, 2026</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon.CheckCircle className="w-4 h-4 text-[#38BDF8]" />
                  <span><strong>Third Term & Board Trials:</strong> January 4, 2027 – April 10, 2027</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://portal.baldwingirls.edu.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-[#1E3A8A] font-bold px-6 py-3 text-xs sm:text-sm transition hover:bg-[#DBEAFE] shadow-md"
                >
                  <Icon.Download className="w-4 h-4" />
                  <span>Download Calendar PDF</span>
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold px-6 py-3 text-xs sm:text-sm border border-white/20 backdrop-blur-sm transition"
                >
                  <span>Contact School Office</span>
                </Link>
              </div>
            </div>

            {/* Quick Term Snapshot Box */}
            <div className="rounded-2xl bg-white/10 border border-white/15 p-6 sm:p-8 backdrop-blur-md">
              <h4 className="font-serif font-bold text-xl text-white mb-4">Key Examination Windows</h4>
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between text-[#F3C44E] font-bold mb-1">
                    <span>Mid-Term Diagnostic Assessments</span>
                    <span>August 2026</span>
                  </div>
                  <p className="text-white/70">Continuous formative evaluation for Pre-Primary to Std X.</p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between text-[#38BDF8] font-bold mb-1">
                    <span>Terminal Semester Examinations</span>
                    <span>September 2026</span>
                  </div>
                  <p className="text-white/70">Summative evaluation before the Dussehra autumn vacation.</p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between text-emerald-400 font-bold mb-1">
                    <span>ICSE Class X Pre-Board Trials</span>
                    <span>January 2027</span>
                  </div>
                  <p className="text-white/70">Full-length ICSE council simulation mock exams with individual analytics.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          EXPANDABLE NEWS MODAL DIALOG (PROPER DETAILS ABOUT NEWS)
      ═══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {expandedNews && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedNews(null)}
              className="fixed inset-0 bg-[#0A1628]/80 backdrop-blur-md"
            />

            {/* Modal Sheet */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header Bar with Close Button */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#F8FAFC]">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#1E3A8A] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider">
                    {expandedNews.categoryBadge}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{expandedNews.date}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setExpandedNews(null)}
                  className="rounded-full p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer"
                  aria-label="Close modal"
                >
                  <Icon.Close className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
                {/* Hero image in modal */}
                <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-900 shadow-md">
                  <img
                    src={expandedNews.image}
                    alt={expandedNews.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white text-xs flex items-center gap-1.5">
                    <Icon.MapPin className="w-4 h-4 text-[#F3C44E]" />
                    <span>{expandedNews.venue}</span>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#0A1628] leading-tight mb-2">
                    {expandedNews.title}
                  </h2>
                  <p className="text-xs text-slate-400 font-medium">
                    Published in the Official Baldwin Chronicle · {expandedNews.readTime}
                  </p>
                </div>

                {/* Quote Box if present */}
                {expandedNews.quote && (
                  <div className="rounded-2xl bg-[#EEF4FB] border-l-4 border-[#1E3A8A] p-5 relative">
                    <Icon.Quote className="w-8 h-8 text-[#1E3A8A]/15 absolute top-3 right-3" />
                    <p className="text-xs sm:text-sm text-[#1E3A8A] font-serif italic leading-relaxed mb-2">
                      "{expandedNews.quote.text}"
                    </p>
                    <p className="text-xs font-bold text-[#0A1628]">
                      — {expandedNews.quote.author}, <span className="font-normal text-slate-500">{expandedNews.quote.role}</span>
                    </p>
                  </div>
                )}

                {/* Full Article Text */}
                <div className="space-y-4 text-sm sm:text-base text-[#334155] leading-relaxed">
                  {expandedNews.content.map((para, pi) => (
                    <p key={pi}>{para}</p>
                  ))}
                </div>

                {/* Key Highlights Box */}
                <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-6">
                  <h4 className="font-serif font-bold text-base text-[#0A1628] mb-3 flex items-center gap-2">
                    <Icon.Award className="w-4 h-4 text-[#1E3A8A]" />
                    <span>Key Achievements & Report Highlights</span>
                  </h4>
                  <ul className="space-y-2">
                    {expandedNews.keyHighlights.map((hl, hli) => (
                      <li key={hli} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#475569]">
                        <Icon.CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-[#F8FAFC] border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">Baldwin Girls' High School · Official Bulletin</span>
                <button
                  type="button"
                  onClick={() => setExpandedNews(null)}
                  className="rounded-xl bg-[#1E3A8A] text-white px-5 py-2 text-xs font-bold hover:bg-[#12233f] transition cursor-pointer"
                >
                  Close Story
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════════
          EXPANDABLE BLOG MODAL DIALOG (PROPER DETAILS ABOUT BLOG)
      ═══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {expandedBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedBlog(null)}
              className="fixed inset-0 bg-[#0A1628]/80 backdrop-blur-md"
            />

            {/* Modal Sheet */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#F8FAFC]">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#781428] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider">
                    {expandedBlog.category}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{expandedBlog.readTime}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setExpandedBlog(null)}
                  className="rounded-full p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer"
                  aria-label="Close modal"
                >
                  <Icon.Close className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Essay Content */}
              <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
                {/* Author Info Banner */}
                <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                  <div className="h-12 w-12 rounded-full bg-[#781428]/10 text-[#781428] flex items-center justify-center font-bold text-base shrink-0">
                    {expandedBlog.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#0A1628]">{expandedBlog.author}</h3>
                    <p className="text-xs text-slate-500">{expandedBlog.authorRole}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Published on {expandedBlog.date}</p>
                  </div>
                </div>

                {/* Article Title */}
                <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#0A1628] leading-tight">
                  {expandedBlog.title}
                </h1>

                {/* Image */}
                <div className="rounded-2xl overflow-hidden h-60 sm:h-72 bg-slate-100 shadow-sm">
                  <img
                    src={expandedBlog.image}
                    alt={expandedBlog.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Key Takeaways Callout */}
                <div className="rounded-2xl bg-[#FFF1F2] border border-[#FECDD3] p-5">
                  <h4 className="font-serif font-bold text-sm text-[#781428] mb-2 flex items-center gap-2">
                    <Icon.Sparkles className="w-4 h-4 text-[#781428]" />
                    <span>Executive Takeaways</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {expandedBlog.keyTakeaways.map((takeaway, ti) => (
                      <li key={ti} className="flex items-start gap-2 text-xs text-slate-700">
                        <Icon.CheckCircle className="w-3.5 h-3.5 text-[#781428] shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Essay Paragraphs */}
                <div className="space-y-4 text-sm sm:text-base text-[#334155] leading-relaxed">
                  {expandedBlog.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Tags */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  <Icon.Tag className="w-3.5 h-3.5 text-slate-400" />
                  {expandedBlog.tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-[#F8FAFC] border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">Baldwin Perspectives Editorial Series</span>
                <button
                  type="button"
                  onClick={() => setExpandedBlog(null)}
                  className="rounded-xl bg-[#781428] text-white px-5 py-2 text-xs font-bold hover:bg-[#9F1239] transition cursor-pointer"
                >
                  Done Reading
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════════
          EVENT SCHEDULE MODAL DIALOG
      ═══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="fixed inset-0 bg-[#0A1628]/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden z-10 p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#1E3A8A] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider">
                  {selectedEvent.category} Fixture
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="rounded-full p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer"
                >
                  <Icon.Close className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h3 className="font-serif font-bold text-2xl text-[#0A1628] mb-2">{selectedEvent.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{selectedEvent.description}</p>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2.5 text-slate-700">
                  <Icon.Calendar className="w-4 h-4 text-[#1E3A8A] shrink-0" />
                  <span><strong>Date:</strong> {selectedEvent.date}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-700">
                  <Icon.Clock className="w-4 h-4 text-[#1E3A8A] shrink-0" />
                  <span><strong>Timings:</strong> {selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-700">
                  <Icon.MapPin className="w-4 h-4 text-[#1E3A8A] shrink-0" />
                  <span><strong>Venue:</strong> {selectedEvent.venue}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-700">
                  <Icon.User className="w-4 h-4 text-[#1E3A8A] shrink-0" />
                  <span><strong>Audience:</strong> {selectedEvent.audience}</span>
                </div>
                {selectedEvent.dressCode && (
                  <div className="flex items-center gap-2.5 text-slate-700">
                    <Icon.Tag className="w-4 h-4 text-[#1E3A8A] shrink-0" />
                    <span><strong>Dress Code:</strong> {selectedEvent.dressCode}</span>
                  </div>
                )}
              </div>

              <div>
                <h5 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-2">Program Highlights</h5>
                <ul className="space-y-1.5">
                  {selectedEvent.highlights.map((hl, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                      <Icon.CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <a
                  href="tel:+919148780138"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A8A]"
                >
                  <span>Inquiries: +91 91487 80138</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="rounded-xl bg-[#0A1628] text-white px-5 py-2 text-xs font-bold"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

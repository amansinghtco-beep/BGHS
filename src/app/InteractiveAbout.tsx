"use client";

import { useState } from "react";
import { Link } from "react-router";
import { PageHero } from "./components";
import { school } from "./data";

export default function InteractiveAbout() {
  const [activeLeader, setActiveLeader] = useState<number>(0);
  const [activeSymbol, setActiveSymbol] = useState<number>(0);
  const [prayerTab, setPrayerTab] = useState<"hymn" | "prayer">("hymn");
  const [flippedHouses, setFlippedHouses] = useState<Record<string, boolean>>({});

  const toggleHouseFlip = (houseName: string) => {
    setFlippedHouses((prev) => ({
      ...prev,
      [houseName]: !prev[houseName],
    }));
  };

  // Crest symbols with custom inline vector illustrations (torch, open book, laurel wreath, harp, shield)
  const crestEmblems = [
    {
      title: "The Torch",
      meaning: "Truth and Light",
      desc: "Denotes the undying beacon of truth and moral illumination that dispels ignorance, ignites intellect, and guides each girl's journey through life.",
      badge: "Heraldic Emblems",
      svg: (
        <svg className="w-8 h-8 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2c1 2 2 3.5 2 5.5a4 4 0 0 1-8 0C6 5.5 7 4 8 2c1 1.5 2 2 4 0z" fill="currentColor" fillOpacity="0.2" />
          <path d="M9 12h6l-1 9H10l-1-9z" />
          <path d="M8 12l-1-2h10l-1 2" />
          <circle cx="12" cy="7" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: "The Open Book",
      meaning: "God's Word and Knowledge",
      desc: "Represents the divine scriptures as the anchor of human wisdom, coupled with modern academic inquiry, critical thinking, and a lifelong thirst for learning.",
      badge: "Holy Word & Wisdom",
      svg: (
        <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z" />
          <path d="M6 6h10" />
          <path d="M6 10h10" />
          <path d="M6 14h6" />
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        </svg>
      ),
    },
    {
      title: "The Laurel",
      meaning: "Honor and Dignity",
      desc: "The classical Roman wreath of triumph denoting academic distinction, athletic honor, personal integrity, and the graceful dignity of every Baldwinian.",
      badge: "Virtue & Victory",
      svg: (
        <svg className="w-8 h-8 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22a9.5 9.5 0 0 1-9-9.5C3 7.5 7 3.5 12 2c5 1.5 9 5.5 9 10.5a9.5 9.5 0 0 1-9 9.5z" strokeDasharray="3 3" />
          <path d="M7 14c-1-2-1-4 1-6" />
          <path d="M17 14c1-2 1-4-1-6" />
          <path d="M12 7v10" />
        </svg>
      ),
    },
    {
      title: "The Harp",
      meaning: "Cultural Development",
      desc: "Symbolizes inner harmony, poetic sensibility, artistic brilliance, and the rich musical heritage celebrated across the school's choirs and cultural ensembles.",
      badge: "Harmony & The Arts",
      svg: (
        <svg className="w-8 h-8 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3v18" />
          <path d="M6 3c5 0 12 4 12 10 0 5-4 8-12 8" />
          <path d="M10 6v13" />
          <path d="M14 9.5v8" />
        </svg>
      ),
    },
    {
      title: "Loyalty and Service",
      meaning: "The Sacred Motto",
      desc: "The school motto demands uncompromising faithfulness to God, self-respect, loyalty to the Alma Mater, and devoted compassionate service to all life.",
      badge: "Our Code of Life",
      svg: (
        <svg className="w-8 h-8 text-[#1D4ED8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
  ];

  // 7 Houses with full historical narrative, founder details, and values
  const houses = [
    {
      name: "LAURA GILL HOUSE",
      short: "Laura Gill",
      colorName: "Orange",
      accent: "#ea580c",
      gradient: "from-orange-500 to-amber-600",
      motto: "“To Greater Heights”",
      tagline: "Unrelenting aspiration, academic tenacity, and sisterhood.",
      story:
        "Named in honour of Miss Laura Gill, an early visionary educator whose pioneering spirit cemented the foundations of academic excellence at Baldwin. The house inspires young women to push scholarly boundaries, take bold creative risks, and lift each other up so every member ascends to greater heights in character, intellect, and athletics.",
      values: ["Ambition", "Sisterhood", "Resilience"],
      icon: (
        <svg className="w-6 h-6 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      name: "WESTON HOUSE",
      short: "Weston",
      colorName: "Yellow",
      accent: "#eab308",
      gradient: "from-yellow-400 to-amber-500",
      motto: "“Never Despair”",
      tagline: "Radiant fortitude turning every adversity into triumph.",
      story:
        "Commemorating the steadfast spirit of Rev. Weston, who sustained the institution through periods of extreme financial adversity in the late nineteenth century. Weston House champions infectious optimism, moral courage in the face of setbacks, and radiant fellowship that never despairs.",
      values: ["Optimism", "Fortitude", "Integrity"],
      icon: (
        <svg className="w-6 h-6 text-yellow-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ),
    },
    {
      name: "FISHER HOUSE",
      short: "Fisher",
      colorName: "Purple",
      accent: "#9333ea",
      gradient: "from-purple-600 to-indigo-700",
      motto: "“PERSEVERE TO THE END.”",
      tagline: "Named after Miss Fannie Fisher who donated generously in 1910.",
      story:
        "Fisher House commemorates Miss Fannie Fisher, whose generous endowment in 1910 helped finance major campus expansions and modern science laboratories. Fisher House students are celebrated for intellectual stamina, deep altruism, and enduring commitment to see every noble endeavor through to final victory.",
      values: ["Generosity", "Perseverance", "Dignity"],
      icon: (
        <svg className="w-6 h-6 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      name: "BENTHEIN HOUSE",
      short: "Benthein",
      colorName: "Green",
      accent: "#22c55e",
      gradient: "from-emerald-500 to-green-600",
      motto: "“Bend to Nothing”",
      tagline: "Moral backbone standing resolute for righteousness and truth.",
      story:
        "Commemorating the legacy of Miss Elizabeth Benthein, an educator of extraordinary principle and spiritual resolve. Benthein House represents unshakeable moral backbone, civic responsibility, and environmental stewardship—instilling in its students the conviction to never bow to injustice or compromise.",
      values: ["Moral Courage", "Steadfastness", "Honor"],
      icon: (
        <svg className="w-6 h-6 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      name: "DELIMA HOUSE",
      short: "Delima",
      colorName: "Pink",
      accent: "#f472b6",
      gradient: "from-pink-400 to-rose-500",
      motto: "“Forward Ever Backward Never”",
      tagline: "Dynamic momentum, empathetic grace, and progressive thinking.",
      story:
        "Named after the respected Delima family whose multi-generational commitment guided the school into modern administration and cultural prominence. Delima House embodies boundless forward momentum, creative curiosity, and the courage to pioneer new solutions without looking back.",
      values: ["Innovation", "Grace", "Forward Drive"],
      icon: (
        <svg className="w-6 h-6 text-pink-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      ),
    },
    {
      name: "STEPHEN HOUSE",
      short: "Stephen",
      colorName: "Red",
      accent: "#e11d48",
      gradient: "from-red-600 to-rose-700",
      motto: "“Step up, Stephen”",
      tagline: "Passionate championship, athletic drive, and servant leadership.",
      story:
        "Honouring Saint Stephen's spirit of bold conviction, selflessness, and readiness to step forward when duty calls. Members of Stephen House are renowned for fierce athletic teamwork on the sports field, spirited oratorical debate, and a heart for community outreach.",
      values: ["Bold Conviction", "Sportsmanship", "Service"],
      icon: (
        <svg className="w-6 h-6 text-rose-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
    },
    {
      name: "WATSON HOUSE",
      short: "Watson",
      colorName: "Cyan",
      accent: "#06b6d4",
      gradient: "from-cyan-400 to-blue-500",
      motto: "“Flame of Hope”",
      tagline: "Clarity of vision radiating knowledge, empathy, and peace.",
      story:
        "Commemorating Miss Watson's compassionate educational ministry that broadened female literacy in nineteenth-century Bangalore. Watson House stands for clarity of vision, deep artistic empathy, and keeping the flame of hope burning brightly across every classroom and community project.",
      values: ["Clarity", "Empathy", "Hope"],
      icon: (
        <svg className="w-6 h-6 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      ),
    },
  ];

  // Leaders details
  const leadersData = [
    {
      id: "chairman",
      name: "Bishop Dr. AnilKumar John Servand",
      shortName: "Bishop Dr. AnilKumar",
      role: "Chairman",
      organization: "Baldwin Methodist Educational Society",
      image: "/chairman-full.png",
      quote: "Our commitment to spiritually enrich church life and improve the standard of education is unparalleled.",
      focus: "Pioneering governance · Spiritual enrichment · Modern academic expansion",
      bio: [
        "Bishop Dr. AnilKumar John Servand is the Chairman of Baldwin Methodist Educational Society and heads the Bangalore Regional Conference of the Methodist Church in India. He is committed to excellence in church life as well as in the field of education.",
        "As minister of the Methodist Church in India (MCI), he has served with distinction as Professor and Principal of Methodist Bible Seminary, Gujarat, Director of Methodist Technical Institute at Baroda, and Pastor & District Superintendent. Currently, he presides over Bangalore, Mumbai, Chennai, and Bareilly Regional Conferences of MCI, serves as Chairperson of the Medical Council and Women's Council, and is Chief Acharya of Sat Tal Christian Ashram, Nainital.",
        "A visionary of deep principles and task-oriented leadership, our Chairman has elevated the school's prestige and stature through progressive reforms and futuristic academic planning.",
      ],
    },
    {
      id: "principal",
      name: "Mrs. Asha Margaret Das",
      shortName: "Mrs. Asha M. Das",
      role: "Principal",
      organization: "Baldwin Girls' High School",
      image: "/principal-full.png",
      quote: "“Education is the most powerful weapon which you can use to change the world.” — Nelson Mandela",
      focus: "Holistic ICSE Curriculum · Safe & Stimulating Campus · Moral Leadership",
      bio: [
        "Mrs. Asha Margaret Das brings passionate educational leadership to Baldwin Girls' High School, steering the institution towards global benchmarks while preserving its timeless moral heritage.",
        "Our commitment under her stewardship is to provide a safe, intellectually challenging, and nurturing environment that empowers young girls to become innovative thinkers, creative problem solvers, and inspired lifelong learners prepared to thrive in an ever-changing world.",
        "She champions interdisciplinary academic methods, advanced science and computer laboratories, and extensive co-curricular programs that give every girl her moment to shine.",
      ],
    },
    {
      id: "manager",
      name: "Mrs. Anita Isaac",
      shortName: "Mrs. Anita Isaac",
      role: "Manager",
      organization: "Baldwin Girls' High School",
      image: "/manager-full.png",
      quote: "“Education is simply the soul of a society as it passes from one generation to another.” — G. K. Chesterton",
      focus: "Institutional Stewardship · 21st-Century Facilities · Student Welfare",
      bio: [
        "Mrs. Anita Isaac oversees institutional operations, facility modernization, and student welfare across our historic Richmond Town campus.",
        "In a rapidly changing world, education must evolve to meet new challenges through collaboration, innovation, and sustainable growth. Since 1880, Baldwin Girls' High School has excelled in producing responsible citizens who drive positive societal change.",
        "Her dynamic stewardship ensures that infrastructure, digital technologies, and administrative support are aligned to provide every student and teacher with a world-class educational ecosystem.",
      ],
    },
  ];

  return (
    <main className="bg-[#fcfdfd] text-[#0A2540] overflow-hidden">
      {/* 1. HERO BANNER */}
      <PageHero
        eyebrow="About Baldwin Girls' High School · Est. 1880"
        title="Tradition in motion."
        text="A legacy spanning over 140 uninterrupted years of faith, intellectual empowerment, and character building in the heart of Bengaluru."
        image={`${school}/static/media/about-banner.6facb4306d35635d7fd6.png`}
      />

      {/* 2. MODERN EDITORIAL FOUNDING STORY (Clean Editorial Layout + Illustration Badges) */}
      <section id="history" className="py-20 lg:py-28 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-12 items-center">
            {/* Story column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#1D4ED8] text-xs font-bold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[#1D4ED8] animate-ping" />
                The Baldwin Odyssey · 1880 to Present
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] leading-[1.12] text-[#0A2540]">
                A humble beginning. <br />
                <span className="italic text-[#1D4ED8] font-normal">A lasting legacy of 140+ years.</span>
              </h2>

              <div className="space-y-4 text-base sm:text-[16.5px] leading-relaxed text-[#4b5563]">
                <p>
                  Started in 1880 at <strong className="text-[#0A2540]">#2 Alexandra Street</strong> to provide
                  schooling for English-speaking Methodist children, the institution went through intense hardship
                  during its dawn—plagued with paucity of funds and dwindling enrollment.
                </p>
                <p>
                  On the brink of closure, it was sustained by the timely benevolence of{" "}
                  <strong className="text-[#1D4ED8]">Mr. John Baldwin of Berea, Ohio</strong>, who gifted a
                  thousand dollars to acquire land and buildings, keeping the school doors open forever.
                </p>
                <p>
                  Today, from those fragile beginnings, the institution stands tall as a Bengaluru landmark of{" "}
                  <strong className="text-[#0A2540]">5,600+ young women</strong>, supported by comprehensive science
                  laboratories, a rich library, athletic grounds, and an accomplished faculty dedicated to
                  imparting quality Christian education.
                </p>
              </div>

              <div className="border-l-4 border-[#1D4ED8] bg-blue-50/50 p-5 rounded-r-xl text-sm italic text-[#1e293b]">
                “The institution is now a symbol of the triumph of tradition and individual talent—the fruit of
                Loyalty and service, Righteousness, and Truth emanating from the warm heart of John Baldwin.”
              </div>
            </div>

            {/* John Baldwin High-Res Portrait Photo with Framed Border */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[390px] group">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#1D4ED8] via-indigo-500 to-purple-500 opacity-20 blur-xl group-hover:opacity-35 transition-all duration-500" />
                <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-[#0b1b3d]">
                  <img
                    src="/john-baldwin-full.png"
                    alt="Mr. John Baldwin"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="p-4 bg-gradient-to-t from-black via-black/80 to-transparent text-white text-center">
                    <p className="font-serif font-bold text-xl text-white">Mr. John Baldwin</p>
                    <p className="text-xs text-white/70 uppercase tracking-widest mt-0.5">
                      Philanthropist & Benefactor · Est. 1880
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISION & MISSION - MODERN MINIMALIST SPLIT */}
      <section id="mission" className="py-20 bg-[#f8fafc] border-b border-gray-100">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1D4ED8] flex items-center justify-center mb-6">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="4" />
                    <line x1="21.17" y1="8" x2="12" y2="8" />
                    <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
                    <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
                  </svg>
                </div>
                <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-[#1D4ED8]">
                  Our Vision
                </span>
                <h3 className="mt-4 font-serif text-2xl sm:text-3xl text-[#0A2540] leading-snug">
                  “To facilitate holistic learning, building character, and developing skills to meet global challenges.”
                </h3>
              </div>
              <p className="mt-6 text-sm text-[#627d98] leading-relaxed pt-4 border-t border-gray-100">
                Empowering every young woman with intellectual depth, moral clarity, and the courage to transform society.
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-[#0b1b3d] text-white rounded-3xl p-8 sm:p-12 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/10 text-[#38BDF8] flex items-center justify-center mb-6">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-[#38BDF8]">
                  Our Mission
                </span>
                <ul className="mt-4 space-y-3.5 text-sm sm:text-[15px] text-white/90 leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#38BDF8] font-bold">✓</span>
                    <span>To create progressive analytical thinkers emphasizing physical, emotional, and spiritual development.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#38BDF8] font-bold">✓</span>
                    <span>To nurture each girl’s talent, empowering her as an agile leader, team builder, and change-maker.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#38BDF8] font-bold">✓</span>
                    <span>To foster mutual respect and global brotherhood for a peaceful, brighter world.</span>
                  </li>
                </ul>
              </div>
              <p className="mt-6 text-xs text-white/60 tracking-wider uppercase pt-4 border-t border-white/10">
                Baldwin Methodist Educational Society · Core Tenets
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE CREST SYMBOLS & HYMN VIEWER */}
      <section className="py-20 lg:py-24 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1D4ED8]">
              Heritage & Symbols
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0A2540] mt-2">
              The School Crest & Sacred Song
            </h2>
            <p className="mt-3 text-sm text-[#506690]">
              Click on each heraldic illustration emblem below to explore its spiritual meaning.
            </p>
          </div>

          {/* Interactive Crest Emblems Grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-center bg-[#f8fafc] rounded-3xl p-8 sm:p-12 border border-gray-200 mb-16">
            {/* Left: Crest Emblem */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <img
                src="/baldwin-crest-official.png"
                alt="Baldwin Crest"
                className="w-48 h-auto object-contain"
              />
              <p className="mt-4 font-serif font-bold text-lg text-[#0A2540]">Baldwin Girls' High School</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest">Bengaluru · Est. 1880</p>
            </div>

            {/* Right: Illustration Symbols Selector & Details */}
            <div className="lg:col-span-8 space-y-6">
              {/* Emblem icon buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {crestEmblems.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveSymbol(index)}
                    className={`flex flex-col items-center gap-2 p-3.5 rounded-xl border transition-all duration-200 cursor-pointer text-center ${
                      activeSymbol === index
                        ? "bg-white border-[#1D4ED8] shadow-md ring-2 ring-[#1D4ED8]/30 scale-105"
                        : "bg-white/60 border-gray-200 hover:bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-gray-50">{item.svg}</div>
                    <span className="text-[11px] font-bold text-[#0A2540] leading-tight">{item.title}</span>
                  </button>
                ))}
              </div>

              {/* Dynamic Detail Card */}
              <div className="bg-white p-7 rounded-2xl border border-blue-100 shadow-sm animate-in fade-in duration-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1D4ED8] text-xs font-bold uppercase tracking-wide">
                    {crestEmblems[activeSymbol].badge}
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-[#0A2540]">
                    {crestEmblems[activeSymbol].title}
                  </h4>
                </div>
                <p className="font-medium text-sm text-[#1D4ED8] mb-2">
                  Signifies: {crestEmblems[activeSymbol].meaning}
                </p>
                <p className="text-sm text-[#4b5563] leading-relaxed">
                  {crestEmblems[activeSymbol].desc}
                </p>
              </div>
            </div>
          </div>

          {/* Tabbed School Hymn & The Lord's Prayer */}
          <div className="bg-[#0b1b3d] text-white rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex border-b border-white/10 bg-black/20">
              <button
                type="button"
                onClick={() => setPrayerTab("hymn")}
                className={`flex-1 py-4 text-center text-xs sm:text-sm font-bold tracking-widest uppercase transition-colors cursor-pointer ${
                  prayerTab === "hymn" ? "bg-[#1D4ED8] text-white" : "text-white/60 hover:text-white"
                }`}
              >
                School Hymn (By S. W. Mayer)
              </button>
              <button
                type="button"
                onClick={() => setPrayerTab("prayer")}
                className={`flex-1 py-4 text-center text-xs sm:text-sm font-bold tracking-widest uppercase transition-colors cursor-pointer ${
                  prayerTab === "prayer" ? "bg-[#1D4ED8] text-white" : "text-white/60 hover:text-white"
                }`}
              >
                The Lord’s Prayer
              </button>
            </div>

            <div className="p-8 sm:p-14 text-center">
              {prayerTab === "hymn" ? (
                <div className="max-w-3xl mx-auto space-y-5 animate-in fade-in duration-200">
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#38BDF8]">
                    “We Build Our School on Thee, O Lord”
                  </h3>
                  <div className="space-y-4 text-sm sm:text-base leading-relaxed text-white/80 font-light">
                    <p>
                      We build our school on Thee, O Lord; To Thee we bring our common need:
                      <br />
                      The loving heart, the helpful word, The tender thought, the kindly deed.
                      <br />
                      With these, we pray Thy Spirit may Enrich and bless our School alway.
                    </p>
                    <p>
                      We work together in Thy sight, We live together in Thy love;
                      <br />
                      Guide Thou our faltering steps aright, And lift our thoughts to heaven above.
                      <br />
                      Dear Lord, we pray Thy Spirit may Be present in our School alway.
                    </p>
                    <p>
                      Hold Thou each hand to keep it just, Touch Thou our lips and make them pure;
                      <br />
                      If Thou art with us, Lord, we must Be faithful friends and comrades sure.
                      <br />
                      Dear Lord, we pray Thy Spirit may Be present in our School alway.
                    </p>
                  </div>
                  <p className="text-sm font-bold text-[#38BDF8] pt-2">— S. W. Mayer</p>
                </div>
              ) : (
                <div className="max-w-2xl mx-auto space-y-5 animate-in fade-in duration-200 italic text-white/90 text-base sm:text-lg">
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#38BDF8] not-italic">The Lord’s Prayer</h3>
                  <p>
                    Our Father, who art in heaven, hallowed be thy name;
                    <br />
                    thy Kingdom come; thy will be done; on earth as it is in heaven.
                  </p>
                  <p>
                    Give us this day our daily bread.
                    <br />
                    And forgive us our trespasses, as we forgive those who trespass against us.
                  </p>
                  <p>
                    And lead us not into temptation; but deliver us from evil.
                  </p>
                  <p className="text-sm text-[#38BDF8] not-italic">
                    For thine is the kingdom, the power and the glory, for ever and ever.
                  </p>
                  <p className="font-bold text-xl not-italic text-white">Amen.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE LEADERSHIP SECTION (Large Uncropped High-Res Photos & Direct Bio View) */}
      <section id="leadership" className="py-20 lg:py-28 bg-[#fafbfe] border-b border-gray-100">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1D4ED8]">
              Governance & Mentorship
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0A2540] mt-2">
              Distinguished Leadership
            </h2>
            <p className="mt-3 text-sm text-[#506690]">
              Click on any leader below to view their official photograph, biographical achievements, and message.
            </p>
          </div>

          {/* Responsive Leader Selector Cards — 3 Columns on Mobile & Desktop */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4 max-w-4xl mx-auto mb-10">
            {leadersData.map((leader, idx) => {
              const isActive = activeLeader === idx;
              return (
                <button
                  key={leader.id}
                  type="button"
                  onClick={() => setActiveLeader(idx)}
                  className={`flex flex-col items-center justify-between p-3 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer text-center relative group ${
                    isActive
                      ? "bg-white border-[#1D4ED8] shadow-xl shadow-blue-900/10 ring-2 ring-[#1D4ED8]/20 -translate-y-1"
                      : "bg-white/80 hover:bg-white border-gray-200 hover:border-blue-300 hover:shadow-md"
                  }`}
                >
                  {/* Active Indicator Top Tag */}
                  {isActive && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1D4ED8] text-white text-[9px] sm:text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-xs tracking-wider whitespace-nowrap">
                      Active Profile
                    </span>
                  )}

                  {/* Leader Circular Avatar with official framing */}
                  <div className={`h-12 w-12 sm:h-16 sm:w-16 rounded-full overflow-hidden mb-2.5 border-2 transition-transform duration-300 group-hover:scale-105 shrink-0 ${
                    isActive ? "border-[#1D4ED8] shadow-md ring-2 ring-blue-100" : "border-gray-200"
                  }`}>
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Role Badge */}
                  <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mb-1 ${
                    isActive ? "bg-blue-100 text-[#1D4ED8]" : "bg-gray-100 text-gray-600"
                  }`}>
                    {leader.role}
                  </span>

                  {/* Name (Responsive: short on mobile, full on tablet/desktop) */}
                  <h4 className={`font-serif font-bold text-xs sm:text-sm lg:text-base leading-snug line-clamp-2 min-h-[2.5rem] flex items-center justify-center ${
                    isActive ? "text-[#0A2540]" : "text-gray-700"
                  }`}>
                    <span className="hidden sm:inline">{leader.name}</span>
                    <span className="sm:hidden">{leader.shortName}</span>
                  </h4>

                  {/* Explicit View Info Button */}
                  <div className={`mt-2.5 w-full py-1.5 px-2 rounded-xl text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                    isActive
                      ? "bg-[#1D4ED8] text-white shadow-xs"
                      : "bg-gray-100 text-gray-700 group-hover:bg-[#1D4ED8] group-hover:text-white"
                  }`}>
                    <span>{isActive ? "Viewing Info" : "View Info"}</span>
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Leader Full Profile Card with Big Uncropped High-Res Picture */}
          <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-200 shadow-xl transition-all">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Leader Photo with Official Rounded Framing */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-[420px] rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-slate-900 group">
                  <img
                    src={leadersData[activeLeader].image}
                    alt={leadersData[activeLeader].name}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="p-4 bg-[#0b1b3d] text-white text-center">
                    <h4 className="font-display font-extrabold text-base sm:text-lg text-white">
                      {leadersData[activeLeader].name}
                    </h4>
                    <p className="text-xs text-[#38BDF8] font-bold tracking-widest uppercase mt-0.5">
                      {leadersData[activeLeader].role} · {leadersData[activeLeader].organization}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bio & Vision */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-blue-50/70 border-l-4 border-[#1D4ED8] p-4 sm:p-5 rounded-r-xl">
                  <p className="font-serif italic text-sm sm:text-base lg:text-lg text-[#0A2540] leading-relaxed">
                    {leadersData[activeLeader].quote}
                  </p>
                </div>

                <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#4b5563] pt-1">
                  {leadersData[activeLeader].bio.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-[#0A2540]">Key Focus:</span>
                  <span className="text-xs text-gray-600 font-medium">
                    {leadersData[activeLeader].focus}
                  </span>
                </div>

                {/* Quick Prev / Next Leader Switcher Controls */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setActiveLeader((prev) => (prev > 0 ? prev - 1 : leadersData.length - 1))}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D4ED8] hover:text-[#0A2540] px-3 py-2 rounded-xl hover:bg-blue-50 transition cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                    <span>Previous</span>
                  </button>

                  <span className="text-xs text-gray-400 font-medium">
                    {activeLeader + 1} of {leadersData.length}
                  </span>

                  <button
                    type="button"
                    onClick={() => setActiveLeader((prev) => (prev < leadersData.length - 1 ? prev + 1 : 0))}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D4ED8] hover:text-[#0A2540] px-3 py-2 rounded-xl hover:bg-blue-50 transition cursor-pointer"
                  >
                    <span>Next</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 3D FLIP HOUSE CARDS (Interactive Hover Flip Feature) */}
      <section className="py-20 lg:py-28 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1D4ED8]">
              House System & Heritage
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0A2540] mt-2">
              The Seven Houses of BGHS
            </h2>
            <p className="mt-3 text-sm text-[#506690]">
              Hover or tap any card to flip and discover the history, motto, and values of each house.
            </p>
          </div>

          {/* 3D Flip Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {houses.map((house) => {
              const isFlipped = !!flippedHouses[house.name];
              return (
                <div
                  key={house.name}
                  onClick={() => toggleHouseFlip(house.name)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleHouseFlip(house.name);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${house.name} card, click or tap to flip`}
                  aria-pressed={isFlipped}
                  className="group perspective-1000 h-[380px] w-full cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] rounded-2xl"
                >
                  {/* 3D Container with both hover and tap/click flip support */}
                  <div
                    className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d rounded-2xl shadow-lg ${
                      isFlipped ? "rotate-y-180" : "group-hover:rotate-y-180"
                    }`}
                  >
                    {/* FRONT FACE */}
                    <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden bg-[#111827] text-white p-7 flex flex-col justify-between border border-white/10">
                      {/* Diagonal Color Sash Stripe */}
                      <div
                        className={`absolute -left-12 top-1/2 -translate-y-1/2 w-[150%] h-8 bg-gradient-to-r ${house.gradient} rotate-[-30deg] pointer-events-none opacity-90 shadow-md`}
                      />

                      {/* Top Header */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/15 text-white">
                          {house.colorName} House
                        </span>
                        <div className="p-1 rounded-full bg-white/10">{house.icon}</div>
                      </div>

                      {/* Center Title & Motto */}
                      <div className="relative z-10 text-center py-4">
                        <h3 className="font-display font-black text-xl text-white tracking-wider uppercase drop-shadow-md">
                          {house.name}
                        </h3>
                        <p className="font-serif italic text-sm text-white/90 mt-2">
                          {house.motto}
                        </p>
                      </div>

                      {/* Bottom Prompt */}
                      <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
                        <span>Motto & Values</span>
                        <span className="text-xs text-[#38BDF8] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          <span>{isFlipped ? "Tap to Flip Back ↺" : "Tap to Flip ↻"}</span>
                        </span>
                      </div>
                    </div>

                    {/* BACK FACE (Flipped to show paragraphs) */}
                    <div
                      className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden p-6 flex flex-col justify-between text-white border-2 border-white/20 shadow-2xl"
                      style={{
                        background: `linear-gradient(145deg, #0f172a 0%, ${house.accent} 140%)`,
                      }}
                    >
                      <div>
                        <div className="flex items-center justify-between pb-2.5 border-b border-white/15">
                          <h4 className="font-display font-black text-sm uppercase tracking-wider text-white">
                            {house.short} House
                          </h4>
                          <span className="text-[10px] font-bold uppercase bg-white/20 px-2 py-0.5 rounded-full">
                            {house.colorName}
                          </span>
                        </div>

                        <p className="font-serif italic text-xs text-amber-200 mt-2 mb-2.5">
                          {house.motto}
                        </p>

                        <p className="text-xs leading-relaxed text-white/90 text-left">
                          {house.story}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                        <div>
                          <p className="text-[9px] font-bold uppercase text-white/60 mb-1">Core Values:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {house.values.map((v) => (
                              <span key={v} className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-md text-white">
                                {v}
                              </span>
                            ))}
                          </div>
                        </div>

                        <span className="text-[11px] font-bold text-amber-300 shrink-0 ml-2">
                          Tap to Flip ↺
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. ADMISSIONS CTA & BACK TO HOME */}
      <section className="py-20 bg-gradient-to-b from-[#f8fafc] to-white">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-[#1D4ED8] via-[#1e40af] to-[#0f172a] text-white p-8 sm:p-12 shadow-2xl">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-widest mb-3">
                  Admissions 2026–2027 Open
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                  Join the Baldwin sisterhood of excellence.
                </h3>
                <p className="text-sm text-white/80 mt-2 max-w-xl">
                  Schedule a campus visit or talk to our admissions counselors today.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <Link
                  to="/admissions"
                  className="rounded-full bg-white text-[#1D4ED8] hover:bg-blue-50 py-3 px-6 text-xs font-bold uppercase tracking-wider text-center shadow-md transition-all hover:scale-105"
                >
                  Apply For Admission
                </Link>
                <Link
                  to="/contact"
                  className="rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 py-3 px-6 text-xs font-bold uppercase tracking-wider text-center transition-all"
                >
                  Campus Tour
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl bg-white border border-gray-300 hover:border-[#1D4ED8] hover:text-[#1D4ED8] text-gray-700 px-6 py-2.5 text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
            >
              ← Back to Home Page
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

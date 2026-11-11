"use client";

import { useState } from "react";
import { Link } from "react-router";
import { PageHero } from "./components";
import { school } from "./data";

export default function InteractiveAbout() {
  // Interactive state for Tab Navigation across Leadership
  const [activeLeaderTab, setActiveLeaderTab] = useState<"chairman" | "principal" | "manager">("chairman");

  // Interactive state for Crest Symbols
  const [activeCrestSymbol, setActiveCrestSymbol] = useState<number>(0);

  // Interactive state for Hymn vs Lord's Prayer toggle
  const [spiritualTab, setSpiritualTab] = useState<"hymn" | "prayer">("hymn");

  // Crest interactive items
  const crestSymbols = [
    {
      title: "The Torch",
      subtitle: "Truth & Light",
      color: "from-amber-500 to-orange-500",
      textColor: "text-amber-500",
      borderColor: "border-amber-400",
      desc: "Signifies the undying flame of truth and enlightenment that dispels darkness, guiding every student's intellect and moral compass.",
    },
    {
      title: "The Open Book",
      subtitle: "God's Word & Knowledge",
      color: "from-blue-600 to-indigo-600",
      textColor: "text-blue-600",
      borderColor: "border-blue-400",
      desc: "Represents eternal spiritual truth, divine wisdom, academic scholarship, and the open pursuit of modern arts, humanities, and sciences.",
    },
    {
      title: "The Laurel",
      subtitle: "Honor & Dignity",
      color: "from-emerald-500 to-teal-600",
      textColor: "text-emerald-500",
      borderColor: "border-emerald-400",
      desc: "A timeless classical emblem of virtue, academic triumphs, sportsmanship, integrity, and triumphant service to society.",
    },
    {
      title: "The Harp",
      subtitle: "Cultural Development",
      color: "from-purple-500 to-indigo-600",
      textColor: "text-purple-500",
      borderColor: "border-purple-400",
      desc: "Symbolizes inner harmony, poetic expression, musical excellence, and the vibrant cultural refinement nurtured at Baldwin.",
    },
    {
      title: "Loyalty & Service",
      subtitle: "The Sacred Motto",
      color: "from-blue-700 to-sky-500",
      textColor: "text-blue-700",
      borderColor: "border-blue-500",
      desc: "Demands uncompromising faithfulness to God, self-respect, loyalty to the Alma Mater, and dedicated stewardship for the nation and all human life.",
    },
  ];

  // 7 Houses data with comprehensive back-of-card historical paragraphs
  const houses = [
    {
      id: "laura-gill",
      name: "LAURA GILL HOUSE",
      short: "Laura Gill",
      colorName: "Orange",
      accentHex: "#ea580c",
      stripeGradient: "from-orange-500 to-amber-600",
      motto: "“To Greater Heights”",
      established: "Est. Historic Foundation",
      quote: "Striving upwards with unyielding optimism and sisterhood.",
      paragraph:
        "Named in honour of Miss Laura Gill, an early visionary educator whose devotion laid the bedrock of our academic rigor. The house champions relentless aspiration, courage under challenge, and pushing boundaries in science, arts, and athletics. Its members embody resilience, always lifting one another to reach greater heights in character and scholarly merit.",
      values: ["Ambition", "Sisterhood", "Perseverance"],
    },
    {
      id: "weston",
      name: "WESTON HOUSE",
      short: "Weston",
      colorName: "Yellow",
      accentHex: "#eab308",
      stripeGradient: "from-yellow-400 to-amber-500",
      motto: "“Never Despair”",
      established: "Est. Historic Foundation",
      quote: "Bright fortitude turning every trial into triumph.",
      paragraph:
        "Commemorating the steadfast spirit of Rev. Weston, who sustained the institution during its most difficult early trials. Weston House stands for indomitable cheerfulness, unshakeable faith in adversity, and infectious camaraderie. Their golden yellow badge signifies radiant hope that no obstacle can extinguish.",
      values: ["Optimism", "Fortitude", "Integrity"],
    },
    {
      id: "fisher",
      name: "FISHER HOUSE",
      short: "Fisher",
      colorName: "Purple",
      accentHex: "#9333ea",
      stripeGradient: "from-purple-600 to-indigo-700",
      motto: "“PERSEVERE TO THE END.”",
      established: "Named in 1910",
      quote: "Generosity of spirit and tenacity until the goal is won.",
      paragraph:
        "Fisher House honours Miss Fannie Fisher, whose generous benefaction in 1910 helped finance major campus expansions and laboratories. Fisher House students are celebrated for intellectual stamina, deep altruism, and enduring commitment to see every noble endeavor through to completion.",
      values: ["Generosity", "Tenacity", "Dignity"],
    },
    {
      id: "benthein",
      name: "BENTHEIN HOUSE",
      short: "Benthein",
      colorName: "Green",
      accentHex: "#22c55e",
      stripeGradient: "from-emerald-500 to-green-600",
      motto: "“Bend to Nothing”",
      established: "Est. Historic Foundation",
      quote: "Uncompromising integrity standing tall against the storm.",
      paragraph:
        "Commemorating the legacy of Miss Elizabeth Benthein, a stalwart missionary leader of extraordinary resolve. Benthein House represents moral backbone, environmental stewardship, and standing resolute for righteousness and truth, never bowing to prejudice or compromise.",
      values: ["Moral Courage", "Resilience", "Leadership"],
    },
    {
      id: "delima",
      name: "DELIMA HOUSE",
      short: "Delima",
      colorName: "Pink",
      accentHex: "#f472b6",
      stripeGradient: "from-pink-400 to-rose-500",
      motto: "“Forward Ever Backward Never”",
      established: "Est. Historic Foundation",
      quote: "Dynamic momentum, grace, and progressive compassion.",
      paragraph:
        "Named after the respected Delima family whose long-standing guidance helped modernise school administration. Delima House is known for innovative thinking, vibrant warmth, and an unwavering drive to march forward towards progressive horizons without second glances at past limitations.",
      values: ["Progress", "Grace", "Innovation"],
    },
    {
      id: "stephen",
      name: "STEPHEN HOUSE",
      short: "Stephen",
      colorName: "Red",
      accentHex: "#e11d48",
      stripeGradient: "from-red-600 to-rose-700",
      motto: "“Step up, Stephen”",
      established: "Est. Historic Foundation",
      quote: "Passionate championship and proactive community service.",
      paragraph:
        "Honouring Saint Stephen's spirit of bold conviction, sacrificial devotion, and willingness to step forward when duty calls. Members of Stephen House are renowned for sportsmanship on the athletic fields, passionate debate, and a ready instinct to champion social justice and service.",
      values: ["Passion", "Bold Conviction", "Service"],
    },
    {
      id: "watson",
      name: "WATSON HOUSE",
      short: "Watson",
      colorName: "Cyan",
      accentHex: "#06b6d4",
      stripeGradient: "from-cyan-400 to-blue-500",
      motto: "“Flame of Hope”",
      established: "Est. Historic Foundation",
      quote: "Clarity of vision radiating knowledge and empathy.",
      paragraph:
        "Commemorating Miss Watson's compassionate educational work that enriched girls' literacy in Bangalore. Watson House radiates calm clarity, creative expression, and empathetic leadership, keeping the gentle flame of hope burning brightly across every academic and cultural pursuit.",
      values: ["Empathy", "Clarity", "Hope"],
    },
  ];

  return (
    <main className="bg-[#fcfdfd] text-[#0b1d38] overflow-hidden">
      {/* 1. HERO WITH DYNAMIC PARALLAX GRADIENT */}
      <PageHero
        eyebrow="About Us · Established 1880"
        title="Tradition in motion."
        text="A legacy spanning over 140 uninterrupted years of faith, intellectual empowerment, and character building in the heart of Bengaluru."
        image={`${school}/static/media/about-banner.6facb4306d35635d7fd6.png`}
      />

      {/* 2. INTERACTIVE FOUNDING HISTORY (John Baldwin Timeline & Story) */}
      <section id="history" className="relative py-20 lg:py-28 overflow-hidden bg-white">
        {/* Ambient subtle background glow */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-[1380px] px-5 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-12 items-center">
            {/* Left: Narrative with Accent Pill */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-[#1D4ED8] text-xs font-bold uppercase tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-[#1D4ED8] animate-ping" />
                The Baldwin Odyssey
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] leading-[1.12] text-[#0A2540]">
                A humble beginning. <br />
                <span className="italic text-[#1D4ED8] font-normal">A lasting legacy of 1880.</span>
              </h2>

              <div className="mt-8 space-y-5 text-[15px] sm:text-base leading-relaxed text-[#4b5563]">
                <p>
                  Started in 1880 at <strong className="text-[#0A2540]">#2 Alexandra Street</strong> to
                  provide schooling for English-speaking Methodist children, the institution went through
                  immense hardship during its dawn—plagued with paucity of funds and dwindling enrollment.
                  On the brink of closure, it was rescued by a miraculous gesture:{" "}
                  <strong className="text-[#1D4ED8] font-semibold">Mr. John Baldwin of Ohio, USA</strong>,
                  gifted a sum of one thousand dollars to purchase land and buildings, keeping the institution alive.
                </p>
                <p>
                  Since then, the school has witnessed uninterrupted progress. From a humble handful of
                  pupils, today Baldwin Girls’ High School stands strong at{" "}
                  <strong className="text-[#0A2540]">5,600+ young women</strong>, supported by state-of-the-art
                  infrastructure, laboratories, library wings, and a distinguished faculty dedicated to
                  imparting holistic Christian education.
                </p>
                <p className="border-l-4 border-[#1D4ED8] pl-5 italic text-[#1e293b] font-medium bg-blue-50/40 py-3 rounded-r-lg">
                  “The institution is now a symbol of the triumph of tradition and individual talent—the fruit
                  of Loyalty and service, Righteousness, and Truth emanating from the warm, God-fearing heart
                  of John Baldwin.”
                </p>
              </div>

              {/* Fast historical stats cards */}
              <div className="mt-10 grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                <div className="bg-[#f8fafc] p-4 rounded-xl border border-gray-100 text-center hover:border-blue-300 transition-colors">
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#1D4ED8]">1880</p>
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-1">Founded</p>
                </div>
                <div className="bg-[#f8fafc] p-4 rounded-xl border border-gray-100 text-center hover:border-blue-300 transition-colors">
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#1D4ED8]">5,600+</p>
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-1">Scholars</p>
                </div>
                <div className="bg-[#f8fafc] p-4 rounded-xl border border-gray-100 text-center hover:border-blue-300 transition-colors">
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#1D4ED8]">140+</p>
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-1">Years Legacy</p>
                </div>
              </div>
            </div>

            {/* Right: Interactive Tilt Portrait Card with Glow Backdrop */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group w-full max-w-[380px]">
                {/* Colored glowing backdrop offset */}
                <div className="absolute -inset-3 bg-gradient-to-tr from-[#1D4ED8] via-[#6366f1] to-purple-600 rounded-3xl opacity-20 group-hover:opacity-40 blur-xl transition-all duration-500" />

                <div className="relative bg-white rounded-2xl p-3 border border-gray-100 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="relative rounded-xl overflow-hidden bg-slate-900">
                    <img
                      src="/john-baldwin-portrait.jpg"
                      alt="Mr. John Baldwin - Benefactor"
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#1D4ED8] text-[10px] font-bold uppercase tracking-wider mb-1">
                        Philanthropist & Benefactor
                      </span>
                      <h3 className="font-serif text-2xl font-bold">Mr. John Baldwin</h3>
                      <p className="text-xs text-white/80 mt-0.5">Berea, Ohio, USA · 1799–1884</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl mt-3 text-center">
                    <p className="text-xs text-slate-600 italic">
                      “His timely \$1,000 gift forever transformed the educational horizon of young women in Bengaluru.”
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE VISION & MISSION ACCORDION CARDS */}
      <section id="mission" className="py-20 bg-[#f8fafc] border-y border-gray-200/70">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1D4ED8]">
              Foundational Pillars
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0A2540] mt-3">
              Guiding Vision & Sacred Mission
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision Card with Hover Glow */}
            <div className="group relative bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1D4ED8] flex items-center justify-center text-2xl font-serif mb-6 group-hover:scale-110 group-hover:bg-[#1D4ED8] group-hover:text-white transition-all duration-300">
                🔭
              </div>
              <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-[#1D4ED8]">
                Our Vision
              </span>
              <h3 className="mt-4 font-serif text-2xl sm:text-3xl text-[#0A2540] leading-snug">
                “To facilitate holistic learning, building character, and developing skills to meet
                global challenges.”
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-[#627d98]">
                Envisioning a dynamic institution where every girl finds her intellectual voice,
                cultivates deep moral resilience, and steps forward as an innovative leader in a
                transformative world.
              </p>
            </div>

            {/* Mission Card with Hover Glow */}
            <div className="group relative bg-[#091e3e] text-white rounded-3xl p-8 sm:p-12 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-white/10 text-white flex items-center justify-center text-2xl font-serif mb-6 group-hover:scale-110 group-hover:bg-[#38BDF8] group-hover:text-[#091e3e] transition-all duration-300">
                🎯
              </div>
              <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-[#38BDF8]">
                Our Mission
              </span>
              <ul className="mt-4 space-y-3.5 text-sm sm:text-[15px] leading-relaxed text-white/90">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#38BDF8] font-bold">✓</span>
                  <span>
                    To create progressive analytical thinkers emphasizing physical, emotional,
                    intellectual, social, moral, and spiritual growth.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#38BDF8] font-bold">✓</span>
                  <span>
                    To unlock the limitless potential of every girl, empowering her as an agile team builder
                    and responsible global citizen.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#38BDF8] font-bold">✓</span>
                  <span>
                    To foster an atmosphere of cooperation, empathy, and mutual respect for a peaceful and
                    brighter world.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE CREST SYMBOLS & HYMN TABBED VIEWER */}
      <section className="py-24 bg-white relative">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1D4ED8]">
              Heritage & Faith
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0A2540] mt-3">
              The Crest, Hymn & Sacred Prayer
            </h2>
            <p className="mt-3 text-sm text-[#506690]">
              Click through the heraldic emblems of the crest below to understand their spiritual significance.
            </p>
          </div>

          {/* Interactive Crest Section */}
          <div className="bg-[#f8fafc] rounded-3xl p-8 sm:p-12 border border-gray-200/80 shadow-md mb-16">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              {/* Crest Image Centerpiece */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 shadow-inner">
                <div className="relative group">
                  <img
                    src="/baldwin-crest-official.png"
                    alt="Baldwin Crest"
                    className="w-52 h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="text-center mt-5">
                    <p className="font-serif font-bold text-lg text-[#0B1B3D]">Loyalty & Service</p>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">
                      A White Shield on a Field of Blue
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Symbol Buttons and Dynamic Detail */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold tracking-widest text-[#1D4ED8] uppercase mb-4">
                    Select an Emblem to Inspect:
                  </h4>
                  <div className="flex flex-wrap gap-2.5 mb-6">
                    {crestSymbols.map((item, index) => (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() => setActiveCrestSymbol(index)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                          activeCrestSymbol === index
                            ? "bg-[#1D4ED8] text-white shadow-md shadow-[#1D4ED8]/30 scale-105"
                            : "bg-white text-gray-700 border border-gray-200 hover:border-[#1D4ED8]/60 hover:bg-blue-50/50"
                        }`}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>

                  {/* Active Symbol Display Box */}
                  <div className="bg-white p-7 rounded-2xl border border-blue-100 shadow-sm min-h-[160px] transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${crestSymbols[activeCrestSymbol].color}`} />
                      <h4 className="font-serif text-2xl font-bold text-[#0A2540]">
                        {crestSymbols[activeCrestSymbol].title}
                      </h4>
                      <span className="text-xs font-bold text-[#1D4ED8] uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-full">
                        {crestSymbols[activeCrestSymbol].subtitle}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#506690] mt-3">
                      {crestSymbols[activeCrestSymbol].desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabbed School Hymn & The Lord's Prayer */}
          <div className="bg-[#0b1b3d] text-white rounded-3xl overflow-hidden shadow-2xl">
            {/* Tab switch header */}
            <div className="flex border-b border-white/10 bg-black/20">
              <button
                type="button"
                onClick={() => setSpiritualTab("hymn")}
                className={`flex-1 py-5 text-center text-sm font-bold tracking-widest uppercase transition-colors cursor-pointer ${
                  spiritualTab === "hymn"
                    ? "bg-[#1D4ED8] text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                🎵 School Hymn (By S. W. Mayer)
              </button>
              <button
                type="button"
                onClick={() => setSpiritualTab("prayer")}
                className={`flex-1 py-5 text-center text-sm font-bold tracking-widest uppercase transition-colors cursor-pointer ${
                  spiritualTab === "prayer"
                    ? "bg-[#1D4ED8] text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                🙏 The Lord’s Prayer
              </button>
            </div>

            {/* Tab content */}
            <div className="p-8 sm:p-14">
              {spiritualTab === "hymn" ? (
                <div className="max-w-3xl mx-auto space-y-6 text-center animate-in fade-in duration-300">
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
                    <p>
                      We change, but Thou art still the same; The same good Master, teacher, friend.
                      <br />
                      We change, but Lord, we bear Thy Name, To journey with it to the end.
                      <br />
                      And so we pray Thy Spirit may Be present in our School alway.
                    </p>
                  </div>
                  <p className="text-sm font-bold text-[#38BDF8] pt-2">— S. W. Mayer</p>
                </div>
              ) : (
                <div className="max-w-2xl mx-auto space-y-6 text-center animate-in fade-in duration-300">
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#38BDF8]">
                    The Lord’s Prayer
                  </h3>
                  <div className="space-y-3.5 text-base sm:text-lg leading-relaxed text-white/90 italic">
                    <p>
                      Our Father, who art in heaven, hallowed be thy name;
                      <br />
                      thy Kingdom come; thy will be done;
                      <br />
                      on earth as it is in heaven.
                    </p>
                    <p>
                      Give us this day our daily bread.
                      <br />
                      And forgive us our trespasses,
                      <br />
                      as we forgive those who trespass against us.
                    </p>
                    <p>
                      And lead us not into temptation;
                      <br />
                      but deliver us from evil.
                    </p>
                    <p className="font-normal text-sm text-[#38BDF8] pt-2">
                      For thine is the kingdom, the power and the glory, for ever and ever.
                    </p>
                    <p className="font-bold text-xl text-white not-italic">Amen.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE LEADERSHIP SECTION (Interactive Tab Switcher + Big Photos) */}
      <section id="leadership" className="py-24 bg-[#fafbfe] relative border-t border-gray-200">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1D4ED8]">
              Governance & Mentorship
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0A2540] mt-3">
              Distinguished Leadership
            </h2>
            <p className="mt-3 text-sm text-[#506690]">
              Select a leader below to view their full profile, vision, and administrative achievements.
            </p>
          </div>

          {/* Leader Tab Selectors */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 rounded-2xl bg-white border border-gray-200/90 shadow-sm max-w-full overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveLeaderTab("chairman")}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                  activeLeaderTab === "chairman"
                    ? "bg-[#1D4ED8] text-white shadow-md shadow-[#1D4ED8]/30"
                    : "text-gray-600 hover:text-[#1D4ED8]"
                }`}
              >
                <span>Bishop Dr. AnilKumar John Servand</span>
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">(Chairman)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveLeaderTab("principal")}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                  activeLeaderTab === "principal"
                    ? "bg-[#1D4ED8] text-white shadow-md shadow-[#1D4ED8]/30"
                    : "text-gray-600 hover:text-[#1D4ED8]"
                }`}
              >
                <span>Mrs. Asha Margaret Das</span>
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">(Principal)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveLeaderTab("manager")}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                  activeLeaderTab === "manager"
                    ? "bg-[#1D4ED8] text-white shadow-md shadow-[#1D4ED8]/30"
                    : "text-gray-600 hover:text-[#1D4ED8]"
                }`}
              >
                <span>Mrs. Anita Isaac</span>
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">(Manager)</span>
              </button>
            </div>
          </div>

          {/* Leader Detailed Dynamic Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-14 border border-gray-200 shadow-xl transition-all duration-300">
            {activeLeaderTab === "chairman" && (
              <div className="grid lg:grid-cols-12 gap-12 items-start animate-in fade-in duration-300">
                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-slate-900 group">
                    <img
                      src="/chairman-bishop-servand.jpg"
                      alt="Bishop Dr. AnilKumar John Servand"
                      className="w-full h-auto object-cover min-h-[460px] transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="bg-[#0b1b3d] text-white p-6 text-center">
                      <h4 className="font-display font-extrabold text-lg sm:text-xl">
                        BISHOP DR. ANILKUMAR JOHN SERVAND
                      </h4>
                      <p className="text-xs text-[#38BDF8] font-bold tracking-widest uppercase mt-1">
                        CHAIRMAN · BALDWIN METHODIST EDUCATIONAL SOCIETY
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4 text-[15px] sm:text-base leading-relaxed text-[#4b5563]">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#1D4ED8] text-xs font-bold uppercase tracking-wider mb-2">
                    Message from the Chairman
                  </span>
                  <p>
                    <strong className="text-[#0B1B3D]">Bishop Dr. AnilKumar John Servand</strong> is the
                    Chairman of Baldwin Methodist Educational Society and heads the Bangalore Regional
                    Conference of the Methodist Church in India. He is committed to excellence in church
                    life as well as in the field of education. Bishop Dr. Anilkumar Servand has spent
                    considerable years of his ministry working with zeal and dedication helping the
                    Christian Ministry, bringing rich and vast professional experience.
                  </p>
                  <p>
                    As the minister of the Methodist Church in India (MCI) he held many responsible
                    positions, serving as Professor and Principal of the Methodist Bible Seminary,
                    Director of Methodist Technical Institute at Baroda, and Pastor & District
                    Superintendent. He also chairs the Medical Council and Women’s Council of MCI and is
                    Chief Acharya of Sat Tal Christian Ashram, Nainital.
                  </p>
                  <p>
                    Our Chairman is a wellspring of wisdom and pioneering leadership. His futuristic vision
                    has expanded the base of academic orientation through a broader spectrum of
                    development, elevating the school’s prestige and stature to unprecedented heights.
                  </p>
                  <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                    <span className="text-xs font-bold text-[#0B1B3D]">Presiding:</span>
                    <span className="text-xs text-gray-500">Bangalore · Mumbai · Chennai · Bareilly Conferences</span>
                  </div>
                </div>
              </div>
            )}

            {activeLeaderTab === "principal" && (
              <div className="grid lg:grid-cols-12 gap-12 items-start animate-in fade-in duration-300">
                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-slate-900 group">
                    <img
                      src="/principal-mrs-das.jpg"
                      alt="Mrs. Asha Margaret Das"
                      className="w-full h-auto object-cover min-h-[460px] transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="bg-[#0b1b3d] text-white p-6 text-center">
                      <h4 className="font-display font-extrabold text-lg sm:text-xl">
                        MRS. ASHA MARGARET DAS
                      </h4>
                      <p className="text-xs text-[#38BDF8] font-bold tracking-widest uppercase mt-1">
                        PRINCIPAL · BALDWIN GIRLS’ HIGH SCHOOL
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4 text-[15px] sm:text-base leading-relaxed text-[#4b5563]">
                  <div className="bg-[#faf5ff] border-l-4 border-purple-500 p-6 rounded-r-2xl mb-4">
                    <p className="italic text-[#581c87] text-lg font-serif">
                      “Education is the most powerful weapon which you can use to change the world.”
                    </p>
                    <p className="text-xs font-bold text-purple-700 uppercase tracking-widest mt-2">
                      — Nelson Mandela
                    </p>
                  </div>
                  <p>
                    Our commitment at Baldwin Girls’ High School is to provide a safe and intellectually
                    challenging environment that will empower students to become innovative thinkers,
                    creative problem solvers, and inspired learners prepared to thrive in the fast-changing world.
                  </p>
                  <p>
                    Under the leadership of Mrs. Asha Margaret Das, BGHS fosters academic distinction together
                    with creative arts, sports, science labs, and social responsibility. Every young learner is
                    mentored to discover her self-worth and emerge with the confidence to lead society.
                  </p>
                  <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                    <span className="text-xs font-bold text-[#0B1B3D]">Focus Areas:</span>
                    <span className="text-xs text-gray-500">Holistic ICSE Learning · Safe Campus · Empowered Leadership</span>
                  </div>
                </div>
              </div>
            )}

            {activeLeaderTab === "manager" && (
              <div className="grid lg:grid-cols-12 gap-12 items-start animate-in fade-in duration-300">
                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-slate-900 group">
                    <img
                      src="/manager-mrs-isaac.jpg"
                      alt="Mrs. Anita Isaac"
                      className="w-full h-auto object-cover min-h-[460px] transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="bg-[#0b1b3d] text-white p-6 text-center">
                      <h4 className="font-display font-extrabold text-lg sm:text-xl">
                        MRS. ANITA ISAAC
                      </h4>
                      <p className="text-xs text-[#38BDF8] font-bold tracking-widest uppercase mt-1">
                        MANAGER · BALDWIN GIRLS’ HIGH SCHOOL
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4 text-[15px] sm:text-base leading-relaxed text-[#4b5563]">
                  <div className="bg-[#eff6ff] border-l-4 border-blue-500 p-6 rounded-r-2xl mb-4">
                    <p className="italic text-[#1e3a8a] text-lg font-serif">
                      “Education is simply the soul of a society as it passes from one generation to another.”
                    </p>
                    <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mt-2">
                      — G. K. Chesterton
                    </p>
                  </div>
                  <p>
                    In a constantly changing world, education must evolve to meet new challenges through
                    collaboration, innovation, and growth. Since 1880, Baldwin Girls’ High School has excelled
                    in producing responsible citizens who drive societal change.
                  </p>
                  <p>
                    Mrs. Anita Isaac coordinates our extensive academic facilities, administrative
                    stewardship, student welfare programs, and technological upgrades, ensuring that the
                    historic institution operates at the peak of 21st-century standards.
                  </p>
                  <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                    <span className="text-xs font-bold text-[#0B1B3D]">Administration:</span>
                    <span className="text-xs text-gray-500">Infrastructure · Student Welfare · Future Innovation</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE 3D FLIP CARDS FOR HOUSES (Requested Feature!) */}
      <section className="py-24 bg-white relative">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1D4ED8]">
              House System
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0A2540] mt-3">
              The Seven Houses of BGHS
            </h2>
            <p className="mt-3 text-sm text-[#506690] flex items-center justify-center gap-2">
              <span>🔄</span> Hover or tap any house card to flip and discover its history, motto, and values
            </p>
          </div>

          {/* Grid of 3D Flip House Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {houses.map((house) => (
              <div
                key={house.id}
                className="group perspective-1000 h-[380px] w-full cursor-pointer select-none"
              >
                {/* Flipping Container */}
                <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180 rounded-2xl shadow-lg">
                  {/* FRONT OF CARD */}
                  <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden bg-[#111827] text-white p-7 flex flex-col justify-between border border-white/10">
                    {/* Diagonal Color Sash Stripe matching reference */}
                    <div
                      className={`absolute -left-12 top-1/2 -translate-y-1/2 w-[150%] h-8 bg-gradient-to-r ${house.stripeGradient} rotate-[-30deg] pointer-events-none opacity-90 shadow-md`}
                    />

                    {/* Top Row: Name and House Color Badge */}
                    <div className="relative z-10 flex items-start justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/15 text-white/90">
                        {house.colorName} House
                      </span>
                      <span className="text-xs text-white/50 font-bold group-hover:rotate-180 transition-transform">
                        ↻ Flip
                      </span>
                    </div>

                    {/* Center: Large House Title */}
                    <div className="relative z-10 text-center py-6">
                      <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-wider uppercase drop-shadow-md">
                        {house.name}
                      </h3>
                      <p className="font-serif italic text-sm text-white/90 mt-2">
                        {house.motto}
                      </p>
                    </div>

                    {/* Bottom: Established Info and hint */}
                    <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
                      <span>{house.established}</span>
                      <span className="text-[11px] text-[#38BDF8] font-bold group-hover:underline">
                        See History →
                      </span>
                    </div>
                  </div>

                  {/* BACK OF CARD (Revealed on Hover Flip!) */}
                  <div
                    className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden p-6 sm:p-7 flex flex-col justify-between text-white border-2 border-white/20 shadow-2xl"
                    style={{
                      background: `linear-gradient(145deg, #0f172a 0%, ${house.accentHex} 150%)`,
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-white/15">
                        <h4 className="font-display font-black text-sm uppercase tracking-wider text-white">
                          {house.short}
                        </h4>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                          {house.colorName}
                        </span>
                      </div>

                      <p className="font-serif italic text-xs text-amber-200 mt-2.5 mb-3">
                        {house.motto}
                      </p>

                      <p className="text-xs leading-relaxed text-white/90 text-left">
                        {house.paragraph}
                      </p>
                    </div>

                    {/* Core Values tags */}
                    <div className="pt-3 border-t border-white/15">
                      <p className="text-[10px] font-bold tracking-wider uppercase text-white/60 mb-1.5">
                        Core Values:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {house.values.map((v) => (
                          <span
                            key={v}
                            className="text-[10px] font-bold bg-white/15 px-2 py-0.5 rounded-md text-white"
                          >
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ADMISSIONS CALL-TO-ACTION SECTION */}
      <section className="py-20 bg-[#f8fafc] border-t border-gray-200">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1D4ED8] via-[#1e40af] to-[#0f172a] text-white p-8 sm:p-14 shadow-2xl">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-widest mb-3">
                  Admissions Open 2026–2027
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  Join the Baldwin sisterhood of excellence.
                </h3>
                <p className="text-sm sm:text-base text-white/80 mt-3 max-w-xl">
                  Schedule a personal walkthrough of our Richmond Town heritage campus or talk to our
                  admissions counselors today.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-center">
                <Link
                  to="/admissions"
                  className="inline-flex items-center justify-center rounded-full bg-white text-[#1D4ED8] hover:bg-blue-50 py-3.5 px-8 text-xs font-bold uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all text-center"
                >
                  Apply For Admission
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 py-3.5 px-8 text-xs font-bold uppercase tracking-wider transition-all text-center"
                >
                  Schedule Campus Visit
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
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

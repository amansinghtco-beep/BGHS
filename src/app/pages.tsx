import { useRef, useState } from "react";
import { Link, useParams } from "react-router";
import { AcademicCards, Arrow, PageHero, SectionIntro } from "./components";
import ExploreBGHS from "./ExploreBGHS";
import SleekEnquirySection from "./SleekEnquirySection";
import { admissionSteps, programmes, school } from "./data";

export function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func: nextMute ? "mute" : "unMute",
          args: [],
        }),
        "*"
      );
    }
  };

  return (
    <main>
      {/* HERO SECTION WITH BACKGROUND VIDEO, NO BLUE SHADOW, AND MUTE BUTTON */}
      <section className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden bg-[#02162B] text-white">
        {/* Background Video Layer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <iframe
            ref={iframeRef}
            id="hero-bg-video"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full object-cover scale-[1.08]"
            src="https://www.youtube.com/embed/PHOwQ-SHp9o?autoplay=1&mute=1&controls=0&loop=1&playlist=PHOwQ-SHp9o&modestbranding=1&playsinline=1&rel=0&enablejsapi=1"
            title="Baldwin Girls' High School Background Video"
            allow="autoplay; encrypted-media"
            tabIndex={-1}
          />
          {/* Subtle uniform scrim overlay across entire video for text contrast without ANY box or blue shadow behind text */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-14 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            {/* Accent Blue Dash */}
            <div className="w-10 sm:w-12 h-[3px] bg-[#38BDF8] mb-4 sm:mb-5 rounded-full" />

            {/* School Eyebrow Subtitle */}
            <p className="font-display text-[11px] sm:text-xs font-bold tracking-[0.26em] text-white/95 uppercase mb-4 sm:mb-5 drop-shadow-md">
              BALDWIN SCHOOLS HIGH SCHOOL
            </p>

            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-[84px] xl:text-[92px] leading-[1.02] tracking-tight text-white mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
              Learn. Grow.
              <br />
              <span className="text-[#38BDF8]">Excel.</span>
            </h1>
          </div>
        </div>

        {/* Top Right Floating / Action Button: Campus Tour */}
        <Link
          to="/campus"
          className="absolute top-6 sm:top-8 right-6 sm:right-10 z-20 hidden sm:inline-flex items-center gap-2.5 rounded-full bg-[#8B0000]/85 hover:bg-[#8B0000] text-white px-5 py-2.5 text-xs sm:text-sm font-bold backdrop-blur-md border border-white/20 transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 group"
          title="Schedule a Campus Tour"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 group-hover:rotate-12 transition-transform">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z" />
            </svg>
          </span>
          <span>Campus Tour</span>
        </Link>

        {/* Mute / Unmute Button */}
        <button
          type="button"
          onClick={toggleMute}
          className="absolute bottom-6 sm:bottom-8 right-6 sm:right-10 z-20 flex items-center gap-2.5 rounded-full bg-black/55 hover:bg-[#1D4ED8] text-white px-4 py-2.5 text-xs sm:text-sm font-semibold backdrop-blur-md border border-white/20 transition-all duration-300 shadow-xl cursor-pointer group"
          title={isMuted ? "Unmute audio" : "Mute audio"}
          aria-label={isMuted ? "Unmute video audio" : "Mute video audio"}
        >
          <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
            {isMuted ? (
              <svg className="w-4 h-4 fill-current text-[#38BDF8] group-hover:text-white" viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 fill-current text-[#38BDF8] group-hover:text-white" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </span>
          <span className="font-medium tracking-wide">
            {isMuted ? "Unmute Audio" : "Mute Audio"}
          </span>
        </button>
      </section>


      <section className="bg-[#1D4ED8] text-white">
        <div className="mx-auto flex max-w-[1380px] flex-col justify-between gap-4 px-5 py-5 md:flex-row lg:px-10">
          <p className="text-sm font-semibold">
            Direct admissions are open for the academic year 2026–2027.
          </p>
          <Link to="/admissions" className="text-xs font-bold tracking-[0.14em] uppercase text-white/90 hover:text-white">
            Admission details <Arrow />
          </Link>
        </div>
      </section>

      {/* WELCOME BANNER WITH FLOATING WATERMARK LOGOS */}
      <section className="relative overflow-hidden bg-white border-[8px] sm:border-[12px] md:border-[14px] border-[#284595] py-14 sm:py-20 md:py-24 px-6 sm:px-12 shadow-sm">
        {/* Floating Watermark Logos Background Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-around items-center px-4 opacity-[0.14]">
          {/* Column 1 */}
          <div className="animate-float-up-down flex flex-col gap-12 sm:gap-16 items-center shrink-0">
            <img src="/baldwin-crest-official.png" alt="" className="w-24 sm:w-32 md:w-40 object-contain" />
            <img src="/baldwin-crest-official.png" alt="" className="w-24 sm:w-32 md:w-40 object-contain" />
          </div>

          {/* Column 2 */}
          <div className="animate-float-down-up flex flex-col gap-12 sm:gap-16 items-center shrink-0" style={{ animationDelay: "-2s" }}>
            <img src="/baldwin-crest-official.png" alt="" className="w-24 sm:w-32 md:w-40 object-contain" />
            <img src="/baldwin-crest-official.png" alt="" className="w-24 sm:w-32 md:w-40 object-contain" />
          </div>

          {/* Column 3 */}
          <div className="animate-float-up-down flex flex-col gap-12 sm:gap-16 items-center shrink-0" style={{ animationDelay: "-4s" }}>
            <img src="/baldwin-crest-official.png" alt="" className="w-24 sm:w-32 md:w-40 object-contain" />
            <img src="/baldwin-crest-official.png" alt="" className="w-24 sm:w-32 md:w-40 object-contain" />
          </div>

          {/* Column 4 */}
          <div className="animate-float-down-up flex flex-col gap-12 sm:gap-16 items-center shrink-0" style={{ animationDelay: "-1s" }}>
            <img src="/baldwin-crest-official.png" alt="" className="w-24 sm:w-32 md:w-40 object-contain" />
            <img src="/baldwin-crest-official.png" alt="" className="w-24 sm:w-32 md:w-40 object-contain" />
          </div>

          {/* Column 5 */}
          <div className="animate-float-up-down flex flex-col gap-12 sm:gap-16 items-center shrink-0" style={{ animationDelay: "-3s" }}>
            <img src="/baldwin-crest-official.png" alt="" className="w-24 sm:w-32 md:w-40 object-contain" />
            <img src="/baldwin-crest-official.png" alt="" className="w-24 sm:w-32 md:w-40 object-contain" />
          </div>

          {/* Column 6 (visible on large displays) */}
          <div className="hidden lg:flex animate-float-down-up flex-col gap-12 sm:gap-16 items-center shrink-0" style={{ animationDelay: "-5s" }}>
            <img src="/baldwin-crest-official.png" alt="" className="w-24 sm:w-32 md:w-40 object-contain" />
            <img src="/baldwin-crest-official.png" alt="" className="w-24 sm:w-32 md:w-40 object-contain" />
          </div>
        </div>

        {/* Foreground Centered Content matching the design exactly */}
        <div className="relative z-10 mx-auto max-w-4xl text-center px-4 sm:px-6">
          <h3 className="font-serif font-bold text-[#0A326F] text-xs sm:text-sm md:text-base tracking-[0.24em] uppercase mb-2 sm:mb-3">
            WELCOME TO
          </h3>
          <h2 className="font-serif font-black text-[#0A326F] text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-tight tracking-[0.03em] mb-4 sm:mb-6">
            BALDWIN GIRL'S HIGH SCHOOL
          </h2>
          <p className="font-sans text-[#3B5998] font-medium text-base sm:text-lg md:text-[19px] leading-relaxed sm:leading-loose max-w-2xl mx-auto">
            A nurturing and inclusive community
            <br />
            anchored in
            <br />
            integrity, innovation and excellence
          </p>
        </div>
      </section>

      <ExploreBGHS />

      <section className="section-pad">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <SectionIntro eyebrow="Welcome to BGHS" title="140+ years of excellence.">
            <p>
              An ICSE-affiliated institution where girls thrive, discover their strengths and build
              skills that last a lifetime.
            </p>
            <Link to="/about" className="link-line mt-6 inline-flex gap-3">
              Our story <Arrow />
            </Link>
          </SectionIntro>
          <div className="mt-14 grid grid-cols-2 border-y border-[#0b1d38]/15 md:grid-cols-5">
            {[
              ["1880", "Founded"],
              ["5,600", "Learners"],
              ["ICSE", "Affiliated"],
              ["18", "Sports"],
              ["ISO", "Certified"],
            ].map(([value, label]) => (
              <div className="stat" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <SectionIntro eyebrow="Academic journey" title="Learning that grows with her.">
            <p>Purposeful learning from the early years through focused ICSE preparation.</p>
          </SectionIntro>
          <div className="mt-12">
            <AcademicCards />
          </div>
        </div>
      </section>

      <section className="result-banner py-20 text-white">
        <div className="mx-auto grid max-w-[1380px] gap-10 px-5 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="eyebrow text-[#38BDF8]">ICSE results · 2025</p>
            <h2 className="mt-5 font-serif text-6xl">Excellence, by the numbers.</h2>
          </div>
          <div className="grid grid-cols-2 gap-px bg-white/15">
            {[
              ["409", "Students"],
              ["396", "First division"],
              ["44", "Scored 95%+"],
              ["89", "Scored 90–94.9%"],
            ].map(([value, label]) => (
              <div className="bg-[#0a2342]/95 p-7" key={label}>
                <strong className="font-serif text-5xl text-[#38BDF8]">{value}</strong>
                <span className="mt-2 block text-xs text-white/60 uppercase">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto grid max-w-[1380px] gap-6 px-5 md:grid-cols-3 lg:px-10">
          {[
            [
              "Campus",
              "Purpose-built spaces for learning, wellness and discovery.",
              "/campus",
              "ScienceLab.d689eb9af7d97ee94b32.JPG",
            ],
            [
              "Student life",
              "Arts, NCC, robotics, AI and experiences beyond books.",
              "/student-life",
              "cocurriculumm.bd27fcabaa35d7bc4e4e.png",
            ],
            [
              "Sports",
              "18 indoor and outdoor sports guided by skilled coaches.",
              "/sports",
              "sports2.f53c208cf86412fab174.png",
            ],
          ].map(([title, text, to, image]) => (
            <Link
              to={to}
              key={title}
              className="group relative min-h-[440px] overflow-hidden text-white"
            >
              <img
                src={`${school}/static/media/${image}`}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071a33] via-[#071a33]/10" />
              <div className="absolute right-7 bottom-7 left-7">
                <h3 className="font-serif text-4xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">{text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Sleek Admissions / Tour Inquiry Form */}
      <SleekEnquirySection />
    </main>
  );
}

export function About() {
  return (
    <main className="bg-white">
      {/* 1. Page Hero Banner */}
      <PageHero
        eyebrow="About Us"
        title="Tradition in motion."
        text="A school shaped by faith, resilience, and an uninterrupted pursuit of educational excellence since 1880."
        image={`${school}/static/media/about-banner.6facb4306d35635d7fd6.png`}
      />

      {/* 2. A Gist of School History Section (Matching Reference 1) */}
      <section id="history" className="py-20 lg:py-28 bg-[#fafbfe] border-b border-gray-100">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* Text column */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-3.5 h-12 bg-[#6366f1] rounded-sm shrink-0" />
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#3730a3] uppercase">
                  A Gist of School History
                </h2>
              </div>

              <div className="space-y-5 text-[15px] sm:text-base leading-relaxed text-[#4b5563]">
                <p>
                  The school that was started in 1880 at #2 Alexandra Street with the aim to provide
                  schooling for English-speaking Methodist children, went through much hardship
                  during the early years, plagued with a paucity of funds and dwindling strength of
                  children. It was on the brink of closure when{" "}
                  <strong className="text-[#1e1b4b] font-bold">Mr. John Baldwin</strong> gifted a sum
                  of thousand dollars to acquire land and buildings and keep the school from closing.
                </p>
                <p>
                  Since then, the school has seen steady progress in student strength, which stands
                  at five thousand six hundred today, an exponential expansion in terms of
                  infrastructure, and dedicated staff that help the school move forward, imparting
                  quality Christian education.
                </p>
                <p>
                  In retrospect, the humble beginning of the Institution in 1880 with a few students
                  and minimal facilities stands in stark contrast to its present stature and dignity,
                  having a global perspective and meeting the demands of specialization in the
                  methods of acquiring knowledge, with a view to improving the standard and quality
                  of life, thus redefining the role of education.
                </p>
                <p>
                  Today, the institution is a brilliant canvas of many shades and hues. It is
                  certainly not the monotonous regularity of a stagnant social tradition but a
                  continuous and uninterrupted move towards a dynamic and vibrant vision, which keeps
                  us alive with new ideas, new avenues, and new in-roads.
                </p>
                <p className="font-medium text-[#1e1b4b]">
                  The Institution is now a symbol of the triumph of tradition and individual talent,
                  the fruit of “Loyalty and service, Righteousness, and Truth” emanating from the
                  warm, God-fearing heart of John Baldwin and other noble souls that led to its
                  phenomenal growth. Today it stands as the tallest landmark of quality education in
                  the city.
                </p>
              </div>
            </div>

            {/* Portrait column (Matching Reference 1 with colored backing bar) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative">
                {/* Purple accent backing bar */}
                <div className="absolute -left-4 -bottom-4 w-4/5 h-4/5 bg-[#4f46e5] -z-0 rounded-sm" />
                <div className="relative z-10 overflow-hidden rounded-md shadow-2xl border-4 border-white bg-slate-900 max-w-[380px]">
                  <img
                    src="/john-baldwin-portrait.jpg"
                    alt="Mr. John Baldwin, Philanthropist and Benefactor"
                    className="w-full h-auto object-cover"
                  />
                  <div className="bg-[#111827] px-5 py-3 text-white text-center">
                    <p className="font-serif font-bold text-lg text-white">Mr. John Baldwin</p>
                    <p className="text-xs text-white/70 font-sans tracking-widest uppercase">
                      Benefactor · Est. 1880
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission Section (Matching Reference 2 side-by-side blocks) */}
      <section id="mission" className="py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-xl border border-gray-100">
            {/* Our Vision */}
            <div className="bg-[#f5f6ff] p-10 sm:p-14 lg:p-16 flex flex-col justify-center">
              <span className="text-xs font-extrabold tracking-[0.2em] text-[#4338ca] uppercase">
                Our Vision
              </span>
              <blockquote className="mt-6 font-display font-extrabold text-2xl sm:text-3xl lg:text-[34px] leading-snug text-[#1e1b4b]">
                “To facilitate holistic learning, building character, and developing skills to meet
                global challenges.”
              </blockquote>
            </div>

            {/* Our Mission */}
            <div className="bg-[#5551c9] p-10 sm:p-14 lg:p-16 text-white flex flex-col justify-center">
              <span className="text-xs font-extrabold tracking-[0.2em] text-[#c7d2fe] uppercase">
                Our Mission
              </span>
              <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-white/90">
                <p>
                  BGHS strives to provide an environment conducive to creating progressive analytical
                  thinkers. We emphasize on the physical, emotional, intellectual, social, moral,
                  and spiritual development of each child.
                </p>
                <p>
                  BGHS believes in the potential of each child and provides varied opportunities to
                  nurture her talent. We empower students with skills to be able leaders and team
                  builders, enabling them to contribute in a meaningful manner to society.
                </p>
                <p>
                  Students and teachers work towards creating an atmosphere of cooperation and mutual
                  respect for individual differences, building a peaceful and brighter world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. School Crest, Hymn & The Lord's Prayer (Matching Reference 3) */}
      <section className="py-20 lg:py-24 bg-[#fafbfe] border-t border-gray-100">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          {/* School Crest Block */}
          <div className="mb-16">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#3730a3] uppercase tracking-wide border-b-2 border-[#6366f1] inline-block pb-1 mb-10">
              School Crest
            </h3>

            <div className="grid lg:grid-cols-12 gap-8 items-center bg-white p-8 sm:p-12 rounded-2xl border border-gray-200/80 shadow-sm">
              <div className="lg:col-span-4 flex justify-center">
                <img
                  src="/baldwin-crest-official.png"
                  alt="Baldwin Girls' High School Crest"
                  className="w-48 sm:w-56 h-auto object-contain"
                />
              </div>

              <div className="lg:col-span-8 space-y-3.5 text-[#374151] text-base leading-relaxed">
                <p className="font-medium text-[#1f2937]">A white shield on a field of blue.</p>
                <p>• <strong className="text-[#1e1b4b]">The Torch</strong> denotes truth and light;</p>
                <p>• <strong className="text-[#1e1b4b]">The Open Book</strong>, God’s Word and Knowledge;</p>
                <p>• <strong className="text-[#1e1b4b]">The Laurel</strong> depicts honour, and the <strong className="text-[#1e1b4b]">Harp</strong>, Cultural development.</p>
                <p className="pt-2 text-[#4338ca] font-semibold italic">
                  ‘Loyalty and Service’ the motto demands faithfulness to God, to oneself, to the school and the nation together with concern and care for all life.
                </p>
              </div>
            </div>
          </div>

          {/* School Hymn & The Lord's Prayer Grid */}
          <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            {/* School Hymn */}
            <div className="bg-[#f0f3ff] p-8 sm:p-12">
              <h4 className="font-display font-extrabold text-2xl text-[#3730a3] uppercase mb-6 tracking-wide">
                School Hymn
              </h4>
              <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-[#4b5563]">
                <p>
                  We build our school on Thee, O Lord; To Thee we bring our common need: The loving
                  heart, the helpful word, The tender thought, the kindly deed. With these, we pray
                  Thy Spirit may Enrich and bless our School alway.
                </p>
                <p>
                  We work together in Thy sight, We live together in Thy love; Guide Thou our faltering
                  steps aright, And lift our thoughts to heaven above. Dear Lord, we pray Thy Spirit
                  may Be present in our School alway.
                </p>
                <p>
                  Hold Thou each hand to keep it just, Touch Thou our lips and make them pure; If Thou
                  art with us, Lord, we must Be faithful friends and comrades sure. Dear Lord, we pray
                  Thy Spirit may Be present in our School alway.
                </p>
                <p>
                  We change, but Thou art still the same; The same good Master, teacher, friend. We
                  change, but Lord, we bear Thy Name, To journey with it to the end. And so we pray
                  Thy Spirit may Be present in our School alway.
                </p>
                <p className="text-right italic font-semibold text-[#3730a3] pt-2">— S. W. Mayer</p>
              </div>
            </div>

            {/* The Lord's Prayer */}
            <div className="bg-[#5551c9] p-8 sm:p-12 text-white">
              <h4 className="font-display font-extrabold text-2xl text-white uppercase mb-6 tracking-wide">
                The Lord’s Prayer
              </h4>
              <div className="space-y-4 text-sm leading-relaxed text-white/95">
                <p className="italic">
                  Our Father, who art in heaven, hallowed be thy name;<br />
                  thy Kingdom come; thy will be done;<br />
                  on earth as it is in heaven.
                </p>
                <p>
                  Give us this day our daily bread.<br />
                  And forgive us our trespasses,<br />
                  as we forgive those who trespass against us.<br />
                  And lead us not into temptation;<br />
                  but deliver us from evil.
                </p>
                <p className="font-medium text-[#e0e7ff] pt-2">
                  For thine is the kingdom, the power and the glory, for ever and ever.
                </p>
                <p className="font-bold text-lg text-white">Amen.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Detailed Leadership Profiles Section (Matching References 4 & 5) */}
      <section id="leadership" className="py-24 bg-white relative">
        {/* Subtle graph-paper grid background pattern matching reference */}
        <div
          className="absolute inset-0 opacity-[0.4] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#e0e7ff 1px, transparent 1px), linear-gradient(90deg, #e0e7ff 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative mx-auto max-w-[1380px] px-5 lg:px-10">
          <div className="mb-14">
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-[#3730a3] uppercase tracking-wide border-b-2 border-[#6366f1] inline-block pb-1">
              Leadership
            </h3>
          </div>

          {/* Profile 1: Chairman - Bishop Dr. AnilKumar John Servand */}
          <div className="mb-20 bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-xl">
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              {/* Big High-Res Photograph */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-slate-100">
                  <img
                    src="/chairman-bishop-servand.jpg"
                    alt="Bishop Dr. AnilKumar John Servand - Chairman"
                    className="w-full h-auto object-cover min-h-[420px]"
                  />
                  <div className="bg-[#1e1b4b] text-white p-5 text-center">
                    <h4 className="font-display font-extrabold text-lg sm:text-xl">
                      BISHOP DR. ANILKUMAR JOHN SERVAND
                    </h4>
                    <p className="text-xs text-[#a5b4fc] font-bold tracking-widest uppercase mt-1">
                      CHAIRMAN
                    </p>
                  </div>
                </div>
              </div>

              {/* Comprehensive Bio Paragraphs (Matching Reference 4 text exactly) */}
              <div className="lg:col-span-7 space-y-4 text-[14.5px] sm:text-[15.5px] leading-relaxed text-[#4b5563]">
                <div className="flex items-center gap-2 text-[#4f46e5] font-serif text-3xl mb-2">
                  “
                </div>
                <p>
                  <strong className="text-[#1e1b4b]">Bishop Dr. AnilKumar John Servand</strong> is the
                  Chairman of Baldwin Methodist Educational Society and heads the Bangalore Regional
                  Conference of the Methodist Church in India. He is committed to excellence in church
                  life as well as in the field of education. Bishop Dr. Anilkumar Servand has spent
                  considerable years of his ministry working with zeal and dedication helping the
                  Christian Ministry. He comes with rich and vast professional and ministerial
                  experience.
                </p>
                <p>
                  As the minister of the Methodist Church in India (MCI) he held many responsible
                  positions in MCI and other Institutions, serving as the Professor and Principal of the
                  Methodist Bible Seminary, Gujarat, The Director of Methodist Technical Institute at
                  Baroda, Gujarat and as the Pastor and District Superintendent for several years prior
                  to becoming the Bishop of MCI. Currently Bishop Dr. AnilKumar John Servand is the
                  Bishop of Bangalore Regional Conference of MCI, Mumbai Regional Conference of MCI,
                  Chennai Regional Conference of MCI and Bareilly Regional Conference of MCI. He is also
                  the Chairperson of Medical Council of MCI and Women Council of MCI, in the capacity
                  of Bishop, he is the Chief Acharya of Sat Tal Christian Ashram, Sattal, Nainital. Our
                  Chairman’s commitment to spiritually enrich the church life and improve the standard
                  of education is unparalleled.
                </p>
                <p>
                  Our Chairman is a wellspring of knowledge, wisdom and experience. His pioneering
                  leadership and in-depth decisions have elevated the school’s prestige and stature to
                  greater heights. Our Chairman’s progressive reforms have facilitated numerous
                  productive transitions. His futuristic vision has expanded the base of academic
                  orientation through a broader spectrum of development.
                </p>
                <p>
                  Bishop Dr. AnilKumar John Servand is a visionary, a personality who strives to make a
                  difference. He is a man of principles and is task oriented, a public figure loved by
                  all.
                </p>
                <p className="font-semibold text-[#1e1b4b]">
                  We are honoured to have Dr. AnilKumar John Servand as the Chairman of Baldwin
                  Educational Society who is an accomplished educationalist and a dynamic leader with
                  extensive experience both in India and abroad.
                </p>
              </div>
            </div>
          </div>

          {/* Profile 2 & 3: Principal & Manager (Matching Reference 5) */}
          <div className="space-y-16">
            {/* Principal: Mrs. Asha Margaret Das */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-xl">
              <div className="grid lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-5 order-1 lg:order-2">
                  <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-slate-100">
                    <img
                      src="/principal-mrs-das.jpg"
                      alt="Mrs. Asha Margaret Das - Principal"
                      className="w-full h-auto object-cover min-h-[340px]"
                    />
                    <div className="bg-[#1e1b4b] text-white p-5 text-center">
                      <h4 className="font-display font-extrabold text-lg sm:text-xl">
                        MRS. ASHA MARGARET DAS
                      </h4>
                      <p className="text-xs text-[#a5b4fc] font-bold tracking-widest uppercase mt-1">
                        PRINCIPAL
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 order-2 lg:order-1 space-y-4">
                  <div className="bg-[#faf5ff] border-l-4 border-[#9333ea] p-6 rounded-r-xl">
                    <p className="italic text-[#581c87] text-base leading-relaxed font-serif">
                      “Education is the most powerful weapon which you can use to change the world.”
                    </p>
                    <p className="text-xs font-bold text-[#7e22ce] uppercase tracking-wider mt-2">
                      — Nelson Mandela
                    </p>
                  </div>
                  <p className="text-[15px] sm:text-base leading-relaxed text-[#4b5563] pt-2">
                    Our commitment at Baldwin Girls’ High School is to provide a safe and
                    intellectually challenging environment that will empower students to become
                    innovative thinkers, creative problem solvers, and inspired learners prepared to
                    thrive in the fast-changing world.
                  </p>
                  <p className="text-[15px] sm:text-base leading-relaxed text-[#4b5563]">
                    Under the visionary guidance of Mrs. Asha Margaret Das, the school blends rigorous
                    academics with co-curricular opportunities, instilling deep moral foundations and
                    preparing young women to lead with poise, integrity, and intellectual curiosity.
                  </p>
                </div>
              </div>
            </div>

            {/* Manager: Mrs. Anita Isaac */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-xl">
              <div className="grid lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-slate-100">
                    <img
                      src="/manager-mrs-isaac.jpg"
                      alt="Mrs. Anita Isaac - Manager"
                      className="w-full h-auto object-cover min-h-[340px]"
                    />
                    <div className="bg-[#1e1b4b] text-white p-5 text-center">
                      <h4 className="font-display font-extrabold text-lg sm:text-xl">
                        MRS. ANITA ISAAC
                      </h4>
                      <p className="text-xs text-[#a5b4fc] font-bold tracking-widest uppercase mt-1">
                        MANAGER
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <div className="bg-[#eff6ff] border-l-4 border-[#2563eb] p-6 rounded-r-xl">
                    <p className="italic text-[#1e3a8a] text-base leading-relaxed font-serif">
                      “Education is simply the soul of a society as it passes from one generation to
                      another.”
                    </p>
                    <p className="text-xs font-bold text-[#1d4ed8] uppercase tracking-wider mt-2">
                      — G. K. Chesterton
                    </p>
                  </div>
                  <p className="text-[15px] sm:text-base leading-relaxed text-[#4b5563] pt-2">
                    In a constantly changing world, education must evolve to meet new challenges
                    through collaboration, innovation, and growth. Since 1880, Baldwin Girls’ High
                    School has excelled in producing responsible citizens who drive societal change.
                  </p>
                  <p className="text-[15px] sm:text-base leading-relaxed text-[#4b5563]">
                    The school’s updated learning strategies empower students to address global issues
                    and navigate the world beyond their immediate surroundings with courage and grace.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. School Houses Section (Matching Reference 6) */}
      <section className="py-20 bg-[#fafbfe] border-t border-gray-100">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <div className="mb-12">
            <h3 className="font-display font-extrabold text-3xl text-[#3730a3] uppercase tracking-wide border-b-2 border-[#6366f1] inline-block pb-1">
              Houses
            </h3>
            <p className="mt-3 text-sm text-[#6b7280]">
              Fostering healthy camaraderie, teamwork, and leadership through our historic house system.
            </p>
          </div>

          {/* Row 1: 4 houses */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-5">
            {[
              {
                name: "LAURA GILL HOUSE",
                motto: "“To Greater Heights”",
                stripeColor: "bg-[#ea580c]",
              },
              {
                name: "WESTON HOUSE",
                motto: "“Never Despair”",
                stripeColor: "bg-[#eab308]",
              },
              {
                name: "FISHER HOUSE",
                motto: "“PERSEVERE TO THE END.”",
                desc: "Named after Miss Fannie Fisher who donated generously to the school in 1910.",
                stripeColor: "bg-[#9333ea]",
                specialCard: true,
              },
              {
                name: "BENTHEIN HOUSE",
                motto: "“Bend to Nothing”",
                stripeColor: "bg-[#22c55e]",
              },
            ].map((house) => (
              <div
                key={house.name}
                className="relative bg-[#161f38] text-white rounded-xl p-6 min-h-[260px] flex flex-col justify-between overflow-hidden shadow-lg border border-white/10 group hover:-translate-y-1 transition-transform duration-300"
              >
                {/* Diagonal Color Sash Stripe */}
                <div
                  className={`absolute -left-10 top-1/2 -translate-y-1/2 w-[140%] h-5 ${house.stripeColor} rotate-[-30deg] pointer-events-none opacity-90`}
                />

                <h4 className="relative z-10 font-display font-extrabold text-sm sm:text-base tracking-wider uppercase text-white/95">
                  {house.name}
                </h4>

                {house.specialCard && house.desc && (
                  <p className="relative z-10 text-[11px] leading-tight text-white/70 mt-2">
                    {house.desc}
                  </p>
                )}

                <p className="relative z-10 font-serif italic text-xs sm:text-sm text-white/90">
                  {house.motto}
                </p>
              </div>
            ))}
          </div>

          {/* Row 2: 3 houses centered */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              {
                name: "DELIMA HOUSE",
                motto: "“Forward Ever Backward Never”",
                stripeColor: "bg-[#f472b6]",
              },
              {
                name: "STEPHEN HOUSE",
                motto: "“Step up, Stephen”",
                stripeColor: "bg-[#e11d48]",
              },
              {
                name: "WATSON HOUSE",
                motto: "“Flame of Hope”",
                stripeColor: "bg-[#06b6d4]",
              },
            ].map((house) => (
              <div
                key={house.name}
                className="relative bg-[#161f38] text-white rounded-xl p-6 min-h-[260px] flex flex-col justify-between overflow-hidden shadow-lg border border-white/10 group hover:-translate-y-1 transition-transform duration-300"
              >
                {/* Diagonal Color Sash Stripe */}
                <div
                  className={`absolute -left-10 top-1/2 -translate-y-1/2 w-[140%] h-5 ${house.stripeColor} rotate-[-30deg] pointer-events-none opacity-90`}
                />

                <h4 className="relative z-10 font-display font-extrabold text-sm sm:text-base tracking-wider uppercase text-white/95">
                  {house.name}
                </h4>

                <p className="relative z-10 font-serif italic text-xs sm:text-sm text-white/90">
                  {house.motto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Admission Connect Banner (Matching Reference 7 & 8) */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <div className="mb-10">
            <h3 className="font-display font-extrabold text-3xl text-[#3730a3] uppercase tracking-wide border-b-2 border-[#6366f1] inline-block pb-1">
              Admission
            </h3>
            <p className="mt-3 text-sm text-[#4b5563]">We are happy to see your interest in our school.</p>
          </div>

          {/* Banner Box */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#e0e7ff] via-[#eef2ff] to-[#f8fafc] p-8 sm:p-12 border border-[#c7d2fe]/70 shadow-lg">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Graphic / Info representation */}
              <div className="lg:col-span-7 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-2xl bg-white p-4 shadow-md flex items-center justify-center shrink-0">
                  <svg className="w-12 h-12 text-[#4f46e5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4f46e5]/10 text-[#4338ca] text-xs font-bold uppercase tracking-wider mb-2">
                    Office Hours: Mon–Fri · 9:00 AM – 4:00 PM
                  </div>
                  <h4 className="font-serif text-2xl text-[#1e1b4b] font-bold">
                    Admissions Open for Academic Year 2026–2027
                  </h4>
                  <p className="text-sm text-[#64748b] mt-1">
                    Direct admissions available from Pre-KG to Standard X.
                  </p>
                </div>
              </div>

              {/* Action Card */}
              <div className="lg:col-span-5 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 text-[#4f46e5] flex items-center justify-center mb-3">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h5 className="font-display font-bold text-lg text-[#1e1b4b]">
                  Talk to a Member of our Admission Team
                </h5>
                <p className="text-xs text-[#64748b] mt-2 mb-6 leading-relaxed">
                  Get in touch with our team for personalized assistance, fee structure, and syllabus information.
                </p>
                <Link
                  to="/admissions"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[#4f46e5] hover:bg-[#4338ca] text-white py-3.5 px-6 font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all"
                >
                  Request Information
                </Link>
              </div>
            </div>
          </div>

          {/* Academic Sections Preview & Back to Home Button */}
          <div className="mt-16 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl bg-white border border-gray-300 hover:border-[#4f46e5] hover:text-[#4f46e5] text-[#374151] px-6 py-2.5 text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
            >
              ← Back to home page
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export function Academics() {
  return (
    <main>
      <PageHero
        eyebrow="Academics"
        title="Curiosity, cultivated."
        text="Four thoughtfully structured stages support every learner from her first classroom experience to ICSE success."
        image={`${school}/static/media/preprimary.d0e9cf0ed8eaa69d48f8.png`}
      />
      <section className="section-pad">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <SectionIntro eyebrow="Our programmes" title="A clear path forward.">
            <p>Each stage builds knowledge, independence and character in equal measure.</p>
          </SectionIntro>
          <div className="mt-12">
            <AcademicCards />
          </div>
        </div>
      </section>
    </main>
  );
}

export function Programme() {
  const { programme } = useParams();
  const item = programmes.find((entry) => entry.slug === programme);

  if (!item) return <NotFound />;

  return (
    <main>
      <PageHero eyebrow={item.years} title={item.title} text={item.intro} image={item.feature} />
      <section className="section-pad">
        <div className="mx-auto grid max-w-[1380px] gap-12 px-5 lg:grid-cols-[1.1fr_.9fr] lg:px-10">
          <div>
            <p className="eyebrow text-[#2563EB]">Programme overview</p>
            <h2 className="section-title mt-5">Learning with confidence.</h2>
            <p className="mt-8 max-w-2xl text-xl leading-9 text-[#5a6778]">{item.focus}</p>
          </div>
          <div className="bg-white p-8">
            <p className="eyebrow text-[#2563EB]">Daily schedule</p>
            {item.schedule.map((line) => (
              <p className="mt-4 border-b border-[#0b1d38]/10 pb-4" key={line}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad bg-[#eaf0f4]">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <SectionIntro eyebrow="Curriculum" title="Subjects & experiences." />
          <div className="mt-10 grid grid-cols-2 gap-px bg-[#0b1d38]/15 md:grid-cols-3">
            {item.subjects.map((subject, index) => (
              <div className="bg-[#eaf0f4] p-6" key={subject}>
                <span className="text-xs text-[#2563EB]">0{index + 1}</span>
                <p className="mt-4 font-serif text-2xl">{subject}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <AdmissionCTA />
    </main>
  );
}

const facilities = [
  ["Science Lab", "ScienceLab.d689eb9af7d97ee94b32.JPG"],
  ["Boarding", "Boarding.866aba58e720b320fa4e.jpg"],
  ["Hostel Dining Hall", "HostelDiningHall.eab6e3d225f139b3e097.jpg"],
  ["Auditorium", "Auditorium.cf65442d9978d6969fec.JPG"],
  ["Classrooms", "Classrooms.3ab42157584b68c3fdd3.JPG"],
  ["Infirmary", "Infirmary.6c9dc47c73460e54fdd2.JPG"],
  ["Library", "Library.76974d8e0d88201136b0.JPG"],
];

export function Campus() {
  return (
    <main>
      <PageHero
        eyebrow="Infrastructure"
        title="A campus made to thrive."
        text="Purposeful indoor and outdoor facilities support study, wellbeing, creativity and community."
        image={`${school}/static/media/campus.c2695666f7a6b4f62dbe.png`}
      />
      <section className="section-pad">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <SectionIntro eyebrow="Campus amenities" title="Every space has a purpose.">
            <p>
              From laboratories to the library, students learn in spaces designed for discovery.
            </p>
          </SectionIntro>
          <div className="mt-12 grid auto-rows-[300px] gap-4 md:grid-cols-2 lg:grid-cols-3">
            {facilities.map(([name, image], index) => (
              <figure
                className={`group relative overflow-hidden ${index === 0 ? "lg:col-span-2" : ""}`}
                key={name}
              >
                <img
                  src={`${school}/static/media/${image}`}
                  alt={name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071a33]/85 via-transparent" />
                <figcaption className="absolute bottom-6 left-6 font-serif text-3xl text-white">
                  {name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export function StudentLife() {
  const activities = [
    "Dance",
    "Art",
    "Craft classes",
    "Creativity fair",
    "Music",
    "NCC",
    "Quiz",
    "Rhyme time",
    "Robotics",
    "Artificial intelligence",
    "Counselling",
    "Career guidance",
  ];

  return (
    <main>
      <PageHero
        eyebrow="Co-curricular"
        title="Beyond the book."
        text="A rich programme of performing arts, visual arts and multidisciplinary activities develops body, mind and spirit."
        image={`${school}/static/media/co-curricular.5cd4fc7e1478aed3026b.png`}
      />
      <section className="section-pad">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <SectionIntro eyebrow="Explore & express" title="Every talent has a place.">
            <p>
              Girls choose activities according to their interests, supported by skilled and
              enthusiastic faculty.
            </p>
          </SectionIntro>
          <div className="mt-12 grid gap-px bg-[#0b1d38]/15 sm:grid-cols-2 lg:grid-cols-4">
            {activities.map((item, index) => (
              <div className="bg-[#f8f7f2] p-7" key={item}>
                <span className="text-xs text-[#2563EB]">0{index + 1}</span>
                <p className="mt-5 font-serif text-2xl">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="pb-24">
        <div className="mx-auto grid max-w-[1380px] gap-5 px-5 md:grid-cols-3 lg:px-10">
          {[
            "dance12.dc7863373cb54ccb2727.JPG",
            "dance4.3a687afb004070e83b40.JPG",
            "dance1.ace8fed89df95eef0419.JPG",
          ].map((image) => (
            <img
              className="h-80 w-full object-cover"
              src={`${school}/static/media/${image}`}
              alt="Student activity"
              key={image}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export function Sports() {
  return (
    <main>
      <PageHero
        eyebrow="Sports"
        title="Play. Persist. Prevail."
        text="Every student can choose from 18 outdoor and indoor sports under skilled coaches and trainers."
        image={`${school}/static/media/sports.f0d7b3d26fa942a90f75.png`}
      />
      <section className="section-pad">
        <div className="mx-auto grid max-w-[1380px] gap-12 px-5 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="eyebrow text-[#2563EB]">Sporting excellence</p>
            <h2 className="section-title mt-5">Strength in every stride.</h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-[#5a6778]">
            <p>
              Sport has an important place at Baldwin. Play builds health, spirit, resilience and
              teamwork.
            </p>
            <p>
              Students compete at multiple levels, with swimmers and athletes earning laurels at
              state and international events. The school swimming pool is built to international
              standards.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-14 grid max-w-[1380px] gap-5 px-5 md:grid-cols-3 lg:px-10">
          {[
            "outdoor22.08cb9c94026630d96a2a.JPG",
            "outdoor6.3ddf6df4716f41b0c71a.JPG",
            "outdoor2.e780281aba5072cec5c1.JPG",
          ].map((image) => (
            <img
              className="h-80 w-full object-cover"
              src={`${school}/static/media/${image}`}
              alt="Sports at Baldwin"
              key={image}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export function Events() {
  return (
    <main>
      <PageHero
        eyebrow="Events"
        title="Moments that shape us."
        text="Academic, cultural and STEM events create opportunities to participate, lead and celebrate together."
        image={`${school}/static/media/events.7a1fd1640b7f464e15ad.png`}
      />
      <section className="section-pad">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <SectionIntro eyebrow="School calendar" title="A year full of discovery.">
            <p>
              Inter-house events, festivals, graduation, field trips, prize day, robotics and the
              Spell Bee.
            </p>
          </SectionIntro>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="bg-[#071a33] p-8 text-white">
              <p className="eyebrow text-[#38BDF8]">Investiture ceremony Â· 2024â€“25</p>
              <h3 className="mt-5 font-serif text-4xl">Student Council</h3>
              <div className="mt-7 space-y-3 text-sm text-white/70">
                <p>President â€” Aaheli Dutta</p>
                <p>Vice-President â€” Aandrita G</p>
                <p>Secretary â€” Swara S</p>
                <p>Games Captain â€” Harshini P</p>
                <p>Games Vice-Captain â€” Priyadarshini Mansingh</p>
              </div>
            </div>
            <img
              src={`${school}/static/media/ceremony.d3e4f64e2e67df07673e.png`}
              alt="Investiture ceremony"
              className="h-full min-h-96 w-full object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export function Admissions() {
  return (
    <main>
      <PageHero
        eyebrow="Admissions 2026â€“27"
        title="Begin her Baldwin journey."
        text="Our admissions team is ready to guide your family through every step."
        image={`${school}/static/media/mainbanner2.312bdec586ff6695246f.png`}
      />
      <section className="section-pad">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <SectionIntro eyebrow="How to apply" title="A simple, guided process.">
            <a
              href="https://portal.baldwingirls.edu.in/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#071a33] px-7 py-4 text-xs font-bold tracking-[.14em] text-white uppercase"
            >
              Apply online
            </a>
          </SectionIntro>
          <ol className="mt-12 grid gap-px bg-[#0b1d38]/15 md:grid-cols-2 lg:grid-cols-3">
            {admissionSteps.map((step, index) => (
              <li className="flex gap-5 bg-[#f8f7f2] p-7" key={step}>
                <span className="font-serif text-3xl text-[#2563EB]">0{index + 1}</span>
                <p className="text-sm leading-6 text-[#5a6778]">{step}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 grid gap-px bg-[#0b1d38]/15 md:grid-cols-2">
            <div className="bg-white p-8">
              <p className="eyebrow text-[#2563EB]">Age criteria</p>
              <ul className="mt-6 space-y-3 text-[#5a6778]">
                <li>Pre-KG: 3 years as on 1 June</li>
                <li>LKG: 4 years as on 1 June</li>
                <li>UKG: 5 years as on 1 June</li>
                <li>Standard 1: 6 years as on 1 June</li>
              </ul>
            </div>
            <div className="bg-white p-8">
              <p className="eyebrow text-[#2563EB]">Documents required</p>
              <ul className="mt-6 space-y-3 text-[#5a6778]">
                <li>Parentsâ€™ declaration and photographs</li>
                <li>Original and attested birth certificate</li>
                <li>Medical fitness certificate</li>
                <li>Category certificate where applicable</li>
                <li>Passport copy for NRI students</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export function Contact() {
  const portals = [
    ["Admission portal", "https://portal.baldwingirls.edu.in/"],
    ["Student portal", "https://baldwinvapsecampus.com/#/login/103"],
    ["Transport portal", "https://transport.baldwingirls.edu.in/"],
    ["Instagram", "https://www.instagram.com/baldwingirlshighschool/"],
    ["Facebook", "https://www.facebook.com/Baldwingirls"],
  ];

  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Weâ€™re here to help."
        text="Visit us in the heart of Bengaluru or speak with our school and admissions teams."
        image={`${school}/static/media/mainbanner3.04766c6109cb4c6d1124.png`}
      />
      <section className="section-pad">
        <div className="mx-auto grid max-w-[1380px] gap-8 px-5 md:grid-cols-2 lg:px-10">
          <div>
            <p className="eyebrow text-[#2563EB]">Baldwin Girlsâ€™ High School</p>
            <h2 className="section-title mt-5">Come and meet us.</h2>
            <div className="mt-9 space-y-5 text-lg text-[#5a6778]">
              <p>
                #90, Richmond Road
                <br />
                Bengaluru, Karnataka
              </p>
              <p>
                <a href="tel:+919148780138">+91 91487 80138</a>
              </p>
              <p>
                <a href="mailto:baldwingirls@gmail.com">baldwingirls@gmail.com</a>
              </p>
              <p>
                Mondayâ€“Friday
                <br />
                8:15 amâ€“3:00 pm
              </p>
            </div>
          </div>
          <div className="bg-[#071a33] p-9 text-white">
            <p className="eyebrow text-[#38BDF8]">Useful portals</p>
            <div className="mt-8 flex flex-col">
              {portals.map(([label, href]) => (
                <a
                  className="flex justify-between border-b border-white/15 py-5 text-lg"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  key={label}
                >
                  {label}
                  <Arrow />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function AdmissionCTA() {
  return (
    <section className="bg-[#1D4ED8] text-white py-14">
      <div className="mx-auto flex max-w-[1380px] flex-col justify-between gap-6 px-5 md:flex-row md:items-center lg:px-10">
        <div>
          <p className="eyebrow">Admissions 2026â€“27</p>
          <h2 className="mt-3 font-serif text-4xl">Ready to begin?</h2>
        </div>
        <Link
          to="/admissions"
          className="rounded-full bg-[#071a33] px-7 py-4 text-xs font-bold tracking-[.14em] text-white uppercase"
        >
          View admission details
        </Link>
      </div>
    </section>
  );
}

export function NotFound() {
  return (
    <main className="grid min-h-[65vh] place-items-center px-5 text-center">
      <div>
        <p className="eyebrow text-[#2563EB]">404</p>
        <h1 className="mt-4 font-serif text-6xl">Page not found.</h1>
        <Link to="/" className="link-line mt-8 inline-flex">
          Return home
        </Link>
      </div>
    </main>
  );
}

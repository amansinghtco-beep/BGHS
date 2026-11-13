import { useRef, useState } from "react";
import { Link, useParams } from "react-router";
import { AcademicCards, Arrow, PageHero, SectionIntro } from "./components";
import ExploreBGHS from "./ExploreBGHS";
import SleekEnquirySection from "./SleekEnquirySection";
import InteractiveAbout from "./InteractiveAbout";
import TriumphsSection from "./TriumphsSection";
import DistinguishedAlumniWall from "./DistinguishedAlumniWall";
import CampusInfrastructure from "./CampusInfrastructure";
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
          to="/facilities"
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

      {/* Academic & Athletic Triumphs Section (pulled from baldwingirls.edu.in) */}
      <TriumphsSection />

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

      {/* Distinguished Alumni Wall Carousel (Self-sliding, touch/swipe & arrows) */}
      <DistinguishedAlumniWall />

      {/* Campus Infrastructure Section (Indoor & Outdoor spaces with school illustrations) */}
      <CampusInfrastructure />

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
              "Facilities & Infrastructure",
              "Purpose-built laboratories, swimming pool, auditorium and boarding.",
              "/facilities",
              "ScienceLab.d689eb9af7d97ee94b32.JPG",
            ],
            [
              "Campus Life & Culture",
              "Arts, sports, NCC, student council & vibrant student community.",
              "/campus-life",
              "cocurriculumm.bd27fcabaa35d7bc4e4e.png",
            ],
            [
              "Sports & Athletics",
              "18 indoor and outdoor sports guided by skilled national coaches.",
              "/campus-life#sports",
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
  return <InteractiveAbout />;
}

export { default as Academics } from "./AcademicsPage";

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

export { default as Facilities } from "./FacilitiesPage";
export { default as Campus } from "./CampusLifePage";
export { default as CampusLife } from "./CampusLifePage";
export { default as StudentLife } from "./CampusLifePage";

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

export { default as Events, default as News, default as NewsEventsPage } from "./NewsEventsPage";

export { default as Admissions } from "./AdmissionsPage";

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

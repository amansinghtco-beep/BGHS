import { useEffect, useState, useRef, type ReactNode } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import FloatingActions from "./FloatingActions";
import { programmes, school } from "./data";

export function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

const marqueeAnnouncements = [
  {
    badge: "Admissions Open",
    detail: "for the Academic Year 2026–27",
    tagline: "Building a Brighter Future Together",
    to: "/admissions",
  },
  {
    badge: "Direct Admissions",
    detail: "Pre-KG to Standard X Applications Open",
    tagline: "100% ICSE Board Pass Rate & Top Honors",
    to: "/admissions",
  },
  {
    badge: "140+ Years Legacy",
    detail: "Empowering Young Women Since 1880",
    tagline: "Loyalty and Service · Righteousness and Truth",
    to: "/about",
  },
  {
    badge: "Campus Tours",
    detail: "Experience Our World-Class Heritage Campus",
    tagline: "Call +91 91487 80138 for Inquiries",
    to: "/contact",
  },
];

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
    setIsHeaderVisible(true);
    lastScrollY.current = window.scrollY;
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Hide header on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Keep visible near the very top of the page
      if (currentScrollY <= 60) {
        setIsHeaderVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // If scrolling down by more than 8px, hide header
      if (currentScrollY > lastScrollY.current + 8) {
        setIsHeaderVisible(false);
        setActiveDropdown(null);
      }
      // If scrolling up by more than 8px, reveal header
      else if (currentScrollY < lastScrollY.current - 8) {
        setIsHeaderVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (name: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const navItems = [
    { label: "Home", to: "/" },
    {
      label: "About Us",
      to: "/about",
    },
    {
      label: "Academics",
      to: "/academics",
      hasDropdown: true,
      children: [
        { title: "Academic Overview", desc: "Rigorous ICSE curriculum & holistic learning", to: "/academics" },
        { title: "Pre-Primary", desc: "Pre-KG to Standard II joyful foundation", to: "/academics#pre-primary" },
        { title: "Primary School", desc: "Standard III to V active discovery", to: "/academics#primary" },
        { title: "Middle School", desc: "Standard VI to VIII critical reasoning", to: "/academics#middle-school" },
        { title: "High School", desc: "Standard IX & X ICSE examination excellence", to: "/academics#high-school" },
        { title: "ICSE Framework", desc: "Subjects, electives & assessment structure", to: "/academics#curriculum-framework" },
      ],
    },
    {
      label: "Admissions",
      to: "/admissions",
      hasDropdown: true,
      children: [
        { title: "Admissions 2026–27", desc: "Online registration open now", to: "/admissions#overview" },
        { title: "Admission Criteria & Steps", desc: "Simple 4-step admission guide", to: "/admissions#steps" },
        { title: "Prospectus & Fee Info", desc: "Timings, documents and guidelines", to: "/admissions#info" },
      ],
    },
    {
      label: "Facilities",
      to: "/facilities",
      hasDropdown: true,
      children: [
        { title: "Campus & Infrastructure", desc: "7+ acres, heritage buildings & modern labs", to: "/facilities#overview" },
        { title: "Indoor Facilities & Labs", desc: "Science labs, robotics, library & auditorium", to: "/facilities#indoor" },
        { title: "Outdoor & Sports Arenas", desc: "Swimming pool, basketball & sports grounds", to: "/facilities#outdoor" },
        { title: "Boarding & Wellness", desc: "Hostel residence, dining hall & 24/7 infirmary", to: "/facilities#boarding" },
      ],
    },
    {
      label: "Campus Life",
      to: "/student-life",
      hasDropdown: true,
      children: [
        { title: "Student Life & Culture", desc: "Beyond the classroom & 4 core development pillars", to: "/student-life#culture" },
        { title: "Sports & Athletics", desc: "18 sports, swimming pool & roll of honor", to: "/student-life#sports" },
        { title: "Co-Curricular Activities", desc: "Dance, art, craft, music, NCC & quiz", to: "/student-life#co-curricular" },
        { title: "Leadership & NCC", desc: "Student council roster & cadet corps training", to: "/student-life#leadership" },
        { title: "Events & Celebrations", desc: "Inter-house, graduation, prize day & robotics", to: "/student-life#events" },
      ],
    },
    {
      label: "News & Events",
      to: "/events",
      hasDropdown: true,
      children: [
        { title: "Upcoming Events", desc: "Annual day, sports meet & celebrations", to: "/events" },
        { title: "School Calendar 2026–27", desc: "Term dates, holidays and exam schedules", to: "/events#calendar" },
      ],
    },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f7f2] text-[#0b1d38]">
      {/* WRAPPER FOR FLOATING / SMART-HIDING HEADER CONTAINER */}
      <div
        className={`sticky top-0 z-50 transition-transform duration-300 ease-in-out ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* 1. TOP ANNOUNCEMENT BAR (AUTOMATIC MOVING MARQUEE BANNER) */}
        <div className="bg-[#002248] text-white py-2.5 overflow-hidden border-b border-[#003066]/60 relative select-none">
          <div className="animate-marquee-track flex items-center">
            {/* Set 1 */}
            {marqueeAnnouncements.map((item, idx) => (
              <Link
                key={`m1-${idx}`}
                to={item.to}
                className="inline-flex items-center gap-2.5 mx-8 shrink-0 group/item hover:opacity-100 transition-opacity text-xs sm:text-[13px] cursor-pointer"
              >
                <span className="text-[#38BDF8] flex items-center shrink-0 group-hover/item:scale-110 transition-transform">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M21 4.25a.75.75 0 0 0-.75-.75H17a1 1 0 0 0-.8.4L11.5 10H5a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1.27l1.08 4.33A2 2 0 0 0 9.29 24h1.42a1 1 0 0 0 .97-1.24L10.5 18h1.7l4.7 6.35a1 1 0 0 0 .8.4h3.25a.75.75 0 0 0 .75-.75V4.25zm-2 15.65-4.4-5.94a1 1 0 0 0-.8-.41H10l1.18 4.73a.5.5 0 0 1-.49.62H9.29a.5.5 0 0 1-.48-.38L7.66 14H5a1.5 1.5 0 0 1-1.5-1.5v-2A1.5 1.5 0 0 1 5 9h6.7a1 1 0 0 0 .8-.4l4.5-6.1h2v17.4z" />
                  </svg>
                </span>
                <span className="text-white/30 select-none">|</span>
                <span className="font-bold text-[#38BDF8] group-hover/item:underline underline-offset-2">
                  {item.badge}
                </span>
                <span className="text-white/90">
                  {item.detail}
                </span>
                <span className="text-white/30 select-none">|</span>
                <span className="text-white/80 font-normal">
                  {item.tagline}
                </span>
              </Link>
            ))}
            {/* Set 2 (Duplicate for continuous loop) */}
            {marqueeAnnouncements.map((item, idx) => (
              <Link
                key={`m2-${idx}`}
                to={item.to}
                className="inline-flex items-center gap-2.5 mx-8 shrink-0 group/item hover:opacity-100 transition-opacity text-xs sm:text-[13px] cursor-pointer"
              >
                <span className="text-[#38BDF8] flex items-center shrink-0 group-hover/item:scale-110 transition-transform">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M21 4.25a.75.75 0 0 0-.75-.75H17a1 1 0 0 0-.8.4L11.5 10H5a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1.27l1.08 4.33A2 2 0 0 0 9.29 24h1.42a1 1 0 0 0 .97-1.24L10.5 18h1.7l4.7 6.35a1 1 0 0 0 .8.4h3.25a.75.75 0 0 0 .75-.75V4.25zm-2 15.65-4.4-5.94a1 1 0 0 0-.8-.41H10l1.18 4.73a.5.5 0 0 1-.49.62H9.29a.5.5 0 0 1-.48-.38L7.66 14H5a1.5 1.5 0 0 1-1.5-1.5v-2A1.5 1.5 0 0 1 5 9h6.7a1 1 0 0 0 .8-.4l4.5-6.1h2v17.4z" />
                  </svg>
                </span>
                <span className="text-white/30 select-none">|</span>
                <span className="font-bold text-[#38BDF8] group-hover/item:underline underline-offset-2">
                  {item.badge}
                </span>
                <span className="text-white/90">
                  {item.detail}
                </span>
                <span className="text-white/30 select-none">|</span>
                <span className="text-white/80 font-normal">
                  {item.tagline}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* 2. MAIN HEADER */}
        <header className="bg-white border-b border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 sm:px-8 py-3">
          {/* Logo Brand on Left using the Official Baldwin Crest */}
          <div className="flex items-center min-w-0">
            <Link to="/" className="flex items-center gap-2 sm:gap-4 group min-w-0">
              <img
                src="/baldwin-crest-official.png"
                alt="Baldwin Girls' High School Bangalore Crest"
                className="h-11 sm:h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-105 shrink-0"
              />
              <div className="flex flex-col select-none min-w-0">
                <span className="font-serif font-black text-[#0B1B3D] text-[13px] sm:text-[20px] leading-tight tracking-[0.02em] sm:tracking-[0.04em] whitespace-nowrap">
                  BALDWIN GIRLS’
                </span>
                <span className="font-display font-extrabold text-[#1D4ED8] text-[9.5px] sm:text-[14.5px] leading-tight tracking-[0.14em] sm:tracking-[0.18em] mt-0.5 whitespace-nowrap">
                  HIGH SCHOOL
                </span>
                <span className="font-display font-bold text-[#637083] text-[7px] sm:text-[9px] leading-none tracking-[0.16em] sm:tracking-[0.22em] uppercase mt-0.5 sm:mt-1 whitespace-nowrap hidden xs:block">
                  BENGALURU · EST. 1880
                </span>
              </div>
            </Link>

            {/* Vertical separator line between logo and navigation */}
            <div className="hidden lg:block h-8 w-[1px] bg-gray-200 mx-5 xl:mx-7" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-[13.5px] xl:text-[14.5px] font-medium text-[#0B1B3D]">
            {navItems.map((item) => {
              if (item.hasDropdown) {
                const isOpen = activeDropdown === item.label;
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `inline-flex items-center gap-1.5 py-2 transition-colors hover:text-[#1D4ED8] ${isActive && item.to !== "/" ? "text-[#1D4ED8] font-semibold" : ""
                        }`
                      }
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`w-3.5 h-3.5 text-[#0B1B3D]/70 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                          }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </NavLink>

                    {/* Dropdown Menu Popup */}
                    {isOpen && (
                      <div className="absolute top-full left-0 pt-2 w-72 z-50 animate-in fade-in-50 duration-150">
                        <div className="rounded-xl bg-white p-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.12)] border border-gray-100">
                          {item.children?.map((sub) => (
                            <Link
                              key={sub.to}
                              to={sub.to}
                              onClick={() => {
                                setActiveDropdown(null);
                                if (sub.to.includes("#")) {
                                  const [path, hash] = sub.to.split("#");
                                  if (location.pathname === path || location.pathname === `${path}/`) {
                                    setTimeout(() => {
                                      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
                                    }, 50);
                                  }
                                }
                              }}
                              className="block rounded-lg px-3.5 py-2.5 transition-colors hover:bg-[#f8f7f2]"
                            >
                              <p className="font-semibold text-xs text-[#0B1B3D]">
                                {sub.title}
                              </p>
                              <p className="text-[11px] text-[#637083] mt-0.5 leading-tight">
                                {sub.desc}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              // Standard Link (like Home and Contact)
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `relative py-2 transition-colors hover:text-[#1D4ED8] ${isActive
                      ? "text-[#0B1B3D] font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#1D4ED8] after:rounded-full"
                      : ""
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Button (Admissions 2026-27 / Apply Now) & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
            <Link
              to="/admissions"
              className="hidden sm:inline-flex group items-center gap-1.5 sm:gap-2 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] px-3.5 sm:px-5 py-1.5 sm:py-2.5 text-[11px] sm:text-xs md:text-sm font-bold text-white shadow-sm hover:shadow-md transition-all duration-200 whitespace-nowrap"
            >
              <span>Admissions 2026–27</span>
              <span className="text-xs sm:text-base font-bold transition-transform duration-200 group-hover:translate-x-0.5">
                ›
              </span>
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-gray-200 lg:hidden text-[#0B1B3D] shrink-0"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation Drawer */}
        {menuOpen && (
          <nav className="border-t border-gray-100 bg-white px-5 py-4 lg:hidden max-h-[80vh] overflow-y-auto">
            <div className="space-y-1">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-gray-50 py-1.5">
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `block py-2 text-sm font-bold ${isActive ? "text-[#1D4ED8]" : "text-[#0B1B3D]"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                  {item.children && (
                    <div className="pl-3 pb-2 space-y-1">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.to}
                          to={sub.to}
                          onClick={() => {
                            setMenuOpen(false);
                            if (sub.to.includes("#")) {
                              const [path, hash] = sub.to.split("#");
                              if (location.pathname === path || location.pathname === `${path}/`) {
                                setTimeout(() => {
                                  document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
                                }, 50);
                              }
                            }
                          }}
                          className="block py-1 text-xs text-[#637083] hover:text-[#0B1B3D]"
                        >
                          • {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="pt-4 pb-2">
              <Link
                to="/admissions"
                className="w-full flex items-center justify-center gap-2 rounded-full bg-[#1D4ED8] py-2.5 text-xs font-bold text-white shadow-md"
              >
                Apply Now →
              </Link>
            </div>
          </nav>
        )}
      </header>
      </div>

      <Outlet />
      <Footer />
      <FloatingActions />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  text,
  image,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
}) {
  return (
    <section className="relative min-h-[510px] overflow-hidden text-white">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,15,31,.94),rgba(3,15,31,.46))]" />
      <div className="relative mx-auto flex min-h-[510px] max-w-[1380px] items-end px-5 py-16 lg:px-10">
        <div className="max-w-4xl">
          <p className="eyebrow text-[#38BDF8]">{eyebrow}</p>
          <h1 className="mt-5 font-serif text-[clamp(3.7rem,8vw,7.8rem)] leading-[0.88] tracking-[-0.045em]">
            {title}
          </h1>
          <p className="mt-7 max-w-2xl border-l-2 border-[#38BDF8] pl-5 text-base leading-7 text-white/75">
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
      <div>
        <p className="eyebrow text-[#1D4ED8]">{eyebrow}</p>
        <h2 className="section-title mt-5">{title}</h2>
      </div>
      {children && <div className="max-w-md leading-7 text-[#5a6778]">{children}</div>}
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[#041326] text-white">
      <div className="mx-auto grid max-w-[1380px] gap-12 px-5 py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-white p-1.5 shadow-sm overflow-hidden">
              <img
                src="/baldwin-crest-official.png"
                alt="Baldwin Girls' High School Crest"
                className="h-full w-full object-contain"
              />
            </span>
            <div>
              <p className="font-serif text-2xl">Baldwin Girls’ High School</p>
              <p className="mt-1 text-[10px] tracking-[0.2em] text-white/50 uppercase">
                A unit of Baldwin Methodist Educational Society
              </p>
            </div>
          </div>
          <p className="mt-7 max-w-lg text-sm leading-7 text-white/55">
            Affiliated to the Council for the Indian School Certificate Examinations, New Delhi.
            Building character and developing skills for global challenges since 1880.
          </p>
        </div>
        <div>
          <p className="footer-title">Explore</p>
          <div className="mt-5 flex flex-col items-start gap-3 text-sm text-white/60">
            <Link to="/about">About us</Link>
            <Link to="/academics">Academics</Link>
            <Link to="/admissions">Admissions</Link>
            <Link to="/facilities">Facilities</Link>
            <Link to="/events">Events</Link>
            <Link to="/sports">Sports</Link>
          </div>
        </div>
        <div>
          <p className="footer-title">Get in touch</p>
          <address className="mt-5 space-y-3 text-sm leading-6 text-white/60 not-italic">
            <p>#90, Richmond Road, Bengaluru</p>
            <p>
              <a href="tel:+919148780138">+91 91487 80138</a>
            </p>
            <p>
              <a href="mailto:baldwingirls@gmail.com">baldwingirls@gmail.com</a>
            </p>
            <p>Mon–Fri · 8:15 am–3:00 pm</p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-[10px] tracking-[0.13em] text-white/35 uppercase">
        © 2026 Baldwin Girls’ High School · Loyalty and Service
      </div>
    </footer>
  );
}

export function AcademicCards() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 320;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      if (direction === "right" && scrollLeft >= scrollWidth - clientWidth - 15) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else if (direction === "left" && scrollLeft <= 15) {
        scrollRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({
          left: direction === "left" ? -cardWidth * 1.1 : cardWidth * 1.1,
          behavior: "smooth",
        });
      }
    }
  };

  // Auto-slide interval: slides every 3.5 seconds; pauses when hovered or touched
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 320;
        if (scrollLeft >= scrollWidth - clientWidth - 20) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: cardWidth * 1.08, behavior: "smooth" });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      className="relative group/carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Navigation Controls */}
      <div className="mb-4 flex items-center justify-end gap-2 pr-1">
        <button
          type="button"
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`flex h-10 w-10 items-center justify-center rounded-full border border-[#0B1B3D]/15 bg-white text-[#0B1B3D] transition-all duration-200 shadow-sm ${canScrollLeft
              ? "hover:bg-[#1D4ED8] hover:text-white hover:border-[#1D4ED8] cursor-pointer"
              : "opacity-35 cursor-not-allowed"
            }`}
          aria-label="Previous programme"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`flex h-10 w-10 items-center justify-center rounded-full border border-[#0B1B3D]/15 bg-white text-[#0B1B3D] transition-all duration-200 shadow-sm ${canScrollRight
              ? "hover:bg-[#1D4ED8] hover:text-white hover:border-[#1D4ED8] cursor-pointer"
              : "opacity-35 cursor-not-allowed"
            }`}
          aria-label="Next programme"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Carousel Track */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-7 overflow-x-auto scroll-smooth pb-6 pt-1 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {programmes.map((item, index) => (
          <Link
            to={`/academics/${item.slug}`}
            key={item.slug}
            className="group/card flex-none w-[300px] sm:w-[330px] md:w-[360px] snap-start no-underline"
          >
            {/* Image with overlay number */}
            <div className="relative h-[340px] sm:h-[380px] overflow-hidden rounded-2xl">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover/card:scale-[1.06]"
              />
              {/* Gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#031030]/70 via-transparent to-transparent" />
              {/* Number badge */}
              <span className="absolute top-5 left-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-xs font-bold text-white tracking-wider">
                0{index + 1}
              </span>
              {/* Title overlay at bottom of image */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-[10px] font-bold tracking-[0.2em] text-[#93B5FF] uppercase mb-1.5">
                  {item.years}
                </p>
                <h3 className="font-serif text-[26px] leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                  {item.title}
                </h3>
              </div>
            </div>
            {/* Description below */}
            <div className="mt-5 px-1">
              <p className="text-[13.5px] leading-[1.7] text-[#4a5568]">{item.intro}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase text-[#1D4ED8] group-hover/card:gap-3 transition-all duration-300">
                Explore programme
                <svg className="w-4 h-4 transition-transform duration-300 group-hover/card:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-5.5-5.5M19.5 12l-5.5 5.5" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

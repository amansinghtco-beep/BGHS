import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";

interface FacilityItem {
  id: string;
  name: string;
  type: "INDOOR" | "OUTDOOR";
  badge: string;
  subtitle: string;
  image: string;
  categoryIcon: string;
  features?: string;
}

export default function CampusInfrastructure() {
  const [activeTab, setActiveTab] = useState<"indoor" | "outdoor">("outdoor");

  // INDOOR Facilities (11 requested items):
  // boardingfacility, library, physics lab, dining hall, auditorium, bio lab, junior library, chem lab, robotics lab, comp lab, infirmary
  const indoorFacilities: FacilityItem[] = [
    {
      id: "in-1",
      name: "Boarding Facility",
      type: "INDOOR",
      badge: "INDOOR",
      subtitle: "Secure & Nurturing Residential Quarters",
      image: "/campus-boarding.jpg",
      categoryIcon: "bed",
      features: "24/7 Security · Pastoral Care",
    },
    {
      id: "in-2",
      name: "Senior Library",
      type: "INDOOR",
      badge: "INDOOR",
      subtitle: "Extensive Academic Resource Center & Reading Hall",
      image: "/campus-library.jpg",
      categoryIcon: "book",
      features: "20,000+ Books · Digital Journals",
    },
    {
      id: "in-3",
      name: "Physics Lab",
      type: "INDOOR",
      badge: "INDOOR",
      subtitle: "Optics, Mechanics & Advanced Experiments Studio",
      image: "/campus-sciencelab.jpg",
      categoryIcon: "lab",
      features: "Advanced Kits · Darkroom Optics",
    },
    {
      id: "in-4",
      name: "Hostel Dining Hall",
      type: "INDOOR",
      badge: "INDOOR",
      subtitle: "Hygienic Multi-Cuisine Meal Service Area",
      image: "/campus-dininghall.jpg",
      categoryIcon: "utensils",
      features: "Nutritious Menus · 500 Capacity",
    },
    {
      id: "in-5",
      name: "School Auditorium",
      type: "INDOOR",
      badge: "INDOOR",
      subtitle: "Acoustic Multi-Purpose Theater & Assembly Hall",
      image: "/campus-auditorium.jpg",
      categoryIcon: "stage",
      features: "Dolby Acoustics · 1200+ Seats",
    },
    {
      id: "in-6",
      name: "Biology Lab",
      type: "INDOOR",
      badge: "INDOOR",
      subtitle: "Microscopy & Life Sciences Specimen Studio",
      image: "/campus-sciencelab.jpg",
      categoryIcon: "bio",
      features: "Specimen Bank · Microscopes",
    },
    {
      id: "in-7",
      name: "Junior Library",
      type: "INDOOR",
      badge: "INDOOR",
      subtitle: "Early Reading & Illustrated Storybooks Wing",
      image: "/campus-library.jpg",
      categoryIcon: "book-open",
      features: "Illustrated Tales · Audio Zones",
    },
    {
      id: "in-8",
      name: "Chemistry Lab",
      type: "INDOOR",
      badge: "INDOOR",
      subtitle: "Fume-Protected Chemical Apparatus & Analysis Station",
      image: "/campus-sciencelab.jpg",
      categoryIcon: "flask",
      features: "Fume Hoods · Glassware Stations",
    },
    {
      id: "in-9",
      name: "Robotics & AI Lab",
      type: "INDOOR",
      badge: "INDOOR",
      subtitle: "STEM Automation, Coding & IoT Workspace",
      image: "/bghs-events.png",
      categoryIcon: "cpu",
      features: "Microcontrollers · 3D Design",
    },
    {
      id: "in-10",
      name: "Computer Lab",
      type: "INDOOR",
      badge: "INDOOR",
      subtitle: "High-Speed Computing & Digital Literacy Hub",
      image: "/campus-sciencelab.jpg",
      categoryIcon: "monitor",
      features: "Gigabit LAN · Class Sets",
    },
    {
      id: "in-11",
      name: "School Infirmary",
      type: "INDOOR",
      badge: "INDOOR",
      subtitle: "Full-Time Medical Care & First Aid Sanctuary",
      image: "/campus-infirmary.jpg",
      categoryIcon: "medical",
      features: "Resident Nurse · Emergency Bay",
    },
  ];

  // OUTDOOR Facilities (5 requested items):
  // basketball court, cycle parking, swimming pool, school transport, playground
  const outdoorFacilities: FacilityItem[] = [
    {
      id: "out-1",
      name: "Swimming Pool",
      type: "OUTDOOR",
      badge: "OUTDOOR",
      subtitle: "Olympic-Dimension Aquatics Center",
      image: "/bghs-swimming.png",
      categoryIcon: "water",
      features: "Certified Lifeguards · 25m Lanes",
    },
    {
      id: "out-2",
      name: "School Transport",
      type: "OUTDOOR",
      badge: "OUTDOOR",
      subtitle: "Comprehensive GPS-Monitored Bus Fleet",
      image: "/campus-parking.jpg",
      categoryIcon: "bus",
      features: "GPS Live Tracking · Attendant Care",
    },
    {
      id: "out-3",
      name: "Playground & Athletics",
      type: "OUTDOOR",
      badge: "OUTDOOR",
      subtitle: "Expansive Lush Athletics & Sports Grounds",
      image: "/campus-playground.jpg",
      categoryIcon: "flag",
      features: "Running Tracks · Multi-Sport Turf",
    },
    {
      id: "out-4",
      name: "Basketball Court",
      type: "OUTDOOR",
      badge: "OUTDOOR",
      subtitle: "FIBA-Spec Hardcourt with Floodlit Arenas",
      image: "/bghs-sports-hero.png",
      categoryIcon: "basketball",
      features: "Floodlit Play · Acrylic Cushion",
    },
    {
      id: "out-5",
      name: "Cycle Parking & Campus",
      type: "OUTDOOR",
      badge: "OUTDOOR",
      subtitle: "Organized Eco-Commute Bays & Walkways",
      image: "/campus-garden.jpg",
      categoryIcon: "cycle",
      features: "Secured Racks · Green Shaded Way",
    },
  ];

  const currentList = activeTab === "indoor" ? indoorFacilities : outdoorFacilities;

  // Carousel ref & scroll controls
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  // Check scroll position to dynamically show/hide Left/Right arrows
  const checkScrollPosition = useCallback(() => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setIsAtStart(scrollLeft < 15);
      setIsAtEnd(scrollWidth - scrollLeft - clientWidth < 15);
    }
  }, []);

  useEffect(() => {
    const currentCarousel = carouselRef.current;
    if (currentCarousel) {
      currentCarousel.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();
    }
    return () => {
      if (currentCarousel) {
        currentCarousel.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, [checkScrollPosition, currentList]);

  // Reset scroll to start when switching tabs
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [activeTab]);

  // Scroll function with smooth easing
  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.75;
      const newScrollLeft =
        carouselRef.current.scrollLeft + (direction === "right" ? scrollAmount : -scrollAmount);
      carouselRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#781428] text-white py-16 sm:py-20 border-t border-white/10">
      {/* Background Architectural & School Illustration Doodles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-20">
        {/* Floating Protractor / Compass SVG */}
        <svg
          className="absolute top-10 left-12 w-28 h-28 stroke-white/60 fill-none stroke-[1.5]"
          viewBox="0 0 100 100"
        >
          <path d="M 10 70 A 40 40 0 0 1 90 70 Z" />
          <line x1="50" y1="70" x2="50" y2="60" />
          <line x1="30" y1="70" x2="33" y2="63" />
          <line x1="70" y1="70" x2="67" y2="63" />
          <line x1="10" y1="70" x2="90" y2="70" />
        </svg>

        {/* Floating Ruler / Notepad Doodle */}
        <svg
          className="absolute top-12 left-1/4 w-16 h-20 stroke-white/50 fill-none stroke-[1.5]"
          viewBox="0 0 60 80"
        >
          <rect x="5" y="5" width="50" height="70" rx="4" />
          <line x1="15" y1="20" x2="45" y2="20" />
          <line x1="15" y1="35" x2="45" y2="35" />
          <line x1="15" y1="50" x2="35" y2="50" />
        </svg>

        {/* Whistle / Stopwatch Doodle */}
        <svg
          className="absolute bottom-16 left-16 w-24 h-24 stroke-white/50 fill-none stroke-[1.5]"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="55" r="30" />
          <line x1="50" y1="25" x2="50" y2="15" />
          <rect x="42" y="10" width="16" height="5" rx="1" />
          <line x1="50" y1="55" x2="65" y2="45" />
        </svg>

        {/* Science Flask Doodle */}
        <svg
          className="absolute top-16 right-20 w-24 h-28 stroke-white/50 fill-none stroke-[1.5]"
          viewBox="0 0 80 100"
        >
          <path d="M 32 10 L 48 10 L 48 35 L 68 80 A 10 10 0 0 1 58 92 L 22 92 A 10 10 0 0 1 12 80 L 32 35 Z" />
          <line x1="24" y1="70" x2="56" y2="70" />
        </svg>

        {/* Basketball Net / Hoop Doodle */}
        <svg
          className="absolute bottom-12 right-28 w-28 h-28 stroke-white/40 fill-none stroke-[1.5]"
          viewBox="0 0 100 100"
        >
          <rect x="20" y="20" width="60" height="40" rx="3" />
          <rect x="35" y="35" width="30" height="25" />
          <ellipse cx="50" cy="65" rx="15" ry="5" />
          <path d="M 35 65 L 42 85 L 58 85 L 65 65" />
        </svg>

        {/* Ambient Gradient Blobs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1550px] px-4 sm:px-6 lg:px-10">
        {/* Main Grid: Left Feature Box (with INDOOR/OUTDOOR Toggle Shifted to Left) + Right Horizontal Carousel */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
          {/* ============ LEFT PANEL: Editorial Info + Shifted Toggle ============ */}
          <div className="flex flex-col justify-between rounded-3xl bg-[#520C1A]/90 border border-white/15 p-6 sm:p-8 backdrop-blur-md shadow-2xl lg:col-span-4 xl:col-span-3.5">
            <div>
              {/* Top Spark Indicator */}
              <div className="flex items-center gap-1.5 mb-3">
                <span className="w-1.5 h-3.5 bg-[#F3C44E] rounded-full rotate-[-20deg]" />
                <span className="w-1.5 h-4.5 bg-[#F3C44E] rounded-full" />
                <span className="w-1.5 h-3.5 bg-[#F3C44E] rounded-full rotate-[20deg]" />
                <span className="ml-2 text-[10px] font-bold uppercase tracking-[0.24em] text-amber-300">
                  Campus Facilities
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-[40px] leading-[1.08] tracking-tight text-white">
                Campus
                <br />
                Infrastructure
              </h2>

              <p className="mt-3 text-sm text-white/80 leading-relaxed">
                Baldwin's infrastructure is designed to inspire learning, encourage exploration and
                create opportunities to thrive. Our world-class indoor and outdoor spaces are a hub
                where potential takes shape.
              </p>

              {/* INDOOR / OUTDOOR Toggle Shifted to Left Part of Carousel */}
              <div className="mt-6">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-300/80 mb-2 font-bold">
                  Select Space Category:
                </p>
                <div className="inline-flex w-full rounded-2xl bg-[#3D0813] p-1.5 border border-white/10 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setActiveTab("indoor")}
                    className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all duration-300 cursor-pointer ${
                      activeTab === "indoor"
                        ? "bg-[#F3C44E] text-[#520C1A] shadow-md font-extrabold"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
                    </svg>
                    <span>Indoor ({indoorFacilities.length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("outdoor")}
                    className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all duration-300 cursor-pointer ${
                      activeTab === "outdoor"
                        ? "bg-[#F3C44E] text-[#520C1A] shadow-md font-extrabold"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg>
                    <span>Outdoor ({outdoorFacilities.length})</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Left Panel Footer: Count & Navigation Arrows */}
            <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-amber-300">
                  Showing {currentList.length} {activeTab === "indoor" ? "Indoor" : "Outdoor"} Spaces
                </p>
                <p className="text-[10px] text-white/60">Baldwin Girls' High School</p>
              </div>

              {/* Slider Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scroll("left")}
                  disabled={isAtStart}
                  aria-label="Scroll left"
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 transition-all ${
                    isAtStart
                      ? "opacity-30 cursor-not-allowed text-white/40 bg-white/5"
                      : "bg-white/10 hover:bg-[#F3C44E] hover:text-[#520C1A] text-white active:scale-95 cursor-pointer shadow-md"
                  }`}
                >
                  <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => scroll("right")}
                  disabled={isAtEnd}
                  aria-label="Scroll right"
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 transition-all ${
                    isAtEnd
                      ? "opacity-30 cursor-not-allowed text-white/40 bg-white/5"
                      : "bg-white/10 hover:bg-[#F3C44E] hover:text-[#520C1A] text-white active:scale-95 cursor-pointer shadow-md"
                  }`}
                >
                  <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* ============ RIGHT PANEL: Motion Carousel Track ============ */}
          <div className="relative lg:col-span-8 xl:col-span-8.5 flex items-center">
            {/* Scrollable Track Container */}
            <div
              ref={carouselRef}
              className="w-full overflow-x-auto scroll-smooth py-3 px-1 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none]"
              style={{
                scrollbarWidth: "none",
              }}
            >
              <div className="flex gap-4.5 sm:gap-5 w-max">
                {currentList.map((item) => (
                  <motion.div
                    key={item.id}
                    className="group w-[270px] sm:w-[290px] flex-shrink-0 cursor-pointer"
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  >
                    <div className="relative flex flex-col rounded-2xl overflow-hidden bg-[#570B1B] border border-white/15 shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:border-amber-300/40">
                      {/* Photo Container */}
                      <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/40">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Contrast Gradient Scrim */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />

                        {/* Top Left Tag: Pill Badge */}
                        <div className="absolute top-3.5 left-3.5">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#FCD34D] border border-white/10 shadow-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                            {item.badge}
                          </span>
                        </div>

                        {/* Top Right Mini Utility Icon */}
                        <div className="absolute top-3.5 right-3.5 flex h-7 w-7 items-center justify-center rounded-lg bg-black/50 backdrop-blur-md text-white/80 border border-white/10">
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                          </svg>
                        </div>

                        {/* Bottom Overlay Info with Outstanding Typographic Hierarchy */}
                        <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-10">
                          <div className="pr-1">
                            <span className="inline-block text-[10px] font-mono font-bold tracking-[0.2em] text-[#F3C44E] uppercase mb-1 drop-shadow">
                              Baldwin Campus
                            </span>
                            <h3 className="font-sans font-black text-lg text-white tracking-normal leading-snug drop-shadow group-hover:text-amber-200 transition-colors">
                              {item.name}
                            </h3>
                            <p className="text-xs text-white/75 line-clamp-2 mt-1 leading-relaxed">
                              {item.subtitle}
                            </p>
                            {item.features && (
                              <p className="text-[10px] text-amber-300/80 font-mono mt-2 font-medium">
                                ◆ {item.features}
                              </p>
                            )}
                          </div>

                          {/* Interactive Circular Arrow Icon */}
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 group-hover:bg-[#F3C44E] group-hover:text-[#520C1A] group-hover:border-transparent transition-all duration-300 shadow-lg group-hover:scale-105">
                            <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating Left Arrow on track edge */}
            {!isAtStart && (
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 hover:bg-[#F3C44E] hover:text-[#520C1A] text-white border border-white/30 backdrop-blur-md shadow-2xl z-20 transition-all cursor-pointer hidden md:flex"
              >
                <svg className="w-5 h-5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Floating Right Arrow on track edge */}
            {!isAtEnd && (
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 hover:bg-[#F3C44E] hover:text-[#520C1A] text-white border border-white/30 backdrop-blur-md shadow-2xl z-20 transition-all cursor-pointer hidden md:flex"
              >
                <svg className="w-5 h-5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

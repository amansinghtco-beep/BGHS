"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

// --- BGHS Sections Data ---
const sections = [
  {
    id: 1,
    label: "Primary School Programme",
    href: "/academics",
    image:
      "https://images.unsplash.com/photo-1544717305-996b815c338c?w=200&h=200&fit=crop&crop=faces",
  },
  {
    id: 2,
    label: "Junior School Programme",
    href: "/academics",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=200&fit=crop&crop=faces",
  },
  {
    id: 3,
    label: "Middle School Programme",
    href: "/academics",
    image:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=200&h=200&fit=crop&crop=faces",
  },
  {
    id: 4,
    label: "Senior School Programme",
    href: "/academics",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=200&fit=crop&crop=faces",
  },
  {
    id: 5,
    label: "Special Education Programme",
    href: "/academics",
    image:
      "https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?w=200&h=200&fit=crop&crop=faces",
  },
  {
    id: 6,
    label: "Performing & Visual Arts",
    href: "/campus-life",
    image:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=200&h=200&fit=crop&crop=faces",
  },
  {
    id: 7,
    label: "Physical Education",
    href: "/campus-life",
    image:
      "https://images.unsplash.com/photo-1546961342-ea5f62d848e3?w=200&h=200&fit=crop&crop=faces",
  },
  {
    id: 8,
    label: "Science & Technology",
    href: "/academics",
    image:
      "https://images.unsplash.com/photo-1532094349884-543559244689?w=200&h=200&fit=crop&crop=faces",
  },
];

// --- Responsive hook ---
function useContainerRadius() {
  const [radius, setRadius] = React.useState(220);

  React.useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) setRadius(140);
      else if (w < 640) setRadius(160);
      else if (w < 768) setRadius(180);
      else if (w < 1024) setRadius(200);
      else setRadius(230);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return radius;
}

// --- Orbit Item ---
interface OrbitItemProps {
  section: (typeof sections)[0];
  rotation: number;
  radius: number;
  profileSize: number;
  isActive: boolean;
  onClick: () => void;
}

function OrbitItem({
  section,
  rotation,
  radius,
  profileSize,
  isActive,
  onClick,
}: OrbitItemProps) {
  return (
    <motion.div
      animate={{
        transform: `rotate(${rotation}deg) translateY(-${radius}px)`,
      }}
      transition={{ type: "spring", stiffness: 140, damping: 22 }}
      style={{
        width: profileSize,
        height: profileSize,
        position: "absolute",
        top: `calc(50% - ${profileSize / 2}px)`,
        left: `calc(50% - ${profileSize / 2}px)`,
        zIndex: isActive ? 20 : 10,
      }}
    >
      {/* Counter-rotation keeps image upright */}
      <motion.div
        animate={{ rotate: -rotation }}
        transition={{ type: "spring", stiffness: 140, damping: 22 }}
        className="w-full h-full flex flex-col items-center"
      >
        <Link
          to={section.href}
          onClick={onClick}
          className="group flex flex-col items-center gap-1.5 no-underline"
        >
          <motion.div
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            className={`rounded-full overflow-hidden shadow-md transition-all duration-300 ${
              isActive
                ? "ring-4 ring-[#1D4ED8] ring-offset-2 shadow-lg shadow-[#1D4ED8]/30"
                : "ring-2 ring-[#284595]/30 hover:ring-[#1D4ED8]/60 hover:shadow-lg"
            }`}
            style={{ width: profileSize, height: profileSize }}
          >
            <img
              src={section.image}
              alt={section.label}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=200&h=200&fit=crop";
              }}
            />
          </motion.div>
          {/* Label below circle */}
          <span
            className={`text-center leading-tight font-medium transition-colors duration-200 ${
              isActive ? "text-[#1D4ED8]" : "text-[#1a2f5a] group-hover:text-[#1D4ED8]"
            }`}
            style={{ fontSize: "clamp(8px, 1vw, 12px)", maxWidth: profileSize + 16, lineHeight: 1.2 }}
          >
            {section.label}
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
}

// --- Main: Explore BGHS ---
export default function ExploreBGHS() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isHovering, setIsHovering] = React.useState(false);
  const radius = useContainerRadius();

  const profileSize = radius < 160 ? 65 : radius < 180 ? 75 : radius < 210 ? 95 : 128;
  // Radius + full profileSize + label height + safe clearance so labels are never cut off
  const containerSize = (radius + profileSize + 48) * 2;

  const getRotation = React.useCallback(
    (i: number) => (i - activeIndex) * (360 / sections.length),
    [activeIndex]
  );

  const next = () => setActiveIndex((i) => (i + 1) % sections.length);
  const prev = () => setActiveIndex((i) => (i - 1 + sections.length) % sections.length);

  // Keyboard navigation
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Auto-rotation (pauses on hover)
  React.useEffect(() => {
    if (isHovering) return;
    const id = setInterval(next, 1800);
    return () => clearInterval(id);
  }, [isHovering]);

  return (
    <section className="bg-white py-4 sm:py-6 overflow-hidden">
      <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
        {/* Orbit container */}
        <div
          className="relative mx-auto flex items-center justify-center select-none"
          style={{ width: containerSize, height: containerSize, maxWidth: "100%" }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Soft blue radial glow behind center */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: radius * 1.35,
              height: radius * 1.35,
              background:
                "radial-gradient(circle, rgba(29,78,216,0.30) 0%, rgba(29,78,216,0.18) 45%, rgba(29,78,216,0.06) 70%, transparent 85%)",
            }}
          />

          {/* Dashed orbit ring */}
          <div
            className="absolute rounded-full border border-dashed border-[#1D4ED8]/15 pointer-events-none"
            style={{ width: radius * 2, height: radius * 2 }}
          />

          {/* Center "Explore BGHS" text */}
          <div className="relative z-10 text-center px-4 pointer-events-none">
            <p
              className="font-serif italic text-[#1D4ED8] leading-none mb-1"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)" }}
            >
              Explore
            </p>
            <p
              className="font-serif font-black text-[#0A326F] tracking-wide leading-none"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)" }}
            >
              BGHS
            </p>
          </div>

          {/* Orbiting circles */}
          {sections.map((section, i) => (
            <OrbitItem
              key={section.id}
              section={section}
              rotation={getRotation(i)}
              radius={radius}
              profileSize={profileSize}
              isActive={i === activeIndex}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


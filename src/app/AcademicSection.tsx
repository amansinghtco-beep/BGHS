import React from "react";
import { motion } from "framer-motion";

export interface AcademicSectionProps {
  id: string;
  title: string;
  expandedSection: string;
  setExpandedSection: (id: string) => void;
  children: React.ReactNode;
}

export function AcademicSection({
  id,
  title,
  expandedSection,
  setExpandedSection,
  children,
}: AcademicSectionProps) {
  const isOpen = expandedSection === id;

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="scroll-mt-28 rounded-3xl bg-white border border-slate-200 shadow-md overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setExpandedSection(isOpen ? "" : id)}
        className="w-full text-left px-6 sm:px-8 py-5 flex items-center justify-between gap-4 hover:bg-blue-50 transition-colors"
      >
        <span className="font-serif font-black text-xl text-[#0A2540]">{title}</span>
        <span
          className={`text-blue-600 font-bold text-xl transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ↓
        </span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-6 sm:px-8 pb-8 pt-2">{children}</div>
      </motion.div>
    </motion.section>
  );
}

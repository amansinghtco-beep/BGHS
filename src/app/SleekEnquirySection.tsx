"use client";

import { useState } from "react";
import { Arrow } from "./components";

export default function SleekEnquirySection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    parentName: "",
    phone: "",
    email: "",
    grade: "Kindergarten / Pre-Primary",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f8fafc] to-[#f1f5f9] py-20 lg:py-28">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#1D4ED8]/10 via-[#38BDF8]/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 bg-[#1D4ED8]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative mx-auto max-w-[1380px] px-5 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Context & Editorial */}
          <div className="lg:col-span-5 pt-2">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] uppercase text-[#1D4ED8]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1D4ED8]" />
              Admissions 2026–2027
            </span>

            <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-[52px] leading-[1.08] text-[#0A2540]">
              Begin your daughter’s journey of{" "}
              <span className="italic text-[#1D4ED8]">excellence.</span>
            </h2>

            <p className="mt-6 text-base leading-relaxed text-[#506690]">
              Take the first step towards a nurturing, value-based education. Schedule a
              personalized campus tour, meet our academic counseling team, or request detailed
              curriculum brochures.
            </p>

            {/* Quick trust metrics */}
            <div className="mt-10 space-y-5 border-t border-[#0A2540]/10 pt-8">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1D4ED8]/10 text-[#1D4ED8]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <div>
                  <h4 className="text-sm font-bold text-[#0A2540]">Quick Response</h4>
                  <p className="text-xs text-[#627d98] mt-0.5">Our admissions team responds within 24 business hours.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1D4ED8]/10 text-[#1D4ED8]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <div>
                  <h4 className="text-sm font-bold text-[#0A2540]">Campus Walkthrough</h4>
                  <p className="text-xs text-[#627d98] mt-0.5">Explore our historic Richmond Town campus in person.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sleek Floating Underline Form */}
          <div className="lg:col-span-7">
            <div className="relative">
              {submitted ? (
                <div className="py-16 text-center animate-in fade-in duration-500">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-[#1D4ED8] ring-8 ring-blue-50/50">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="mt-6 font-serif text-3xl text-[#0A2540]">Inquiry Received</h3>
                  <p className="mt-2 text-sm text-[#506690] max-w-md mx-auto">
                    Thank you for reaching out, {formData.parentName || "Parent"}. A member of our admissions committee will contact you shortly via email and phone.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ parentName: "", phone: "", email: "", grade: "Kindergarten / Pre-Primary", message: "" });
                    }}
                    className="mt-6 text-xs font-bold tracking-widest text-[#1D4ED8] uppercase hover:underline"
                  >
                    Submit another response
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Row 1: Name and Phone */}
                  <div className="grid gap-8 sm:grid-cols-2">
                    <div className="relative group">
                      <input
                        type="text"
                        required
                        id="parentName"
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        placeholder=" "
                        className="peer w-full border-b border-gray-300 bg-transparent py-3 text-base text-[#0A2540] placeholder-transparent focus:border-[#1D4ED8] focus:outline-none transition-colors"
                      />
                      <label
                        htmlFor="parentName"
                        className="absolute left-0 top-3 text-sm text-[#627d98] transition-all duration-200 pointer-events-none peer-focus:-top-4 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-[#1D4ED8] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#627d98]"
                      >
                        Parent / Guardian Name *
                      </label>
                    </div>

                    <div className="relative group">
                      <input
                        type="tel"
                        required
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder=" "
                        className="peer w-full border-b border-gray-300 bg-transparent py-3 text-base text-[#0A2540] placeholder-transparent focus:border-[#1D4ED8] focus:outline-none transition-colors"
                      />
                      <label
                        htmlFor="phone"
                        className="absolute left-0 top-3 text-sm text-[#627d98] transition-all duration-200 pointer-events-none peer-focus:-top-4 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-[#1D4ED8] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#627d98]"
                      >
                        Contact Number *
                      </label>
                    </div>
                  </div>

                  {/* Row 2: Email and Grade */}
                  <div className="grid gap-8 sm:grid-cols-2">
                    <div className="relative group">
                      <input
                        type="email"
                        required
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder=" "
                        className="peer w-full border-b border-gray-300 bg-transparent py-3 text-base text-[#0A2540] placeholder-transparent focus:border-[#1D4ED8] focus:outline-none transition-colors"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-0 top-3 text-sm text-[#627d98] transition-all duration-200 pointer-events-none peer-focus:-top-4 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-[#1D4ED8] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#627d98]"
                      >
                        Email Address *
                      </label>
                    </div>

                    <div className="relative group">
                      <label htmlFor="grade" className="block text-xs font-semibold uppercase tracking-wider text-[#627d98] mb-1">
                        Grade Applying For *
                      </label>
                      <select
                        id="grade"
                        value={formData.grade}
                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                        className="w-full border-b border-gray-300 bg-transparent py-2.5 text-base text-[#0A2540] focus:border-[#1D4ED8] focus:outline-none transition-colors cursor-pointer"
                      >
                        <option value="Pre-KG / Nursery">Pre-KG / Nursery</option>
                        <option value="Kindergarten / Pre-Primary">Kindergarten / Pre-Primary (LKG - UKG)</option>
                        <option value="Primary School">Primary School (Grades 1 – 5)</option>
                        <option value="Middle School">Middle School (Grades 6 – 8)</option>
                        <option value="High School">High School (Grades 9 – 10 ICSE)</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Message / Specific Query */}
                  <div className="relative group pt-2">
                    <textarea
                      rows={2}
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder=" "
                      className="peer w-full resize-none border-b border-gray-300 bg-transparent py-2 text-base text-[#0A2540] placeholder-transparent focus:border-[#1D4ED8] focus:outline-none transition-colors"
                    />
                    <label
                      htmlFor="message"
                      className="absolute left-0 top-2 text-sm text-[#627d98] transition-all duration-200 pointer-events-none peer-focus:-top-4 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-[#1D4ED8] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#627d98]"
                    >
                      Questions or Campus Visit Preferences (Optional)
                    </label>
                  </div>

                  {/* Footer & Submit Action */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-4">
                    <p className="text-xs text-[#718096] max-w-sm">
                      By submitting, you agree to receive communications regarding admissions and updates from BGHS.
                    </p>

                    <button
                      type="submit"
                      className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#1D4ED8] hover:bg-[#153eb8] px-8 py-3.5 text-xs font-bold tracking-[0.14em] uppercase text-white shadow-lg shadow-[#1D4ED8]/25 hover:shadow-[#1D4ED8]/40 transition-all duration-300 shrink-0"
                    >
                      <span>Submit Inquiry</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        <Arrow />
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


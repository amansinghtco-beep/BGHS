import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import CaptchaVerification from "./CaptchaVerification";

export default function AdmissionEnquiryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Form State
  const [formData, setFormData] = useState({
    parentName: "",
    phone: "",
    email: "",
    grade: "Kindergarten (LKG & UKG)",
    message: "",
  });

  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refId, setRefId] = useState("");

  // Trigger popup reliably after 2 seconds on website visit or page navigation
  useEffect(() => {
    // Clear any previous persistent session block so popup is guaranteed to appear
    try {
      sessionStorage.removeItem("bghs_enquiry_modal_dismissed");
    } catch {
      // Ignore storage errors in restricted contexts
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleReopen = () => {
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaVerified) {
      alert("Please confirm the captcha verification before submitting.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setRefId(`BGHS-ADM-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 700);
  };

  const handleReset = () => {
    setFormData({
      parentName: "",
      phone: "",
      email: "",
      grade: "Kindergarten (LKG & UKG)",
      message: "",
    });
    setCaptchaVerified(false);
    setIsSubmitted(false);
    setRefId("");
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Reopen Pill: visible whenever modal is closed, so visitors can access anytime */}
      {!isOpen && !isSubmitted && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleReopen}
          className="fixed bottom-6 left-6 z-[9990] inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#781428] text-white text-xs font-bold shadow-2xl shadow-[#781428]/40 hover:bg-[#8F1A32] border border-white/20 transition-all hover:scale-105 cursor-pointer"
        >
          <img
            src="/baldwin-crest-official.png"
            alt="BGHS Official Crest"
            className="w-6 h-6 object-contain"
          />
          <span>Admissions Open 2026–27</span>
        </motion.button>
      )}

      {/* Main Modal Backdrop & Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={handleClose}
              className="fixed inset-0 bg-[#071326]/75 backdrop-blur-md cursor-pointer"
            />

            {/* Non-Boxy Floating Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[500px] my-auto bg-white rounded-[32px] sm:rounded-[40px] shadow-[0_25px_70px_-15px_rgba(10,22,40,0.5)] border border-white/80 overflow-hidden z-10"
            >
              {/* Top Curved Decorative Header */}
              <div className="relative bg-gradient-to-br from-[#071738] via-[#0D244D] to-[#781428] text-white pt-7 pb-6 px-6 sm:px-8 text-center rounded-t-[32px] sm:rounded-t-[40px] overflow-hidden">
                {/* Glow rings */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#F3C44E]/20 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#781428]/35 rounded-full blur-2xl pointer-events-none" />

                {/* Close Button (X) */}
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close modal"
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white/80 hover:text-white flex items-center justify-center backdrop-blur-md border border-white/15 transition-all duration-200 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                {/* School Official Crest with Golden Halo Ring */}
                <div className="relative z-10 mb-3">
                  <div className="w-20 h-20 rounded-full bg-white p-2 border-2 border-[#F3C44E] shadow-2xl mx-auto flex items-center justify-center ring-4 ring-white/20">
                    <img
                      src="/baldwin-crest-official.png"
                      alt="Baldwin Girls' High School Official Crest"
                      className="w-full h-full object-contain filter drop-shadow-sm"
                    />
                  </div>
                </div>

                {/* Eyebrow Pill */}
                <div className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-bold text-[#F3C44E] uppercase tracking-wider mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F3C44E] animate-pulse" />
                  <span>BALDWIN GIRLS' HIGH SCHOOL &bull; ESTD. 1880</span>
                </div>

                {/* Header Title & Subtitle */}
                <h3 className="relative z-10 text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  Admissions Open 2026–27
                </h3>
                <p className="relative z-10 text-xs sm:text-sm text-slate-200/90 mt-1 max-w-xs mx-auto font-light">
                  Pre-KG to Grade X (ICSE) &bull; Bengaluru
                </p>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 bg-white">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    /* Submission Confirmation View */
                    <motion.div
                      key="submitted"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-inner">
                        <svg className="w-8 h-8 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>

                      <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#0A1628] mb-1.5">
                        Inquiry Received!
                      </h4>
                      <p className="text-slate-600 text-xs sm:text-sm max-w-xs mx-auto mb-5 leading-relaxed">
                        Thank you, <span className="font-semibold text-[#0A1628]">{formData.parentName || "Parent"}</span>. Our admissions counselors will contact you shortly.
                      </p>

                      <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-3.5 text-xs text-left max-w-xs mx-auto space-y-1.5 mb-6">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Reference:</span>
                          <span className="font-mono font-bold text-[#0A1628]">{refId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Grade:</span>
                          <span className="font-semibold text-slate-800">{formData.grade}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Contact:</span>
                          <span className="font-semibold text-slate-800">{formData.phone}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#0A1628] text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
                      >
                        Close Window
                      </button>
                    </motion.div>
                  ) : (
                    /* The Actual Form */
                    <form key="form" onSubmit={handleSubmit} className="space-y-3.5">
                      {/* Parent Name */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                          Parent / Guardian Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.parentName}
                          onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                          placeholder="e.g. Priya Sharma"
                          className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/70 focus:bg-white text-xs sm:text-sm text-[#0A1628] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#781428]/25 focus:border-[#781428] transition-all"
                        />
                      </div>

                      {/* Phone & Email (2 Cols) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                            Contact Number <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="e.g. 9845012345"
                            className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/70 focus:bg-white text-xs sm:text-sm text-[#0A1628] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#781428]/25 focus:border-[#781428] transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                            Email Address <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="name@example.com"
                            className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/70 focus:bg-white text-xs sm:text-sm text-[#0A1628] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#781428]/25 focus:border-[#781428] transition-all"
                          />
                        </div>
                      </div>

                      {/* Grade of Interest */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                          Grade Applying For <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={formData.grade}
                          onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/70 focus:bg-white text-xs sm:text-sm text-[#0A1628] focus:outline-none focus:ring-2 focus:ring-[#781428]/25 focus:border-[#781428] transition-all cursor-pointer"
                        >
                          <option value="Pre-KG / Nursery">Pre-KG / Nursery</option>
                          <option value="Kindergarten (LKG & UKG)">Kindergarten (LKG &amp; UKG)</option>
                          <option value="Primary School (Grades 1 – 5)">Primary School (Grades 1 &ndash; 5)</option>
                          <option value="Middle School (Grades 6 – 8)">Middle School (Grades 6 &ndash; 8)</option>
                          <option value="High School (Grades 9 – 10 ICSE)">High School (Grades 9 &ndash; 10 ICSE)</option>
                        </select>
                      </div>

                      {/* Captcha Verification */}
                      <div className="pt-1">
                        <CaptchaVerification
                          verified={captchaVerified}
                          onVerify={() => setCaptchaVerified(true)}
                          dark={false}
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#781428] via-[#8F1A32] to-[#781428] hover:from-[#600F20] hover:to-[#781428] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg shadow-[#781428]/30 hover:shadow-[#781428]/45 active:scale-[0.99] transition-all disabled:opacity-75 cursor-pointer"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit Admissions Enquiry</span>
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                              </svg>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Phone Assistance Chip */}
                      <div className="pt-2 text-center text-[11px] text-slate-500">
                        <span>Prefer direct phone inquiry? </span>
                        <a href="tel:+919148780138" className="font-bold text-[#781428] hover:underline">
                          +91 91487 80138
                        </a>
                      </div>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

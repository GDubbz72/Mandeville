import React, { useState, useEffect, useRef } from "react";
import { supabase } from "./lib/supabase";
import {
  ArrowUpRight,
  Shield,
  Cpu,
  Network,
  Zap,
  ChevronDown,
  Check,
  Mail,
  TrendingUp,
  Globe,
  Lock,
  FileText,
  Calendar,
  Building2,
  Users,
  Plus,
  Minus,
  ArrowRight,
} from "lucide-react";

export default function MandevilleLanding() {
  const [scrollY, setScrollY] = useState(0);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [activeSection, setActiveSection] = useState("overview");
  const [investorType, setInvestorType] = useState("institutional");
  const [showStickyForm, setShowStickyForm] = useState(false);
  const [interests, setInterests] = useState({
    quarterly: true,
    transaction: true,
    research: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", firm: "", message: "" });
  const [contactSuccess, setContactSuccess] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      setShowStickyForm(window.scrollY > 800);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubscribe = async (e) => {
    e?.preventDefault();
    if (email && email.includes("@")) {
      setIsSubmitting(true);

      const { error } = await supabase.from("subscribers").insert({
        email,
        first_name: firstName || null,
        last_name: lastName || null,
        investor_type: investorType,
        interests,
      });

      setIsSubmitting(false);

      if (error) {
        console.error("Subscription failed:", error);
        return;
      }

      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail("");
      setFirstName("");
      setLastName("");
    }
  };

  const handleContactSubmit = async (e) => {
    e?.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      setIsSubmitting(true);

      const { error } = await supabase.from("inquiries").insert({
        name: contactForm.name,
        email: contactForm.email,
        firm: contactForm.firm || null,
        message: contactForm.message,
      });

      setIsSubmitting(false);

      if (error) {
        console.error("Inquiry failed:", error);
        return;
      }

      setContactSuccess(true);
      setTimeout(() => {
        setContactSuccess(false);
        setContactModalOpen(false);
        setContactForm({ name: "", email: "", firm: "", message: "" });
      }, 3000);
    }
  };

  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "transaction", label: "Transaction" },
    { id: "thesis", label: "Thesis" },
    { id: "leadership", label: "Leadership" },
    { id: "subscribe", label: "Updates" },
  ];

  const proofPoints = [
    { label: "Palo Alto Networks", type: "Enterprise" },
    { label: "STMicroelectronics", type: "Semiconductor" },
    { label: "Renesas Electronics", type: "Semiconductor" },
    { label: "NATO DIANA", type: "Defense" },
  ];

  const thesisPoints = [
    {
      icon: Shield,
      tag: "01",
      title: "Post-Quantum Transition",
      body: "Global institutions are preparing for cryptographic standards that withstand quantum computing — a structural shift in cybersecurity infrastructure.",
    },
    {
      icon: Cpu,
      tag: "02",
      title: "Software-First Architecture",
      body: "Quantum-secure encryption deployed via software updates — no hardware replacement, no chip swaps, no operational downtime.",
    },
    {
      icon: Network,
      tag: "03",
      title: "Platform-Based Approach",
      body: "QiSpace™ addresses authentication, encryption, and entropy in a single integrated stack — applicable across enterprise, IoT, and infrastructure.",
    },
    {
      icon: Zap,
      tag: "04",
      title: "Commercial Traction",
      body: "Active integrations with Palo Alto Networks, STMicroelectronics, Renesas, and NATO-affiliated defense initiatives.",
    },
  ];

  const leadership = [
    {
      name: "Dean Hanisch",
      role: "Chief Executive Officer & Director",
      bio: "Founder of Mandeville's CPC platform. Currently CEO of Focus Graphite Inc. and Stria Lithium Inc. Track record in capital structuring and public market transitions.",
      tag: "Founder",
    },
    {
      name: "John Kutkevicious",
      role: "Director",
      bio: "Tax lawyer specializing in income tax and estate planning. Member of the Canadian Tax Foundation. Former Chairman of Nevada Silver Corporation.",
      tag: "Legal & Tax",
    },
    {
      name: "Robin Dow",
      role: "Director",
      bio: "40+ years in venture capital. Raised ~$200M across 30+ companies. Founder of Ur-Energy Inc. (taken public 2005). Currently CEO of Nevada Organic Phosphate.",
      tag: "Capital Markets",
    },
    {
      name: "Rick Kumar",
      role: "Director",
      bio: "Founder, President & CEO of MultiCraft. Two decades building international distribution operations across Canada, US, and global markets.",
      tag: "Operations",
    },
  ];

  const faqs = [
    {
      q: "What is a Capital Pool Company (CPC)?",
      a: "A CPC is a TSX Venture Exchange-listed shell company formed to identify and acquire a high-quality private business through a Qualifying Transaction. Mandeville maintains approximately CAD $1.25–$1.30M in cash and ~26.5M shares outstanding to execute this mandate.",
    },
    {
      q: "What is the proposed Qualifying Transaction?",
      a: "Mandeville is advancing a proposed transaction with Quantropi Inc., an Ottawa-based cybersecurity company developing quantum-secure encryption through its QiSpace™ platform. A definitive agreement is targeted for on or about April 24, 2026.",
    },
    {
      q: "Why Quantropi?",
      a: "Quantropi's software-first architecture allows quantum-secure encryption to be deployed without hardware replacement — a critical advantage for IoT, drones, and legacy infrastructure. The company has active integrations with Palo Alto Networks, STMicroelectronics, Renesas, and NATO DIANA programs.",
    },
    {
      q: "Where can I find regulatory filings?",
      a: "All public filings, including the CPC prospectus and material change reports, are available through SEDAR+ at sedarplus.ca under Mandeville Ventures Inc.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#0A0E1A] font-sans antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
        .font-body { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }

        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track { animation: ticker 45s linear infinite; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.8s ease-out forwards; }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        .pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }

        @keyframes quantum-shift {
          0%, 100% { transform: translate(0, 0); opacity: 0.3; }
          25% { transform: translate(2px, -2px); opacity: 0.6; }
          50% { transform: translate(-1px, 1px); opacity: 0.4; }
          75% { transform: translate(-2px, -1px); opacity: 0.7; }
        }
        .quantum-particle { animation: quantum-shift 4s ease-in-out infinite; }

        .grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E");
        }

        .underline-link { position: relative; }
        .underline-link::after {
          content: ''; position: absolute; left: 0; bottom: -2px; width: 100%; height: 1px;
          background: currentColor; transform: scaleX(0); transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.65, 0, 0.35, 1);
        }
        .underline-link:hover::after { transform: scaleX(1); transform-origin: left; }
      `}</style>

      {/* ============ TOP TICKER ============ */}
      <div className="bg-[#0A0E1A] text-[#F4F1EA] border-b border-[#1F2737] overflow-hidden">
        <div className="flex whitespace-nowrap py-2 ticker-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6 font-mono text-xs tracking-wider">
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full pulse-dot"></span>TSXV: MAND.V</span>
              <span className="opacity-50">—</span>
              <span>CASH ON HAND: ~CAD $1.25–1.30M</span>
              <span className="opacity-50">—</span>
              <span>SHARES OUTSTANDING: 26,544,444</span>
              <span className="opacity-50">—</span>
              <span>QT TARGET: QUANTROPI INC.</span>
              <span className="opacity-50">—</span>
              <span>DEFINITIVE AGREEMENT: ON OR ABOUT 24.APR.2026</span>
              <span className="opacity-50">—</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full pulse-dot"></span>TSXV: MAND.V</span>
              <span className="opacity-50">—</span>
            </div>
          ))}
        </div>
      </div>

      {/* ============ NAV ============ */}
      <nav className="sticky top-0 z-40 bg-[#F4F1EA]/85 backdrop-blur-md border-b border-[#0A0E1A]/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          <img src="/logo.svg" alt="Mandeville Ventures Inc." style={{ maxWidth: "350px", width: "100%", maxHeight: "135px", padding: "5px" }} />

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`px-4 py-2 text-sm font-body transition-all ${
                  activeSection === item.id ? "text-[#0A0E1A]" : "text-[#0A0E1A]/55 hover:text-[#0A0E1A]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => document.getElementById("subscribe")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center gap-2 bg-[#0A0E1A] text-[#F4F1EA] px-5 py-2.5 text-sm font-body hover:bg-[#1F2737] transition-colors"
          >
            Get Updates
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <section id="overview" className="relative max-w-[1400px] mx-auto px-6 lg:px-12 pt-16 pb-24 lg:pt-24 lg:pb-32">
        {/* Quantum decorative grid */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute top-20 right-0 w-[600px] h-[600px] opacity-[0.07]" viewBox="0 0 600 600">
            {[...Array(10)].map((_, i) => (
              <circle key={i} cx="300" cy="300" r={50 + i * 25} fill="none" stroke="#0A0E1A" strokeWidth="0.5" />
            ))}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              return (
                <line key={i} x1="300" y1="300" x2={300 + 280 * Math.cos(angle)} y2={300 + 280 * Math.sin(angle)} stroke="#0A0E1A" strokeWidth="0.3" />
              );
            })}
          </svg>
        </div>

        <div className="relative grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-8 fade-up">
            <div className="flex items-center gap-3 mb-8">
              <div className="font-mono text-xs tracking-[0.25em] text-[#0A0E1A]/60">CAPITAL POOL COMPANY · TSXV LISTED</div>
              <div className="h-px flex-1 bg-[#0A0E1A]/15"></div>
            </div>

            <h1 className="font-display text-[42px] sm:text-[60px] lg:text-[88px] leading-[0.95] font-400 tracking-[-0.02em] mb-8">
              Capital structured for the{" "}
              <span className="italic font-300 text-[#5B4B3A]">post-quantum</span> transition.
            </h1>

            <p className="font-body text-lg lg:text-xl text-[#0A0E1A]/70 max-w-2xl leading-relaxed mb-10">
              Mandeville Ventures is advancing a proposed Qualifying Transaction with{" "}
              <span className="text-[#0A0E1A] font-500">Quantropi Inc.</span> — bringing institutional access to a software-first quantum-secure encryption platform with active enterprise, semiconductor, and defense deployments.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => document.getElementById("subscribe")?.scrollIntoView({ behavior: "smooth" })}
                className="group flex items-center gap-3 bg-[#0A0E1A] text-[#F4F1EA] px-7 py-4 font-body text-sm hover:bg-[#1F2737] transition-all"
              >
                Subscribe to Investor Updates
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => document.getElementById("transaction")?.scrollIntoView({ behavior: "smooth" })}
                className="group flex items-center gap-3 bg-transparent text-[#0A0E1A] px-7 py-4 font-body text-sm border border-[#0A0E1A]/30 hover:border-[#0A0E1A] transition-all"
              >
                Read the Transaction Brief
                <FileText className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-px">
            {[
              { label: "Symbol", value: "MAND.V", sub: "TSX Venture" },
              { label: "Cash on Hand", value: "$1.25–1.30M", sub: "CAD, most recent reporting" },
              { label: "Shares Outstanding", value: "26,544,444", sub: "Common shares" },
              { label: "QT Target", value: "Quantropi Inc.", sub: "Ottawa, Canada" },
            ].map((item, i) => (
              <div key={i} className="bg-[#0A0E1A] text-[#F4F1EA] px-6 py-5 flex items-center justify-between hover:bg-[#1F2737] transition-colors group">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.2em] opacity-50 mb-1">{item.label.toUpperCase()}</div>
                  <div className="font-display text-2xl font-500">{item.value}</div>
                </div>
                <div className="text-right">
                  <div className="font-body text-[11px] opacity-60">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex items-center gap-3 text-[#0A0E1A]/40">
          <ChevronDown className="w-4 h-4 animate-bounce" />
          <span className="font-mono text-[10px] tracking-[0.25em]">SCROLL TO EXPLORE</span>
        </div>
      </section>

      {/* ============ PARTNER LOGOS / PROOF STRIP ============ */}
      <section className="border-y border-[#0A0E1A]/10 bg-[#EBE6DB]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10">
          <div className="grid lg:grid-cols-5 gap-6 items-center">
            <div className="font-mono text-[10px] tracking-[0.25em] text-[#0A0E1A]/60 leading-relaxed">
              QUANTROPI<br />DEPLOYMENT<br />ECOSYSTEM
            </div>
            {proofPoints.map((point, i) => (
              <div key={i} className="border-l border-[#0A0E1A]/15 pl-6 group cursor-default">
                <div className="font-mono text-[9px] tracking-[0.2em] text-[#0A0E1A]/50 mb-1">{point.type.toUpperCase()}</div>
                <div className="font-display text-lg font-500 group-hover:text-[#5B4B3A] transition-colors">{point.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TRANSACTION SECTION ============ */}
      <section id="transaction" className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="font-mono text-xs tracking-[0.25em] text-[#5B4B3A] mb-6">/ 01 — THE TRANSACTION</div>
            <h2 className="font-display text-4xl lg:text-5xl font-400 leading-[1.05] tracking-[-0.01em] mb-6">
              A proposed acquisition of <span className="italic">Quantropi Inc.</span>
            </h2>
            <p className="font-body text-[#0A0E1A]/70 leading-relaxed mb-8">
              Founded in 2018, Quantropi develops quantum-secure encryption technologies that protect data in transit and at rest — without requiring quantum computing hardware to deploy.
            </p>
            <div className="space-y-3 font-body text-sm">
              {[
                { k: "Headquarters", v: "Ottawa, Canada" },
                { k: "Founded", v: "2018" },
                { k: "Sector", v: "Post-Quantum Cryptography" },
                { k: "Platform", v: "QiSpace™" },
                { k: "Target Definitive Agreement", v: "On or about April 24, 2026" },
              ].map((row, i) => (
                <div key={i} className="flex justify-between border-b border-[#0A0E1A]/10 pb-3">
                  <span className="text-[#0A0E1A]/55">{row.k}</span>
                  <span className="font-500">{row.v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-[#0A0E1A] text-[#F4F1EA] p-8 lg:p-12 relative overflow-hidden">
              {/* Quantum particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-[#F4F1EA] rounded-full quantum-particle"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 4}s`,
                    }}
                  />
                ))}
              </div>

              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full pulse-dot"></div>
                  <span className="font-mono text-[10px] tracking-[0.25em] opacity-70">ACTIVE / DUE DILIGENCE PHASE</span>
                </div>

                <h3 className="font-display text-3xl lg:text-4xl font-400 leading-tight mb-8">
                  Software-first quantum security, deployable on today's infrastructure.
                </h3>

                <div className="grid sm:grid-cols-2 gap-6 mb-10">
                  {[
                    { title: "No Hardware Replacement", body: "Updates deployed remotely. No chip swaps, no return-to-manufacturer." },
                    { title: "Drones & IoT Ready", body: "Built for environments where physical hardware access is impractical." },
                    { title: "Legacy Compatible", body: "Operates within existing infrastructure constraints — bandwidth, latency, footprint." },
                    { title: "Full-Stack Cryptography", body: "Authentication, encryption, and entropy in a unified platform." },
                  ].map((item, i) => (
                    <div key={i} className="border-l-2 border-[#5B4B3A] pl-4">
                      <div className="font-display text-base font-500 mb-1.5">{item.title}</div>
                      <div className="font-body text-sm opacity-70 leading-relaxed">{item.body}</div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#F4F1EA]/15 pt-6 flex items-center justify-between">
                  <div className="font-mono text-[10px] tracking-[0.25em] opacity-50">
                    SUBJECT TO DUE DILIGENCE & TSXV APPROVAL
                  </div>
                  <a 
                    href="https://www.quantropi.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline-link font-body text-sm flex items-center gap-2"
                  >
                    Quantropi.com <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ INVESTMENT THESIS ============ */}
      <section id="thesis" className="bg-[#EBE6DB] border-y border-[#0A0E1A]/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
            <div className="max-w-2xl">
              <div className="font-mono text-xs tracking-[0.25em] text-[#5B4B3A] mb-6">/ 02 — INVESTMENT THESIS</div>
              <h2 className="font-display text-4xl lg:text-5xl font-400 leading-[1.05] tracking-[-0.01em]">
                Four reasons this <span className="italic">matters now.</span>
              </h2>
            </div>
            <div className="font-body text-sm text-[#0A0E1A]/60 max-w-sm">
              Cyber threats evolve alongside computing. The post-quantum window is opening — and software-deployable solutions are positioned to capture it first.
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-[#0A0E1A]/15">
            {thesisPoints.map((point, i) => {
              const Icon = point.icon;
              return (
                <div
                  key={i}
                  className="bg-[#EBE6DB] p-8 lg:p-10 group hover:bg-[#F4F1EA] transition-colors cursor-default"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-14 h-14 border border-[#0A0E1A]/20 flex items-center justify-center group-hover:bg-[#0A0E1A] group-hover:border-[#0A0E1A] transition-all">
                      <Icon className="w-6 h-6 group-hover:text-[#F4F1EA] transition-colors" />
                    </div>
                    <div className="font-mono text-xs tracking-[0.2em] text-[#0A0E1A]/40">{point.tag}</div>
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl font-500 mb-4 leading-tight">{point.title}</h3>
                  <p className="font-body text-[#0A0E1A]/70 leading-relaxed">{point.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ TRACTION / PROOF ============ */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="font-mono text-xs tracking-[0.25em] text-[#5B4B3A] mb-6">/ 03 — VALIDATION & TRACTION</div>
            <h2 className="font-display text-4xl lg:text-5xl font-400 leading-[1.05] tracking-[-0.01em] mb-8">
              Not theoretical. <span className="italic">Already deployed.</span>
            </h2>
            <p className="font-body text-[#0A0E1A]/70 leading-relaxed mb-8">
              Quantropi's platform is supported by real-world deployments, enterprise integrations, and strategic partnerships across cybersecurity, semiconductors, and defense.
            </p>

            <div className="bg-[#0A0E1A] text-[#F4F1EA] p-6">
              <div className="font-mono text-[10px] tracking-[0.25em] opacity-60 mb-4">PROOF AT A GLANCE</div>
              <ul className="space-y-3">
                {[
                  "Deployed via software upgrades — zero hardware replacement",
                  "Integrated with Palo Alto Networks enterprise infrastructure",
                  "Enabled on STMicroelectronics & Renesas semiconductor ecosystems",
                  "Validated within NATO DIANA innovation programs",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-400" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-px bg-[#0A0E1A]/15 border border-[#0A0E1A]/15">
              {[
                { num: "30+", label: "Companies founded or led by Robin Dow", icon: Building2 },
                { num: "~$200M", label: "Total capital raised by Director Robin Dow", icon: TrendingUp },
                { num: "2018", label: "Year Quantropi was founded in Ottawa", icon: Calendar },
                { num: "Multiple", label: "Granted patents + pending IP in cryptography", icon: Lock },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="bg-[#F4F1EA] p-8 lg:p-10">
                    <Icon className="w-5 h-5 text-[#5B4B3A] mb-6" />
                    <div className="font-display text-5xl lg:text-6xl font-400 mb-3 tracking-tight">{stat.num}</div>
                    <div className="font-body text-sm text-[#0A0E1A]/65 leading-relaxed">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============ LEADERSHIP ============ */}
      <section id="leadership" className="bg-[#0A0E1A] text-[#F4F1EA]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
            <div>
              <div className="font-mono text-xs tracking-[0.25em] text-[#A89172] mb-6">/ 04 — LEADERSHIP</div>
              <h2 className="font-display text-4xl lg:text-5xl font-400 leading-[1.05] tracking-[-0.01em]">
                Operators, capital allocators, <span className="italic">technologists.</span>
              </h2>
            </div>
            <div className="font-body text-sm opacity-60 max-w-sm">
              A board with combined experience across capital markets, tax structuring, resource development, and global distribution.
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1F2737]">
            {leadership.map((person, i) => (
              <div
                key={i}
                className="bg-[#0A0E1A] p-8 group hover:bg-[#1F2737] transition-colors cursor-default"
              >
                <div className="aspect-square bg-[#1F2737] mb-6 relative overflow-hidden flex items-center justify-center">
                  <div className="font-display text-7xl text-[#F4F1EA]/20 group-hover:text-[#F4F1EA]/40 transition-colors">
                    {person.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="absolute top-3 left-3 font-mono text-[9px] tracking-[0.2em] bg-[#5B4B3A] text-[#F4F1EA] px-2 py-1">
                    {person.tag.toUpperCase()}
                  </div>
                </div>
                <div className="font-display text-xl font-500 mb-1">{person.name}</div>
                <div className="font-mono text-[10px] tracking-[0.15em] opacity-60 mb-4 uppercase">{person.role}</div>
                <p className="font-body text-sm opacity-70 leading-relaxed">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ NEWSLETTER / SUBSCRIBE — PRIMARY LEAD CAPTURE ============ */}
      <section id="subscribe" className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <div className="font-mono text-xs tracking-[0.25em] text-[#5B4B3A] mb-6">/ 05 — STAY INFORMED</div>
            <h2 className="font-display text-4xl lg:text-6xl font-400 leading-[1.0] tracking-[-0.02em] mb-6">
              Receive transaction updates <span className="italic">directly.</span>
            </h2>
            <p className="font-body text-lg text-[#0A0E1A]/70 leading-relaxed mb-8">
              Quarterly briefings, material change notices, and early access to investor presentations as the Qualifying Transaction advances.
            </p>

            <div className="space-y-4">
              {[
                { icon: Mail, label: "No spam.", body: "We send updates only when there is news worth your attention." },
                { icon: Lock, label: "Confidential.", body: "Your information is never shared with third parties." },
                { icon: TrendingUp, label: "Investor-grade.", body: "Built for analysts, advisors, and long-term shareholders." },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-4">
                    <Icon className="w-4 h-4 mt-1 text-[#5B4B3A] flex-shrink-0" />
                    <div className="font-body text-sm">
                      <span className="font-500">{item.label}</span>{" "}
                      <span className="text-[#0A0E1A]/65">{item.body}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-[#0A0E1A] text-[#F4F1EA] p-8 lg:p-12 relative">
              <div className="font-mono text-[10px] tracking-[0.25em] opacity-60 mb-2">INVESTOR ACCESS · TIER SELECTION</div>
              <div className="font-display text-2xl font-500 mb-8">Tell us how you'd like to engage.</div>

              {/* Investor type selector */}
              <div className="mb-8">
                <label className="font-mono text-[10px] tracking-[0.2em] opacity-50 block mb-3">I AM AN…</label>
                <div className="grid grid-cols-3 gap-px bg-[#F4F1EA]/15">
                  {[
                    { id: "institutional", label: "Institutional" },
                    { id: "retail", label: "Retail" },
                    { id: "advisor", label: "Advisor / Analyst" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setInvestorType(opt.id)}
                      className={`px-4 py-3 font-body text-sm transition-all ${
                        investorType === opt.id
                          ? "bg-[#F4F1EA] text-[#0A0E1A]"
                          : "bg-[#0A0E1A] text-[#F4F1EA] hover:bg-[#1F2737]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div className="mb-8">
                <label className="font-mono text-[10px] tracking-[0.2em] opacity-50 block mb-3">SEND ME…</label>
                <div className="space-y-2">
                  {[
                    { id: "quarterly", label: "Quarterly investor briefings" },
                    { id: "transaction", label: "Material change & transaction updates" },
                    { id: "research", label: "Sector research & post-quantum landscape notes" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setInterests({ ...interests, [item.id]: !interests[item.id] })
                      }
                      className="flex items-center gap-3 w-full p-3 hover:bg-[#1F2737] transition-colors text-left"
                    >
                      <div
                        className={`w-5 h-5 border flex items-center justify-center flex-shrink-0 transition-all ${
                          interests[item.id]
                            ? "bg-[#F4F1EA] border-[#F4F1EA]"
                            : "border-[#F4F1EA]/40"
                        }`}
                      >
                        {interests[item.id] && <Check className="w-3 h-3 text-[#0A0E1A]" strokeWidth={3} />}
                      </div>
                      <span className="font-body text-sm">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Name inputs */}
              <div className="mb-6 grid grid-cols-2 gap-px">
                <div>
                  <label className="font-mono text-[10px] tracking-[0.2em] opacity-50 block mb-3">FIRST NAME</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Jane"
                    className="w-full bg-[#1F2737] text-[#F4F1EA] px-5 py-4 font-body text-sm placeholder:text-[#F4F1EA]/30 focus:outline-none focus:bg-[#2A3447]"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] tracking-[0.2em] opacity-50 block mb-3">LAST NAME</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="w-full bg-[#1F2737] text-[#F4F1EA] px-5 py-4 font-body text-sm placeholder:text-[#F4F1EA]/30 focus:outline-none focus:bg-[#2A3447]"
                  />
                </div>
              </div>

              {/* Email input */}
              <div>
                <label className="font-mono text-[10px] tracking-[0.2em] opacity-50 block mb-3">EMAIL ADDRESS</label>
                <div className="flex gap-px">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                    placeholder="name@firm.com"
                    className="flex-1 bg-[#1F2737] text-[#F4F1EA] px-5 py-4 font-body text-sm placeholder:text-[#F4F1EA]/30 focus:outline-none focus:bg-[#2A3447]"
                  />
                  <button
                    onClick={handleSubscribe}
                    disabled={isSubmitting}
                    className="bg-[#F4F1EA] text-[#0A0E1A] px-6 py-4 font-body text-sm hover:bg-[#A89172] hover:text-[#0A0E1A] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px] justify-center"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-[#0A0E1A]/20 border-t-[#0A0E1A] rounded-full animate-spin"></div>
                    ) : (
                      <>Subscribe <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
                {subscribed && (
                  <div className="mt-4 flex items-center gap-2 font-body text-sm text-emerald-400 fade-up">
                    <Check className="w-4 h-4" />
                    Subscription successful. Welcome to the Mandeville network.
                  </div>
                )}
                <p className="font-body text-xs opacity-50 mt-4 leading-relaxed">
                  By subscribing, you consent to receive investor communications from Mandeville Ventures Inc. You may unsubscribe at any time. We comply with CASL and PIPEDA.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="bg-[#EBE6DB] border-t border-[#0A0E1A]/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="font-mono text-xs tracking-[0.25em] text-[#5B4B3A] mb-6">/ 06 — FREQUENTLY ASKED</div>
              <h2 className="font-display text-4xl lg:text-5xl font-400 leading-[1.0] tracking-[-0.02em] mb-6">
                Questions, <span className="italic">answered.</span>
              </h2>
              <p className="font-body text-[#0A0E1A]/70 leading-relaxed">
                For additional information, regulatory filings are available through SEDAR+ under Mandeville Ventures Inc.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="border-t border-[#0A0E1A]/15">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-[#0A0E1A]/15">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                      className="w-full py-6 flex items-start justify-between gap-6 text-left group"
                    >
                      <span className="font-display text-xl lg:text-2xl font-500 group-hover:text-[#5B4B3A] transition-colors">
                        {faq.q}
                      </span>
                      <span className="flex-shrink-0 mt-1.5">
                        {openFaq === i ? (
                          <Minus className="w-5 h-5" />
                        ) : (
                          <Plus className="w-5 h-5" />
                        )}
                      </span>
                    </button>
                    {openFaq === i && (
                      <div className="pb-6 pr-12 fade-up">
                        <p className="font-body text-[#0A0E1A]/75 leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="bg-[#0A0E1A] text-[#F4F1EA] relative overflow-hidden">
        <div className="absolute inset-0 grain opacity-10 pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32 relative">
          <div className="max-w-4xl">
            <div className="font-mono text-xs tracking-[0.25em] opacity-60 mb-8">/ NEXT STEP</div>
            <h2 className="font-display text-5xl lg:text-7xl font-400 leading-[0.95] tracking-[-0.02em] mb-10">
              The post-quantum window is <span className="italic text-[#A89172]">opening.</span>
            </h2>
            <p className="font-body text-xl opacity-75 leading-relaxed mb-12 max-w-2xl">
              Subscribe for direct access to transaction milestones, board commentary, and the next phase of Mandeville's Qualifying Transaction with Quantropi.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => document.getElementById("subscribe")?.scrollIntoView({ behavior: "smooth" })}
                className="group flex items-center gap-3 bg-[#F4F1EA] text-[#0A0E1A] px-8 py-5 font-body text-sm hover:bg-[#A89172] transition-colors"
              >
                Subscribe to Updates
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button 
                onClick={() => setContactModalOpen(true)}
                className="group flex items-center gap-3 bg-transparent text-[#F4F1EA] px-8 py-5 font-body text-sm border border-[#F4F1EA]/30 hover:border-[#F4F1EA] transition-all"
              >
                Contact Investor Relations
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ============ CONTACT MODAL ============ */}
        {contactModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <div 
              className="absolute inset-0 bg-[#0A0E1A]/80 backdrop-blur-sm"
              onClick={() => !isSubmitting && setContactModalOpen(false)}
            ></div>
            <div className="relative bg-[#F4F1EA] text-[#0A0E1A] w-full max-w-xl p-8 lg:p-12 fade-up">
              <button 
                onClick={() => setContactModalOpen(false)}
                className="absolute top-6 right-6 text-[#0A0E1A]/40 hover:text-[#0A0E1A] transition-colors"
                disabled={isSubmitting}
              >
                <Plus className="w-6 h-6 rotate-45" />
              </button>
              
              <div className="font-mono text-[10px] tracking-[0.25em] text-[#5B4B3A] mb-6">/ INVESTOR INQUIRY</div>
              <h3 className="font-display text-3xl lg:text-4xl font-400 mb-8">Get in touch with <span className="italic">IR.</span></h3>
              
              {contactSuccess ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8" />
                  </div>
                  <div className="font-display text-2xl mb-2">Message Sent</div>
                  <p className="font-body text-[#0A0E1A]/60">An IR representative will be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-mono text-[9px] tracking-[0.2em] opacity-50 block mb-2 uppercase">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        className="w-full bg-[#0A0E1A]/5 border-b border-[#0A0E1A]/20 px-4 py-3 font-body text-sm focus:outline-none focus:border-[#0A0E1A] transition-colors"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] tracking-[0.2em] opacity-50 block mb-2 uppercase">Email Address</label>
                      <input 
                        required
                        type="email" 
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        className="w-full bg-[#0A0E1A]/5 border-b border-[#0A0E1A]/20 px-4 py-3 font-body text-sm focus:outline-none focus:border-[#0A0E1A] transition-colors"
                        placeholder="jane@firm.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-mono text-[9px] tracking-[0.2em] opacity-50 block mb-2 uppercase">Firm (Optional)</label>
                    <input 
                      type="text" 
                      value={contactForm.firm}
                      onChange={(e) => setContactForm({...contactForm, firm: e.target.value})}
                      className="w-full bg-[#0A0E1A]/5 border-b border-[#0A0E1A]/20 px-4 py-3 font-body text-sm focus:outline-none focus:border-[#0A0E1A] transition-colors"
                      placeholder="Investment Firm Name"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[9px] tracking-[0.2em] opacity-50 block mb-2 uppercase">Message</label>
                    <textarea 
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      className="w-full bg-[#0A0E1A]/5 border-b border-[#0A0E1A]/20 px-4 py-3 font-body text-sm focus:outline-none focus:border-[#0A0E1A] transition-colors resize-none"
                      placeholder="How can we help?"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0A0E1A] text-[#F4F1EA] py-4 font-body text-sm hover:bg-[#1F2737] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-[#F4F1EA]/20 border-t-[#F4F1EA] rounded-full animate-spin"></div>
                    ) : (
                      <>Send Message <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-[#0A0E1A] text-[#F4F1EA] border-t border-[#1F2737]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
          <div className="grid lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-4">
              <div className="mb-4">
                <img src="/logo-reverse.svg" alt="Mandeville Ventures Inc." style={{ maxWidth: "200px", width: "100%", marginBottom: "8px" }} />
                <div className="font-mono text-[9px] tracking-[0.2em] opacity-60">TSXV: MAND.V</div>
              </div>
              <p className="font-body text-sm opacity-65 leading-relaxed max-w-sm">
                A Capital Pool Company listed on the TSX Venture Exchange. Currently advancing a Qualifying Transaction with Quantropi Inc.
              </p>
            </div>

            <div className="lg:col-span-2">
              <div className="font-mono text-[10px] tracking-[0.25em] opacity-50 mb-4">COMPANY</div>
              <ul className="space-y-2 font-body text-sm">
                <li><a href="#" className="underline-link opacity-80 hover:opacity-100">About</a></li>
                <li><a href="#" className="underline-link opacity-80 hover:opacity-100">Leadership</a></li>
                <li><a href="#" className="underline-link opacity-80 hover:opacity-100">Transaction</a></li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <div className="font-mono text-[10px] tracking-[0.25em] opacity-50 mb-4">INVESTORS</div>
              <ul className="space-y-2 font-body text-sm">
                <li><a href="#" className="underline-link opacity-80 hover:opacity-100">SEDAR+ Filings</a></li>
                <li><a href="#" className="underline-link opacity-80 hover:opacity-100">Press Releases</a></li>
                <li><a href="#" className="underline-link opacity-80 hover:opacity-100">Subscribe</a></li>
              </ul>
            </div>

            <div className="lg:col-span-4">
              <div className="font-mono text-[10px] tracking-[0.25em] opacity-50 mb-4">CONTACT</div>
              <a href="mailto:investors@mandevilleventures.com" className="font-display text-xl font-400 underline-link inline-block mb-2">
                investors@mandevilleventures.com
              </a>
              <p className="font-body text-xs opacity-60 leading-relaxed">
                Toronto, Ontario · Canada
              </p>
            </div>
          </div>

          <div className="border-t border-[#1F2737] pt-8 flex flex-wrap gap-6 justify-between items-start">
            <p className="font-body text-xs opacity-50 max-w-3xl leading-relaxed">
              This website is for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy any securities. The proposed Qualifying Transaction is subject to due diligence, definitive agreements, and TSXV approval. There can be no assurance that the transaction will be completed on the targeted timeline or at all.
            </p>
            <div className="font-mono text-[10px] tracking-[0.25em] opacity-40">
              © 2026 MANDEVILLE VENTURES INC.
            </div>
          </div>
        </div>
      </footer>

      {/* ============ STICKY SUBSCRIBE BAR (appears on scroll) ============ */}
      {showStickyForm && !subscribed && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0A0E1A] text-[#F4F1EA] shadow-2xl flex items-center gap-1 p-1 fade-up max-w-[calc(100vw-3rem)]">
          <div className="hidden sm:flex items-center gap-3 px-5 py-3">
            <div className="w-2 h-2 bg-emerald-400 rounded-full pulse-dot"></div>
            <span className="font-body text-sm">Get transaction updates</span>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
            placeholder="your@email.com"
            className="bg-[#1F2737] text-[#F4F1EA] px-4 py-3 font-body text-sm placeholder:text-[#F4F1EA]/30 focus:outline-none w-44 sm:w-56"
          />
          <button
            onClick={handleSubscribe}
            className="bg-[#F4F1EA] text-[#0A0E1A] px-5 py-3 font-body text-sm hover:bg-[#A89172] transition-colors flex items-center gap-2"
          >
            Subscribe <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

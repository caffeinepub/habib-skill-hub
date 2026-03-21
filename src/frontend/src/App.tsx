import {
  ArrowUpRight,
  BarChart2,
  CheckCircle,
  ChevronRight,
  Facebook,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Search,
  Share2,
  Star,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

// ─── Scroll reveal hook ──────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    const els = document.querySelectorAll(".reveal");
    for (const el of els) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.11_0.02_265/0.95)] backdrop-blur-xl border-b border-[oklch(0.25_0.03_265)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          data-ocid="nav.link"
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-lg text-foreground">
            Habib <span className="gradient-text">Skill Hub</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-ocid="nav.link"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          data-ocid="nav.primary_button"
          className="hidden md:flex btn-shimmer text-white text-sm font-semibold px-5 py-2 rounded-full"
        >
          Get Free Consultation
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          data-ocid="nav.toggle"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass-card border-t border-border px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              window.location.hash = "#contact";
            }}
            className="btn-shimmer text-white text-sm font-semibold px-5 py-2 rounded-full text-center"
          >
            Get Free Consultation
          </button>
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      {/* Background glow orbs */}
      <div className="absolute top-20 left-[-10%] w-[500px] h-[500px] rounded-full bg-[oklch(0.45_0.2_290/0.12)] blur-[120px] pointer-events-none" />
      <div className="absolute top-40 right-[-10%] w-[400px] h-[400px] rounded-full bg-[oklch(0.45_0.18_250/0.12)] blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs font-semibold text-primary mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
            Digital Marketing Specialist
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-foreground mb-6">
            I Help Businesses <span className="gradient-text">Grow</span> with
            Digital Marketing
          </h1>

          <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
            Facebook Ads &nbsp;|&nbsp; SEO &nbsp;|&nbsp; Lead Generation
          </p>

          <p className="text-muted-foreground mb-8 leading-relaxed max-w-md">
            I am <strong className="text-foreground">Habib Hosen</strong> — a
            passionate digital marketer helping businesses get more clients and
            sales online through data-driven strategies.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              data-ocid="hero.primary_button"
              className="btn-shimmer text-white font-semibold px-8 py-3 rounded-full text-sm"
            >
              Hire Me
            </a>
            <a
              href="#portfolio"
              data-ocid="hero.secondary_button"
              className="glass-card text-foreground font-semibold px-8 py-3 rounded-full text-sm hover:border-primary transition-colors duration-300 flex items-center gap-2"
            >
              View Portfolio <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-12 flex gap-8">
            {[
              { value: "50+", label: "Clients Served" },
              { value: "3x", label: "Avg. ROI" },
              { value: "5yr", label: "Experience" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display font-bold text-2xl gradient-text">
                  {s.value}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — abstract visual + floating cards */}
        <div className="relative flex items-center justify-center animate-fade-in">
          {/* Central portrait placeholder */}
          <div className="relative w-[300px] h-[380px] sm:w-[360px] sm:h-[440px] rounded-3xl gradient-bg opacity-90 flex items-center justify-center overflow-hidden glow-purple">
            {/* Abstract ring pattern */}
            <div className="absolute inset-0 opacity-20">
              {[50, 100, 150, 200, 250, 300, 350, 400].map((size) => (
                <div
                  key={size}
                  className="absolute border border-white/20 rounded-full"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}
            </div>
            <div className="relative z-10 text-center">
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                <Users className="w-10 h-10 text-white" />
              </div>
              <p className="text-white font-display font-bold text-xl">
                Habib Hosen
              </p>
              <p className="text-white/70 text-sm">Digital Marketer</p>
            </div>
          </div>

          {/* Floating cards */}
          <div className="animate-float absolute -top-4 -left-8 glass-card rounded-2xl p-3 flex items-center gap-2 glow-purple">
            <div className="w-8 h-8 rounded-lg bg-[oklch(0.58_0.22_290/0.3)] flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">+320%</p>
              <p className="text-[10px] text-muted-foreground">Lead Growth</p>
            </div>
          </div>

          <div className="animate-float-delayed absolute -bottom-4 -left-4 glass-card rounded-2xl p-3 flex items-center gap-2 glow-blue">
            <div className="w-8 h-8 rounded-lg bg-[oklch(0.55_0.18_250/0.3)] flex items-center justify-center">
              <BarChart2 className="w-4 h-4 text-secondary" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">3.2x ROAS</p>
              <p className="text-[10px] text-muted-foreground">FB Ads</p>
            </div>
          </div>

          <div className="animate-float-slow absolute -top-4 -right-4 glass-card rounded-2xl p-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[oklch(0.6_0.2_280/0.3)] flex items-center justify-center">
              <Target className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">#1 Rank</p>
              <p className="text-[10px] text-muted-foreground">SEO Result</p>
            </div>
          </div>

          <div className="animate-float absolute -bottom-4 -right-8 glass-card rounded-2xl p-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[oklch(0.55_0.2_250/0.3)] flex items-center justify-center">
              <Users className="w-4 h-4 text-secondary" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">50+ Clients</p>
              <p className="text-[10px] text-muted-foreground">Happy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const skills = [
    "Facebook Ads",
    "SEO",
    "Lead Generation",
    "Social Media Marketing",
    "Google Ads",
    "Email Marketing",
  ];
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div className="reveal">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">
              About Me
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-6">
              Passionate About{" "}
              <span className="gradient-text">Growing Brands</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              I am a Digital Marketing Specialist with experience in Facebook
              Ads, SEO, and Lead Generation. I help businesses get more clients
              and sales online through proven, data-driven strategies that
              deliver measurable results.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Over the past 5+ years, I've worked with local businesses, medical
              spas, dental clinics, and e-commerce brands to build their digital
              presence and scale their revenue.
            </p>

            {/* Skill pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {skills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-full text-xs font-semibold glass-card text-primary border border-primary/30"
                >
                  {s}
                </span>
              ))}
            </div>

            <a
              href="#contact"
              data-ocid="about.primary_button"
              className="inline-flex items-center gap-2 btn-shimmer text-white font-semibold px-6 py-2.5 rounded-full text-sm"
            >
              Let's Work Together <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Key skills cards */}
          <div className="reveal reveal-delay-2 grid grid-cols-2 gap-4">
            {[
              {
                icon: <Search className="w-5 h-5" />,
                title: "SEO Mastery",
                desc: "Organic rankings that drive sustainable long-term traffic and visibility.",
                color: "bg-[oklch(0.55_0.18_250/0.2)] text-secondary",
              },
              {
                icon: <Target className="w-5 h-5" />,
                title: "Paid Advertising",
                desc: "High-ROI Facebook & Google ad campaigns engineered for conversions.",
                color: "bg-[oklch(0.58_0.22_290/0.2)] text-primary",
              },
              {
                icon: <Users className="w-5 h-5" />,
                title: "Lead Generation",
                desc: "Scalable lead funnels that fill your pipeline with qualified prospects.",
                color: "bg-[oklch(0.55_0.18_250/0.2)] text-secondary",
              },
              {
                icon: <Share2 className="w-5 h-5" />,
                title: "Social Media",
                desc: "Brand-building content and community management that grows your audience.",
                color: "bg-[oklch(0.58_0.22_290/0.2)] text-primary",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="glass-card rounded-2xl p-5 card-hover cursor-default"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${c.color} flex items-center justify-center mb-3`}
                >
                  {c.icon}
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">
                  {c.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
function Services() {
  const services = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Facebook Ads Management",
      desc: "Full-funnel Facebook & Instagram ad campaigns with creative strategy, audience targeting, and ongoing optimization for maximum ROAS.",
      badge: "Most Popular",
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "SEO Optimization",
      desc: "On-page, off-page, and technical SEO strategies that push your website to the top of Google and drive sustainable organic traffic.",
      badge: null,
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Lead Generation",
      desc: "Custom lead generation systems with landing pages, CRM integration, and follow-up automation to convert visitors into paying clients.",
      badge: null,
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Social Media Marketing",
      desc: "Strategic content creation and community management across all major platforms to grow your brand and engage your audience.",
      badge: null,
    },
  ];

  return (
    <section id="services" className="py-20 relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[oklch(0.45_0.18_250/0.07)] blur-[100px] pointer-events-none" />
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14 reveal">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">
            What I Offer
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
            My <span className="gradient-text">Services</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`reveal reveal-delay-${i + 1} glass-card rounded-2xl p-6 card-hover relative overflow-hidden`}
            >
              {s.badge && (
                <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full gradient-bg text-white">
                  {s.badge}
                </span>
              )}
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 text-white">
                {s.icon}
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-2">
                {s.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {s.desc}
              </p>
              <div className="mt-4 flex items-center gap-1 text-primary text-xs font-semibold">
                <span>Learn more</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Portfolio ────────────────────────────────────────────────────────────────
function Portfolio() {
  const projects = [
    {
      category: "Medical Spa",
      title: "Luxe Med Spa — Lead Gen Campaign",
      result: "+320% Leads",
      detail: "Facebook Ads + Landing Page",
      desc: "Designed and launched a multi-step Facebook funnel targeting women 25–55 in target zip codes. Resulted in 320% more inbound leads within 60 days.",
      color: "from-[oklch(0.58_0.22_290/0.6)] to-[oklch(0.45_0.18_260/0.4)]",
    },
    {
      category: "Dental Clinic",
      title: "BrightSmile Dental — Booking Boost",
      result: "+250% Bookings",
      detail: "Google Ads + SEO",
      desc: "Combined Google Ads with local SEO to dominate search for high-intent dental queries. Monthly bookings grew 250% in 90 days.",
      color: "from-[oklch(0.55_0.2_250/0.6)] to-[oklch(0.45_0.18_230/0.4)]",
    },
    {
      category: "Local Business",
      title: "Downtown Eats — Traffic Campaign",
      result: "+180% Traffic",
      detail: "Social Media + SEO",
      desc: "A combined social media strategy and local SEO overhaul drove 180% more foot traffic and online orders for a local restaurant group.",
      color: "from-[oklch(0.58_0.22_290/0.5)] to-[oklch(0.55_0.18_250/0.4)]",
    },
  ];

  return (
    <section id="portfolio" className="py-20 relative">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[oklch(0.45_0.2_290/0.07)] blur-[100px] pointer-events-none" />
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14 reveal">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">
            Case Studies
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
            Featured <span className="gradient-text">Portfolio</span>
          </h2>
        </div>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          data-ocid="portfolio.list"
        >
          {projects.map((p, i) => (
            <div
              key={p.title}
              data-ocid={`portfolio.item.${i + 1}`}
              className={`reveal reveal-delay-${i + 1} glass-card rounded-2xl overflow-hidden card-hover`}
            >
              {/* Visual header */}
              <div
                className={`h-36 bg-gradient-to-br ${p.color} relative flex items-end p-4`}
              >
                <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm">
                  {p.category}
                </span>
                <div className="inline-flex items-center gap-1.5 gradient-bg px-3 py-1 rounded-full">
                  <TrendingUp className="w-3.5 h-3.5 text-white" />
                  <span className="text-white font-bold text-sm">
                    {p.result}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <p className="text-primary text-xs font-semibold mb-1">
                  {p.detail}
                </p>
                <h3 className="font-display font-bold text-base text-foreground mb-2">
                  {p.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {p.desc}
                </p>

                <div className="mt-4 flex items-center gap-1 text-primary text-xs font-semibold">
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const reviews = [
    {
      name: "Sarah Mitchell",
      company: "Luxe Med Spa, Miami",
      avatar: "SM",
      quote:
        "Habib completely transformed our lead generation. Within 2 months of running his Facebook Ad strategy, we went from 10 leads/week to over 40. The ROI has been incredible.",
      stars: 5,
    },
    {
      name: "Dr. James Nguyen",
      company: "BrightSmile Dental, NYC",
      avatar: "JN",
      quote:
        "Our clinic's monthly appointments doubled after Habib handled our Google Ads and SEO. He genuinely understands the healthcare marketing landscape and delivers results.",
      stars: 5,
    },
    {
      name: "Maria Gonzalez",
      company: "Downtown Eats Group",
      avatar: "MG",
      quote:
        "Working with Habib was a game-changer. His social media campaigns and local SEO strategy brought us a 180% jump in online traffic and a noticeable boost in walk-in customers.",
      stars: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14 reveal">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">
            Client Reviews
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
            What Clients <span className="gradient-text">Say</span>
          </h2>
        </div>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          data-ocid="testimonials.list"
        >
          {reviews.map((r, i) => (
            <div
              key={r.name}
              data-ocid={`testimonials.item.${i + 1}`}
              className={`reveal reveal-delay-${i + 1} glass-card rounded-2xl p-6 card-hover flex flex-col`}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].slice(0, r.stars).map((n) => (
                  <Star
                    key={n}
                    className="w-4 h-4 fill-[oklch(0.78_0.18_60)] text-[oklch(0.78_0.18_60)]"
                  />
                ))}
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6 italic">
                &ldquo;{r.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {r.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {r.name}
                  </p>
                  <p className="text-muted-foreground text-xs">{r.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[oklch(0.45_0.18_250/0.08)] blur-[100px] pointer-events-none" />
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14 reveal">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">
            Get In Touch
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
            Let's <span className="gradient-text">Connect</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Form */}
          <div className="reveal glass-card rounded-2xl p-8">
            <h3 className="font-display font-bold text-xl text-foreground mb-6">
              Send a Message
            </h3>

            {sent && (
              <div
                data-ocid="contact.success_state"
                className="flex items-center gap-2 p-4 rounded-xl bg-[oklch(0.55_0.18_150/0.15)] border border-[oklch(0.55_0.18_150/0.3)] text-[oklch(0.75_0.15_150)] mb-6 text-sm"
              >
                <CheckCircle className="w-4 h-4" />
                Message sent! I'll get back to you within 24 hours.
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="text-xs font-semibold text-muted-foreground mb-1.5 block"
                >
                  Full Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  data-ocid="contact.input"
                  placeholder="Your full name"
                  className="w-full bg-[oklch(0.18_0.025_265)] border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="text-xs font-semibold text-muted-foreground mb-1.5 block"
                >
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  data-ocid="contact.input"
                  placeholder="your@email.com"
                  className="w-full bg-[oklch(0.18_0.025_265)] border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="text-xs font-semibold text-muted-foreground mb-1.5 block"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  data-ocid="contact.textarea"
                  placeholder="Tell me about your project..."
                  className="w-full bg-[oklch(0.18_0.025_265)] border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                data-ocid="contact.submit_button"
                className="btn-shimmer text-white font-semibold py-3 rounded-xl text-sm mt-2"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="reveal reveal-delay-2 flex flex-col gap-6">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-bold text-xl text-foreground mb-6">
                Contact Info
              </h3>
              <div className="flex flex-col gap-4">
                <a
                  href="mailto:habibhosen377@gmail.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-semibold text-foreground">
                      habibhosen377@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="tel:01931353304"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-semibold text-foreground">
                      01931353304
                    </p>
                  </div>
                </a>

                <a
                  href="https://wa.me/8801931353304"
                  target="_blank"
                  rel="noreferrer"
                  data-ocid="contact.primary_button"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[oklch(0.55_0.18_150/0.8)] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">WhatsApp</p>
                    <p className="text-sm font-semibold text-foreground">
                      Chat on WhatsApp
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Social links */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Follow Me</h3>
              <div className="flex gap-3">
                {[
                  {
                    icon: <Facebook className="w-4 h-4" />,
                    href: "https://facebook.com",
                    label: "Facebook",
                    color: "bg-[oklch(0.5_0.15_270/0.3)]",
                  },
                  {
                    icon: <Linkedin className="w-4 h-4" />,
                    href: "https://linkedin.com",
                    label: "LinkedIn",
                    color: "bg-[oklch(0.5_0.15_250/0.3)]",
                  },
                  {
                    icon: <MessageCircle className="w-4 h-4" />,
                    href: "https://wa.me/8801931353304",
                    label: "WhatsApp",
                    color: "bg-[oklch(0.55_0.18_150/0.3)]",
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center text-foreground hover:scale-110 transition-transform`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/8801931353304"
              target="_blank"
              rel="noreferrer"
              data-ocid="contact.secondary_button"
              className="btn-shimmer text-white font-semibold py-4 rounded-2xl text-center text-sm flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Message Me on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-foreground">
                Habib <span className="gradient-text">Skill Hub</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Digital Marketing Specialist helping businesses grow online with
              proven strategies.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-3">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                "Home",
                "About",
                "Services",
                "Portfolio",
                "Testimonials",
                "Contact",
              ].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-3">
              Contact
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>habibhosen377@gmail.com</li>
              <li>01931353304</li>
              <li className="flex gap-3 mt-2">
                {[
                  {
                    icon: <Facebook className="w-4 h-4" />,
                    href: "https://facebook.com",
                    label: "Facebook",
                  },
                  {
                    icon: <Linkedin className="w-4 h-4" />,
                    href: "https://linkedin.com",
                    label: "LinkedIn",
                  },
                  {
                    icon: <MessageCircle className="w-4 h-4" />,
                    href: "https://wa.me/8801931353304",
                    label: "WhatsApp",
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {s.icon}
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {year} Habib Skill Hub | All Rights Reserved</p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

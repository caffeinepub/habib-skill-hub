import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  BarChart2,
  CheckCircle2,
  ChevronRight,
  Funnel,
  Heart,
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
import { useEffect, useRef, useState } from "react";
import {
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiWhatsapp,
} from "react-icons/si";

// ───────────────────────── Helpers ─────────────────────────

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
      { threshold: 0.12 },
    );
    const els = document.querySelectorAll(
      ".section-reveal, .section-reveal-left, .section-reveal-right",
    );
    for (const el of els) observer.observe(el);
    return () => observer.disconnect();
  }, []);
}

function useProgressBars() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll(".progress-bar");
            for (const bar of bars) (bar as Element).classList.add("animate");
          }
        }
      },
      { threshold: 0.3 },
    );
    const container = document.getElementById("skills-container");
    if (container) observer.observe(container);
    return () => observer.disconnect();
  }, []);
}

// ───────────────────────── Data ─────────────────────────

const services = [
  {
    icon: <Target className="w-7 h-7" />,
    title: "Facebook Ads Management",
    desc: "High-converting ad campaigns with precise audience targeting, A/B testing, and relentless optimization for maximum ROAS.",
    color: "purple",
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: "Lead Generation (B2B & Local)",
    desc: "Proven funnels that attract qualified leads for local businesses and B2B companies, filling your pipeline with real prospects.",
    color: "blue",
  },
  {
    icon: <Search className="w-7 h-7" />,
    title: "SEO Optimization",
    desc: "Technical and on-page SEO strategies that rank your website on Google's first page, driving organic traffic 24/7.",
    color: "purple",
  },
  {
    icon: <Share2 className="w-7 h-7" />,
    title: "Social Media Marketing",
    desc: "Strategic content, community management, and paid promotions across platforms to build brand authority and engagement.",
    color: "blue",
  },
  {
    icon: <Funnel className="w-7 h-7" />,
    title: "Funnel & Conversion Optimization",
    desc: "End-to-end sales funnels designed to turn visitors into paying customers with compelling copy, design, and follow-up sequences.",
    color: "purple",
  },
];

const whyChooseMe = [
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "High ROI Strategies",
    desc: "Every campaign is built around measurable returns. Your ad spend works harder with data-backed decisions.",
  },
  {
    icon: <BarChart2 className="w-6 h-6" />,
    title: "Data-Driven Marketing",
    desc: "No guesswork — every decision is informed by real analytics, audience insights, and performance data.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Fast Communication",
    desc: "You'll never be left waiting. I respond quickly, provide regular updates, and keep you in the loop always.",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Client-Focused Approach",
    desc: "Your goals become my goals. I'm invested in your success and treat your business as if it were my own.",
  },
];

const portfolio = [
  {
    client: "Med Spa Marketing",
    category: "Facebook Ads + Landing Page",
    headline: "+320% More Leads in 60 Days",
    results: [
      { label: "Leads/Week", before: "10", after: "42" },
      { label: "Cost Per Lead", before: "$48", after: "$11" },
      { label: "ROAS", before: "1.2x", after: "4.1x" },
    ],
    color: "purple",
  },
  {
    client: "BrightSmile Dental NYC",
    category: "Google Ads + SEO",
    headline: "+250% Appointment Bookings",
    results: [
      { label: "Monthly Bookings", before: "40", after: "140" },
      { label: "Organic Traffic", before: "800/mo", after: "3,200/mo" },
      { label: "Conversion Rate", before: "2.1%", after: "7.4%" },
    ],
    color: "blue",
  },
  {
    client: "Downtown Eats Group",
    category: "Social Media + Local SEO",
    headline: "+180% Website Traffic",
    results: [
      { label: "Monthly Visitors", before: "1.2k", after: "3.4k" },
      { label: "Walk-ins", before: "55/wk", after: "130/wk" },
      { label: "Google Ranking", before: "Page 3", after: "#1" },
    ],
    color: "purple",
  },
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Owner, Luxe Med Spa Miami",
    quote:
      "Habib completely transformed our lead generation. Within just 2 months we went from 10 leads per week to over 40. The ROI has been incredible — I wish I'd found him sooner.",
    rating: 5,
    initials: "SM",
    color: "purple",
  },
  {
    name: "Dr. James Nguyen",
    role: "Dentist, BrightSmile Dental NYC",
    quote:
      "Our monthly appointments literally doubled. Habib genuinely understands healthcare marketing — he's not just running ads, he's growing your practice with real strategy.",
    rating: 5,
    initials: "JN",
    color: "blue",
  },
  {
    name: "Maria Gonzalez",
    role: "Manager, Downtown Eats Group",
    quote:
      "We saw a 180% jump in online traffic and a noticeable boost in walk-in customers within weeks. Professional, responsive, and delivers beyond what he promises.",
    rating: 5,
    initials: "MG",
    color: "purple",
  },
];

const pricing = [
  {
    name: "Basic",
    price: "$499",
    period: "/mo",
    desc: "Perfect for small businesses starting with digital ads.",
    features: [
      "Facebook Ads Setup",
      "1 Ad Campaign",
      "Monthly Report",
      "Email Support",
      "Ad Copy Writing",
    ],
    popular: false,
    color: "blue",
  },
  {
    name: "Standard",
    price: "$999",
    period: "/mo",
    desc: "Most popular — ideal for growth-stage businesses.",
    features: [
      "3 Ad Campaigns",
      "SEO + Facebook Ads",
      "Lead Gen Funnel",
      "Bi-weekly Reports",
      "Priority Support",
      "Landing Page Optimization",
    ],
    popular: true,
    color: "purple",
  },
  {
    name: "Premium",
    price: "$1,999",
    period: "/mo",
    desc: "Full-service marketing for scaling businesses.",
    features: [
      "Unlimited Campaigns",
      "SEO + SMM + Facebook Ads",
      "Full Funnel Strategy",
      "Weekly Reports",
      "Dedicated Manager",
      "24/7 Priority Support",
    ],
    popular: false,
    color: "blue",
  },
];

const skills = [
  { name: "Facebook Ads", pct: 95 },
  { name: "SEO Optimization", pct: 90 },
  { name: "Lead Generation", pct: 88 },
  { name: "Social Media Marketing", pct: 85 },
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

// ───────────────────────── Components ─────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
      data-ocid="nav.panel"
    >
      <div className="container mx-auto px-4">
        <div
          className={`flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${
            scrolled ? "glass-card shadow-lg" : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2"
            data-ocid="nav.link"
          >
            <span className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center font-display font-bold text-white text-sm">
              H
            </span>
            <span className="font-display font-bold text-lg gradient-text hidden sm:block">
              Habib Skill Hub
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid="nav.link"
                className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="#contact">
              <Button
                data-ocid="nav.primary_button"
                className="gradient-btn text-white font-semibold px-5 py-2 rounded-xl border-0"
              >
                LET'S WORK
              </Button>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden mt-2 glass-card rounded-2xl p-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid="nav.link"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              data-ocid="nav.primary_button"
              className="gradient-btn text-white font-semibold w-full mt-2 rounded-xl border-0 inline-flex items-center justify-center px-4 py-2 text-sm"
            >
              LET'S WORK
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      data-ocid="hero.section"
    >
      {/* Aurora background */}
      <div className="absolute inset-0 grid-dot-bg opacity-30" />
      {/* Centred halo orb sits directly behind headline for dramatic atmospheric glow */}
      <div
        className="aurora-orb aurora-orb-1"
        style={{
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0.55,
        }}
      />
      <div
        className="aurora-orb aurora-orb-2"
        style={{ top: "55%", right: "-8%" }}
      />
      <div
        className="aurora-orb aurora-orb-3"
        style={{ bottom: "5%", left: "5%", opacity: 0.3 }}
      />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Kicker */}
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 animate-fadeInUp">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-muted-foreground font-medium">
              Available for New Projects
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl xl:text-[6rem] leading-[1.05] mb-8 animate-fadeInUp tracking-tight">
            I Help Businesses Scale to{" "}
            <span className="gradient-text">6-Figure Revenue</span> with Digital
            Marketing
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground/90 mb-10 animate-fadeInUp tracking-wide font-medium">
            <span className="text-foreground/90">Facebook Ads Expert</span>
            <span className="mx-3 gradient-text font-bold text-xl">✦</span>
            <span className="text-foreground/90">SEO Specialist</span>
            <span className="mx-3 gradient-text font-bold text-xl">✦</span>
            <span className="text-foreground/90">Lead Generation Pro</span>
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 animate-fadeInUp">
            <a href="#contact">
              <Button
                data-ocid="hero.primary_button"
                className="gradient-btn text-white font-bold px-8 py-4 text-lg rounded-2xl border-0 min-w-[160px]"
              >
                Hire Me
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
            <a
              href="https://wa.me/8801931353304"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                data-ocid="hero.secondary_button"
                variant="outline"
                className="px-8 py-4 text-lg rounded-2xl border-border/60 hover:border-primary/60 bg-white/5 hover:bg-white/10 font-semibold min-w-[220px]"
              >
                Book a Free Consultation
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { num: "50+", label: "Happy Clients" },
              { num: "3.2x", label: "Average ROAS" },
              { num: "2+", label: "Years Experience" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-card rounded-2xl px-6 py-4 text-center neon-border-purple"
              >
                <div className="font-display font-bold text-2xl gradient-text">
                  {stat.num}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-24 relative" data-ocid="about.section">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Portrait */}
          <div className="section-reveal-left flex justify-center">
            <div className="relative">
              <div className="relative w-72 h-80 lg:w-80 lg:h-96 rounded-3xl overflow-hidden neon-border-purple animate-pulse-glow">
                <img
                  src="/assets/generated/habib-profile.dim_600x700.jpg"
                  alt="Habib Hosen"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 glass-card neon-border-blue rounded-2xl px-4 py-3 animate-float">
                <div className="font-display font-bold text-xl gradient-text-blue">
                  2+
                </div>
                <div className="text-xs text-muted-foreground">Years Exp.</div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="section-reveal-right">
            <Badge className="mb-4 gradient-bg border-0 text-white font-medium">
              About Me
            </Badge>
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-5">
              Turning Digital Strategies into{" "}
              <span className="gradient-text">Real Revenue</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              I'm <strong className="text-foreground">Habib Hosen</strong>, a
              passionate Digital Marketing Expert with 2+ years of hands-on
              experience helping businesses generate leads, increase ROI, and
              dominate their market online. I specialize in Facebook Ads, SEO,
              and lead generation systems that deliver real, measurable results.
            </p>

            {/* Metrics row */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { num: "50+", label: "Clients Served" },
                { num: "3.2x", label: "Avg. ROAS" },
                { num: "95%", label: "Retention Rate" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="glass-card rounded-xl p-4 text-center"
                >
                  <div className="font-display font-bold text-xl gradient-text">
                    {m.num}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div id="skills-container" className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-foreground">
                      {skill.name}
                    </span>
                    <span className="text-muted-foreground">{skill.pct}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-muted">
                    <div
                      className="progress-bar"
                      style={
                        {
                          "--progress-width": `${skill.pct}%`,
                        } as React.CSSProperties
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section
      id="services"
      className="py-24 relative"
      data-ocid="services.section"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-14 section-reveal">
          <Badge className="mb-4 gradient-bg border-0 text-white font-medium">
            What I Offer
          </Badge>
          <h2 className="font-display font-bold text-3xl lg:text-4xl">
            Services That Drive{" "}
            <span className="gradient-text">Measurable Growth</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="section-reveal glass-card-hover rounded-2xl p-6"
              style={{ transitionDelay: `${i * 80}ms` }}
              data-ocid={`services.item.${i + 1}`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
                  s.color === "purple"
                    ? "bg-primary/15 text-primary"
                    : "bg-secondary/15 text-secondary"
                }`}
              >
                {s.icon}
              </div>
              <h3 className="font-display font-bold text-lg mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseMeSection() {
  return (
    <section className="py-24 relative" data-ocid="why.section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14 section-reveal">
          <Badge className="mb-4 gradient-bg border-0 text-white font-medium">
            Why Choose Me
          </Badge>
          <h2 className="font-display font-bold text-3xl lg:text-4xl">
            Built on <span className="gradient-text">Results & Trust</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseMe.map((item, i) => (
            <div
              key={item.title}
              className="section-reveal glass-card-hover rounded-2xl p-6 text-center"
              style={{ transitionDelay: `${i * 80}ms` }}
              data-ocid={`why.item.${i + 1}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/15 text-primary flex items-center justify-center mx-auto mb-5">
                {item.icon}
              </div>
              <h3 className="font-display font-bold text-base mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="py-24 relative"
      data-ocid="portfolio.section"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-14 section-reveal">
          <Badge className="mb-4 gradient-bg border-0 text-white font-medium">
            Success Stories
          </Badge>
          <h2 className="font-display font-bold text-3xl lg:text-4xl">
            Real Campaigns. <span className="gradient-text">Real Results.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((p, i) => (
            <div
              key={p.client}
              className="section-reveal glass-card-hover rounded-2xl overflow-hidden"
              style={{ transitionDelay: `${i * 100}ms` }}
              data-ocid={`portfolio.item.${i + 1}`}
            >
              {/* Header */}
              <div
                className={`p-6 ${
                  p.color === "purple"
                    ? "bg-gradient-to-br from-primary/20 to-transparent"
                    : "bg-gradient-to-br from-secondary/20 to-transparent"
                }`}
              >
                <Badge
                  className={`mb-3 text-xs ${
                    p.color === "purple"
                      ? "bg-primary/20 text-primary border-primary/30"
                      : "bg-secondary/20 text-secondary border-secondary/30"
                  }`}
                >
                  {p.category}
                </Badge>
                <h3 className="font-display font-bold text-lg mb-1">
                  {p.client}
                </h3>
                <p
                  className={`font-bold text-2xl ${
                    p.color === "purple"
                      ? "gradient-text"
                      : "gradient-text-blue"
                  }`}
                >
                  {p.headline}
                </p>
              </div>
              {/* Results */}
              <div className="p-6 space-y-3">
                {p.results.map((r) => (
                  <div
                    key={r.label}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm text-muted-foreground">
                      {r.label}
                    </span>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-destructive/80 line-through">
                        {r.before}
                      </span>
                      <ChevronRight className="w-3 h-3 text-muted-foreground" />
                      <span className="font-bold text-emerald-400">
                        {r.after}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-24 relative" data-ocid="testimonials.section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14 section-reveal">
          <Badge className="mb-4 gradient-bg border-0 text-white font-medium">
            Client Reviews
          </Badge>
          <h2 className="font-display font-bold text-3xl lg:text-4xl">
            What My Clients <span className="gradient-text">Say About Me</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="section-reveal glass-card-hover rounded-2xl p-6"
              style={{ transitionDelay: `${i * 100}ms` }}
              data-ocid={`testimonials.item.${i + 1}`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              {/* Quote */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>
              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white ${
                    t.color === "purple" ? "gradient-bg" : "bg-secondary"
                  }`}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-24 relative"
      data-ocid="pricing.section"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-14 section-reveal">
          <Badge className="mb-4 gradient-bg border-0 text-white font-medium">
            Pricing
          </Badge>
          <h2 className="font-display font-bold text-3xl lg:text-4xl">
            Transparent Packages for{" "}
            <span className="gradient-text">Every Stage</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricing.map((plan, i) => (
            <div
              key={plan.name}
              className={`section-reveal rounded-2xl p-6 flex flex-col relative ${
                plan.popular
                  ? "pricing-popular scale-[1.08] z-10"
                  : "glass-card-hover"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
              data-ocid={`pricing.item.${i + 1}`}
            >
              {plan.popular && (
                <>
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-violet-500 via-purple-400 to-blue-500" />
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="gradient-bg border-0 text-white text-xs px-4 py-1.5 font-bold tracking-widest shadow-lg shadow-purple-500/40">
                      ★ MOST POPULAR
                    </Badge>
                  </div>
                </>
              )}
              <div className="mb-6">
                <h3 className="font-display font-bold text-xl mb-1">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {plan.desc}
                </p>
                <div className="flex items-end gap-1">
                  <span className="font-display font-bold text-4xl gradient-text">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground mb-1">
                    {plan.period}
                  </span>
                </div>
              </div>
              <ul className="space-y-3 flex-1 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact">
                <Button
                  data-ocid={`pricing.primary_button.${i + 1}`}
                  className={`w-full rounded-xl font-semibold border-0 ${
                    plan.popular
                      ? "gradient-btn text-white"
                      : "bg-white/10 hover:bg-white/15 text-foreground"
                  }`}
                >
                  Get Started
                </Button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="py-24 relative"
      data-ocid="contact.section"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-14 section-reveal">
          <Badge className="mb-4 gradient-bg border-0 text-white font-medium">
            Get In Touch
          </Badge>
          <h2 className="font-display font-bold text-3xl lg:text-4xl">
            Ready to <span className="gradient-text">Scale Your Business?</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Let's discuss your project and see how I can help you hit your
            marketing goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <div className="section-reveal-left space-y-6">
            <h3 className="font-display font-bold text-xl mb-6">
              Contact Information
            </h3>

            {[
              {
                icon: <Mail className="w-5 h-5" />,
                label: "Email",
                value: "habibhosen377@gmail.com",
                href: "mailto:habibhosen377@gmail.com",
              },
              {
                icon: <Phone className="w-5 h-5" />,
                label: "Phone / WhatsApp",
                value: "01931353304",
                href: "tel:+8801931353304",
              },
              {
                icon: <MessageCircle className="w-5 h-5" />,
                label: "WhatsApp Chat",
                value: "Chat on WhatsApp",
                href: "https://wa.me/8801931353304",
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                data-ocid="contact.link"
                className="flex items-center gap-4 glass-card rounded-2xl p-4 hover:border-primary/50 transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">
                    {item.label}
                  </div>
                  <div className="text-sm font-medium group-hover:text-primary transition-colors">
                    {item.value}
                  </div>
                </div>
              </a>
            ))}

            {/* Social links */}
            <div className="flex gap-3 pt-4">
              {[
                {
                  icon: <SiFacebook />,
                  href: "https://www.facebook.com/share/1CdhgyhRwr/",
                  label: "Facebook",
                },
                {
                  icon: <SiInstagram />,
                  href: "https://www.instagram.com/habib.marketor",
                  label: "Instagram",
                },
                {
                  icon: <SiLinkedin />,
                  href: "https://www.linkedin.com/in/md-habib-molla-33734937a",
                  label: "LinkedIn",
                },
                {
                  icon: <SiWhatsapp />,
                  href: "https://wa.me/8801931353304",
                  label: "WhatsApp",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  data-ocid="contact.link"
                  aria-label={s.label}
                  className="w-11 h-11 glass-card rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all text-lg"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="section-reveal-right">
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-8 space-y-5"
              data-ocid="contact.panel"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="text-sm font-medium mb-2 block"
                >
                  Your Name
                </label>
                <Input
                  id="contact-name"
                  data-ocid="contact.input"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                  className="bg-muted/50 border-border/50 focus:border-primary/70 rounded-xl"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="text-sm font-medium mb-2 block"
                >
                  Email Address
                </label>
                <Input
                  id="contact-email"
                  data-ocid="contact.input"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                  className="bg-muted/50 border-border/50 focus:border-primary/70 rounded-xl"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="text-sm font-medium mb-2 block"
                >
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  data-ocid="contact.textarea"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  required
                  rows={5}
                  className="bg-muted/50 border-border/50 focus:border-primary/70 rounded-xl resize-none"
                />
              </div>
              <Button
                type="submit"
                data-ocid="contact.submit_button"
                className="w-full gradient-btn text-white font-semibold py-3 rounded-xl border-0 text-base"
              >
                {submitted ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Message Sent!
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send Message <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
              {submitted && (
                <p
                  className="text-emerald-400 text-sm text-center"
                  data-ocid="contact.success_state"
                >
                  ✓ I'll get back to you within 24 hours!
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer
      className="border-t border-border/50 pt-14 pb-6"
      data-ocid="footer.section"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center font-display font-bold text-white text-sm">
                H
              </span>
              <span className="font-display font-bold text-xl gradient-text">
                Habib Skill Hub
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Premium digital marketing services that turn clicks into clients
              and campaigns into revenue.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                {
                  icon: <SiFacebook />,
                  href: "https://www.facebook.com/share/1CdhgyhRwr/",
                  label: "Facebook",
                },
                {
                  icon: <SiInstagram />,
                  href: "https://www.instagram.com/habib.marketor",
                  label: "Instagram",
                },
                {
                  icon: <SiLinkedin />,
                  href: "https://www.linkedin.com/in/md-habib-molla-33734937a",
                  label: "LinkedIn",
                },
                {
                  icon: <SiWhatsapp />,
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
                  data-ocid="footer.link"
                  className="w-9 h-9 glass-card rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all text-base"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-bold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-ocid="footer.link"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h4 className="font-display font-bold text-sm mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                "Facebook Ads",
                "SEO Optimization",
                "Lead Generation",
                "Social Media",
                "Funnel Building",
              ].map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    data-ocid="footer.link"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {year} Habib Skill Hub. All rights reserved.</p>
          <p>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/8801931353304"
      target="_blank"
      rel="noreferrer"
      data-ocid="whatsapp.button"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-emerald-500 hover:bg-emerald-400 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-110 text-2xl"
      style={{ boxShadow: "0 4px 24px rgba(52,211,153,0.4)" }}
    >
      <SiWhatsapp />
    </a>
  );
}

// ───────────────────────── App ─────────────────────────

export default function App() {
  useScrollReveal();
  useProgressBars();

  // SEO meta tags
  useEffect(() => {
    document.title =
      "Habib Hosen | Digital Marketing Expert – Facebook Ads, SEO & Lead Generation";
    const setMeta = (name: string, content: string, prop = false) => {
      const attr = prop ? "property" : "name";
      let el = document.querySelector(
        `meta[${attr}="${name}"]`,
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };
    setMeta(
      "description",
      "Habib Hosen – Digital Marketing Expert specializing in Facebook Ads, SEO, and Lead Generation. 50+ clients served, 3.2x average ROAS.",
    );
    setMeta("og:title", "Habib Hosen | Habib Skill Hub", true);
    setMeta(
      "og:description",
      "Premium digital marketing services. Facebook Ads, SEO, Lead Generation & more.",
      true,
    );
    setMeta("og:type", "website", true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "Habib Hosen | Digital Marketing Expert");
    setMeta(
      "twitter:description",
      "Facebook Ads Expert | SEO Specialist | Lead Generation Pro",
    );
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WhyChooseMeSection />
        <PortfolioSection />
        <TestimonialsSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

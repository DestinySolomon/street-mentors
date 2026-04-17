import React, { useState, useEffect } from "react";
import streetOutreachImg from "./assets/street-outreach.jpg";
import backToSchoolImg from "./assets/back-to-school.jpg";
import healthWellnessImg from "./assets/health-and-wellness.jpg";
import vocationalSkillsImg from "./assets/vocational-skills-training.jpg";
import familyReunificationImg from "./assets/family-reunification.jpg";
import childRightsImg from "./assets/child-rights-advocacy.jpg";
import compassionImg from "./assets/compassion.jpg";

const impactStats = [
  {
    id: "children",
    icon: "ri-user-heart-line",
    target: 500,
    suffix: "+",
    label: "Children Empowered",
    sub: "Directly supported through our programs",
  },
  {
    id: "programs",
    icon: "ri-community-line",
    target: 15,
    suffix: "+",
    label: "Active Programs",
    sub: "Running across Akwa Ibom State",
  },
  {
    id: "years",
    icon: "ri-calendar-check-line",
    target: 8,
    suffix: "+",
    label: "Years of Impact",
    sub: "Serving vulnerable children since 2016",
  },
  {
    id: "volunteers",
    icon: "ri-team-line",
    target: 200,
    suffix: "+",
    label: "Volunteers",
    sub: "Dedicated mentors and community workers",
  },
];

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [impactCounts, setImpactCounts] = useState({
    children: 0,
    programs: 0,
    years: 0,
    volunteers: 0,
  });
  const [impactStarted, setImpactStarted] = useState(false);

  // Scroll effects & smooth scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  useEffect(() => {
    const section = document.getElementById("impact");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImpactStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!impactStarted) return;

    const duration = 1200;
    const intervalTime = 40;
    const steps = Math.ceil(duration / intervalTime);
    const increments = impactStats.reduce((acc, item) => {
      acc[item.id] = Math.max(Math.ceil(item.target / steps), 1);
      return acc;
    }, {});

    const interval = window.setInterval(() => {
      setImpactCounts((prev) => {
        let complete = true;
        const next = impactStats.reduce((acc, item) => {
          const current = prev[item.id];
          const updated =
            current < item.target
              ? Math.min(current + increments[item.id], item.target)
              : current;
          if (updated < item.target) complete = false;
          acc[item.id] = updated;
          return acc;
        }, {});

        if (complete) {
          window.clearInterval(interval);
        }

        return next;
      });
    }, intervalTime);

    return () => window.clearInterval(interval);
  }, [impactStarted]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <main className="min-h-screen">
      {/* Top Bar - same as original */}
      <div
        className={`fixed top-0 left-0 w-full z-[60] transition-transform duration-400 translate-y-0 ${scrolled ? "hidden" : ""}`}
      >
        <div className="bg-[#0F2535] text-white/80 text-xs">
          <div className="max-w-7xl mx-auto px-4 md:px-8 h-10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-5 flex-wrap">
              <a
                href="tel:+2348137964331"
                className="flex items-center gap-1.5 hover:text-[#FFC107] transition-colors duration-200 whitespace-nowrap"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-phone-line text-[#FFC107]"></i>
                </span>
                0813 796 4331
              </a>
              <a
                href="https://streetmentors.org"
                target="_blank"
                rel="nofollow noreferrer"
                className="hidden sm:flex items-center gap-1.5 hover:text-[#FFC107] transition-colors duration-200 whitespace-nowrap"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-global-line text-[#FFC107]"></i>
                </span>
                streetmentors.org
              </a>
              <span className="hidden md:flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-map-pin-line text-[#FFC107]"></i>
                </span>
                Uyo, Akwa Ibom, Nigeria
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-white/40 text-xs mr-2 hidden sm:inline whitespace-nowrap">
                Follow us:
              </span>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="nofollow noreferrer"
                aria-label="Facebook"
                className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#FFC107]/20 hover:text-[#FFC107] transition-all duration-200 cursor-pointer"
              >
                <i className="ri-facebook-fill text-sm"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="nofollow noreferrer"
                aria-label="Twitter/X"
                className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#FFC107]/20 hover:text-[#FFC107] transition-all duration-200 cursor-pointer"
              >
                <i className="ri-twitter-x-line text-sm"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="nofollow noreferrer"
                aria-label="Instagram"
                className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#FFC107]/20 hover:text-[#FFC107] transition-all duration-200 cursor-pointer"
              >
                <i className="ri-instagram-line text-sm"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="nofollow noreferrer"
                aria-label="LinkedIn"
                className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#FFC107]/20 hover:text-[#FFC107] transition-all duration-200 cursor-pointer"
              >
                <i className="ri-linkedin-fill text-sm"></i>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="nofollow noreferrer"
                aria-label="YouTube"
                className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#FFC107]/20 hover:text-[#FFC107] transition-all duration-200 cursor-pointer"
              >
                <i className="ri-youtube-line text-sm"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - dynamic background */}
      <nav
        className={`fixed left-0 w-full z-50 transition-all duration-400 ${scrolled ? "top-0 bg-[#1A3A52] shadow-lg py-2" : "top-10 bg-transparent py-4"}`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("hero");
            }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              alt="Street Mentors Network Logo"
              className="w-10 h-10 rounded-full object-cover"
              src="https://static.readdy.ai/image/8727c3250015317dea072b3ffdd3c259/6b29a6f0b19968069e7251af2d72f3c2.jpeg"
            />
            <span
              className={`font-bold text-lg whitespace-nowrap transition-colors duration-300 text-white`}
            >
              Street Mentors Network
            </span>
          </a>
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("hero");
                }}
                className="text-sm font-medium transition-colors duration-300 hover:text-[#FFC107] cursor-pointer whitespace-nowrap text-white"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("about");
                }}
                className="text-sm font-medium transition-colors duration-300 hover:text-[#FFC107] cursor-pointer whitespace-nowrap text-white"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#mission"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("mission");
                }}
                className="text-sm font-medium transition-colors duration-300 hover:text-[#FFC107] cursor-pointer whitespace-nowrap text-white"
              >
                Mission
              </a>
            </li>
            <li>
              <a
                href="#impact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("impact");
                }}
                className="text-sm font-medium transition-colors duration-300 hover:text-[#FFC107] cursor-pointer whitespace-nowrap text-white"
              >
                Impact
              </a>
            </li>
            <li>
              <a
                href="#programs"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("programs");
                }}
                className="text-sm font-medium transition-colors duration-300 hover:text-[#FFC107] cursor-pointer whitespace-nowrap text-white"
              >
                Programs
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                className="text-sm font-medium transition-colors duration-300 hover:text-[#FFC107] cursor-pointer whitespace-nowrap text-white"
              >
                Contact
              </a>
            </li>
          </ul>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
            className="hidden md:inline-flex items-center gap-2 bg-[#FFC107] text-[#1A3A52] font-semibold px-5 py-2 rounded-full text-sm hover:bg-yellow-400 transition-colors duration-300 whitespace-nowrap cursor-pointer"
          >
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-hand-coin-line"></i>
            </span>
            Donate Now
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-2xl transition-colors duration-300 text-white"
            aria-label="Toggle menu"
          >
            <i className="ri-menu-line"></i>
          </button>
        </div>
        <div
          className={`md:hidden overflow-hidden transition-all duration-400 bg-white shadow-lg ${mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("hero");
              }}
              className="text-[#1A3A52] font-medium text-base hover:text-[#FFC107] transition-colors cursor-pointer"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("about");
              }}
              className="text-[#1A3A52] font-medium text-base hover:text-[#FFC107] transition-colors cursor-pointer"
            >
              About
            </a>
            <a
              href="#mission"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("mission");
              }}
              className="text-[#1A3A52] font-medium text-base hover:text-[#FFC107] transition-colors cursor-pointer"
            >
              Mission
            </a>
            <a
              href="#impact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("impact");
              }}
              className="text-[#1A3A52] font-medium text-base hover:text-[#FFC107] transition-colors cursor-pointer"
            >
              Impact
            </a>
            <a
              href="#programs"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("programs");
              }}
              className="text-[#1A3A52] font-medium text-base hover:text-[#FFC107] transition-colors cursor-pointer"
            >
              Programs
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="text-[#1A3A52] font-medium text-base hover:text-[#FFC107] transition-colors cursor-pointer"
            >
              Contact
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="bg-[#FFC107] text-[#1A3A52] font-semibold px-5 py-2 rounded-full text-sm text-center hover:bg-yellow-400 transition-colors cursor-pointer"
            >
              Donate Now
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section (Full original content) */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            alt="Children empowerment"
            className="w-full h-full object-cover object-top"
            src="https://readdy.ai/api/search-image?query=Nigerian%20children%20smiling%20in%20a%20community%20outreach%20program%2C%20warm%20sunlight%2C%20hopeful%20atmosphere%2C%20colorful%20clothing%2C%20outdoor%20setting%20in%20West%20Africa%2C%20vibrant%20and%20uplifting%20scene%20with%20green%20trees%20and%20blue%20sky&width=1920&height=1080&seq=hero001&orientation=landscape"
          />
          <div className="absolute inset-0 bg-[#1A3A52]/70"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A3A52]/40 via-transparent to-[#2E7D32]/30"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 80"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
              fill="white"
            ></path>
          </svg>
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pt-44 pb-32 flex flex-col items-center text-center">
          <div>
            <img
              alt="SMN Logo"
              className="w-20 h-20 rounded-full object-cover border-4 border-[#FFC107] mx-auto mb-6 shadow-lg"
              src="https://static.readdy.ai/image/8727c3250015317dea072b3ffdd3c259/6b29a6f0b19968069e7251af2d72f3c2.jpeg"
            />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 max-w-4xl">
            Empowering Nigeria's{" "}
            <span className="text-[#FFC107]">Vulnerable</span> Children
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mb-10 leading-relaxed">
            Street Mentors Network transforms lives through care, education, and
            advocacy — protecting the rights of every child living in street
            situations across Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollToSection("contact")}
              className="flex items-center justify-center gap-2 bg-[#FFC107] text-[#1A3A52] font-bold px-8 py-4 rounded-full text-base hover:bg-yellow-400 transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-heart-line"></i>Get Involved
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="flex items-center justify-center gap-2 border-2 border-white text-white font-bold px-8 py-4 rounded-full text-base hover:bg-white hover:text-[#1A3A52] transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-hand-coin-line"></i>Donate Now
            </button>
          </div>
         
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative bg-white py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-[45%]">
              <div className="relative">
                <div className="w-full h-[420px] rounded-3xl overflow-hidden">
                  <img
                    alt="SMN community work"
                    className="w-full h-full object-cover object-top"
                    src={compassionImg}
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-[#1A3A52] text-white rounded-2xl px-6 py-4">
                  <div className="text-3xl font-extrabold text-[#FFC107]">
                    8+
                  </div>
                  <div className="text-sm font-medium mt-0.5">
                    Years of Impact
                  </div>
                </div>
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#4CAF50]/15 rounded-full"></div>
                <div className="absolute top-8 -left-8 w-12 h-12 bg-[#FFC107]/20 rounded-full"></div>
              </div>
            </div>
            <div className="w-full lg:w-[55%]">
              <span className="inline-flex items-center gap-2 bg-[#4CAF50]/10 text-[#2E7D32] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                <i className="ri-leaf-line"></i>Who We Are
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A3A52] leading-tight mb-6">
                Compassion.
                <br />
                <span className="text-[#4CAF50]">Commitment.</span>
                <br />
                Hope.
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                Street Mentors Network (SMN) is a women-owned non-profit
                organization based in Uyo, Akwa Ibom State, Nigeria. We provide
                holistic support to vulnerable children living in street
                situations — offering them a path to dignity, education, and a
                brighter future.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                Our dedicated team of mentors, social workers, and volunteers
                work tirelessly to ensure every child receives the care,
                protection, and opportunities they deserve. We believe that
                every child, regardless of their circumstances, has the right to
                thrive.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="bg-[#1A3A52]/8 text-[#1A3A52] text-sm font-medium px-4 py-1.5 rounded-full border border-[#1A3A52]/15">
                  Child Rights Advocacy
                </span>
                <span className="bg-[#1A3A52]/8 text-[#1A3A52] text-sm font-medium px-4 py-1.5 rounded-full border border-[#1A3A52]/15">
                  Education Access
                </span>
                <span className="bg-[#1A3A52]/8 text-[#1A3A52] text-sm font-medium px-4 py-1.5 rounded-full border border-[#1A3A52]/15">
                  Healthcare Support
                </span>
                <span className="bg-[#1A3A52]/8 text-[#1A3A52] text-sm font-medium px-4 py-1.5 rounded-full border border-[#1A3A52]/15">
                  Community Outreach
                </span>
              </div>
              <button
                onClick={() => scrollToSection("mission")}
                className="inline-flex items-center gap-2 bg-[#1A3A52] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#2E7D32] transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap"
              >
                Our Mission<i className="ri-arrow-right-line"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section
        id="mission"
        className="relative bg-[#F7F9FC] py-24 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg
            viewBox="0 0 1440 60"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
              fill="white"
            ></path>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-[#1A3A52]/8 text-[#1A3A52] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              <i className="ri-focus-3-line"></i>Our Mission
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A3A52] mb-4">
              Transforming Lives{" "}
              <span className="text-[#4CAF50]">Through Action</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Our work is guided by three core pillars that address the holistic
              needs of every child we serve.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "ri-book-open-line",
                title: "Education & Skills Development",
                desc: "We provide access to quality education, vocational training, and life skills programs that equip street children with tools to build sustainable futures.",
                gradient: "from-[#1A3A52] to-[#2E5F7A]",
              },
              {
                icon: "ri-heart-pulse-line",
                title: "Healthcare & Nutrition",
                desc: "Regular medical check-ups, nutritional support, and mental health services ensure every child in our care grows up healthy and strong.",
                gradient: "from-[#2E7D32] to-[#4CAF50]",
              },
              {
                icon: "ri-shield-star-line",
                title: "Advocacy & Empowerment",
                desc: "We champion children's rights through policy advocacy, community sensitization, and empowering families to create safe, nurturing environments.",
                gradient: "from-[#1A3A52] to-[#2E7D32]",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-3xl overflow-hidden hover:-translate-y-3 hover:shadow-lg cursor-default transition-all duration-700"
              >
                <div
                  className={`bg-gradient-to-br ${item.gradient} p-8 flex flex-col items-center`}
                >
                  <div className="w-20 h-20 flex items-center justify-center bg-white/15 rounded-2xl mb-4">
                    <i className={`${item.icon} text-4xl text-white`}></i>
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-bold text-[#1A3A52] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">
                    {item.desc}
                  </p>
                  <div className="flex items-center gap-2 text-[#4CAF50] font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                    <span>Learn More</span>
                    <i className="ri-arrow-right-line"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 60"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
              fill="white"
            ></path>
          </svg>
        </div>
      </section>

      {/* Impact Section */}
      <section
        id="impact"
        className="relative bg-[#1A3A52] py-24 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4CAF50]/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFC107]/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-white/10 text-[#FFC107] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              <i className="ri-bar-chart-line"></i>Our Impact
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Numbers That{" "}
              <span className="text-[#FFC107]">Tell Our Story</span>
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              Every number represents a life touched, a future changed, and a
              community strengthened.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-white/10">
            {impactStats.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center px-6 py-10 transition-all duration-700"
              >
                <div className="w-16 h-16 flex items-center justify-center bg-white/10 rounded-2xl mb-5">
                  <i className={`${item.icon} text-3xl text-[#FFC107]`}></i>
                </div>
                <div className="text-5xl md:text-6xl font-extrabold text-[#FFC107] mb-2">
                  {impactCounts[item.id]}
                  {item.suffix}
                </div>
                <div className="text-white font-bold text-lg mb-1">
                  {item.label}
                </div>
                <div className="text-white/60 text-sm">{item.sub}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => scrollToSection("programs")}
              className="inline-flex items-center gap-2 border-2 border-[#FFC107] text-[#FFC107] font-semibold px-7 py-3.5 rounded-full hover:bg-[#FFC107] hover:text-[#1A3A52] transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              See Our Programs<i className="ri-arrow-right-line"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="bg-white py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-[#4CAF50]/10 text-[#2E7D32] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              <i className="ri-apps-line"></i>Our Programs
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A3A52] mb-4">
              Current <span className="text-[#4CAF50]">Initiatives</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Six comprehensive programs designed to address every dimension of
              a child's wellbeing and future.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                img: streetOutreachImg,
                tag: "Outreach",
                tagColor: "bg-[#FFC107] text-[#1A3A52]",
                title: "Street Outreach Program",
                desc: "Our frontline teams go directly to the streets to identify, engage, and support vulnerable children — providing immediate care and connecting them to our services.",
              },
              {
                img: backToSchoolImg,
                tag: "Education",
                tagColor: "bg-[#4CAF50] text-white",
                title: "Back-to-School Initiative",
                desc: "We reintegrate street children into formal education by providing school supplies, uniforms, tuition support, and ongoing mentorship to ensure they stay in school.",
              },
              {
                img: healthWellnessImg,
                tag: "Healthcare",
                tagColor: "bg-[#1A3A52] text-white",
                title: "Health & Wellness Clinics",
                desc: "Regular mobile health clinics bring medical care, vaccinations, nutritional support, and psychosocial counseling directly to children and their families.",
              },
              {
                img: vocationalSkillsImg,
                tag: "Empowerment",
                tagColor: "bg-[#FFC107] text-[#1A3A52]",
                title: "Vocational Skills Training",
                desc: "Older youth receive hands-on training in trades like tailoring, carpentry, and digital skills — empowering them to become self-sufficient and economically independent.",
              },
              {
                img: familyReunificationImg,
                tag: "Family",
                tagColor: "bg-[#4CAF50] text-white",
                title: "Family Reunification",
                desc: "We work to safely reunite street children with their families through counseling, mediation, and follow-up support to ensure lasting, stable home environments.",
              },
              {
                img: childRightsImg,
                tag: "Advocacy",
                tagColor: "bg-[#1A3A52] text-white",
                title: "Child Rights Advocacy",
                desc: "SMN engages policymakers, communities, and the public to strengthen child protection laws and create systemic change that safeguards every child's rights.",
              },
            ].map((prog, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:-translate-y-3 hover:shadow-md cursor-default transition-all duration-700"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    alt={prog.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-600"
                    src={prog.img}
                  />
                  <span
                    className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full ${prog.tagColor}`}
                  >
                    {prog.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#1A3A52] mb-2">
                    {prog.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">
                    {prog.desc}
                  </p>
                  <button className="inline-flex items-center gap-2 text-[#4CAF50] font-semibold text-sm hover:gap-3 transition-all duration-300 cursor-pointer whitespace-nowrap">
                    Learn More<i className="ri-arrow-right-line"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-[#F7F9FC] py-24 overflow-hidden">
        <div className="w-full overflow-hidden leading-none rotate-180 -mt-1">
          <svg
            viewBox="0 0 1440 60"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
              fill="white"
            ></path>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-[#1A3A52]/8 text-[#1A3A52] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              <i className="ri-mail-line"></i>Get In Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A3A52] mb-4">
              Contact <span className="text-[#4CAF50]">Us</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Ready to make a difference? Reach out to volunteer, donate, or
              partner with us.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="w-full lg:w-[60%] bg-white rounded-3xl p-8 md:p-10">
              <h3 className="text-2xl font-bold text-[#1A3A52] mb-6">
                Send Us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#1A3A52] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      required
                      placeholder="Your full name"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A3A52] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      required
                      placeholder="your@email.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#1A3A52] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      placeholder="+234 000 000 0000"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A3A52] mb-1.5">
                      How Can We Help?
                    </label>
                    <select
                      name="subject"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors bg-white"
                      value={formData.subject}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a topic</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="donate">Donate</option>
                      <option value="partner">Partner With Us</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A3A52] mb-1.5">
                    Message *{" "}
                    <span className="text-gray-400 font-normal">
                      ({formData.message.length}/500)
                    </span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="5"
                    maxLength="500"
                    placeholder="Tell us how you'd like to get involved or any questions you have..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#4CAF50] transition-colors resize-none"
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1A3A52] text-white font-semibold px-8 py-3.5 rounded-full hover:bg-[#2E7D32] transition-all duration-300 disabled:opacity-60 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-send-plane-line"></i> Send Message
                </button>
                {formSubmitted && (
                  <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
                    Thank you! Your message has been sent.
                  </div>
                )}
              </form>
            </div>
            <div className="w-full lg:w-[40%] flex flex-col gap-6">
              <div className="bg-[#1A3A52] rounded-3xl p-8 text-white flex-1">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl shrink-0">
                      <i className="ri-map-pin-line text-[#FFC107]"></i>
                    </div>
                    <div>
                      <div className="font-semibold text-sm mb-0.5">
                        Address
                      </div>
                      <div className="text-white/70 text-sm leading-relaxed">
                        29B Ukana Offot Street, off Abak Road,
                        <br />
                        Uyo, Akwa Ibom State, Nigeria
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl shrink-0">
                      <i className="ri-phone-line text-[#FFC107]"></i>
                    </div>
                    <div>
                      <div className="font-semibold text-sm mb-0.5">Phone</div>
                      <a
                        href="tel:+2348137964331"
                        className="text-white/70 text-sm hover:text-[#FFC107] transition-colors"
                      >
                        0813 796 4331
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl shrink-0">
                      <i className="ri-global-line text-[#FFC107]"></i>
                    </div>
                    <div>
                      <div className="font-semibold text-sm mb-0.5">
                        Website
                      </div>
                      <a
                        href="https://streetmentors.org"
                        target="_blank"
                        rel="nofollow noreferrer"
                        className="text-white/70 text-sm hover:text-[#FFC107] transition-colors"
                      >
                        streetmentors.org
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl shrink-0">
                      <i className="ri-time-line text-[#FFC107]"></i>
                    </div>
                    <div>
                      <div className="font-semibold text-sm mb-0.5">
                        Business Hours
                      </div>
                      <div className="text-white/70 text-sm">
                        Monday – Friday: 8:00 AM – 5:00 PM
                        <br />
                        Saturday: 9:00 AM – 2:00 PM
                        <br />
                        Sunday: Closed
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="text-sm font-semibold mb-3">Follow Us</div>
                  <div className="flex gap-3">
                    <a
                      href="#"
                      rel="nofollow noreferrer"
                      className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-xl hover:bg-[#FFC107] hover:text-[#1A3A52] transition-all duration-300 cursor-pointer"
                    >
                      <i className="ri-facebook-fill"></i>
                    </a>
                    <a
                      href="#"
                      rel="nofollow noreferrer"
                      className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-xl hover:bg-[#FFC107] hover:text-[#1A3A52] transition-all duration-300 cursor-pointer"
                    >
                      <i className="ri-twitter-x-line"></i>
                    </a>
                    <a
                      href="#"
                      rel="nofollow noreferrer"
                      className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-xl hover:bg-[#FFC107] hover:text-[#1A3A52] transition-all duration-300 cursor-pointer"
                    >
                      <i className="ri-instagram-line"></i>
                    </a>
                    <a
                      href="#"
                      rel="nofollow noreferrer"
                      className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-xl hover:bg-[#FFC107] hover:text-[#1A3A52] transition-all duration-300 cursor-pointer"
                    >
                      <i className="ri-linkedin-fill"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden h-52">
                <iframe
                  title="SMN Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d7.9306!3d5.0527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105d5f0000000001%3A0x0!2sUkana+Offot+Street%2C+Uyo%2C+Akwa+Ibom%2C+Nigeria!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0 }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F2535] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img
                  alt="SMN Logo"
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#FFC107]"
                  src="https://static.readdy.ai/image/8727c3250015317dea072b3ffdd3c259/6b29a6f0b19968069e7251af2d72f3c2.jpeg"
                />
                <div>
                  <div className="font-bold text-base leading-tight">
                    Street Mentors
                  </div>
                  <div className="font-bold text-base leading-tight text-[#FFC107]">
                    Network
                  </div>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-5">
                Transforming lives through care, education, and advocacy for
                Nigeria's most vulnerable children.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  rel="nofollow noreferrer"
                  className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-xl hover:bg-[#FFC107] hover:text-[#1A3A52] transition-all duration-300 cursor-pointer"
                >
                  <i className="ri-facebook-fill"></i>
                </a>
                <a
                  href="#"
                  rel="nofollow noreferrer"
                  className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-xl hover:bg-[#FFC107] hover:text-[#1A3A52] transition-all duration-300 cursor-pointer"
                >
                  <i className="ri-twitter-x-line"></i>
                </a>
                <a
                  href="#"
                  rel="nofollow noreferrer"
                  className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-xl hover:bg-[#FFC107] hover:text-[#1A3A52] transition-all duration-300 cursor-pointer"
                >
                  <i className="ri-instagram-line"></i>
                </a>
                <a
                  href="#"
                  rel="nofollow noreferrer"
                  className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-xl hover:bg-[#FFC107] hover:text-[#1A3A52] transition-all duration-300 cursor-pointer"
                >
                  <i className="ri-linkedin-fill"></i>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-base mb-5 text-[#FFC107]">
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#hero"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("hero");
                    }}
                    className="text-white/60 text-sm hover:text-[#FFC107] transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <i className="ri-arrow-right-s-line text-xs"></i>Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("about");
                    }}
                    className="text-white/60 text-sm hover:text-[#FFC107] transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <i className="ri-arrow-right-s-line text-xs"></i>About
                  </a>
                </li>
                <li>
                  <a
                    href="#mission"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("mission");
                    }}
                    className="text-white/60 text-sm hover:text-[#FFC107] transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <i className="ri-arrow-right-s-line text-xs"></i>Mission
                  </a>
                </li>
                <li>
                  <a
                    href="#impact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("impact");
                    }}
                    className="text-white/60 text-sm hover:text-[#FFC107] transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <i className="ri-arrow-right-s-line text-xs"></i>Impact
                  </a>
                </li>
                <li>
                  <a
                    href="#programs"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("programs");
                    }}
                    className="text-white/60 text-sm hover:text-[#FFC107] transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <i className="ri-arrow-right-s-line text-xs"></i>Programs
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("contact");
                    }}
                    className="text-white/60 text-sm hover:text-[#FFC107] transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <i className="ri-arrow-right-s-line text-xs"></i>Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-base mb-5 text-[#FFC107]">
                Our Programs
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#programs"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("programs");
                    }}
                    className="text-white/60 text-sm hover:text-[#FFC107] transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <i className="ri-arrow-right-s-line text-xs"></i>Street
                    Outreach
                  </a>
                </li>
                <li>
                  <a
                    href="#programs"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("programs");
                    }}
                    className="text-white/60 text-sm hover:text-[#FFC107] transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <i className="ri-arrow-right-s-line text-xs"></i>
                    Back-to-School
                  </a>
                </li>
                <li>
                  <a
                    href="#programs"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("programs");
                    }}
                    className="text-white/60 text-sm hover:text-[#FFC107] transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <i className="ri-arrow-right-s-line text-xs"></i>Health
                    Clinics
                  </a>
                </li>
                <li>
                  <a
                    href="#programs"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("programs");
                    }}
                    className="text-white/60 text-sm hover:text-[#FFC107] transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <i className="ri-arrow-right-s-line text-xs"></i>Vocational
                    Training
                  </a>
                </li>
                <li>
                  <a
                    href="#programs"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("programs");
                    }}
                    className="text-white/60 text-sm hover:text-[#FFC107] transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <i className="ri-arrow-right-s-line text-xs"></i>Family
                    Reunification
                  </a>
                </li>
                <li>
                  <a
                    href="#programs"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("programs");
                    }}
                    className="text-white/60 text-sm hover:text-[#FFC107] transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <i className="ri-arrow-right-s-line text-xs"></i>Child
                    Rights
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-base mb-5 text-[#FFC107]">
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <i className="ri-map-pin-line text-[#FFC107] mt-0.5 shrink-0"></i>
                  <span className="text-white/60 text-sm leading-relaxed">
                    29B Ukana Offot Street, off Abak Road, Uyo, Akwa Ibom,
                    Nigeria
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <i className="ri-phone-line text-[#FFC107] shrink-0"></i>
                  <a
                    href="tel:+2348137964331"
                    className="text-white/60 text-sm hover:text-[#FFC107] transition-colors"
                  >
                   0808 493 5884
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <i className="ri-global-line text-[#FFC107] shrink-0"></i>
                  <a
                    href="https://streetmentors.org"
                    target="_blank"
                    rel="nofollow noreferrer"
                    className="text-white/60 text-sm hover:text-[#FFC107] transition-colors"
                  >
                    streetmentors.org
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/40 text-xs text-center sm:text-left">
              © 2026 Street Mentors Network. All rights reserved. Women-owned
              non-profit organization.
            </p>
            <p className="text-white/40 text-xs text-center sm:text-right">
              Registered NGO • Uyo, Akwa Ibom State, Nigeria
            </p>
          </div>
        </div>
      </footer>

      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center bg-[#1A3A52] text-white rounded-full transition-all duration-300 hover:bg-[#4CAF50] hover:scale-110 cursor-pointer ${showBackToTop ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`}
      >
        <i className="ri-arrow-up-line text-xl"></i>
      </button>
    </main>
  );
};

export default App;

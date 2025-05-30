"use client";

import { useState, useEffect } from "react";
import {
  Zap,
  Globe,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Code2,
  Server,
  Shield,
} from "lucide-react";
import Link from "next/link";
import AsciiHead from "../components/AsciiHead";
import TechGrid from "../components/TechGrid";

// TypeWriter effect component
const TypeWriter = ({
  sentences,
  className = "",
}: {
  sentences: string[];
  className?: string;
}) => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const sentence = sentences[currentSentenceIndex];

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          setDisplayText(sentence.substring(0, displayText.length + 1));

          if (displayText === sentence) {
            // Start deleting after showing full text for a moment
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          // Deleting
          setDisplayText(sentence.substring(0, displayText.length - 1));

          if (displayText === "") {
            setIsDeleting(false);
            setCurrentSentenceIndex(
              (currentSentenceIndex + 1) % sentences.length
            );
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentSentenceIndex, sentences]);

  return (
    <span className={`${className} inline-block`}>
      {displayText}
      <span className="animate-blink">|</span>
    </span>
  );
};

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "featured", "skills"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    setIsVisible(true);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tech skills with animated progress

  return (
    <div className="relative">
      {/* Tech Grid Background */}
      <TechGrid />

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 space-y-4 z-50">
        {["hero", "featured", "skills"].map((section) => (
          <a
            key={section}
            href={`#${section}`}
            className={`block w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === section
                ? "bg-primary-400 scale-150"
                : "bg-text-secondary/50 hover:bg-primary-400/50"
            }`}
            aria-label={`Navigate to ${section} section`}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen relative flex items-center justify-center px-4"
      >
        {/* ASCII Head Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="fixed ascii-head-wrapper">
            <AsciiHead
              size="small"
              scrollRange={[0, 2200]}
              className="ascii-head"
            />
            <style jsx>{`
              .ascii-head-wrapper {
                position: fixed;
                top: 15vh;
                right: 10vw; /* Moved further to the right */
                width: auto;
                height: auto;
                transform: rotate(3deg);
                transform-origin: center;
                overflow: visible;
                opacity: 0.4; /* Increased opacity for more brightness */
                z-index: 0;
                max-width: 30vw; /* Ensure it's not too big relative to viewport */
              }

              @media (max-width: 768px) {
                .ascii-head-wrapper {
                  top: 10vh;
                  right: 5vw;
                  transform: scale(0.7) rotate(3deg); /* Smaller scale on mobile */
                  max-width: 40vw; /* Wider relative to viewport on small screens */
                }
              }

              @media (min-width: 1280px) {
                .ascii-head-wrapper {
                  right: 15vw;
                  transform: scale(0.9) rotate(3deg); /* Slightly larger on big screens */
                }
              }

              /* Add subtle glow effect */
              .ascii-head-wrapper::after {
                content: "";
                position: absolute;
                inset: -30px;
                background: radial-gradient(
                  circle,
                  rgba(45, 212, 191, 0.08) 0%,
                  rgba(15, 118, 110, 0.03) 50%,
                  transparent 100%
                );
                border-radius: 50%;
                z-index: -1;
                pointer-events: none;
              }
            `}</style>
          </div>
        </div>

        <div
          className={`max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-10 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="space-y-8">
            <div>
              <h3 className="text-primary-400 mb-4 font-mono tracking-wider animate-fade-up">
                Computer Science Student & Tech Enthusiast
              </h3>
              <h1 className="text-4xl md:text-6xl font-bold mb-2">
                <span className="block text-text-primary animate-fade-up [animation-delay:200ms]">
                  Hi, Im <span className="gradient-text">Artur</span>
                </span>
                <div className="flex items-center gap-4">
                  <TypeWriter
                    sentences={[
                      "Lorem ipsum dolor sit amet",
                      "Nullam quis risus eget urna",
                      "Vivamus sagittis lacus vel augue",
                      "Donec sed odio dui",
                    ]}
                    className="block text-4xl md:text-6xl font-bold text-text-primary animate-fade-up [animation-delay:400ms]"
                  />
                </div>
              </h1>
            </div>

            <div className="relative">
              <p className="text-xl text-text-secondary max-w-xl animate-fade-up [animation-delay:600ms] relative z-10">
                Focusing on teleinformatics, full-stack development, and AI
                applications. Constantly learning and building projects that
                solve real-world problems.
              </p>
              <div className="absolute -bottom-2 -right-10 w-36 h-36 bg-primary-400/5 rounded-full blur-3xl"></div>
              <div className="absolute -top-10 -left-10 w-36 h-36 bg-primary-400/5 rounded-full blur-3xl"></div>
            </div>

            <div className="flex flex-wrap gap-4 animate-fade-up [animation-delay:800ms]">
              <Link
                href="/about"
                className="px-6 py-3 bg-primary-400 hover:bg-primary-400/90 text-white rounded-lg transition-all flex items-center gap-2 group"
              >
                <span>About Me</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/cv"
                className="px-6 py-3 border border-primary-400/30 hover:border-primary-400/60 rounded-lg text-text-primary hover:text-primary-400 transition-all"
              >
                Download CV
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-8 text-text-secondary animate-fade-up [animation-delay:1000ms]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-ping" />
                <span>Available for projects</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary-400 rounded-full" />
                <span>Kielce, PL</span>
              </div>
            </div>
          </div>

          {/* Right column content */}
          <div className="relative flex justify-center items-center">
            <div className="w-full max-w-md relative mx-auto">
              <div className="relative z-10 transform transition-all duration-700 animate-fade-up [animation-delay:600ms]">
                {/* Empty placeholder where AsciiHead was previously */}
              </div>
              <div className="absolute -inset-4 bg-primary-400/5 rounded-full blur-3xl z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project Section */}
      <section id="featured" className="min-h-screen py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="gradient-text">Featured Projects</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Europa Universalis IV Community",
                description:
                  "Discord server website for game community management with member profiles, event calendar, and resources.",
                icon: Globe,
                image: "",
                tags: ["HTML", "CSS", "JavaScript", "Discord"],
                link: "#",
              },
              {
                title: "AI Trading Bot",
                description:
                  "Cryptocurrency trading automation with Freqtrade featuring custom indicators and machine learning prediction models.",
                icon: Zap,
                image: "",
                tags: ["Python", "Freqtrade", "Docker", "AI/ML"],
                link: "#",
              },
            ].map((project, index) => (
              <div
                key={index}
                className="card group p-8 overflow-hidden relative hover:border-primary-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary-400/5"
              >
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>

                <div className="mb-6 relative z-10">
                  <div className="w-14 h-14 bg-primary-400/10 rounded-lg flex items-center justify-center border border-primary-400/20 group-hover:border-primary-400/40 transition-all">
                    <project.icon className="w-8 h-8 text-primary-400 group-hover:animate-pulse" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-3 relative z-10">
                  {project.title}
                </h3>
                <p className="text-text-secondary mb-6 relative z-10">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-sm rounded-full bg-primary-400/5 text-primary-400 border border-primary-400/10 hover:bg-primary-400/10 hover:border-primary-400/20 transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={project.link}
                  className="inline-flex items-center gap-2 text-text-secondary hover:text-primary-400 transition-colors group/link relative z-10"
                >
                  <span>Learn More</span>
                  <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover/link:translate-y-[-1px]" />
                </Link>

                <div className="absolute bottom-0 right-0 w-20 h-20 bg-primary-400/5 rounded-full blur-2xl group-hover:w-40 group-hover:h-40 transition-all duration-500"></div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary-400/30 hover:border-primary-400/60 rounded-lg text-text-primary hover:text-primary-400 transition-all"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="gradient-text">Skills & Expertise</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {/* Web Development Skill */}
            <div className="card p-5 group hover:border-primary-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary-400/5">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary-400/10 rounded-full flex items-center justify-center border border-primary-400/20 group-hover:border-primary-400/40 transition-all mb-4">
                  <Code2 className="w-8 h-8 text-primary-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-lg font-bold text-text-primary group-hover:text-primary-400 transition-colors mb-2">
                  Frontend Development
                </h3>
                <p className="text-text-secondary text-xs">
                  React, Next.js, TypeScript, Tailwind CSS
                </p>
              </div>
            </div>

            {/* Backend Development Skill */}
            <div className="card p-5 group hover:border-primary-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary-400/5">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary-400/10 rounded-full flex items-center justify-center border border-primary-400/20 group-hover:border-primary-400/40 transition-all mb-4">
                  <Server className="w-8 h-8 text-primary-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-lg font-bold text-text-primary group-hover:text-primary-400 transition-colors mb-2">
                  Backend Development
                </h3>
                <p className="text-text-secondary text-xs">
                  Node.js, Python, REST APIs, databases
                </p>
              </div>
            </div>

            {/* Cybersecurity Skill */}
            <div className="card p-5 group hover:border-primary-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary-400/5">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary-400/10 rounded-full flex items-center justify-center border border-primary-400/20 group-hover:border-primary-400/40 transition-all mb-4">
                  <Shield className="w-8 h-8 text-primary-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-lg font-bold text-text-primary group-hover:text-primary-400 transition-colors mb-2">
                  Cybersecurity
                </h3>
                <p className="text-text-secondary text-xs">
                  Web security, system security, pen testing
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/about#skills"
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary-400/30 hover:border-primary-400/60 rounded-lg text-text-primary hover:text-primary-400 transition-all"
            >
              <span>View All Skills</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-16">
            <div className="card p-8 relative overflow-hidden group">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary-400/10 via-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>

              <h3 className="text-2xl font-bold text-center mb-8 text-text-primary">
                Certifications & Education
              </h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-primary-400">
                    Education
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-text-primary">
                        Bachelor of Computer Science
                      </p>
                      <p className="text-text-secondary">
                        Kielce University of Technology
                      </p>
                      <p className="text-text-tertiary text-sm">
                        2022 - Present
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-primary-400">
                    Certifications
                  </h4>
                  <div className="space-y-2">
                    <p className="text-text-secondary">
                      I`ve completed 20+ online and offline courses in web
                      development, cybersecurity, AI/ML, and more.
                    </p>
                    <Link
                      href="/certificates"
                      className="inline-flex items-center gap-2 text-primary-400 hover:underline"
                    >
                      <span>View all certificates</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

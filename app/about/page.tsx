"use client";
import { useEffect, useState, useRef } from "react";
import { BookOpen, Code2, Sparkles, GraduationCap } from "lucide-react";
import Background from "@/components/Background";

export default function About() {
  const [activeSection, setActiveSection] = useState("story");

  // Create refs for each section
  const storyRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    // Set active section immediately for button highlighting
    setActiveSection(sectionId);

    // Fixed the type definition to accept null values for the refs
    const sectionRefs: {
      [key: string]: React.RefObject<HTMLDivElement | null>;
    } = {
      story: storyRef,
      skills: skillsRef,
      experience: experienceRef,
      education: educationRef,
    };

    const ref = sectionRefs[sectionId];
    if (ref && ref.current) {
      // Increased offset to ensure content is visible below the sticky navigation
      const yOffset = -160;
      const y =
        ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Check which section is in viewport with debounce for better performance
  useEffect(() => {
    let debounceTimer: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const sections = [
          { id: "story", ref: storyRef },
          { id: "skills", ref: skillsRef },
          { id: "experience", ref: experienceRef },
          { id: "education", ref: educationRef },
        ];

        // Find which section is currently most visible in the viewport
        let maxVisibility = 0;
        let mostVisibleSection = activeSection;

        for (const section of sections) {
          if (section.ref.current) {
            const rect = section.ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate how much of the section is visible
            const visibleHeight =
              Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
            const visibility =
              visibleHeight > 0 ? visibleHeight / rect.height : 0;

            if (visibility > maxVisibility) {
              maxVisibility = visibility;
              mostVisibleSection = section.id;
            }
          }
        }

        if (mostVisibleSection !== activeSection) {
          setActiveSection(mostVisibleSection);
        }
      }, 100); // 100ms debounce
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(debounceTimer);
    };
  }, [activeSection]); // Added activeSection to the dependency array

  const sections = [
    { id: "story", label: "My Story", icon: BookOpen },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "experience", label: "Experience", icon: Sparkles },
    { id: "education", label: "Education", icon: GraduationCap },
  ];

  const content = {
    story: {
      title: "My Story",
      description: `Hi, I'm Artur, an IT specialist and Computer Science student. From my first encounter with programming, I discovered that creating technological solutions is something that truly fascinates me. My strengths are determination and quick adaptation to new technologies. Besides technology, I'm interested in strategy games and organizing gaming communities on Discord.`,
      highlights: [
        "Studying Computer Science, specialization: Teleinformatics",
        "10+ completed projects in various technologies",
        "20+ technical certificates",
        "Actively supporting gaming communities",
      ],
    },
    skills: {
      categories: [
        {
          name: "Frontend",
          skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
        },
        {
          name: "Backend",
          skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST API"],
        },
        {
          name: "Cybersecurity",
          skills: [
            "Web Security",
            "Penetration Testing",
            "Application Security",
          ],
        },
        {
          name: "AI & Machine Learning",
          skills: ["TensorFlow", "PyTorch", "NLP", "Computer Vision"],
        },
        {
          name: "Other",
          skills: ["Git", "Docker", "Linux", "AWS", "CI/CD", "Agile"],
        },
      ],
    },
    experience: [
      {
        period: "Present",
        role: "Computer Science Student",
        company: "Specialization: Teleinformatics",
        description: "Development in IT security and system programming",
      },
    ],
    education: [
      {
        period: "Present",
        degree: "Bachelor's Degree - Computer Science",
        institution: "Specialization: Teleinformatics",
        description:
          "Developing competencies in IT security, system programming, and web technologies",
      },
    ],
  };

  return (
    <>
      <Background />
      <section className="container min-h-screen py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 page-heading">
            <span className="gradient-text">About Me</span>
          </h1>

          {/* Navigation Buttons */}
          <div className="sticky top-20 z-30 bg-background/20 backdrop-blur-sm py-4 px-2 rounded-lg mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all transform ${
                    activeSection === section.id
                      ? "bg-primary-400 text-background font-medium shadow-lg shadow-primary-400/25 scale-105"
                      : "bg-surface text-text-primary border-2 border-primary-400/20 hover:border-primary-400 hover:bg-primary-400/10 hover:text-primary-400"
                  }`}
                >
                  <section.icon
                    className={`w-5 h-5 ${
                      activeSection === section.id ? "animate-pulse" : ""
                    }`}
                  />
                  <span>{section.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content - All sections visible with increased top padding */}
          <div className="space-y-16 content-wrapper">
            {/* My Story Section */}
            <div
              ref={storyRef}
              id="story"
              className={`card p-8 pt-12 transition-all duration-300 ${
                activeSection === "story"
                  ? "scale-[1.02] shadow-lg shadow-primary-400/10 border-primary-400/30"
                  : ""
              }`}
            >
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                {content.story.title}
              </h2>
              <p className="text-text-secondary mb-8">
                {content.story.description}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {content.story.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-text-secondary"
                  >
                    <span className="w-2 h-2 bg-primary-400 rounded-full" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div
              ref={skillsRef}
              id="skills"
              className={`card p-8 pt-12 transition-all duration-300 ${
                activeSection === "skills"
                  ? "scale-[1.02] shadow-lg shadow-primary-400/10 border-primary-400/30"
                  : ""
              }`}
            >
              <h2 className="text-2xl font-bold text-text-primary mb-6">
                Skills
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {content.skills.categories.map((category, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-text-primary mb-4">
                      {category.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 text-sm rounded-full bg-primary-400/5 text-primary-400 border border-primary-400/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <div
              ref={experienceRef}
              id="experience"
              className={`card p-8 pt-12 transition-all duration-300 ${
                activeSection === "experience"
                  ? "scale-[1.02] shadow-lg shadow-primary-400/10 border-primary-400/30"
                  : ""
              }`}
            >
              <h2 className="text-2xl font-bold text-text-primary mb-6">
                Experience
              </h2>
              <div className="space-y-8">
                {content.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="relative pl-8 border-l border-primary-400/20"
                  >
                    <div className="absolute w-3 h-3 bg-primary-400/20 border-2 border-primary-400 rounded-full -left-[6.5px] top-2" />
                    <div className="text-sm text-primary-400 mb-1">
                      {exp.period}
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      {exp.role}
                    </h3>
                    <div className="text-text-secondary mb-2">
                      {exp.company}
                    </div>
                    <p className="text-text-secondary">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div
              ref={educationRef}
              id="education"
              className={`card p-8 pt-12 transition-all duration-300 ${
                activeSection === "education"
                  ? "scale-[1.02] shadow-lg shadow-primary-400/10 border-primary-400/30"
                  : ""
              }`}
            >
              <h2 className="text-2xl font-bold text-text-primary mb-6">
                Education
              </h2>
              <div className="space-y-8">
                {content.education.map((edu, index) => (
                  <div
                    key={index}
                    className="relative pl-8 border-l border-primary-400/20"
                  >
                    <div className="absolute w-3 h-3 bg-primary-400/20 border-2 border-primary-400 rounded-full -left-[6.5px] top-2" />
                    <div className="text-sm text-primary-400 mb-1">
                      {edu.period}
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      {edu.degree}
                    </h3>
                    <div className="text-text-secondary mb-2">
                      {edu.institution}
                    </div>
                    <p className="text-text-secondary">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

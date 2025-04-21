"use client";

import Link from "next/link";
import { Github, Globe, Star } from "lucide-react";
import Background from "@/components/Background";

const projects = [
  {
    title: "Europa Universalis IV Community Website",
    description:
      "Official Discord server website for Europa Universalis IV fans. The project enables users to access information about events, gameplay rules, and multiplayer session schedules.",
    tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    demoLink: "#",
    githubLink: "#",
    featured: true,
  },
  {
    title: "AI Trading Bot (Freqtrade)",
    description:
      "Advanced cryptocurrency trading bot using the Freqtrade platform. The project utilizes machine learning techniques to optimize investment decisions.",
    tags: ["Python", "Freqtrade", "AI & ML", "Docker"],
    demoLink: "#",
    githubLink: "#",
    featured: true,
  },
  {
    title: "Report Management System",
    description:
      "Application for automatic generation and management of Excel reports. The solution automates data analysis and reporting processes.",
    tags: ["Python", "Pandas", "OpenPyXL", "Excel Automation"],
    demoLink: "#",
    githubLink: "#",
    featured: true,
  },
];

export default function Projects() {
  return (
    <>
      <Background />
      <section className="container animate-fade-up">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="gradient-text">Projects</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <article key={index} className="card group">
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-text-primary group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <Star className="w-5 h-5 text-primary-400" />
                  )}
                </div>

                <p className="text-text-secondary mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-sm rounded-full bg-primary-400/5 text-primary-400 border border-primary-400/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-6">
                  <Link
                    href={project.demoLink}
                    className="flex items-center gap-2 text-text-secondary hover:text-primary-400 group/link"
                  >
                    <Globe className="w-5 h-5 transition-transform group-hover/link:rotate-12 animate-pulse" />
                    <span>Live Demo</span>
                  </Link>
                  <Link
                    href={project.githubLink}
                    className="flex items-center gap-2 text-text-secondary hover:text-primary-400 group/link"
                  >
                    <Github className="w-5 h-5 transition-transform group-hover/link:scale-110 animate-pulse" />
                    <span>Source Code</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

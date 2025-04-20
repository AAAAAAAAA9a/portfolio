'use client'
import { useState } from 'react';
import { BookOpen, Code2, Sparkles, GraduationCap } from 'lucide-react';
import Background from '@/components/Background';

export default function About() {
  const [activeTab, setActiveTab] = useState('story');

  const tabs = [
    { id: 'story', label: 'My Story', icon: BookOpen },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'experience', label: 'Experience', icon: Sparkles },
    { id: 'education', label: 'Education', icon: GraduationCap },
  ];

  const content = {
    story: {
      title: "My Story",
      description: `Hi, I'm Artur, an IT specialist and Computer Science student. From my first encounter with programming, I discovered that creating technological solutions is something that truly fascinates me. My strengths are determination and quick adaptation to new technologies. Besides technology, I'm interested in strategy games and organizing gaming communities on Discord.`,
      highlights: [
        "Studying Computer Science, specialization: Teleinformatics",
        "10+ completed projects in various technologies",
        "20+ technical certificates",
        "Actively supporting gaming communities"
      ]
    },
    skills: {
      categories: [
        {
          name: "Frontend",
          skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"]
        },
        {
          name: "Backend",
          skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST API"]
        },
        {
          name: "Cybersecurity",
          skills: ["Web Security", "Penetration Testing", "Application Security"]
        },
        {
          name: "AI & Machine Learning",
          skills: ["TensorFlow", "PyTorch", "NLP", "Computer Vision"]
        },
        {
          name: "Other",
          skills: ["Git", "Docker", "Linux", "AWS", "CI/CD", "Agile"]
        }
      ]
    },
    experience: [
      {
        period: "Present",
        role: "Computer Science Student",
        company: "Specialization: Teleinformatics",
        description: "Development in IT security and system programming"
      }
    ],
    education: [
      {
        period: "Present",
        degree: "Bachelor's Degree - Computer Science",
        institution: "Specialization: Teleinformatics",
        description: "Developing competencies in IT security, system programming, and web technologies"
      }
    ]
  };

  return (
    <>
      <Background />
      <section className="container min-h-screen py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="gradient-text">About Me</span>
          </h1>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-8 py-4 rounded-lg transition-all transform hover:scale-105 ${
                  activeTab === tab.id
                    ? 'bg-primary-400 text-background font-medium shadow-lg shadow-primary-400/25'
                    : 'bg-surface text-text-primary border-2 border-primary-400/20 hover:border-primary-400 hover:bg-primary-400/10 hover:text-primary-400'
                }`}
              >
                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'animate-pulse' : ''}`} />
                <span className="text-lg">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="card p-8">
            {activeTab === 'story' && (
              <div className="animate-fade-up">
                <h2 className="text-2xl font-bold text-text-primary mb-4">{content.story.title}</h2>
                <p className="text-text-secondary mb-8">{content.story.description}</p>
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
            )}

            {activeTab === 'skills' && (
              <div className="grid md:grid-cols-2 gap-8 animate-fade-up">
                {content.skills.categories.map((category, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-text-primary mb-4">{category.name}</h3>
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
            )}

            {activeTab === 'experience' && (
              <div className="space-y-8 animate-fade-up">
                {content.experience.map((exp, index) => (
                  <div key={index} className="relative pl-8 border-l border-primary-400/20">
                    <div className="absolute w-3 h-3 bg-primary-400/20 border-2 border-primary-400 rounded-full -left-[6.5px] top-2" />
                    <div className="text-sm text-primary-400 mb-1">{exp.period}</div>
                    <h3 className="text-lg font-semibold text-text-primary">{exp.role}</h3>
                    <div className="text-text-secondary mb-2">{exp.company}</div>
                    <p className="text-text-secondary">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'education' && (
              <div className="space-y-8 animate-fade-up">
                {content.education.map((edu, index) => (
                  <div key={index} className="relative pl-8 border-l border-primary-400/20">
                    <div className="absolute w-3 h-3 bg-primary-400/20 border-2 border-primary-400 rounded-full -left-[6.5px] top-2" />
                    <div className="text-sm text-primary-400 mb-1">{edu.period}</div>
                    <h3 className="text-lg font-semibold text-text-primary">{edu.degree}</h3>
                    <div className="text-text-secondary mb-2">{edu.institution}</div>
                    <p className="text-text-secondary">{edu.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}


"use client";

import { Github, Linkedin, Mail, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [hoverIcon, setHoverIcon] = useState<string | null>(null);

  const socialLinks = [
    {
      icon: Github,
      href: "#",
      label: "GitHub",
      color: "hover:text-violet-400 hover:border-violet-400/50",
    },
    {
      icon: Linkedin,
      href: "#",
      label: "LinkedIn",
      color: "hover:text-blue-400 hover:border-blue-400/50",
    },
    {
      icon: Mail,
      href: "mailto:lisowski5t@gmail.com",
      label: "Email",
      color: "hover:text-rose-400 hover:border-rose-400/50",
    },
    {
      icon: MessageSquare,
      href: "#",
      label: "Discord",
      color: "hover:text-indigo-400 hover:border-indigo-400/50",
    },
  ];
  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "CV", href: "/cv" },
    { name: "Certificates", href: "/certificates" },
  ];

  return (
    <footer className="bg-surface/50 backdrop-blur-xl border-t border-primary-900/30 mt-20">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">
          {/* Brand */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 text-transparent bg-clip-text">
              Artur Lisowski
            </h3>
            <p className="text-text-secondary max-w-xs">
              Computer Science Student, specializing in teleinformatics,
              full-stack development, and AI applications.
            </p>
          </div>

          {/* Quick Links - More compact spacing */}
          <div className="md:col-span-4">
            <h4 className="font-semibold mb-3 text-text-primary">
              Quick Links
            </h4>
            <ul className="space-y-1.5">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-text-secondary hover:text-primary-400 transition-colors flex items-center space-x-1 group"
                  >
                    <span>→</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social Links */}
          <div className="md:col-span-4">
            <h4 className="font-semibold mb-3 text-text-primary">Connect</h4>

            {/* Email Contact (Highlighted) */}
            <div className="mb-4 p-3 border border-primary-400/30 rounded-lg bg-primary-400/5 hover:bg-primary-400/10 transition-colors">
              <p className="text-text-primary font-medium">My email:</p>
              <a
                href="mailto:lisowski5t@gmail.com"
                className="text-primary-400 hover:text-primary-500 transition-colors flex items-center gap-2 mt-1 break-all"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                lisowski5t@gmail.com
              </a>
            </div>

            {/* Other Social Icons */}
            <div className="grid grid-cols-2 gap-2">
              {socialLinks
                .filter((social) => social.label !== "Email")
                .map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`p-2 border border-primary-900/30 rounded-lg ${social.color} transition-all duration-300 group flex flex-col items-center justify-center`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    onMouseEnter={() => setHoverIcon(social.label)}
                    onMouseLeave={() => setHoverIcon(null)}
                  >
                    <social.icon
                      className={`w-5 h-5 ${
                        hoverIcon === social.label ? "scale-110" : ""
                      } transition-transform`}
                    />
                    <span className="text-xs mt-1">{social.label}</span>
                  </a>
                ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-primary-900/30 flex flex-col md:flex-row justify-between items-center text-text-secondary text-sm">
          <p>© {currentYear} Artur Lisowski</p>
          <div className="flex space-x-4 mt-4 md:mt-0"></div>
        </div>
      </div>
    </footer>
  );
}

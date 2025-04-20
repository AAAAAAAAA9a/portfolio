"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Code } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/certificates", label: "Certificates" },
    { href: "/cv", label: "CV" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 shadow-lg backdrop-blur-xl py-3"
          : "bg-transparent py-5"
      } border-b border-primary-900/30`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center space-x-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600 hover:scale-105 transition-transform duration-300"
          >
            <Code className="h-6 w-6 text-primary-400" />
            <span>TL</span>
          </Link>

          {/* Mobile menu button*/}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-primary-400 hover:text-primary-300 transition-colors duration-300 p-1"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop navigation */}
          <ul className="hidden md:flex space-x-8 items-center">
            {navItems.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`relative text-sm font-medium transition-all duration-300 ${
                    pathname === href
                      ? "text-primary-400"
                      : "text-text-secondary hover:text-primary-400"
                  }`}
                >
                  {label}
                  {pathname === href && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-400 rounded-full"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        className={`fixed inset-0 bg-background/95 backdrop-blur-xl z-50 transition-all duration-300 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="text-primary-400 hover:text-primary-300 transition-colors duration-300 p-1"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <ul className="space-y-8 text-center">
            {navItems.map(({ href, label }, index) => (
              <li
                key={href}
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <Link
                  href={href}
                  className={`text-xl font-medium transition-all duration-300 ${
                    pathname === href
                      ? "text-primary-400"
                      : "text-text-secondary hover:text-primary-400"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

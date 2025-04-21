"use client";

import { useState } from "react";
import PDFViewer from "@/components/PDFViewer";
import Background from "@/components/Background";
import { Filter, X, ChevronDown, ChevronRight } from "lucide-react";

export default function Certificates() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeCertificate, setActiveCertificate] = useState<number | null>(
    null
  );

  // Sample data - replace with your actual certificates
  const certificates = [
    {
      id: 1,
      title: "Advanced Web Development",
      category: "Web Development",
      date: "2023-10-15",
      issuer: "Udemy",
      path: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/certificates/temp.pdf`,
      pages: 1,
    },
    {
      id: 2,
      title: "Python for Data Science",
      category: "Programming",
      date: "2023-08-20",
      issuer: "Coursera",
      path: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/certificates/temp.pdf`,
      pages: 2,
    },
    {
      id: 3,
      title: "Introduction to Cybersecurity",
      category: "Security",
      date: "2023-05-10",
      issuer: "Cisco",
      path: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/certificates/temp.pdf`,
      pages: 1,
    },
    {
      id: 4,
      title: "Docker and Kubernetes",
      category: "DevOps",
      date: "2023-03-15",
      issuer: "LinkedIn Learning",
      path: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/certificates/temp.pdf`,
      pages: 1,
    },
    {
      id: 5,
      title: "Machine Learning Fundamentals",
      category: "AI/ML",
      date: "2023-01-20",
      issuer: "Kaggle",
      path: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/certificates/temp.pdf`,
      pages: 2,
    },
    // Add more certificates here...
    {
      id: 6,
      title: "React.js Advanced Patterns",
      category: "Web Development",
      date: "2022-11-05",
      issuer: "Frontend Masters",
      path: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/certificates/temp.pdf`,
      pages: 1,
    },
    {
      id: 7,
      title: "SQL Database Design",
      category: "Databases",
      date: "2022-09-18",
      issuer: "Udemy",
      path: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/certificates/temp.pdf`,
      pages: 1,
    },
    {
      id: 8,
      title: "Cloud Architecture",
      category: "DevOps",
      date: "2022-07-30",
      issuer: "AWS",
      path: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/certificates/temp.pdf`,
      pages: 2,
    },
    {
      id: 9,
      title: "Ethical Hacking",
      category: "Security",
      date: "2022-06-12",
      issuer: "Offensive Security",
      path: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/certificates/temp.pdf`,
      pages: 1,
    },
    {
      id: 10,
      title: "Fullstack JavaScript",
      category: "Web Development",
      date: "2022-04-25",
      issuer: "Coursera",
      path: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/certificates/temp.pdf`,
      pages: 2,
    },
    {
      id: 11,
      title: "Natural Language Processing",
      category: "AI/ML",
      date: "2022-03-14",
      issuer: "DataCamp",
      path: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/certificates/temp.pdf`,
      pages: 1,
    },
    {
      id: 12,
      title: "Java Programming",
      category: "Programming",
      date: "2022-01-30",
      issuer: "Oracle",
      path: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/certificates/temp.pdf`,
      pages: 1,
    },
    {
      id: 13,
      title: "Blockchain Development",
      category: "Web Development",
      date: "2021-11-20",
      issuer: "Udacity",
      path: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/certificates/temp.pdf`,
      pages: 2,
    },
    {
      id: 14,
      title: "UX/UI Design Fundamentals",
      category: "Design",
      date: "2021-09-05",
      issuer: "Google",
      path: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/certificates/temp.pdf`,
      pages: 1,
    },
    {
      id: 15,
      title: "Network Security",
      category: "Security",
      date: "2021-07-15",
      issuer: "CompTIA",
      path: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/certificates/temp.pdf`,
      pages: 2,
    },
  ];

  // Get unique categories
  const categories = [
    "All",
    ...Array.from(new Set(certificates.map((cert) => cert.category))),
  ];

  // Filter certificates based on category only
  const filteredCertificates = certificates.filter((cert) => {
    return selectedCategory === "All" || cert.category === selectedCategory;
  });

  return (
    <>
      <Background />
      <section className="container py-20 content-wrapper">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 page-heading">
          <span className="gradient-text">Certificates</span>
        </h1>
        <p className="text-text-secondary text-center mb-12 max-w-3xl mx-auto page-subheading">
          In this section you will find my 20+ certificates and completed
          trainings in technology and IT, which demonstrate my continuous
          professional development and commitment to learning.
        </p>

        {/* Category filter */}
        <div className="flex justify-start mb-8">
          <div className="relative">
            <div className="flex items-center gap-2 px-4 py-2 bg-surface border border-surface-hover rounded-lg cursor-pointer">
              <Filter className="h-5 w-5 text-text-secondary" />
              <select
                className="bg-transparent appearance-none focus:outline-none text-text-primary pr-8"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <ChevronDown className="h-4 w-4 text-text-secondary absolute right-3" />
            </div>
          </div>
        </div>

        {selectedCategory !== "All" && (
          <div className="flex items-center gap-2 mb-6">
            <span className="text-text-secondary">
              Showing {filteredCertificates.length} of {certificates.length}{" "}
              certificates
            </span>
            {selectedCategory !== "All" && (
              <button
                onClick={() => setSelectedCategory("All")}
                className="flex items-center gap-1 text-primary-400 hover:text-primary-300"
              >
                <X className="h-4 w-4" />
                <span>Clear filter</span>
              </button>
            )}
          </div>
        )}

        {/* Certificate Display */}
        {activeCertificate !== null ? (
          <div className="space-y-6">
            <button
              onClick={() => setActiveCertificate(null)}
              className="flex items-center gap-2 text-primary-400 hover:text-primary-300"
            >
              <ChevronRight className="h-5 w-5 transform rotate-180" />
              <span>Back to gallery</span>
            </button>

            <PDFViewer
              title={
                certificates.find((c) => c.id === activeCertificate)?.title ||
                ""
              }
              file={
                certificates.find((c) => c.id === activeCertificate)?.path || ""
              }
              totalPages={
                certificates.find((c) => c.id === activeCertificate)?.pages || 1
              }
            />
          </div>
        ) : (
          <>
            {filteredCertificates.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-text-secondary text-lg">
                  No certificates found matching your filter.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCertificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="card p-6 cursor-pointer hover:border-primary-400/30 transition-all group"
                    onClick={() => setActiveCertificate(cert.id)}
                  >
                    <div className="aspect-video bg-background rounded-lg mb-4 overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/10 transition-colors z-10">
                        <div className="p-2 bg-primary-400/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div className="w-full h-full bg-white">
                        <img
                          src={`/images/certificate-placeholder.jpg`}
                          alt={cert.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "/images/default-thumbnail.jpg";
                          }}
                        />
                      </div>
                    </div>
                    <h3 className="font-semibold text-text-primary group-hover:text-primary-400 transition-colors">
                      {cert.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-primary-400/10 text-primary-400 border border-primary-400/20">
                        {cert.category}
                      </span>
                      <span className="text-text-secondary text-sm">
                        {cert.issuer}
                      </span>
                    </div>
                    <p className="text-text-tertiary text-sm mt-1">
                      {new Date(cert.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}

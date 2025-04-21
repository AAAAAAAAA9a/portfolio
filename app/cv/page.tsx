"use client";

import { useState } from "react";
import PDFViewer from "@/components/PDFViewer";
import Background from "@/components/Background";
import { Download, FileText, Languages, Calendar } from "lucide-react";

export default function CV() {
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const cvVersions = {
    english: {
      title: "English CV",
      file: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/cv/temp.pdf`,
      pages: 2,
    },
    polish: {
      title: "Polish CV",
      file: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/cv/temp.pdf`,
      pages: 2,
    },
  };

  const selectedCV = cvVersions[selectedLanguage as keyof typeof cvVersions];

  // Function to handle CV download
  const handleDownloadCV = () => {
    // Create a hidden anchor element
    const downloadLink = document.createElement("a");
    downloadLink.href = selectedCV.file;
    downloadLink.download = `CV_${selectedLanguage}.pdf`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <>
      <Background />
      <section className="container py-20 content-wrapper">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 page-heading">
          <span className="gradient-text">Curriculum Vitae</span>
        </h1>
        <p className="text-text-secondary text-center mb-12 max-w-3xl mx-auto page-subheading">
          Here you&apos;ll find my current CV, which I regularly update with the
          most important projects, skills, and professional experiences. Feel
          free to download and contact me if you&apos;re interested in
          collaboration!
        </p>

        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
            <div className="flex gap-4">
              <button
                onClick={() => setSelectedLanguage("english")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  selectedLanguage === "english"
                    ? "bg-primary-400/10 border-primary-400/30 text-primary-400"
                    : "bg-surface border-surface-hover text-text-secondary"
                } transition-all`}
              >
                <Languages className="w-4 h-4" />
                English
              </button>
              <button
                onClick={() => setSelectedLanguage("polish")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  selectedLanguage === "polish"
                    ? "bg-primary-400/10 border-primary-400/30 text-primary-400"
                    : "bg-surface border-surface-hover text-text-secondary"
                } transition-all`}
              >
                <Languages className="w-4 h-4" />
                Polish
              </button>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleDownloadCV}
                className="flex items-center gap-2 px-4 py-2 bg-primary-400/10 hover:bg-primary-400/20 text-primary-400 rounded-lg border border-primary-400/20 hover:border-primary-400/40 transition-all"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 bg-surface hover:bg-surface-hover text-text-secondary rounded-lg border border-surface-hover transition-all"
              >
                <FileText className="w-4 h-4" />
                Print
              </button>
            </div>
          </div>
        </div>

        <div className="card p-6 max-w-4xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-32 h-32 bg-primary-400/10 rounded-full flex items-center justify-center border border-primary-400/20">
              {/* Placeholder for profile image */}
              <FileText className="w-12 h-12 text-primary-400" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-text-primary">
                Artur Lisowski
              </h2>
              <p className="text-lg text-primary-400 mb-2">
                Computer Science Student & Developer
              </p>

              <div className="space-y-2">
                <div className="flex flex-col md:flex-row gap-1 md:gap-4 text-text-secondary">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary-400" />
                    <span>Last updated: February 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Languages className="w-4 h-4 text-primary-400" />
                    <span>
                      {selectedLanguage.charAt(0).toUpperCase() +
                        selectedLanguage.slice(1)}{" "}
                      version
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <PDFViewer
          title={selectedCV.title}
          file={selectedCV.file}
          totalPages={selectedCV.pages}
          onDownload={handleDownloadCV}
        />
      </section>
    </>
  );
}

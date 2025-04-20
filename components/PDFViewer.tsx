"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

interface PDFViewerProps {
  file: string;
  title: string;
  totalPages?: number;
  onDownload?: () => void;
}

export default function PDFViewer({
  file,
  title,
  totalPages = 1,
  onDownload,
}: PDFViewerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 200));
  };

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 50));
  };

  const handleLoad = () => {
    setIsLoading(false);
    setLoadError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setLoadError(true);
  };

  const handleDownload = (e: React.MouseEvent) => {
    if (onDownload) {
      e.preventDefault();
      onDownload();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="card p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-primary-400/10 hover:bg-primary-400/20 text-primary-400 rounded-lg transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>

        <div className="w-full bg-surface rounded-lg p-4 relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="loading-spinner w-12 h-12 border-4 border-primary-400/30 border-t-primary-400 rounded-full animate-spin"></div>
            </div>
          )}

          {loadError && (
            <div className="absolute inset-0 flex items-center justify-center bg-surface">
              <div className="text-center p-6">
                <p className="text-text-secondary mb-2">
                  Unable to load the PDF
                </p>
                <button
                  onClick={handleDownload}
                  className="text-primary-400 hover:underline"
                >
                  Download instead
                </button>
              </div>
            </div>
          )}

          <iframe
            src={`${file}#page=${currentPage}&zoom=${zoom}&view=FitH`}
            className={`w-full min-h-[800px] rounded-lg bg-white ${
              isLoading ? "opacity-0" : "opacity-100"
            } transition-opacity duration-300`}
            title={title}
            style={{ height: "800px" }}
            sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
            onLoad={handleLoad}
            onError={handleError}
            loading="eager"
          />
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={zoomOut}
              className="p-2 rounded-lg bg-surface hover:bg-surface-hover transition-colors"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-5 h-5 text-text-secondary" />
            </button>
            <span className="text-text-secondary">{zoom}%</span>
            <button
              onClick={zoomIn}
              className="p-2 rounded-lg bg-surface hover:bg-surface-hover transition-colors"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-5 h-5 text-text-secondary" />
            </button>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "bg-surface hover:bg-surface-hover"
                }`}
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5 text-text-secondary" />
              </button>

              <span className="text-text-secondary">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "bg-surface hover:bg-surface-hover"
                }`}
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5 text-text-secondary" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

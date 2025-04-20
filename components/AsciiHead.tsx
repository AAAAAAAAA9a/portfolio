import React, { useState, useEffect, useRef } from "react";

interface AsciiHeadProps {
  scrollRange?: [number, number]; // Optional range where the animation should occur [startPos, endPos]
  size?: "small" | "medium" | "large"; // Size option for the ASCII art
  className?: string; // Additional classes
}

const AsciiHead: React.FC<AsciiHeadProps> = ({
  scrollRange = [0, 800],
  size = "medium",
  className = "",
}) => {
  const [currentFrame, setCurrentFrame] = useState<string>("");
  const [frames, setFrames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load the ASCII frames
  useEffect(() => {
    const loadFrames = async () => {
      try {
        const response = await fetch(
          "/ascii/ascii-animation-video-2025-04-20T18-37-17-735Z.json"
        );
        const data = await response.json();

        // Assuming the JSON structure has frames or a similar property
        // Adjust this based on your actual JSON structure
        if (Array.isArray(data)) {
          setFrames(data);
        } else if (data.frames) {
          setFrames(data.frames);
        } else {
          console.error("Unexpected ASCII animation data format");
        }
      } catch (error) {
        console.error("Failed to load ASCII animation:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFrames();
  }, []);

  // Handle scroll events to change the current frame
  useEffect(() => {
    const handleScroll = () => {
      if (frames.length === 0) return;

      const scrollPos = window.scrollY;
      const totalHeight =
        Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight
        ) - window.innerHeight;

      // Calculate how far through the scroll range we are (0 to 1)
      // Using either the provided scrollRange or the entire document
      let scrollProgress;
      if (scrollRange) {
        const [startPos, endPos] = scrollRange;
        scrollProgress = Math.min(
          Math.max((scrollPos - startPos) / (endPos - startPos), 0),
          1
        );
      } else {
        scrollProgress = Math.min(Math.max(scrollPos / totalHeight, 0), 1);
      }

      // Map scroll progress to frame index
      const frameIndex = Math.min(
        Math.floor(scrollProgress * frames.length),
        frames.length - 1
      );

      setCurrentFrame(frames[frameIndex]);
    };

    window.addEventListener("scroll", handleScroll);
    // Initial call to set the first frame
    if (frames.length > 0) {
      setCurrentFrame(frames[0]);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [frames, scrollRange]);

  if (loading) {
    return <div className="ascii-loading">Loading ASCII animation...</div>;
  }

  // Define size classes
  const sizeClasses = {
    small: "ascii-small",
    medium: "ascii-medium",
    large: "ascii-large",
  }[size];

  return (
    <div
      ref={containerRef}
      className={`ascii-container ${sizeClasses} ${className}`}
    >
      <pre className="ascii-art">{currentFrame}</pre>
      <style jsx>{`
        .ascii-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
        .ascii-art {
          font-family: monospace;
          white-space: pre;
          line-height: 1;
          color: rgba(248, 250, 252, 0.9); /* Slightly brighter text */
          text-shadow: 0 0 1px rgba(248, 250, 252, 0.2); /* Subtle glow around text */
          background-color: transparent;
          display: block;
          overflow: visible;
        }
        .ascii-small .ascii-art {
          font-size: 5px;
          transform: scale(0.6);
          transform-origin: center;
        }
        .ascii-medium .ascii-art {
          font-size: 8px;
          transform: scale(0.8);
          transform-origin: center;
        }
        .ascii-large .ascii-art {
          font-size: 10px;
          transform: scale(1);
          transform-origin: center;
        }

        @media (min-width: 640px) {
          .ascii-small .ascii-art {
            font-size: 6px;
            transform: scale(0.7);
          }
          .ascii-medium .ascii-art {
            font-size: 9px;
            transform: scale(0.9);
          }
          .ascii-large .ascii-art {
            font-size: 12px;
          }
        }

        @media (min-width: 1024px) {
          .ascii-small .ascii-art {
            font-size: 7px;
            transform: scale(0.8);
          }
          .ascii-medium .ascii-art {
            font-size: 10px;
            transform: scale(1);
          }
          .ascii-large .ascii-art {
            font-size: 14px;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
};

export default AsciiHead;

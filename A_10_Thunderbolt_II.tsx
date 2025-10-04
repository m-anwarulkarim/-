import React, { useEffect, useState } from "react";

export default function A10ThunderboltAnimation() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(-45);
  const [isVisible, setIsVisible] = useState(true);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const animationDuration = 10000; // 10 seconds for smoother animation
    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = (elapsed % animationDuration) / animationDuration;

      if (progress < 0.02) {
        setIsVisible(true);
      }

      if (progress < 0.45) {
        // Phase 1: Top-right to bottom-left - smooth descent
        const phase1Progress = progress / 0.45;
        const easeProgress = 1 - Math.pow(1 - phase1Progress, 3); // Ease out cubic
        const x = 110 - easeProgress * 130;
        const y = -15 + easeProgress * 95;
        setPosition({ x, y });
        setRotation(-45);
        setScale(0.8 + easeProgress * 0.4); // Scale from 0.8 to 1.2
      } else if (progress < 0.6) {
        // Phase 2: Banking turn at bottom-left corner - enhanced curve
        const phase2Progress = (progress - 0.45) / 0.15;
        const easeProgress =
          phase2Progress < 0.5
            ? 2 * phase2Progress * phase2Progress
            : 1 - Math.pow(-2 * phase2Progress + 2, 2) / 2; // Ease in-out

        const turnAngle = -45 + easeProgress * 135;
        const bankAngle = Math.sin(easeProgress * Math.PI) * 25; // Bank angle during turn

        // Slight arc movement during turn
        const arcX = -20 + Math.sin(easeProgress * Math.PI) * 10;
        const arcY = 80 - Math.sin(easeProgress * Math.PI) * 8;

        setPosition({ x: arcX, y: arcY });
        setRotation(turnAngle + bankAngle);
        setScale(1.2);
      } else if (progress < 1) {
        // Phase 3: Exit towards viewer (coming forward) and fade out
        const phase3Progress = (progress - 0.6) / 0.4;
        const easeProgress = Math.pow(phase3Progress, 2); // Ease in
        const x = -20 + easeProgress * 60; // Move right but not too much

        // Stay at bottom, slight downward movement
        const y = 80 + phase3Progress * 3;

        setPosition({ x, y });

        // Keep horizontal/slightly pitched up as it comes toward viewer
        const pitchAngle = 90 - phase3Progress * 10; // From 90° to 80° (slight nose up)
        setRotation(pitchAngle);

        // Scale UP as it comes towards viewer (getting bigger/closer)
        const scaleIncrease = 1.2 + phase3Progress * 0.8; // 1.2 to 2.0
        setScale(scaleIncrease);

        // Fade out near the end
        if (phase3Progress > 0.7) {
          setIsVisible(false);
        }
      }

      requestAnimationFrame(animate);
    };

    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image - Replace the URL below with your own image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("YOUR_IMAGE_URL_HERE")',
          // Fallback gradient if no image is provided
          background:
            "linear-gradient(to bottom, #1e1b4b 0%, #1e40af 25%, #0ea5e9 50%, #fb923c 75%, #fbbf24 100%)",
        }}
      />

      {/* Enhanced A-10 Thunderbolt II */}
      {isVisible && (
        <div
          className="absolute transition-all duration-75 ease-linear z-50"
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
            width: "280px",
            height: "280px",
            filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.5))",
            opacity: scale > 1.6 ? Math.max(0, 2.5 - scale) : 1, // Fade out as it gets very close
          }}
        >
          <svg width="280" height="280" viewBox="0 0 280 280">
            <defs>
              {/* Gradients for realistic metallic look */}
              <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#9CA3AF" />
                <stop offset="50%" stopColor="#6B7280" />
                <stop offset="100%" stopColor="#4B5563" />
              </linearGradient>

              <linearGradient id="wingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4B5563" />
                <stop offset="50%" stopColor="#6B7280" />
                <stop offset="100%" stopColor="#4B5563" />
              </linearGradient>

              <radialGradient id="engineGrad">
                <stop offset="0%" stopColor="#DC2626" />
                <stop offset="50%" stopColor="#991B1B" />
                <stop offset="100%" stopColor="#450A0A" />
              </radialGradient>

              <filter id="metallic">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                <feOffset dx="2" dy="2" result="offsetblur" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.3" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Main Fuselage (body) - elongated and detailed */}
            <ellipse
              cx="140"
              cy="140"
              rx="70"
              ry="18"
              fill="url(#bodyGrad)"
              stroke="#374151"
              strokeWidth="2"
              filter="url(#metallic)"
            />

            {/* Cockpit - more detailed */}
            <ellipse
              cx="100"
              cy="140"
              rx="22"
              ry="15"
              fill="#1F2937"
              opacity="0.9"
            />
            <ellipse
              cx="100"
              cy="140"
              rx="18"
              ry="12"
              fill="#60A5FA"
              opacity="0.7"
            />
            <ellipse
              cx="98"
              cy="138"
              rx="10"
              ry="7"
              fill="#93C5FD"
              opacity="0.5"
            />

            {/* Nose Cone with GAU-8 Avenger Cannon */}
            <ellipse cx="70" cy="140" rx="12" ry="10" fill="#374151" />
            <rect x="55" y="135" width="20" height="10" fill="#4B5563" rx="3" />
            <circle
              cx="55"
              cy="140"
              r="7"
              fill="#1F2937"
              stroke="#DC2626"
              strokeWidth="1"
            />
            <circle cx="55" cy="140" r="4" fill="#374151" />

            {/* Main Wings - more realistic proportions */}
            <path
              d="M 90 115 L 95 110 L 175 110 L 180 115 L 175 118 L 95 118 Z"
              fill="url(#wingGrad)"
              stroke="#374151"
              strokeWidth="2"
              filter="url(#metallic)"
            />
            <path
              d="M 90 165 L 95 162 L 175 162 L 180 165 L 175 170 L 95 170 Z"
              fill="url(#wingGrad)"
              stroke="#374151"
              strokeWidth="2"
              filter="url(#metallic)"
            />

            {/* Wing details and panel lines */}
            <line
              x1="100"
              y1="112"
              x2="170"
              y2="112"
              stroke="#9CA3AF"
              strokeWidth="1"
              opacity="0.6"
            />
            <line
              x1="100"
              y1="168"
              x2="170"
              y2="168"
              stroke="#9CA3AF"
              strokeWidth="1"
              opacity="0.6"
            />

            {/* Aileron details */}
            <rect
              x="150"
              y="109"
              width="20"
              height="4"
              fill="#4B5563"
              opacity="0.7"
            />
            <rect
              x="150"
              y="167"
              width="20"
              height="4"
              fill="#4B5563"
              opacity="0.7"
            />

            {/* Twin Engines - highly detailed */}
            <ellipse
              cx="165"
              cy="115"
              rx="25"
              ry="14"
              fill="#4B5563"
              stroke="#374151"
              strokeWidth="2.5"
              filter="url(#metallic)"
            />
            <ellipse
              cx="165"
              cy="165"
              rx="25"
              ry="14"
              fill="#4B5563"
              stroke="#374151"
              strokeWidth="2.5"
              filter="url(#metallic)"
            />

            {/* Engine intake details */}
            <ellipse cx="155" cy="115" rx="8" ry="10" fill="#1F2937" />
            <ellipse cx="155" cy="165" rx="8" ry="10" fill="#1F2937" />

            {/* Engine Exhausts - glowing */}
            <ellipse
              cx="188"
              cy="115"
              rx="12"
              ry="11"
              fill="url(#engineGrad)"
            />
            <ellipse
              cx="188"
              cy="165"
              rx="12"
              ry="11"
              fill="url(#engineGrad)"
            />
            <ellipse
              cx="188"
              cy="115"
              rx="8"
              ry="7"
              fill="#EF4444"
              opacity="0.9"
            />
            <ellipse
              cx="188"
              cy="165"
              rx="8"
              ry="7"
              fill="#EF4444"
              opacity="0.9"
            />
            <ellipse
              cx="188"
              cy="115"
              rx="4"
              ry="4"
              fill="#FCD34D"
              opacity="0.8"
            />
            <ellipse
              cx="188"
              cy="165"
              rx="4"
              ry="4"
              fill="#FCD34D"
              opacity="0.8"
            />

            {/* Tail Section */}
            <rect
              x="180"
              y="122"
              width="35"
              height="6"
              fill="url(#bodyGrad)"
              stroke="#374151"
              strokeWidth="1.5"
            />
            <rect
              x="180"
              y="152"
              width="35"
              height="6"
              fill="url(#bodyGrad)"
              stroke="#374151"
              strokeWidth="1.5"
            />

            {/* Vertical Stabilizers - distinctive twin tails */}
            <path
              d="M 200 122 L 215 95 L 225 95 L 220 122 Z"
              fill="url(#bodyGrad)"
              stroke="#374151"
              strokeWidth="2"
              filter="url(#metallic)"
            />
            <path
              d="M 200 158 L 215 185 L 225 185 L 220 158 Z"
              fill="url(#bodyGrad)"
              stroke="#374151"
              strokeWidth="2"
              filter="url(#metallic)"
            />

            {/* Tail markings */}
            <rect
              x="210"
              y="100"
              width="8"
              height="15"
              fill="#DC2626"
              opacity="0.8"
            />
            <rect
              x="210"
              y="165"
              width="8"
              height="15"
              fill="#DC2626"
              opacity="0.8"
            />

            {/* Landing Gear */}
            <rect x="130" y="155" width="4" height="18" fill="#374151" />
            <circle
              cx="132"
              cy="175"
              r="6"
              fill="#1F2937"
              stroke="#6B7280"
              strokeWidth="2"
            />
            <circle cx="132" cy="175" r="3" fill="#4B5563" />

            {/* Nose gear */}
            <rect x="88" y="148" width="3" height="12" fill="#374151" />
            <circle
              cx="89.5"
              cy="162"
              r="4"
              fill="#1F2937"
              stroke="#6B7280"
              strokeWidth="1.5"
            />

            {/* Weapons Hardpoints - detailed */}
            <rect x="110" y="107" width="8" height="4" fill="#374151" rx="1" />
            <rect x="140" y="107" width="8" height="4" fill="#374151" rx="1" />
            <rect x="110" y="169" width="8" height="4" fill="#374151" rx="1" />
            <rect x="140" y="169" width="8" height="4" fill="#374151" rx="1" />

            {/* AGM-65 Maverick Missiles */}
            <ellipse
              cx="114"
              cy="100"
              rx="4"
              ry="12"
              fill="#DC2626"
              stroke="#991B1B"
              strokeWidth="1.5"
            />
            <ellipse
              cx="144"
              cy="100"
              rx="4"
              ry="12"
              fill="#DC2626"
              stroke="#991B1B"
              strokeWidth="1.5"
            />
            <ellipse
              cx="114"
              cy="180"
              rx="4"
              ry="12"
              fill="#DC2626"
              stroke="#991B1B"
              strokeWidth="1.5"
            />
            <ellipse
              cx="144"
              cy="180"
              rx="4"
              ry="12"
              fill="#DC2626"
              stroke="#991B1B"
              strokeWidth="1.5"
            />

            {/* Missile fins */}
            <path
              d="M 112 95 L 110 90 L 118 90 L 116 95 Z"
              fill="#6B7280"
              opacity="0.8"
            />
            <path
              d="M 142 95 L 140 90 L 148 90 L 146 95 Z"
              fill="#6B7280"
              opacity="0.8"
            />

            {/* Panel Lines and Rivets */}
            <line
              x1="95"
              y1="140"
              x2="180"
              y2="140"
              stroke="#374151"
              strokeWidth="1.5"
              opacity="0.4"
            />
            <line
              x1="120"
              y1="133"
              x2="120"
              y2="147"
              stroke="#374151"
              strokeWidth="0.8"
              opacity="0.3"
            />
            <line
              x1="150"
              y1="133"
              x2="150"
              y2="147"
              stroke="#374151"
              strokeWidth="0.8"
              opacity="0.3"
            />

            {/* Rivets */}
            {[105, 115, 125, 135, 145, 155, 165, 175].map((x) => (
              <circle
                key={x}
                cx={x}
                cy="140"
                r="1"
                fill="#374151"
                opacity="0.5"
              />
            ))}

            {/* USAF Roundel */}
            <circle cx="130" cy="140" r="12" fill="#1E40AF" opacity="0.8" />
            <circle cx="130" cy="140" r="8" fill="white" opacity="0.9" />
            <circle cx="130" cy="140" r="4" fill="#DC2626" opacity="0.9" />

            {/* Aircraft Number */}
            <text
              x="155"
              y="144"
              fontSize="8"
              fill="#FCD34D"
              fontWeight="bold"
              opacity="0.8"
            >
              AF-10
            </text>

            {/* Additional details - air intakes, sensors */}
            <rect
              x="105"
              y="138"
              width="6"
              height="4"
              fill="#1F2937"
              opacity="0.6"
            />
            <circle cx="92" cy="135" r="2" fill="#3B82F6" opacity="0.7" />
          </svg>

          {/* Enhanced Multi-layer Exhaust Trail */}
          <div
            className="absolute top-1/2 left-1/2"
            style={{
              transform: `translate(-100%, -50%) rotate(${-rotation}deg)`,
              transformOrigin: "left center",
            }}
          >
            {/* Outer exhaust glow */}
            <div className="absolute w-60 h-8 bg-gradient-to-r from-orange-600 via-red-600 to-transparent opacity-60 blur-xl" />
            {/* Middle exhaust */}
            <div className="absolute w-52 h-5 bg-gradient-to-r from-red-500 via-orange-500 to-transparent opacity-80 blur-lg" />
            {/* Inner hot core */}
            <div className="absolute top-1 w-44 h-3 bg-gradient-to-r from-yellow-300 via-orange-400 to-transparent opacity-90 blur-sm" />
            {/* Bright center */}
            <div className="absolute top-1.5 w-36 h-2 bg-gradient-to-r from-white via-yellow-200 to-transparent opacity-70" />
          </div>

          {/* Vapor trail from wingtips during turn */}
          {rotation > -30 && rotation < 60 && (
            <>
              <div
                className="absolute w-32 h-1 bg-white opacity-40 blur-sm"
                style={{
                  top: "35%",
                  left: "40%",
                  transform: `rotate(${-rotation}deg)`,
                }}
              />
              <div
                className="absolute w-32 h-1 bg-white opacity-40 blur-sm"
                style={{
                  top: "65%",
                  left: "40%",
                  transform: `rotate(${-rotation}deg)`,
                }}
              />
            </>
          )}
        </div>
      )}

      {/* Title */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-40">
        <div className="bg-black bg-opacity-30 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white border-opacity-20">
          <h1 className="text-5xl font-bold text-white drop-shadow-2xl mb-2 tracking-wider">
            A-10 Thunderbolt II
          </h1>
          <p className="text-2xl text-gray-200 drop-shadow-lg italic">
            "Warthog"
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes aurora {
          0%,
          100% {
            opacity: 0.2;
            transform: translateX(0) translateY(0);
          }
          50% {
            opacity: 0.4;
            transform: translateX(20px) translateY(-20px);
          }
        }

        @keyframes aurora-delayed {
          0%,
          100% {
            opacity: 0.3;
            transform: translateX(0) translateY(0);
          }
          50% {
            opacity: 0.5;
            transform: translateX(-20px) translateY(-15px);
          }
        }

        @keyframes shooting-star {
          0% {
            opacity: 0;
            transform: translateX(-100px) translateY(-50px);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateX(300px) translateY(150px);
          }
        }

        @keyframes shooting-star-delayed {
          0% {
            opacity: 0;
            transform: translateX(100px) translateY(-30px);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateX(-300px) translateY(120px);
          }
        }

        @keyframes cloud-drift {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(100vw);
          }
        }

        @keyframes cloud-drift-slow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(80vw);
          }
        }

        @keyframes cloud-drift-reverse {
          0% {
            transform: translateX(100vw);
          }
          100% {
            transform: translateX(-100vw);
          }
        }

        .animate-aurora {
          animation: aurora 15s ease-in-out infinite;
        }

        .animate-aurora-delayed {
          animation: aurora-delayed 18s ease-in-out infinite;
        }

        .animate-shooting-star {
          animation: shooting-star 4s ease-out infinite;
          animation-delay: 2s;
        }

        .animate-shooting-star-delayed {
          animation: shooting-star-delayed 5s ease-out infinite;
          animation-delay: 6s;
        }

        .animate-cloud-drift {
          animation: cloud-drift 120s linear infinite;
        }

        .animate-cloud-drift-slow {
          animation: cloud-drift-slow 150s linear infinite;
        }

        .animate-cloud-drift-reverse {
          animation: cloud-drift-reverse 100s linear infinite;
        }
      `}</style>
    </div>
  );
}

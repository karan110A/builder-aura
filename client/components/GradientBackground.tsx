import React from "react";

export default function GradientBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -2 }}
    >
      {/* Primary gradient orbs */}
      <div
        className="absolute w-96 h-96 rounded-full opacity-20 animate-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)",
          top: "10%",
          left: "10%",
          animation: "float 8s ease-in-out infinite",
        }}
      />

      <div
        className="absolute w-80 h-80 rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
          top: "60%",
          right: "15%",
          animation: "float 10s ease-in-out infinite reverse",
        }}
      />

      <div
        className="absolute w-64 h-64 rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)",
          bottom: "20%",
          left: "20%",
          animation: "float 12s ease-in-out infinite",
        }}
      />

      <div
        className="absolute w-72 h-72 rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, transparent 70%)",
          top: "30%",
          right: "30%",
          animation: "float 9s ease-in-out infinite reverse",
        }}
      />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0) scale(1);
          }
          25% {
            transform: translateY(-20px) translateX(10px) scale(1.05);
          }
          50% {
            transform: translateY(-10px) translateX(-15px) scale(0.95);
          }
          75% {
            transform: translateY(-30px) translateX(5px) scale(1.02);
          }
        }
      `}</style>
    </div>
  );
}

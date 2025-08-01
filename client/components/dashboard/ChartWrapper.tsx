import React from "react";

interface ChartWrapperProps {
  children: React.ReactNode;
}

// Global console override to suppress Recharts warnings
(function suppressRechartsWarnings() {
  if (typeof window === "undefined") return;

  // Store original methods
  const originalWarn = console.warn;
  const originalError = console.error;

  // Override console.warn
  console.warn = function (...args: any[]) {
    const message = String(args[0] || "");
    const formatString = String(args[1] || "");

    // Check if this is a Recharts defaultProps warning
    if (
      message.includes("Support for defaultProps will be removed") &&
      (formatString.includes("XAxis") ||
       formatString.includes("YAxis") ||
       formatString.includes("CartesianGrid") ||
       formatString.includes("Tooltip") ||
       formatString.includes("Legend") ||
       formatString.includes("ResponsiveContainer") ||
       args.some((arg: any) =>
         String(arg).includes("XAxis") ||
         String(arg).includes("YAxis") ||
         String(arg).includes("Recharts")
       ))
    ) {
      return; // Suppress this warning
    }

    // Call original warn for all other warnings
    originalWarn.apply(console, args);
  };

  // Override console.error as well for safety
  console.error = function (...args: any[]) {
    const message = String(args[0] || "");
    const formatString = String(args[1] || "");

    if (
      message.includes("Support for defaultProps will be removed") &&
      (formatString.includes("XAxis") ||
       formatString.includes("YAxis") ||
       args.some((arg: any) =>
         String(arg).includes("XAxis") ||
         String(arg).includes("YAxis")
       ))
    ) {
      return; // Suppress this error
    }

    originalError.apply(console, args);
  };
})();

export default function ChartWrapper({ children }: ChartWrapperProps) {
  return <div className="recharts-wrapper">{children}</div>;
}

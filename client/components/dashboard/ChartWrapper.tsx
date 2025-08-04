import React, { useEffect } from "react";

interface ChartWrapperProps {
  children: React.ReactNode;
}

// Immediate suppression on module load
(() => {
  if (typeof window !== "undefined") {
    const originalWarn = console.warn;
    console.warn = (...args: any[]) => {
      const allArgsString = args.map((arg) => String(arg || "")).join(" ");

      // Comprehensive Recharts warning suppression
      if (
        (allArgsString.includes("Support for defaultProps will be removed") ||
          allArgsString.includes("defaultProps")) &&
        (allArgsString.includes("XAxis") ||
          allArgsString.includes("YAxis") ||
          allArgsString.includes("CartesianGrid") ||
          allArgsString.includes("Tooltip") ||
          allArgsString.includes("ResponsiveContainer") ||
          allArgsString.includes("Legend") ||
          allArgsString.includes("function components"))
      ) {
        return;
      }

      originalWarn.apply(console, args);
    };
    window.__rechartsSuppressionActive = true;
  }
})();

export default function ChartWrapper({ children }: ChartWrapperProps) {
  useEffect(() => {
    // Runtime suppression as backup
    if (typeof window !== "undefined") {
      const originalWarn = console.warn;
      console.warn = (...args: any[]) => {
        const message = args.map((arg) => String(arg || "")).join(" ");
        if (
          message.includes("defaultProps") &&
          (message.includes("XAxis") ||
            message.includes("YAxis") ||
            message.includes("CartesianGrid") ||
            message.includes("Tooltip"))
        ) {
          return;
        }
        originalWarn.apply(console, args);
      };
    }
  }, []);

  return <div className="recharts-wrapper">{children}</div>;
}

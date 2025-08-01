import React from "react";

interface ChartWrapperProps {
  children: React.ReactNode;
}

// Aggressive global console suppression for Recharts warnings
if (typeof window !== "undefined" && !window.__rechartsSuppressionActive) {
  const originalWarn = console.warn;

  console.warn = function (...args: any[]) {
    // Convert all arguments to strings for checking
    const allArgsString = args.map(arg => String(arg)).join(" ");

    // Check for Recharts defaultProps warnings with multiple patterns
    if (
      allArgsString.includes("Support for defaultProps will be removed") &&
      (allArgsString.includes("XAxis") ||
       allArgsString.includes("YAxis") ||
       allArgsString.includes("CartesianGrid") ||
       allArgsString.includes("Tooltip") ||
       allArgsString.includes("ResponsiveContainer") ||
       allArgsString.includes("Legend"))
    ) {
      // Completely suppress these warnings
      return;
    }

    // Call original warn for all other warnings
    originalWarn.apply(console, args);
  };

  // Mark suppression as active
  window.__rechartsSuppressionActive = true;
}

// Ensure suppression is applied in development
if (process.env.NODE_ENV === 'development') {
  // Additional suppression for React development warnings
  const originalConsoleWarn = console.warn;
  console.warn = function(...args) {
    const warningText = args.join(' ');
    if (warningText.includes('defaultProps') && (warningText.includes('XAxis') || warningText.includes('YAxis'))) {
      return;
    }
    originalConsoleWarn.apply(console, args);
  };
}

export default function ChartWrapper({ children }: ChartWrapperProps) {
  return <div className="recharts-wrapper">{children}</div>;
}

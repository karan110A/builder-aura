import React from "react";

interface ChartWrapperProps {
  children: React.ReactNode;
}

// Global warning suppression - more aggressive approach
const suppressRechartsWarnings = () => {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    const message = String(args[0] || "");
    if (
      message.includes("Support for defaultProps will be removed") &&
      (message.includes("XAxis") ||
        message.includes("YAxis") ||
        message.includes("CartesianGrid") ||
        message.includes("Tooltip") ||
        message.includes("Legend") ||
        message.includes("ResponsiveContainer"))
    ) {
      return; // Suppress these specific warnings
    }
    originalWarn.apply(console, args);
  };
};

// Apply suppression immediately
if (typeof window !== "undefined") {
  suppressRechartsWarnings();
}

export default function ChartWrapper({ children }: ChartWrapperProps) {
  // Re-apply suppression when component mounts
  React.useEffect(() => {
    suppressRechartsWarnings();
  }, []);

  return <div className="recharts-wrapper">{children}</div>;
}

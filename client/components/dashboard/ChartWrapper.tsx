import React, { useEffect } from "react";

interface ChartWrapperProps {
  children: React.ReactNode;
}

export default function ChartWrapper({ children }: ChartWrapperProps) {
  useEffect(() => {
    // Suppress React defaultProps warnings for Recharts components
    const originalWarn = console.warn;
    const originalError = console.error;

    console.warn = (...args) => {
      const message = args[0]?.toString?.() || "";
      if (
        message.includes("Support for defaultProps will be removed") &&
        (message.includes("XAxis") || message.includes("YAxis") ||
         message.includes("CartesianGrid") || message.includes("Tooltip") ||
         message.includes("Legend") || message.includes("ResponsiveContainer"))
      ) {
        return; // Suppress these specific warnings
      }
      originalWarn(...args);
    };

    console.error = (...args) => {
      const message = args[0]?.toString?.() || "";
      if (
        message.includes("Support for defaultProps will be removed") &&
        (message.includes("XAxis") || message.includes("YAxis") ||
         message.includes("CartesianGrid") || message.includes("Tooltip") ||
         message.includes("Legend") || message.includes("ResponsiveContainer"))
      ) {
        return; // Suppress these specific errors as well
      }
      originalError(...args);
    };

    return () => {
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, []);

  return <>{children}</>;
}

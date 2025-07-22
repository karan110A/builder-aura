import React, { useLayoutEffect } from "react";

interface ChartWrapperProps {
  children: React.ReactNode;
}

// Global warning suppression for Recharts defaultProps
if (typeof window !== 'undefined' && !window.__rechartsWarningsSuppressed) {
  const originalWarn = console.warn;
  const originalError = console.error;

  console.warn = (...args) => {
    const message = args[0]?.toString?.() || "";
    if (
      message.includes("Support for defaultProps will be removed") &&
      (message.includes("XAxis") || message.includes("YAxis") ||
       message.includes("CartesianGrid") || message.includes("Tooltip") ||
       message.includes("Legend") || message.includes("ResponsiveContainer") ||
       message.includes("Recharts"))
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
       message.includes("Legend") || message.includes("ResponsiveContainer") ||
       message.includes("Recharts"))
    ) {
      return; // Suppress these specific errors as well
    }
    originalError(...args);
  };

  window.__rechartsWarningsSuppressed = true;
}

export default function ChartWrapper({ children }: ChartWrapperProps) {
  useLayoutEffect(() => {
    // Additional safety: Suppress warnings during component lifecycle
    const originalWarn = console.warn;
    console.warn = (...args) => {
      const message = args[0]?.toString?.() || "";
      if (
        message.includes("Support for defaultProps will be removed") &&
        (message.includes("XAxis") || message.includes("YAxis") ||
         message.includes("CartesianGrid") || message.includes("Tooltip") ||
         message.includes("Legend") || message.includes("ResponsiveContainer") ||
         message.includes("Recharts"))
      ) {
        return;
      }
      originalWarn(...args);
    };

    return () => {
      // Don't restore here since we want global suppression
    };
  }, []);

  return <>{children}</>;
}

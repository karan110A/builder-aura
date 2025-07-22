import React, { useEffect } from 'react';

interface ChartWrapperProps {
  children: React.ReactNode;
}

export default function ChartWrapper({ children }: ChartWrapperProps) {
  useEffect(() => {
    // Temporarily suppress React defaultProps warnings for Recharts
    const originalWarn = console.warn;
    console.warn = (...args) => {
      // Filter out specific Recharts defaultProps warnings
      if (
        args[0]?.includes?.('Support for defaultProps will be removed') &&
        (args[1]?.includes?.('XAxis') || args[1]?.includes?.('YAxis'))
      ) {
        return; // Suppress these specific warnings
      }
      originalWarn(...args);
    };

    return () => {
      console.warn = originalWarn; // Restore original console.warn
    };
  }, []);

  return <>{children}</>;
}

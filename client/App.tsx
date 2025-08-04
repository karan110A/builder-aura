import "./global.css";
import React from "react";

// Immediate global Recharts warning suppression
(() => {
  if (typeof window !== "undefined") {
    const originalWarn = console.warn;
    console.warn = (...args) => {
      const fullMessage = args.map((arg) => String(arg || "")).join(" ");

      // Suppress all Recharts defaultProps warnings
      if (
        fullMessage.includes("Support for defaultProps will be removed") &&
        (fullMessage.includes("XAxis") ||
          fullMessage.includes("YAxis") ||
          fullMessage.includes("CartesianGrid") ||
          fullMessage.includes("Tooltip") ||
          fullMessage.includes("Legend") ||
          fullMessage.includes("ResponsiveContainer") ||
          fullMessage.includes("Recharts"))
      ) {
        return;
      }

      // Also suppress any Recharts component warnings
      if (
        fullMessage.includes("defaultProps") &&
        fullMessage.includes("function components")
      ) {
        const componentNames = [
          "XAxis",
          "YAxis",
          "CartesianGrid",
          "Tooltip",
          "Legend",
          "ResponsiveContainer",
        ];
        if (componentNames.some((name) => fullMessage.includes(name))) {
          return;
        }
      }

      originalWarn.apply(console, args);
    };
    window.__rechartsSuppressionActive = true;
  }
})();

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Teachers from "./pages/Teachers";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Reviews from "./pages/Reviews";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={true}
      disableTransitionOnChange={false}
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

const container = document.getElementById("root")!;

// Create root only once and reuse it
let root = (globalThis as any).__reactRoot;
if (!root) {
  root = createRoot(container);
  (globalThis as any).__reactRoot = root;
}

root.render(<App />);

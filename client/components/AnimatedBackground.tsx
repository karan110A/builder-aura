import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  hue: number;
}

interface FloatingIcon {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  icon: string;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const iconsRef = useRef<FloatingIcon[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Educational icons as Unicode symbols
    const educationalIcons = [
      "📚",
      "🎓",
      "📝",
      "🧮",
      "⚗️",
      "🔬",
      "📐",
      "🖊️",
      "💡",
      "🧪",
    ];

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 50; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          hue: Math.random() * 60 + 200, // Blue to purple range
        });
      }
    };

    // Initialize floating icons
    const initIcons = () => {
      iconsRef.current = [];
      for (let i = 0; i < 8; i++) {
        iconsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 20 + 15,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 2,
          opacity: Math.random() * 0.15 + 0.05,
          icon: educationalIcons[
            Math.floor(Math.random() * educationalIcons.length)
          ],
        });
      }
    };

    initParticles();
    initIcons();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Animate particles
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`;
        ctx.fill();

        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Animate floating icons
      iconsRef.current.forEach((icon) => {
        // Update position
        icon.x += icon.speedX;
        icon.y += icon.speedY;
        icon.rotation += icon.rotationSpeed;

        // Wrap around edges
        if (icon.x < -50) icon.x = canvas.width + 50;
        if (icon.x > canvas.width + 50) icon.x = -50;
        if (icon.y < -50) icon.y = canvas.height + 50;
        if (icon.y > canvas.height + 50) icon.y = -50;

        // Draw icon
        ctx.save();
        ctx.translate(icon.x, icon.y);
        ctx.rotate((icon.rotation * Math.PI) / 180);
        ctx.globalAlpha = icon.opacity;
        ctx.font = `${icon.size}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(icon.icon, 0, 0);
        ctx.restore();
      });

      // Draw connecting lines between nearby particles
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            const opacity = ((150 - distance) / 150) * 0.1;
            ctx.strokeStyle = `hsla(220, 70%, 60%, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
}

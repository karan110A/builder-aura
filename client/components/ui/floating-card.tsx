import React, { useRef, useEffect } from "react";

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export default function FloatingCard({ 
  children, 
  className = "", 
  intensity = 1 
}: FloatingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const updateAnimation = () => {
      const targetX = (mouseX - window.innerWidth / 2) * 0.01 * intensity;
      const targetY = (mouseY - window.innerHeight / 2) * 0.01 * intensity;
      
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      
      card.style.transform = `
        perspective(1000px) 
        rotateX(${currentY}deg) 
        rotateY(${currentX}deg) 
        translateZ(0)
      `;
      
      animationId = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnter = () => {
      card.style.transition = "transform 0.1s ease-out";
    };

    const handleMouseLeave = () => {
      card.style.transition = "transform 0.5s ease-out";
      mouseX = window.innerWidth / 2;
      mouseY = window.innerHeight / 2;
    };

    document.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);
    
    updateAnimation();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [intensity]);

  return (
    <div
      ref={cardRef}
      className={`transform-gpu ${className}`}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

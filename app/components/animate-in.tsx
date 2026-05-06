"use client";

import { useInView } from "@/app/hooks/use-in-view";

interface AnimateInProps {
  children: React.ReactNode;
  /** Delay in ms before animation starts */
  delay?: number;
  className?: string;
}

export default function AnimateIn({ children, delay = 0, className = "" }: AnimateInProps) {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 600ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, transform 600ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export default function FadeUp({ children, className = "", delay = "" }) {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <div ref={ref} className={`fade-up ${isVisible ? "visible" : ""} ${delay} ${className}`}>
      {children}
    </div>
  );
}

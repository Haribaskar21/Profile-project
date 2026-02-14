export default function AnimatedCard({ children, className = "" }) {
  return (
    <div
      className={
        "transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl " +
        "bg-white/5 border border-white/10 rounded-2xl " +
        className
      }
    >
      {children}
    </div>
  );
}

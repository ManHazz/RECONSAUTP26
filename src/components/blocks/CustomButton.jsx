export default function CustomButton({
  children,
  variant = "primary",
  ...props
}) {
  const base =
    "px-6 py-3 rounded-2xl font-semibold transition-colors duration-200";
  const styles =
    variant === "primary"
      ? "bg-indigo-600 hover:bg-indigo-500 text-white"
      : "border border-white/50 text-white hover:bg-white/10";

  return (
    <button className={`${base} ${styles}`} {...props}>
      {children}
    </button>
  );
}

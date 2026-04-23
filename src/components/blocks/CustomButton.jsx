export default function CustomButton({
  children,
  variant = "primary",
  ...props
}) {
  const base =
    "px-6 py-3 rounded-2xl font-semibold transition-colors duration-200";
  const styles =
    variant === "primary"
      ? "bg-[#efedfa] hover:bg-[#B498C4] text-[#461B61] hover:text-white cursor-pointer shadow-lg hover:shadow-xl"
      : "border border-white/50 text-white hover:bg-white/10";

  return (
    <button className={`${base} ${styles}`} {...props}>
      {children}
    </button>
  );
}

export default function Button({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-blue-700 transition"
    >
      {children}
    </button>
  );
}

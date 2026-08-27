export const Collapsible = ({ children, label }) => {
  return (
    <details >
      <summary className="mb-4 p-2 bg-gray-700 rounded">{label}</summary>
      {children}
    </details>
  );
};

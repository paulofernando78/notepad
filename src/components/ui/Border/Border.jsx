export const Border = ({ children, className }) => {
  return (
    <div
      className={`
        p-2
        border
        border-gray-500
        rounded-lg
        ${className}
      `}
    >
      {children}
    </div>
  );
};

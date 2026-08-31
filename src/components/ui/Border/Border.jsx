export const Border = ({ children, className }) => {
  return (
    <div
      className={`
        px-2 py-[0.4rem]
        rounded-lg
        ${className}
      `}
    >
      {children}
    </div>
  );
};

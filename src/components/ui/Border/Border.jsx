
export const Border = ({ children, className }) => {
  return (
    <div className={`border border-gray-400 rounded-lg ${className}`}>
      {children}
    </div>
  );
};

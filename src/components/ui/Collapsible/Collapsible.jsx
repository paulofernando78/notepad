export const Collapsible = ({ children, label }) => {
  return (
    <>
      <div className="p-2 border rounded">{label}</div>
      <div>{children}</div>
    </>
  );
};

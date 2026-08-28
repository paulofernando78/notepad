export const WidgetContainer = ({ children }) => {
  return (
    <div className="">
      <span>Add</span>
      <div className="flex gap-4">{children}</div>
    </div>
  );
};

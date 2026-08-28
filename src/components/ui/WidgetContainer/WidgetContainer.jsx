export const WidgetContainer = ({ children }) => {
  return (
    <div className="">
      <span>Add</span>
      <div className="flex w-full gap-4 overflow-x-auto">{children}</div>
    </div>
  );
};

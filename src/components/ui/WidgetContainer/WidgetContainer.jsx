import { Icon } from "@/components/ui/Icon";

export const WidgetContainer = ({ children, onAdd }) => {
  return (
    <div className="flex gap-2">
      {children}
      <button
        type="button"
        onClick={() => onAdd("clock")}
        className="
          grid
          place-items-center
          p-2
          h-[305px]
          border
          border-gray-500
          rounded-lg
          cursor-pointer
          "
      >
        <div className="flex items-center gap-2">
          <Icon name="circlePlus" />
        </div>
      </button>
    </div>
  );
};

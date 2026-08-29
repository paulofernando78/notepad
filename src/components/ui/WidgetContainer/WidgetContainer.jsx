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
          w-max
          h-[305px]
          border
          border-gray-600
          rounded-lg
          "
      >
        <div className="flex items-center gap-2">
          <Icon name="circlePlus" size={25} />
        </div>
      </button>
    </div>
  );
};

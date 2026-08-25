import { Icon } from "@/components/ui/Icon";

export const Header = () => {
  return (
    <div className="flex justify-between items-center gap-2 mb-6 p-2 border-b border-gray-700">
      <div className="flex items-center gap-2">
        <Icon name="notepadText" />
        <h1 className="text-lg text-white font-bold">Para TDHs bugados kkk</h1>
      </div>
    </div>
  );
};

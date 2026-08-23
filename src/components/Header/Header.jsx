import { Border } from "../Border";
import { Icon } from "@/components/Icon";
import { Clock } from "../Clock"

export const Header = () => {
  return (
    <Border className="flex justify-between items-center gap-2 p-2 bg-gray-800">
      <div className="flex items-center gap-2">
        <Icon name="notepadText" />
        <h1 className="text-lg text-white font-bold">Dev Notes</h1>
      </div>
      <Clock className="pr-1"/>
    </Border>
  );
};

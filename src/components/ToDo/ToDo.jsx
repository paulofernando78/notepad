import { Border } from "../Border";

const statusOptions = [
  {
    label: "To Do",
    color: "border-gray-300 bg-gray-100",
  },
  {
    label: "Doing",
    color: "border-green-300 bg-green-100",
  },
  {
    label: "Delegate",
    color: "border-yellow-300 bg-yellow-100",
  },
  {
    label: "Done",
    color: "border-red-300 bg-red-100",
  },
];

export const ToDo = () => {
  return (
    <div className="grid grid-cols-4 gap-2 p-2">
      {statusOptions.map((status) => (
        <div className="flex flex-col gap-2">
          <Border className={`px-2 py-1 border-2 ${status.color}`}>
            <span className="block mb-2 font-bold">{status.label}</span>
              <span className="block w-full px-2 border">radio.item</span>
          </Border>
        </div>
      ))}
    </div>
  );
};

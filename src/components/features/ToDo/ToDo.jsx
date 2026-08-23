import { Board } from "@/components/ui/Board";
import { Icon } from "@/components/ui/Icon";

const statusOptions = [
  {
    id: "todo",
    label: "To Do",
    color: "border-gray-300 bg-gray-100",
  },
  {
    id: "doing",
    label: "Doing",
    color: "border-green-300 bg-green-100",
  },
  {
    id: "delegate",
    label: "Delegate",
    color: "border-yellow-300 bg-yellow-100",
  },
  {
    id: "done",
    label: "Done",
    color: "border-red-300 bg-red-100",
  },
];

export const ToDo = () => {
  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-4 gap-2 py-2 min-w-max">
        {statusOptions.map((status) => (
          <section key={status.id} className="flex flex-col gap-2">
            <Board className={`px-2 py-1 min-w-47.5 border-0 ${status.color}`}>
              <div className="flex items-center justify-between">
                <span className="block mb-2 font-bold">{status.label}</span>
                <Icon name="ellipsis"/>
              </div>
              <span
                className={`block w-full mb-1 px-2 border rounded ${status.color}`}
              >
                todo.item
              </span>
            </Board>
          </section>
        ))}
      </div>
    </div>
  );
};

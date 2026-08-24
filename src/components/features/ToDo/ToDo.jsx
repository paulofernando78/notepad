import { Board } from "@/components/ui/Board";
import { Icon } from "@/components/ui/Icon";

const statusOptions = [
  {
    id: "todo",
    label: "To Do",
    color: "border-gray-500/50 bg-gray-500/20",
  },
  {
    id: "in-progress",
    label: "In progress",
    color: "border-green-500/20 bg-green-500/10",
  },
  {
    id: "delegate",
    label: "Delegate",
    color: "border-yellow-500/20 bg-yellow-500/10",
  },
  {
    id: "done",
    label: "Done",
    color: "border-red-500/20 bg-red-500/10",
  },
];

export const ToDo = () => {
  return (
    <div className="overflow-x-auto text-slate-100">
      <div className="grid grid-cols-4 gap-2 py-2 min-w-max">
        {statusOptions.map((status) => (
          <section key={status.id} className="flex flex-col gap-2">
            <Board
              className={`px-2 pt-1 pb-2 min-w-47.5 border-0 ${status.color}`}
            >
              <div className="flex items-center justify-between">
                <span className="block mb-2 font-bold uppercase">{status.label}</span>
                <Icon name="ellipsis" />
              </div>
              <div className={`flex items-center gap-1 p-1 border rounded ${status.color}`}>
                <Icon name="plus" />
                <span>Add task...</span>
              </div>
            </Board>
          </section>
        ))}
      </div>
    </div>
  );
};

import { Border } from "@/components/ui/Border";
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

export const TaskBoard = () => {
  return (
    <div className="
        max-w-[1008px]
        overflow-x-auto
        text-slate-100
       "
      >
      <div className="
        flex
        gap-2
        mb-2
        p-2
        bg-gray-500/20
        rounded-lg
        "
      >
        <Icon name="messageCircleWarning" />
        <p>
          Break your big task into 'Micro-Wins'." Pick ONLY 3 things to do
          today. If you do these, the day is a success. Everything else is a
          bonus.
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2 pt-2 min-w-max">
        {statusOptions.map((status) => (
          <section key={status.id} className="flex flex-col gap-2">
            <Border
              className={`px-2 pt-1 pb-2 min-w-47.5 border-0 ${status.color}`}
            >
              <div className="flex items-center justify-between">
                <span className="block mb-2 font-bold uppercase">
                  {status.label}
                </span>
                <Icon name="ellipsis" className="translate-y-[-0.4rem]" />
              </div>
              <div
                className={`
                  flex
                  items-center
                  gap-1
                  w-full
                  p-1
                  border
                  rounded
                  ${status.color}
                  `
                }
              >
                <Icon name="plus" />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Add task..."
                  className="pl-2 w-full"
                  />
              </div>
            </Border>
          </section>
        ))}
      </div>
    </div>
  );
};

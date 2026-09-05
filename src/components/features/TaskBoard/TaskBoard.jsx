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

const TaskBoardNotice = () => {
  return (
    <div
      className="
        flex
        gap-2
        p-2
        bg-gray-500/20
        rounded-lg
      "
    >
      <Icon name="messageCircleWarning" cursorNone />
      <p>
        Break your big task into 'Micro-Wins'." Pick ONLY 3 things to do today.
        If you do these, the day is a success. Everything else is a bonus.
      </p>
    </div>
  );
};

const TaskComposer = ({ color }) => {
  return (
    <div
      className={`
        flex
        items-center
        gap-1
        w-full
        p-1
        border
        rounded
        ${color}
      `}
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
  );
};

const TaskBoardColumn = ({ status }) => {
  return (
    <section className="flex flex-col gap-2">
      <div
        className={`
          p-2
          global-border
          ${status.color}
        `}
      >
        <div className="flex items-center justify-between">
          <span className="block mb-2 font-bold uppercase">{status.label}</span>
          <Icon name="ellipsis" className="translate-y-[-0.4rem]" />
        </div>
        <TaskComposer color={status.color} />
      </div>
    </section>
  );
};

export const TaskBoard = () => {
  return (
    <div className="grid">
      <TaskBoardNotice />
      <div
        className="
      overflow-x-auto
      text-slate-100
      "
      >
        
        <div className="grid gap-2 pt-2 [grid-template-columns:repeat(4,minmax(220px,1fr))]">
          {statusOptions.map((status) => (
            <TaskBoardColumn key={status.id} status={status} />
          ))}
        </div>
      </div>
    </div>
  );
};

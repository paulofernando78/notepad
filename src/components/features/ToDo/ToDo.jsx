import { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
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

const initialTasks = [
  {
    id: "task-1",
    title: "Note.title",
    description: "note.description",
    status: "todo",
  },
  {
    id: "task-2",
    title: "Note.title",
    description: "note.description",
    status: "doing",
  },
];

const KanbanTask = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Board
      ref={setNodeRef}
      style={style}
      className={`flex cursor-grab flex-col bg-white p-2 shadow-sm active:cursor-grabbing ${
        isDragging ? "opacity-60" : ""
      }`}
      {...listeners}
      {...attributes}
    >
      <span className="font-bold">{task.title}</span>
      <span className="text-sm text-gray-700">{task.description}</span>
    </Board>
  );
};

const KanbanColumn = ({ status, tasks }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status.id,
  });

  return (
    <section ref={setNodeRef} className="flex min-w-47.5 flex-col gap-2">
      <Board
        className={`border-0 px-2 pt-1 pb-2 ${
          status.color
        } ${isOver ? "ring-2 ring-gray-800" : ""}`}
      >
        <div className="flex items-center justify-between">
          <span className="block mb-2 font-bold">{status.label}</span>
          <Icon name="ellipsis" />
        </div>
        <div className="flex items-center gap-1 p-1 border border-gray-500 rounded">
          <Icon name="plus" />
          <span>Add task...</span>
        </div>
      </Board>

      <div className="flex min-h-32 flex-col gap-2 rounded border border-dashed border-gray-300 p-2">
        {tasks.map((task) => (
          <KanbanTask key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
};

export const ToDo = () => {
  const [tasks, setTasks] = useState(initialTasks);

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) return;

    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== active.id) return task;

        return {
          ...task,
          status: over.id,
        };
      }),
    );
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="overflow-x-auto text-black">
        <div className="grid grid-cols-4 gap-2 py-2 min-w-max">
          {statusOptions.map((status) => (
            <KanbanColumn
              key={status.id}
              status={status}
              tasks={tasks.filter((task) => task.status === status.id)}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
};

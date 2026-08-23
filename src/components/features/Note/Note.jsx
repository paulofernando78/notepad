import { useState } from "react";
import { Board } from "@/components/ui/Board";
import { Icon } from "@/components/ui/Icon";

export const Note = () => {
  const [bookmark, setBookmark] = useState(false);

  function handleBookmark() {
    setBookmark((current) => !current);
  }

  return (
    <Board className="flex flex-col h-60">
      {/* Title */}
      <div className="flex items-center justify-between px-2">
        <span className="block pl-1 pt-2 pb-1 font-bold text-lg">
          Note.title
        </span>
        <button type="button" onClick={handleBookmark}>
          {bookmark ? (
            <Icon name="bookmark" fill="gray" />
          ) : (
            <Icon name="bookmark" />
          )}
        </button>
      </div>
      <hr className="px-3" />
      {/* Description */}
      <div className="flex-1 overflow-hidden">
        <p className="px-3 py-2">note.description</p>
      </div>
      <div className="flex justify-end gap-2 p-2">
        <Icon name="folderPlus" />
        <Icon name="paintBucket" />
        <Icon name="trash" />
      </div>
    </Board>
  );
};

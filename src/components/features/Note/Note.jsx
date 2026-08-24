import { useState } from "react";
import { Board } from "@/components/ui/Board";
import { Icon } from "@/components/ui/Icon";

export const Note = () => {
  const [bookmark, setBookmark] = useState(false);

  function handleBookmark() {
    setBookmark((current) => !current);
  }

  return (
    <Board className="flex flex-col w-70 h-60">
      {/* Title */}
      <div className="flex items-center justify-between px-2">
        <span className="block pl-1 pt-2 pb-1 font-bold text-lg">
          Note.title
        </span>
        <div className="flex items-center gap-2">
          <button type="button" onClick={handleBookmark}>
            {bookmark ? (
              <Icon name="bookmark" fill="gray" />
            ) : (
              <Icon name="bookmark" />
            )}
          </button>
          <button>
            <Icon name="paintBucket" />
          </button>
          <button>
            <Icon name="trash" />
          </button>
        </div>
      </div>
      <hr className="px-3" />
      {/* Description */}
      <div className="flex-1 overflow-hidden">
        <p className="px-3 py-2">note.description</p>
      </div>
      <div className="flex items-center gap-2 p-2">
        <Icon name="folderPlus" />
        <span>Folder's name</span>
      </div>
    </Board>
  );
};

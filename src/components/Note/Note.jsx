import { useState } from "react";
import { Bookmark, PaintBucket, Trash } from "lucide-react";
import { Border } from "../Border";

export const Note = () => {
  const [bookmark, setBookmark] = useState(false);

  function handleBookmark() {
    setBookmark((current) => !current);
  }

  return (
    <Border className="flex flex-col h-60">
      {/* Title */}
      <div className="flex items-center justify-between px-2">
        <span className="block pl-1 pt-2 pb-1 font-bold text-lg">Note.title</span>
        <button type="button" onClick={handleBookmark}>
          {bookmark ? (
            <Bookmark size={17} className="icon-color" fill="lightgray" />
          ) : (
            <Bookmark size={17} className="icon-color" />
          )}
        </button>
      </div>
      <hr className="px-3" />
      {/* Description */}
      <div className="flex-1 overflow-hidden">
        <p className="px-3 py-2">note.description</p>
      </div>
      <div className="flex justify-end gap-2 p-2">
        <PaintBucket size={17} className="icon-color" />
        <Trash size={17} className="icon-color" />
      </div>
    </Border>
  );
};

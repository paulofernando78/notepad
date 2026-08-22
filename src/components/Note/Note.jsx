import { Bookmark, PaintBucket, Trash } from "lucide-react";
import { Border } from "../Border";

export const Note = () => {
  return (
    <Border>
      <div
        className="
        flex
        items-center
        justify-between
        px-2"
      >
        <span
          className="
          block
          pl-1
          pt-2
          pb-1
          font-bold
          text-lg"
        >
          Note.title
        </span>
        <Bookmark size={17} className="icon-color" />
        <Bookmark size={17} className="text-400-gray" />
      </div>
      <hr className="px-3" />
      <p
        className="
        px-3
        py-2"
      >
        note.description
      </p>
      <div className="flex justify-end gap-2 p-2">
        <PaintBucket size={17} className="text-400-gray" />
        <Trash size={17} className="text-400-gray" />
      </div>
    </Border>
  );
};

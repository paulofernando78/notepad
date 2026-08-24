import {
  Bookmark,
  CirclePause,
  CirclePlay,
  Ellipsis,
  FolderClosed,
  FolderOpen,
  FolderPlus,
  NotepadText,
  PaintBucket,
  Pencil,
  Plus,
  Search,
  SquareText,
  RotateCcw,
  Trash,
  X
} from "lucide-react";

const icons = {
  bookmark: Bookmark,
  circlePause: CirclePause,
  circlePlay: CirclePlay,
  ellipsis: Ellipsis,
  folderClosed: FolderClosed,
  folderOpen: FolderOpen,
  folderPlus: FolderPlus,
  notepadText: NotepadText,
  paintBucket: PaintBucket,
  pencil: Pencil,
  plus: Plus,
  search: Search,
  squareText: SquareText,
  rotateCcw: RotateCcw,
  trash: Trash,
  x: X
};

export const Icon = ({
  name,
  size = 20,
  className = "",
  ...props
}) => {
  const LucideIcon = icons[name];
  if (!LucideIcon) return null;

  return (
    <LucideIcon size={size} className={`icon-color cursor-pointer ${className}`} {...props} />
  );
};

import {
  Bookmark,
  CirclePause,
  CirclePlay,
  Check,
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
} from "lucide-react";

const icons = {
  bookmark: Bookmark,
  circlePause: CirclePause,
  circlePlay: CirclePlay,
  check: Check,
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

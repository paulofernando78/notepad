import {
  Bookmark,
  Brain,
  CirclePause,
  CirclePlay,
  Check,
  Ellipsis,
  FolderClosed,
  FolderOpen,
  Info,
  FolderPlus,
  NotepadText,
  PaintBucket,
  Pencil,
  Plus,
  Search,
  SquareText,
  RotateCcw,
  Trash,
  Volume,
  VolumeX
} from "lucide-react";

const icons = {
  bookmark: Bookmark,
  brain: Brain,
  circlePause: CirclePause,
  circlePlay: CirclePlay,
  check: Check,
  ellipsis: Ellipsis,
  folderClosed: FolderClosed,
  folderOpen: FolderOpen,
  info: Info,
  folderPlus: FolderPlus,
  notepadText: NotepadText,
  paintBucket: PaintBucket,
  pencil: Pencil,
  plus: Plus,
  search: Search,
  squareText: SquareText,
  rotateCcw: RotateCcw,
  trash: Trash,
  volume: Volume,
  volumeX: VolumeX
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

import {
  // B
  Bookmark,
  Brain,
  // C
  Calendar,
  CirclePause,
  CirclePlay,
  CirclePlus,
  Check,
  // D
  Dot,
  // E
  Ellipsis,
  // F
  FolderClosed,
  FolderOpen,
  FolderPlus,
  // I
  Info,
  // M
  MapPin,
  // N
  NotepadText,
  // P
  PaintBucket,
  Pencil,
  Plus,
  // R
  RotateCcw,
  // S
  Search,
  SquareText,
  // T
  Thermometer,
  Trash,
  // V
  Volume,
  VolumeX
} from "lucide-react";

const icons = {
  // B
  bookmark: Bookmark,
  brain: Brain,
  // C
  calendar: Calendar,
  circlePause: CirclePause,
  circlePlay: CirclePlay,
  circlePlus: CirclePlus,
  check: Check,
  // D
  dot: Dot,
  // E
  ellipsis: Ellipsis,
  // F
  folderClosed: FolderClosed,
  folderOpen: FolderOpen,
  folderPlus: FolderPlus,
  // I
  info: Info,
  // M
  mapPin: MapPin,
  // N
  notepadText: NotepadText,
  // P
  paintBucket: PaintBucket,
  pencil: Pencil,
  plus: Plus,
  // R
  rotateCcw: RotateCcw,
  // S
  search: Search,
  squareText: SquareText,
  // T
  thermometer: Thermometer,
  trash: Trash,
  // V
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

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
  ChevronRight,
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
  MessageCircleWarning,
  // N
  NotepadText,
  // P
  PaintBucket,
  Plus,
  // R
  RotateCcw,
  // S
  Search,
  SquarePen,
  SquareText,
  // T
  Thermometer,
  Trash,
  // V
  Volume,
  VolumeX,
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
  chevronRight: ChevronRight,
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
  messageCircleWarning: MessageCircleWarning,
  // N
  notepadText: NotepadText,
  // P
  paintBucket: PaintBucket,
  plus: Plus,
  // R
  rotateCcw: RotateCcw,
  // S
  search: Search,
  squarePen: SquarePen,
  squareText: SquareText,
  // T
  thermometer: Thermometer,
  trash: Trash,
  // V
  volume: Volume,
  volumeX: VolumeX,
};

export const Icon = ({ name, size = 20, className = "", ...props }) => {
  const LucideIcon = icons[name];
  if (!LucideIcon) return null;

  return (
    <LucideIcon
      size={size}
      className={`
        text-gray-400
        shrink-0
        cursor-pointer
        ${className}
        `}
      {...props}
    />
  );
};

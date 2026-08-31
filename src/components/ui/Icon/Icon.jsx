import {
  // A
  ArrowRight,
  // B
  Bookmark,
  Brain,
  // C
  Calendar,
  CirclePause,
  CirclePlay,
  CirclePlus,
  Check,
  ChevronDown,
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
  Minus,
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
  // X
  X,
} from "lucide-react";

const icons = {
  // A
  arrowRight: ArrowRight,
  // B
  bookmark: Bookmark,
  brain: Brain,
  // C
  calendar: Calendar,
  circlePause: CirclePause,
  circlePlay: CirclePlay,
  circlePlus: CirclePlus,
  check: Check,
  chevronDown: ChevronDown,
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
  minus: Minus,
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
  // X
  x: X,
};

export const Icon = ({
    name,
    size = 20,
    className = "",
    cursorNone = false,
    ...props
  }) => {
  const LucideIcon = icons[name];
  if (!LucideIcon) return null;

  return (
    <LucideIcon
      size={size}
      className={`
        text-gray-400
        shrink-0
        ${cursorNone ? "cursor-default" : "cursor-pointer hover:text-gray-500"}
        ${className}
        `}
      {...props}
    />
  );
};

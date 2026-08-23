import {
  Bookmark,
  Ellipsis,
  FolderClosed,
  FolderOpen,
  NotepadText,
  PaintBucket,
  Plus,
  Search,
  SquareText,
  Trash,
} from "lucide-react";

const icons = {
  bookmark: Bookmark,
  ellipsis: Ellipsis,
  folderClosed: FolderClosed,
  folderOpen: FolderOpen,
  notepadText: NotepadText,
  paintBucket: PaintBucket,
  plus: Plus,
  search: Search,
  squareText: SquareText,
  trash: Trash,
};

export const Icon = ({
  name,
  size = 18,
  className = "",
  ...props
}) => {
  const LucideIcon = icons[name];
  if (!LucideIcon) return null;

  return (
    <LucideIcon size={size} className={`icon-color cursor-pointer ${className}`} {...props} />
  );
};

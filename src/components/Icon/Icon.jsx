import {
  Bookmark,
  FolderClosed,
  FolderOpen,
  NotepadText,
  PaintBucket,
  Plus,
  Search,
  Trash,
} from "lucide-react";

const icons = {
  bookmark: Bookmark,
  folderClosed: FolderClosed,
  folderOpen: FolderOpen,
  notepadText: NotepadText,
  paintBucket: PaintBucket,
  plus: Plus,
  search: Search,
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

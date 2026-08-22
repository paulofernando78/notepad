import { useState } from "react";
// import { Link } from "react-router-dom";
import { Border } from "../Border";

import { Plus, FolderClosed, FolderOpen } from "lucide-react";

export const Sidebar = () => {
  const iconSize = 18;
  const [folderOpen, setFolderOpen] = useState(false);

  function handleFolderToggle() {
    setFolderOpen((current) => !current);
  }

  return (
    <Border>
      <aside>
      <nav className="p-2 space-y-2">
        
        <hr className="text-gray-400" />
        <div className="flex items-center justify-between">
          <button
            onClick={handleFolderToggle}
            className="flex items-center gap-2"
          >
            {folderOpen ? (
              <FolderOpen size={iconSize} />
            ) : (
              <FolderClosed size={iconSize} />
            )}
            <span>folder.name</span>
          </button>
          <button>
            <Plus size={iconSize} />
          </button>
        </div>
      </nav>
    </aside>
    </Border>
    
  );
};

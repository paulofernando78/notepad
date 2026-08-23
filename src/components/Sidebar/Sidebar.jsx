import { useState } from "react";
import { Link } from "react-router-dom";

import { Icon } from "@/components/Icon";
import { Border } from "../Border";

export const Sidebar = () => {
  const [folderOpen, setFolderOpen] = useState(false);

  function handleFolderToggle() {
    setFolderOpen((current) => !current);
  }

  return (
    <Border>
      <aside>
        <nav className="p-2">
          <button className="flex items-center gap-2">
            <Icon name="plus" />
            <span>New folder</span>
          </button>
          <div className="flex items-center gap-1">
            <Icon name="bookmark" />
            <Link to="" />
            Favorites
          </div>
          <hr className="my-3 text-gray-400" />
          <div className="flex items-center justify-between">
            <button
              onClick={handleFolderToggle}
              className="flex items-center gap-2"
            >
              {folderOpen ? (
                <Icon name="folderOpen" />
              ) : (
                <Icon name="folderClosed" />
              )}
              <span>folder.name</span>
            </button>
          </div>
        </nav>
      </aside>
    </Border>
  );
};

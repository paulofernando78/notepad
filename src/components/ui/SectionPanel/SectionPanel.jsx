import { useId, useState } from "react";

import { Icon } from "@/components/ui/Icon";

export const SectionPanel = ({ title, children, className }) => {
  const headingId = useId();
  const [isOpen, setIsOpen] = useState(true);

  function handleToggle() {
    setIsOpen((current) => !current);
  }

  return (
    <section
      aria-labelledby={headingId}
      className={`
        p-3
        w-full
        bg-gray-100/10
        rounded-lg
        overflow-x-auto
        ${className}
      `}
    >
      <header
        className="
          block
          pb-3
          text-lg
          font-bold
          uppercase
        "
      >
        <button
          onClick={handleToggle}
          className="
            flex
            items-center
            gap-2
            cursor-pointer
          "
        >
          <Icon name={isOpen ? "chevronDown": "chevronRight"} size={23}/>
          <h2>{title}</h2>
        </button>
      </header>
      <div
        className="
          flex gap-2
          bg-gray-100/10
          p-2
          w-max
          rounded-lg
        "
      >
        {isOpen && children }
      </div>
    </section>
  );
};

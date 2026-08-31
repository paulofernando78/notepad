import { useId, useState } from "react";

import { Icon } from "@/components/ui/Icon";

export const SectionPanel = ({
  title,
  children,
  className = "",
  defaultOpen = true,
  storageKey,
}) => {
  const headingId = useId();
  const [isOpen, setIsOpen] = useState(() => {
    if (!storageKey) return defaultOpen;

    const savedValue = localStorage.getItem(storageKey);

    if (savedValue === null) return defaultOpen;

    return savedValue === "true";
  });

  function handleToggle() {
    setIsOpen((current) => {
      const next = !current;

      if (storageKey) {
        localStorage.setItem(storageKey, String(next));
      }

      return next;
    });
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
        className={`
          flex
          items-center
          justify-between
          text-lg
          font-bold
           ${isOpen ? "pb-3" : ""}
          `}
      >
        <button
          onClick={handleToggle}
          className="
            flex
            items-center
            gap-2
            w-full
            cursor-pointer
          "
        >
          <Icon name={isOpen ? "chevronDown" : "chevronRight"} size={23} />
          <h2>{title}</h2>
        </button>
      </header>
      {isOpen && (
        <div
          className="
          flex gap-2
          bg-gray-100/10
          p-2
          rounded-lg
        "
        >
          {children}
        </div>
      )}
    </section>
  );
};

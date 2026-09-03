import { useState, useId, useRef } from "react";

import { Icon } from "@/components/ui/Icon";

export const SectionPanel = ({
  title,
  children,
  defaultOpen = true,
  storageKey,
  count,
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

  // <header data-widget-drag-handle>
  // Assim o scroll não começa no header do card.
  function shouldIgnoreDrag(target) {
    return target.closest(
      "button, input, textarea, select, a, [data-widget-drag-handle]",
    );
  }

  const scrollRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // #1 Function DOWN
  function handlePointerDown(event) {
    if (shouldIgnoreDrag(event.target)) return;

    isDraggingRef.current = true;
    startXRef.current = event.clientX;
    scrollLeftRef.current = scrollRef.current.scrollLeft;

    event.currentTarget.setPointerCapture(event.pointerId)
  }

  // #2 Function MOVE
  function handlePointerMove(event) {
    if (!isDraggingRef.current) return;

    const distance = event.clientX - startXRef.current;
    scrollRef.current.scrollLeft = scrollLeftRef.current - distance;
  }

  // #3 Function UP
  function handlePointerUp(event) {
    isDraggingRef.current = false;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <section
      aria-labelledby={headingId}
      className={`
        p-2
        w-full
        bg-gray-100/10
        rounded-lg
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
          "
        >
          <Icon name={isOpen ? "chevronDown" : "chevronRight"} size={23} />
          <h2>{title}</h2>
          {count !== undefined && <span className="ml-1">{count}</span>}
        </button>
      </header>
      {isOpen && (
        <div
          ref={scrollRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="
            flex
            gap-2
            p-2
            bg-gray-100/10
            rounded-lg
            overflow-x-auto
            no-scrollbar
            cursor-grab
            active:cursor-grabbing
            select-none
            touch-pan-x
          "
        >
          {children}
        </div>
      )}
    </section>
  );
};

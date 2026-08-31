import { useId } from "react";

export const SectionPanel = ({ title, children, className }) => {
  const headingId = useId();

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
        <h2>{title}</h2>
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
        {children}
      </div>
    </section>
  );
};

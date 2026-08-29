export const SectionPanel = ({ title, children }) => {
  return (
    <section
      className="
      p-2
      w-full
      bg-gray-100/10
      rounded-lg
      overflow-x-auto
      "
    >
      <header className="block pb-2 text-lg font-bold uppercase">
        <h2>{title}</h2>
      </header>
      <div className="flex gap-2">{children}</div>
    </section>
  );
};

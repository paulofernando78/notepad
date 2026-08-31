export const Widget = ({ title, headerAction, children }) => {
  return (
    <article
      className="
      min-w-58.25
      font-['Oswald_Variable']
      "
    >
      <div>
        <header
          className="
            relative
            py-2
            text-center
            uppercase
            border-b-0
            bg-black/50
            rounded-tl-lg
            rounded-tr-lg
            rounded-br-none
            rounded-bl-none
          "
        >
          <h3>{title}</h3>
          {headerAction && (
            <div className="
              absolute
              right-[0.44rem]
              top-[1.4rem]
              -translate-y-1/2
              "
            >
              {headerAction}
            </div>
          )}
        </header>
        <div
          className="
          h-68
          pt-4 pb-5.25
        text-white
        bg-gray-500/30
          rounded-tr-none
          rounded-tl-none
          rounded-br-lg
          rounded-bl-lg
          [text-shadow:0_0_6px_rgba(255,255,255,0.3)]
          "
        >
          {children}
        </div>
      </div>
    </article>
  );
};

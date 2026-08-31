
export const Dialog = ({ dialogRef, children, className = "" }) => {
  return (
    <dialog
      ref={dialogRef}
      className={`
        max-w-200
        w-[calc(100%-1rem)]
        m-auto
        px-3
        pt-[0.6rem]
        pb-1.5
        text-white
        text-left
        font-['Montserrat_Variable',sans-serif]
        normal-case
        bg-[#55575D]
        border-2
        border-gray-500
        rounded-lg
        backdrop:bg-black/70
        ${className}
      `}
    >
      {children}
    </dialog>
  );
};

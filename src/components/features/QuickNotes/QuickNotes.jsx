import { useState } from "react";

import { WidgetBody, WidgetControls } from "@/components/ui/Widget";

export const QuickNotes = ({ note = "", onConfigChange, onRemove }) => {
  const [currentNote, setCurrentNote] = useState(note);

  function handleNoteChange(event) {
    const nextNote = event.target.value;

    setCurrentNote(nextNote);
    onConfigChange?.({ note: nextNote });
  }

  function handleReset() {
    setCurrentNote("");
    onConfigChange?.({ note: "" });
  }

  return (
    <WidgetBody
      middle={
        <textarea
          value={currentNote}
          onChange={handleNoteChange}
          placeholder="Jot down..."
          className="
              w-53
              h-full
              mb-4
              p-3
              text-lg
              text-gray-700
              font-['Indie_Flower',cursive]
              leading-6
              bg-linear-to-tl from-white to-gray-300
              shadow-[inset_0_2px_10px_rgba(0,0,0,0.18)]
              border-0
              resize-none
              outline-none
              rounded
            "
        />
      }
      bottom={
        <WidgetControls>
          <WidgetControls.Reset onClick={handleReset} />
          <WidgetControls.Erase onClick={onRemove} />
        </WidgetControls>
      }
    />
  );
};

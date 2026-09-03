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
              text-gray-700
              font-['Indie_Flower',cursive]
              bg-gradient-to-tl from-yellow-100 via-yellow-200 to-yellow-300
              border-0
              resize-none
              outline-none
              rounded-sm
              shadow-lg
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

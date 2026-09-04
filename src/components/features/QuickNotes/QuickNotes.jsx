import { useState } from "react";

import { WidgetBody, WidgetControls } from "@/components/ui/Widget";

export const QuickNotes = ({ note = "", onConfigChange, onClose }) => {
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
    <WidgetBody onClose={onClose}
      middle={
          <div className="w-full h-full p-4">
            <textarea
              value={currentNote}
              onChange={handleNoteChange}
              placeholder="Jot down..."
              className="
                  w-full    
                  h-full
                  p-3
                  text-lg
                  text-gray-700
                  font-['Indie_Flower',cursive]
                  leading-6
                  bg-linear-to-tl from-white to-gray-300
                  resize-none
                  outline-none
                  rounded
                "
            />
          </div>
      }
      bottom={
        <WidgetControls>
          <WidgetControls.Reset onClick={handleReset} />
        </WidgetControls>
      }
    />
  );
};

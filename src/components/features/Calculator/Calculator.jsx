import { useState } from "react";

import { WidgetBody, WidgetControls } from "@/components/ui/Widget";

export const Calculator = ({ onConfigChange, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);

  function handleEdit() {
    setIsEditing(true);
  }

  function handleConfirm() {
    onConfigChange?.({});
    setIsEditing(false);
  }

  function handleReset() {
    setIsEditing(false);
  }

  return (
    <WidgetBody
      top={<span>...</span>}
      middle={!isEditing ? (
        <span>...</span>
        ) : ( 
          <span>editing...</span>
        )}
      bottom={
        <WidgetControls>
          <WidgetControls.Reset onClick={handleReset} />
          <WidgetControls.Edit
            isEditing={isEditing}
            onEdit={handleEdit}
            onConfirm={handleConfirm}
          />
          <WidgetControls.Erase onClick={onRemove} />
        </WidgetControls>
      }
    />
  );
};
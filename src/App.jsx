import { useEffect, useRef, useState } from "react";

import "./App.css";
import { Header } from "@/components/layout/Header";

import { SectionPanel } from "@/components/ui/SectionPanel";

// Widget / ui
import { WidgetContainer, WidgetCard } from "@/components/ui/Widget";
// Widget / features
import { widgetCatalog, WidgetPicker } from "@/components/features/Widget";

// Taskboard
import { TaskBoard } from "@/components/features/TaskBoard";

// Notes
import { Note } from "@/components/features/Note";
import { Sidebar } from "@/components/layout/Sidebar";
import { SearchBar } from "@/components/ui/SearchBar";

function App() {
  const [widgets, setWidgets] = useState([
    {
      id: crypto.randomUUID(),
      type: "clock",
      config: { ...widgetCatalog.clock.defaultConfig },
    },
  ]);
  const widgetPickerRef = useRef(null);

  useEffect(() => {
    widgetPickerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "end",
    });
  }, [widgets.length]);

  function addWidget(type) {
    const definition = widgetCatalog[type];

    if (!definition) return;

    const newWidget = {
      id: crypto.randomUUID(),
      type,
      config: { ...definition.defaultConfig },
    };

    setWidgets((currentWidgets) => [...currentWidgets, newWidget]);
  }

  function removeWidget(id) {
    setWidgets((currentWidgets) =>
      currentWidgets.filter((widget) => widget.id !== id),
    );
  }

  return (
    <div
      className="
        flex flex-col
        gap-6
        w-full
        max-w-280
        min-h-screen
        mx-auto p-3
      "
    >
      <Header />

      <SectionPanel title="Widgets" storageKey="section-widget">
        <WidgetContainer>
          {widgets.map((widgetInstance) => {
            const definition = widgetCatalog[widgetInstance.type];
            const Component = definition.Component;

            const handleRemove = () => {
              removeWidget(widgetInstance.id);
            };

            return (
              <WidgetCard
                key={widgetInstance.id}
                title={definition.title}
                onRemove={() => removeWidget(widgetInstance.id)}
              >
                <Component {...widgetInstance.config} onRemove={handleRemove} />
              </WidgetCard>
            );
          })}
          <WidgetPicker ref={widgetPickerRef} onAdd={addWidget} />
        </WidgetContainer>
      </SectionPanel>

      <SectionPanel title="Task Board" storageKey="section-task-board">
        <TaskBoard />
      </SectionPanel>

      <SectionPanel title="Notes">
        <div className="grid grid-cols-[200px_1fr] gap-2 flex-1">
          <Sidebar />
          <div className="space-y-2">
            <SearchBar />
            New Note
            <main className="flex flex-wrap gap-2 flex-1">
              <Note />
              <Note />
            </main>
          </div>
        </div>
      </SectionPanel>
    </div>
  );
}

export default App;

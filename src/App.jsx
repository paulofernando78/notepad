import { useState } from "react";

import "./App.css";
import { Header } from "@/components/layout/Header";

import { SectionPanel } from "@/components/ui/SectionPanel";
import { WidgetContainer } from "@/components/ui/WidgetContainer/WidgetContainer";
import { widgetCatalog } from "@/components/features/Widget/WidgetCatalog";
import { Widget } from "@/components/ui/Widget";
import { WidgetPicker } from "@/components/features/WidgetPicker/WidgetPicker";

import { TaskBoard } from "@/components/features/TaskBoard";
import { PomodoroGuideDialog } from "./components/features/PomodoroGuideDialog/PomodoroGuideDialog";
// import { Note } from "@/components/features/Note";
// import { Sidebar } from "@/components/layout/Sidebar";
// import { SearchBar } from "@/components/ui/SearchBar";

function App() {

  const [widgets, setWidgets] = useState([
    {
      id: crypto.randomUUID(),
      type: "clock",
      config: { ...widgetCatalog.clock.defaultConfig },
    },
    {
      id: crypto.randomUUID(),
      type: "pomodoro",
      config: {},
    },
    {
      id: crypto.randomUUID(),
      type: "timer",
      config: {},
    },
  ]);

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
    <div className="flex flex-col gap-6 min-h-screen w-full max-w-[1120px] mx-auto p-5">
      <Header />

      <SectionPanel title="Widget">
        <WidgetContainer>
          {widgets.map((widgetInstance) => {
            const definition = widgetCatalog[widgetInstance.type];
            const Component = definition.Component;

            const handleRemove = () => {
              removeWidget(widgetInstance.id);
            };

            return (
              <Widget
                key={widgetInstance.id}
                title={definition.title}
                headerAction={widgetInstance.type === "pomodoro" ? <PomodoroGuideDialog /> : null}
                onRemove={() => removeWidget(widgetInstance.id)}
              >
                <Component {...widgetInstance.config} onRemove={handleRemove} />
              </Widget>
            );
          })}
          <WidgetPicker onAdd={addWidget} />
        </WidgetContainer>
      </SectionPanel>

      <SectionPanel title="Task Board" className="w-max">
        <TaskBoard />
      </SectionPanel>

      {/* <SectionPanel title="Notes">
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
      </SectionPanel> */}
    </div>
  );
}

export default App;

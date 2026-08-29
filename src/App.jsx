// import { Routes, Route } from "react-router-dom";

import { Sidebar } from "@/components/layout/Sidebar";
import "./App.css";
import { Header } from "@/components/layout/Header";
import { Clock } from "@/components/features/Clock";

import { TaskBoard } from "@/components/features/TaskBoard";
import { SearchBar } from "@/components/ui/SearchBar";

// import { Collapsible } from "./components/ui/Collapsible";
import { Widget } from "./components/ui/Widget";
import { Note } from "@/components/features/Note";
import { Pomodoro } from "@/components/features/Pomodoro";
import { Timer } from "@/components/features/Timer";
import { WidgetContainer } from "./components/ui/WidgetContainer/WidgetContainer";

function App() {
  return (
    <div className="flex flex-col gap-6 min-h-screen p-1">
      <Header />

      <WidgetContainer>
        <Widget title={"Clock • Weather"}>
          <Clock city="São Paulo" latitude={-23.5505} longitude={-46.6333} />
        </Widget>
        <Widget title="Pomodoro">
          <Pomodoro />
        </Widget>
        <Widget title="Timer">
          <Timer />
        </Widget>
      </WidgetContainer>

      {/* TODO */}
      <div className="">
        <TaskBoard />
      </div>

      {/* NOTES */}
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
    </div>
  );
}

export default App;

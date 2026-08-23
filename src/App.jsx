// import { Routes, Route } from "react-router-dom";

import { Sidebar } from "@/components/layout/Sidebar";
import "./App.css";
import { Header } from "@/components/layout/Header";
import { Clock } from "@/components/features/Clock";

import { ToDo } from "@/components/features/ToDo";
import { SearchBar } from "@/components/ui/SearchBar";

import { Note } from "@/components/features/Note";
import { Pomodoro } from "./components/features/Pomodoro";
import { StopWatch } from "./components/features/StopWatch";

function App() {
  return (
    <div className="flex flex-col gap-2 min-h-screen p-1">
      <Header />
      <div>
        <Clock />
        <Pomodoro />
        <StopWatch />
      </div>
      <ToDo />
      <div className="grid grid-cols-[200px_1fr] gap-2 flex-1">
        <Sidebar />
        <div className="space-y-2">
          <SearchBar />
          <main className="grid grid-cols-3 gap-2 w-full flex-1">
            <Note />
            <Note />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;

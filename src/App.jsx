// import { Routes, Route } from "react-router-dom";

import { Sidebar } from "@/components/Sidebar";
import "./App.css";
import { Header } from "@/components/Header";
import { ToDo } from "@/components/ToDo";
import { SearchBar } from "@/components/SearchBar";

import { Note } from "@/components/Note";

function App() {
  return (
    <div className="flex flex-col gap-2 min-h-screen p-1">
      <Header />
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

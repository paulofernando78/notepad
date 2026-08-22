// import { Routes, Route } from "react-router-dom";

import { Border } from "./components/Border";
import { Sidebar } from "./components/Sidebar";
import "./App.css";
import { Header } from "./components/Header";
import { Note } from "./components/Note";

function App() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr] gap-1 p-1">
      <Border className="bg-gray-800">
        <Header />
      </Border>
      <div className="grid grid-cols-[200px_1fr] gap-1">
        <Border>
          <Sidebar />
        </Border>
        <Border className="p-2">
          <main className="grid grid-cols-3 gap-2">
            <Note />
            <Note />
          </main>
        </Border>
      </div>
    </div>
  );
}

export default App;

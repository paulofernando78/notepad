import { Board } from "@/components/ui/Board";

export const Timer = () => {
  return (
    <Board className="timer-card">
      <span>Timer</span>
      <span className="text-2xl">0:00</span>
    </Board>
  );
};

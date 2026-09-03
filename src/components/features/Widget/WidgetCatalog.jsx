import { Clock } from "@/components/features/Clock";
import { QuickNotes } from "@/components/features/QuickNotes";
import { Pomodoro } from "@/components/features/Pomodoro";
import { Timer } from "@/components/features/Timer";
import { WaterIntake } from "@/components/features/WaterIntake";
import { Calculator } from "@/components/features/Calculator";
import { Markets } from "@/components/features/Markets";

export const widgetCatalog = {
  clock: {
    title: "Clock",
    Component: Clock,
    defaultConfig: {
      location: "São Paulo, São Paulo, Brasil",
      latitude: -23.55052,
      longitude: -46.63331,
      timezone: "America/Sao_Paulo",
    },
  },
  quickNotes: {
    title: "quick notes",
    Component: QuickNotes,
    defaultConfig: {
      note: "",
    },
  },
  pomodoro: {
    title: "pomodoro",
    Component: Pomodoro,
    defaultConfig: {
      focusMinutes: 25,
      breakMinutes: 5,
      longBreakMinutes: 15,
      pomodoroGoal: 4,
    },
  },
  timer: {
    title: "timer",
    Component: Timer,
    defaultConfig: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
  },
  waterIntake: {
    title: "water intake",
    Component: WaterIntake,
    defaultConfig: {},
  },
  calculator: {
    title: "calculator",
    Component: Calculator,
    defaultConfig: {},
  },
  markets: {
    title: "markets",
    Component: Markets,
    defaultConfig: {},
  },
};

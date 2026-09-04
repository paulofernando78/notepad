import { Clock } from "@/components/features/Clock";
import { QuickNotes } from "@/components/features/QuickNotes";
import { Pomodoro } from "@/components/features/Pomodoro";
import { Timer } from "@/components/features/Timer";
import { WaterIntake } from "@/components/features/WaterIntake";
import { Calculator } from "@/components/features/Calculator";
import { Markets } from "@/components/features/Markets";

export const widgetCatalog = {
  clock: {
    title: "clock",
    widgetClassName: "bg-linear-to-bl from-gray-200 to-gray-500",
    imageName: "clock",
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
    widgetClassName: "bg-linear-to-bl from-yellow-200 to-yellow-500",
    imageName: "quickNotes",
    Component: QuickNotes,
    defaultConfig: {
      note: "",
    },
  },
  pomodoro: {
    title: "pomodoro",
    widgetClassName: "bg-linear-to-bl from-red-200 to-red-500",
    imageName: "pomodoro",
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
    widgetClassName: "bg-linear-to-bl from-purple-200 to-purple-500",
    imageName: "timer",
    Component: Timer,
    defaultConfig: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
  },
  waterIntake: {
    title: "water intake",
    widgetClassName: "bg-linear-to-bl from-blue-200 to-blue-500",
    imageName: "waterIntake",
    Component: WaterIntake,
    defaultConfig: {},
  },
  calculator: {
    title: "calculator",
    widgetClassName: "bg-linear-to-bl from-slate-200 to-slate-500",
    imageName: "calculator",
    Component: Calculator,
    defaultConfig: {},
  },
  markets: {
    title: "markets",
    widgetClassName: "bg-linear-to-bl from-green-200 to-green-500",
    imageName: "markets",
    Component: Markets,
    defaultConfig: {},
  },
};

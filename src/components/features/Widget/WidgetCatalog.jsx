import { Clock } from "@/components/features/Clock";
import { QuickNotes } from "@/components/features/QuickNotes";
import { Pomodoro } from "@/components/features/Pomodoro";
import { Timer } from "@/components/features/Timer";
import { WaterIntake } from "@/components/features/WaterIntake";
import { Calculator } from "@/components/features/Calculator";
import { Markets } from "@/components/features/Markets";

const bgFrom = 200;
const bgTo = 500;

export const widgetCatalog = {
  clock: {
    title: "clock",
    widgetClassName: "widget-gradient",
    widgetStyle: {
      "--widget-from": `var(--color-gray-${bgFrom})`,
      "--widget-to": `var(--color-gray-${bgTo})`,
    },
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
    widgetClassName: "widget-gradient",
    widgetStyle: {
      "--widget-from": `var(--color-yellow-${bgFrom})`,
      "--widget-to": `var(--color-yellow-${bgTo})`,
    },
    imageName: "quickNotes",
    Component: QuickNotes,
    defaultConfig: {
      note: "",
    },
  },
  pomodoro: {
    title: "pomodoro",
    widgetClassName: "widget-gradient",
    widgetStyle: {
      "--widget-from": `var(--color-red-${bgFrom})`,
      "--widget-to": `var(--color-red-${bgTo})`,
    },
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
    widgetClassName: "widget-gradient",
    widgetStyle: {
      "--widget-from": `var(--color-purple-${bgFrom})`,
      "--widget-to": `var(--color-purple-${bgTo})`,
    },
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
    widgetClassName: "widget-gradient",
    widgetStyle: {
      "--widget-from": `var(--color-blue-${bgFrom})`,
      "--widget-to": `var(--color-blue-${bgTo})`,
    },
    imageName: "waterIntake",
    Component: WaterIntake,
    defaultConfig: {},
  },
  calculator: {
    title: "calculator",
    widgetClassName: "widget-gradient",
    widgetStyle: {
      "--widget-from": `var(--color-slate-${bgFrom})`,
      "--widget-to": `var(--color-slate-${bgTo})`,
    },
    imageName: "calculator",
    Component: Calculator,
    defaultConfig: {},
  },
  markets: {
    title: "markets",
    widgetClassName: "widget-gradient",
    widgetStyle: {
      "--widget-from": `var(--color-green-${bgFrom})`,
      "--widget-to": `var(--color-green-${bgTo})`,
    },
    imageName: "markets",
    Component: Markets,
    defaultConfig: {},
  },
};

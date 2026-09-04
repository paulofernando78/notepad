import { Clock } from "@/components/features/Clock";
import { QuickNotes } from "@/components/features/QuickNotes";
import { Pomodoro } from "@/components/features/Pomodoro";
import { Timer } from "@/components/features/Timer";
import { WaterIntake } from "@/components/features/WaterIntake";
import { Calculator } from "@/components/features/Calculator";
import { Markets } from "@/components/features/Markets";

const bgFrom = 200;
const bgTo = 500;

const widgetColors = {
  slate: {
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
  },
  yellow: {
    100: "#fef9c3",
    200: "#fef08a",
    300: "#fde047",
    400: "#facc15",
    500: "#eab308",
    600: "#ca8a04",
    700: "#a16207",
  },
  red: {
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
  },
  blue: {
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
  },
  green: {
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
  },
};

function getWidgetGradientStyle(colorName) {
  const color = widgetColors[colorName];

  return {
    "--widget-from": color[bgFrom],
    "--widget-to": color[bgTo],
  };
}

export const widgetCatalog = {
  clock: {
    title: "clock",
    widgetClassName: "widget-gradient",
    widgetStyle: getWidgetGradientStyle("slate"),
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
    widgetStyle: getWidgetGradientStyle("yellow"),
    imageName: "quickNotes",
    Component: QuickNotes,
    defaultConfig: {
      note: "",
    },
  },
  pomodoro: {
    title: "pomodoro",
    widgetClassName: "widget-gradient",
    widgetStyle: getWidgetGradientStyle("red"),
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
    widgetStyle: getWidgetGradientStyle("slate"),
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
    widgetStyle: getWidgetGradientStyle("blue"),
    imageName: "waterIntake",
    Component: WaterIntake,
    defaultConfig: {},
  },
  calculator: {
    title: "calculator",
    widgetClassName: "widget-gradient",
    widgetStyle: getWidgetGradientStyle("slate"),
    imageName: "calculator",
    Component: Calculator,
    defaultConfig: {},
  },
  markets: {
    title: "markets",
    widgetClassName: "widget-gradient",
    widgetStyle: getWidgetGradientStyle("green"),
    imageName: "markets",
    Component: Markets,
    defaultConfig: {},
  },
};

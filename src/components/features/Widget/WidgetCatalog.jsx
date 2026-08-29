import { Clock } from "@/components/features/Clock";
import { Pomodoro } from "@/components/features/Pomodoro";
import { Timer } from "@/components/features/Timer";

export const widgetCatalog = {
  clock: {
    title: "Clock • Weather",
    Component: Clock,
    defaultConfig: {
      city: "São Paulo",
      latitude: -23.5505,
      longitude: -46.6333,
    },
  },
  pomodoro: {
    title: "Pomodoro",
    Component: Pomodoro,
    defaultConfig: {},
  },
  timer: {
    title: "Timer",
    Component: Timer,
    defaultConfig: {} },
};

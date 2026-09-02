import { Clock } from "@/components/features/Clock";
import { Pomodoro } from "@/components/features/Pomodoro";
import { Timer } from "@/components/features/Timer";

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

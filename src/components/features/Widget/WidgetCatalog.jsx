import { Clock } from "@/components/features/Clock";
import { Pomodoro } from "@/components/features/Pomodoro";
import { Timer } from "@/components/features/Timer";
import { WaterIntake } from "@/components/features/WaterIntake";

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
    defaultConfig: {
      focusMinutes: 25,
      breakMinutes: 5,
      longBreakMinutes: 15,
      pomodoroGoal: 4,
    },
  },
  timer: {
    title: "Timer",
    Component: Timer,
    defaultConfig: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
  },
  waterIntake: {
    title: "Water Intake",
    Component: WaterIntake,
    defaultConfig: {},
  },
};

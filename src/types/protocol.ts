export interface MealDay {
  day: number;
  week: number;
  breakfast: string;
  lunch: string;
  snack: string;
  dinner: string;
}

export interface WeekMeta {
  week: number;
  title: string;
  objective: string;
  behaviorGoal: string;
  tip: string;
  daysRange: string;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  dayNumber: number; // 1 to 42
  sleepHours: number;
  waterGlasses: number; // each glass = 250ml
  waterGoal: number; // default 8 (2000ml)
  fruitVegStatus: 'sim' | 'parcialmente' | 'nao';
  movementStatus: 'sim' | 'nao';
  movementType?: string;
  movementMinutes?: number;
  hungerBefore: 'pouca' | 'moderada' | 'intensa' | 'nenhuma';
  postMealFeeling: 'satisfeito' | 'leve' | 'com_energia' | 'pesado' | 'estufado';
  victoryToday: string;
  adjustmentTomorrow: string;
  completedMeals: {
    breakfast: boolean;
    lunch: boolean;
    snack: boolean;
    dinner: boolean;
  };
  customMeals?: {
    breakfast?: string;
    lunch?: string;
    snack?: string;
    dinner?: string;
    notes?: string;
  };
}

export interface FoodSubstitution {
  original: string;
  alternatives: string[];
  note?: string;
}

export interface ShoppingCategory {
  id: string;
  name: string;
  items: {
    id: string;
    name: string;
    checked: boolean;
    custom?: boolean;
  }[];
}

export interface PersonalCommitment {
  name: string;
  startDate: string;
  signed: boolean;
  signatureDate?: string;
}

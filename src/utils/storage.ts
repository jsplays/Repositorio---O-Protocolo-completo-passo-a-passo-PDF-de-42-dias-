import { DailyLog, ShoppingCategory, PersonalCommitment, MealDay } from '../types/protocol';
import { INITIAL_SHOPPING_CATEGORIES } from '../data/protocolData';

const STORAGE_KEYS = {
  DAILY_LOGS: 'pv42_daily_logs',
  SHOPPING_LIST: 'pv42_shopping_list',
  COMMITMENT: 'pv42_commitment',
  CURRENT_DAY: 'pv42_current_day',
  CUSTOM_MEALS: 'pv42_custom_meals',
  POST_HABITS: 'pv42_post_habits'
};

export const getStoredCurrentDay = (): number => {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.CURRENT_DAY);
    if (val) {
      const num = parseInt(val, 10);
      if (num >= 1 && num <= 42) return num;
    }
  } catch (e) {
    console.error(e);
  }
  return 1;
};

export const setStoredCurrentDay = (day: number) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_DAY, day.toString());
  } catch (e) {
    console.error(e);
  }
};

export const getStoredDailyLogs = (): Record<number, DailyLog> => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.DAILY_LOGS);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error(e);
  }
  return {};
};

export const saveDailyLog = (dayNumber: number, log: DailyLog) => {
  try {
    const logs = getStoredDailyLogs();
    logs[dayNumber] = log;
    localStorage.setItem(STORAGE_KEYS.DAILY_LOGS, JSON.stringify(logs));
  } catch (e) {
    console.error(e);
  }
};

export const getStoredShoppingList = (): ShoppingCategory[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SHOPPING_LIST);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error(e);
  }
  return INITIAL_SHOPPING_CATEGORIES;
};

export const saveShoppingList = (list: ShoppingCategory[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SHOPPING_LIST, JSON.stringify(list));
  } catch (e) {
    console.error(e);
  }
};

export const getStoredCommitment = (): PersonalCommitment => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.COMMITMENT);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error(e);
  }
  return {
    name: '',
    startDate: new Date().toISOString().split('T')[0],
    signed: false
  };
};

export const saveCommitment = (commitment: PersonalCommitment) => {
  try {
    localStorage.setItem(STORAGE_KEYS.COMMITMENT, JSON.stringify(commitment));
  } catch (e) {
    console.error(e);
  }
};

export const getStoredCustomMeals = (): Record<number, Partial<MealDay>> => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_MEALS);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error(e);
  }
  return {};
};

export const saveCustomMeal = (dayNumber: number, meal: Partial<MealDay>) => {
  try {
    const meals = getStoredCustomMeals();
    meals[dayNumber] = { ...meals[dayNumber], ...meal };
    localStorage.setItem(STORAGE_KEYS.CUSTOM_MEALS, JSON.stringify(meals));
  } catch (e) {
    console.error(e);
  }
};

export const resetCustomMealDay = (dayNumber: number) => {
  try {
    const meals = getStoredCustomMeals();
    delete meals[dayNumber];
    localStorage.setItem(STORAGE_KEYS.CUSTOM_MEALS, JSON.stringify(meals));
  } catch (e) {
    console.error(e);
  }
};

export const getStoredPostHabits = (): string[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.POST_HABITS);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error(e);
  }
  return [];
};

export const saveStoredPostHabits = (habits: string[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.POST_HABITS, JSON.stringify(habits));
  } catch (e) {
    console.error(e);
  }
};

export const exportAllDataAsJSON = () => {
  const exportPayload = {
    exportedAt: new Date().toISOString(),
    protocol: 'Protocolo Verão 42 - Método C.A.S.A.',
    currentDay: getStoredCurrentDay(),
    commitment: getStoredCommitment(),
    dailyLogs: getStoredDailyLogs(),
    customMeals: getStoredCustomMeals(),
    shoppingList: getStoredShoppingList(),
    postHabits: getStoredPostHabits()
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `protocolo_verao_42_backup_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

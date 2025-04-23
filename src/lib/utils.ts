import { Freeze } from "../services/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const freeze: Freeze = (timeout = 2000) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

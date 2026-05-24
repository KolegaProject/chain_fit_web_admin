// src/utils/cn.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Fungsi helper untuk menggabungkan class Tailwind dengan rapi
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
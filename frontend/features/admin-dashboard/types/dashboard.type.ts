import type { IconType } from "react-icons";

// --- Types ---
export interface StatCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  trend: string;
}
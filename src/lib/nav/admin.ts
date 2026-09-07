import {
  ChartPie,
  Users,
  FileText,
  PieChart,
} from "lucide-react";
import { NavGroup } from "./types";

export const adminNavItems: NavGroup[] = [
  {
    group: "Main Menu",
    items: [
      { name: "Dashboard", path: "/admin", icon: ChartPie },
      { name: "User Management", path: "/admin/users", icon: Users },
      { name: "All Notes", path: "/admin/notes", icon: FileText },
      { name: "Users by Interests", path: "/admin/interests", icon: PieChart },
    ],
  },
];

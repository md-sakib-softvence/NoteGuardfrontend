import {
  ChartPie,
  Users,
  FileText,
  PieChart,
  User,
} from "lucide-react";
import { NavGroup } from "./types";

export const adminNavItems: NavGroup[] = [
  {
    group: "Main Menu",
    items: [
      { name: "User Management", path: "/admin/users", icon: Users },
      { name: "All Notes", path: "/admin/notes", icon: FileText },
      { name: "Users by Interests", path: "/admin/interests", icon: PieChart },
    ],
  },
  {
    group: "Workspace",
    items: [
      { name: "Switch to User View", path: "/user/notes", icon: User },
    ],
  },
];

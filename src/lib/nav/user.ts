import {
  ChartPie,
  FileText,
  User,
  PenSquare,
} from "lucide-react";
import { NavGroup } from "./types";

export const userNavItems: NavGroup[] = [
  {
    group: "Main Menu",
    items: [
      { name: "Dashboard", path: "/user", icon: ChartPie },
      { name: "My Notes", path: "/user/notes", icon: FileText },
      { name: "Create Note", path: "/user/notes/new", icon: PenSquare },
      { name: "Profile", path: "/user/profile", icon: User },
    ],
  },
];

import {
  FileText,
  User,
  PenSquare,
  MessageSquare,
  PenTool,
} from "lucide-react";
import { NavGroup } from "./types";

export const userNavItems: NavGroup[] = [
  {
    group: "Main Menu",
    items: [
      { name: "My Notes", path: "/user/notes", icon: FileText },
      { name: "Create Note", path: "/user/notes/new", icon: PenSquare },
      { name: "All Posts", path: "/user/all-posts", icon: MessageSquare },
      { name: "My Posts", path: "/user/posts", icon: MessageSquare },
      { name: "Create Post", path: "/user/posts/new", icon: PenTool },
      { name: "Profile", path: "/user/profile", icon: User },
    ],
  },
];

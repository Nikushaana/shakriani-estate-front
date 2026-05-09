import { create } from "zustand";

type RouteItem = {
  id: number;
  name: string;
  route: string;
};

type SharedStore = {
  routes: RouteItem[];
  menu: boolean;
  toggleMenu: () => void;
};

export const useSharedStore = create<SharedStore>((set) => ({
  routes: [
    {
      id: 1,
      name: "Home",
      route: "",
    },
    {
      id: 2,
      name: "About Us",
      route: "about-us",
    },
    {
      id: 3,
      name: "Wines",
      route: "wines",
    },
    {
      id: 4,
      name: "Blogs",
      route: "blogs",
    },
    {
      id: 5,
      name: "Contact",
      route: "contact",
    },
  ],
  menu: false,
  toggleMenu: () => set((state) => ({ menu: !state.menu })),
}));

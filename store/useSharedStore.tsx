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
      name: "home",
      route: "",
    },
    {
      id: 2,
      name: "aboutUs",
      route: "about-us",
    },
    {
      id: 3,
      name: "wines",
      route: "wines",
    },
    {
      id: 4,
      name: "blogs",
      route: "blogs",
    },
    {
      id: 5,
      name: "contact",
      route: "contact",
    },
  ],
  menu: false,
  toggleMenu: () => set((state) => ({ menu: !state.menu })),
}));

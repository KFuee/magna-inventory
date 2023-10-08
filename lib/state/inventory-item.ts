import type {} from "@redux-devtools/extension"; // required for devtools typing
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { Tables } from "../types/database-custom";

interface InventoryItemStore {
  inventoryItems: Tables<"InventoryItems">[];
  setInventoryItems: (
    itemsOrUpdater:
      | Tables<"InventoryItems">[]
      | ((prevItems: Tables<"InventoryItems">[]) => Tables<"InventoryItems">[])
  ) => void;
}

export const useInventoryItemStore = create<InventoryItemStore>()(
  devtools((set) => ({
    inventoryItems: [],
    setInventoryItems: (itemsOrUpdater) => {
      if (typeof itemsOrUpdater === "function") {
        set((state) => ({
          inventoryItems: itemsOrUpdater(state.inventoryItems)
        }));
      } else {
        set({ inventoryItems: itemsOrUpdater });
      }
    }
  }))
);

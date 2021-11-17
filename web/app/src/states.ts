import { atom } from "recoil";

export const stateSelectedNavTabs = atom<string[]>({
  key: "SelectedNavTabs",
  default: [ "home" ]
})
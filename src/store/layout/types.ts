export enum LayoutActionTypes {
  TOGGLE_SIDEBAR = "@TOGGLE_SIDEBAR"
}

export interface LayoutState {
  readonly sideBarExtended: boolean
}

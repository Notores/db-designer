import { combineReducers } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'

import { projectReducer } from './project/reducer'
import { ProjectState } from './project/types'
import { layoutReducer } from "./layout/reducer";
import { LayoutState } from "./layout/types";

export interface ApplicationState {
  project: ProjectState,
  layout: LayoutState,
  router: RouterState
}

export const createRootReducer = (history: History) =>
  combineReducers({
    project: projectReducer,
    layout: layoutReducer,
    router: connectRouter(history)
  });

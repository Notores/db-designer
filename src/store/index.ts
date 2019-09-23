import { combineReducers } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'

import { projectReducer } from './project/reducer'
import { ProjectState } from './project/types'

// The top-level state object
export interface ApplicationState {
  project: ProjectState
  router: RouterState
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const createRootReducer = (history: History) =>
  combineReducers({
    project: projectReducer,
    router: connectRouter(history)
  })

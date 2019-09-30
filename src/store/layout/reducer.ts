import { Reducer } from 'redux'
import { LayoutState, LayoutActionTypes} from './types';

export const initialState: LayoutState = {
  sideBarExtended: true
};

const reducer: Reducer<LayoutState> = (state = initialState, action) => {
  switch (action.type) {
    case LayoutActionTypes.TOGGLE_SIDEBAR: {
      const newState = {...state};
      if(action.payload.forceState !== null){
        newState.sideBarExtended = action.payload.forceState;
      } else {
        newState.sideBarExtended = !newState.sideBarExtended;
      }
      return newState
    }
    default: {
      return state
    }
  }
}

export { reducer as layoutReducer }

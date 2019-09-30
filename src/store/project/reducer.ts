import { Reducer } from 'redux'
import { ProjectState, ProjectActionTypes } from './types'
import * as DbDesign from '../../types';
import {ColTypeEnum} from "../../types";

// Type-safe initialState!
export const initialState: ProjectState = {
  data: [
    {position: {x: 0, y: 0, width: 200, height: 250}, name: 'Entity', columns: [{name: 'id', type: ColTypeEnum.Integer, primary: true, auto: true}, {name: 'value', type: ColTypeEnum.String}]},
  ],
  errors: undefined,
  loading: false
};
initialState.data.push({position: {x: 300, y: 300, width: 200, height: 250}, name: 'SubEntity', columns: [{name: 'entity', type: ColTypeEnum.Integer, primary: true, reference: {table: initialState.data[0], col: initialState.data[0].columns[0]}}, {name: 'subValue', type: ColTypeEnum.String}]});

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<ProjectState> = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case ProjectActionTypes.ADD_TABLE: {
      return { ...state, data: [...state.data, action.payload] }
    }
    case ProjectActionTypes.REMOVE_TABLE: {
      return { ...state }
    }
    case ProjectActionTypes.EDIT_TABLE: {
      return { ...state }
    }
    case ProjectActionTypes.MOVE_TABLE: {
      const newData = [ ...state.data ] ;
      const table = newData.findIndex(t => t.name === action.payload.name);
      console.log(table)
      if(table > -1)
        newData[table] = {...newData[table], position : { ...action.payload.position }};
      return {...state, data: newData};
    }
    default: {
      return state
    }
  }
}

export { reducer as projectReducer }

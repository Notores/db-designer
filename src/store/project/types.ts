import {DbTable, Position} from "../../types";

export interface Table extends DbTable {
  position: Position
}

export enum ProjectActionTypes {
  MOVE_TABLE = "@MOVE_TABLE",
  ADD_TABLE = "@ADD_TABLE",
  EDIT_TABLE = "@EDIT_TABLE",
  REMOVE_TABLE = "@REMOVE_TABLE"
}

export interface ProjectState {
  readonly loading: boolean
  readonly data: Table[]
  readonly errors?: string
}

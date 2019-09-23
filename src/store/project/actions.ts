import { action } from 'typesafe-actions';
import { ProjectActionTypes, Table } from './types';
import { Position, DbTable } from '../../types';
import {sample, clamp} from 'lodash';

export const moveTable = (table: DbTable | Table, newPosition: Position) => action(ProjectActionTypes.MOVE_TABLE, {...table, position: newPosition});
const randomWords = ["pest","wing","pipe","trucks","rat","pocket","bomb","poison","form","sweater","cars","hill","substance","mark","screw","lace","appliance","egg","scissors","behavior","nation","cup","river","stop","kitty","sail","library","competition","mitten","fold","celery","lamp","letters","hour","ship","recess","country","fuel","pin","humor"];

export const addTable = (position: {x: number, y: number}) => {
    const body = document.getElementsByTagName("body")[0];
    const randomName = sample(randomWords) || '';
    const windowSize = {y: body.clientHeight, x: body.clientWidth};
    return action(ProjectActionTypes.ADD_TABLE, {
        name: randomName.substring(0,1).toUpperCase() + randomName.substring(1),
        columns: [],
        position: {x: clamp(windowSize.x + (position.x - 88),0,windowSize.x - 250 - 10), y: clamp(windowSize.y + (position.y - 18),0,windowSize.y - 200 - 10), width: 250, height: 200}})
}

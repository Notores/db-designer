import { action } from 'typesafe-actions';
import { ProjectActionTypes, Table } from './types';
import {Position, DbTable, Integer, ColTypeEnum} from '../../types';
import {sample, clamp} from 'lodash';

export const moveTable = (table: DbTable | Table, newPosition: Position) => action(ProjectActionTypes.MOVE_TABLE, {...table, position: newPosition});
const randomWords = ["pest","wing","pipe","trucks","rat","pocket","bomb","poison","form","sweater","cars","hill","substance","mark","screw","lace","appliance","egg","scissors","behavior","nation","cup","river","stop","kitty","sail","library","competition","mitten","fold","celery","lamp","letters","hour","ship","recess","country","fuel","pin","humor"];

export const addTable = (position: {x: number, y: number}) => {
    const body = document.getElementsByTagName("body")[0];
    const randomName = sample(randomWords) || '';
    const windowSize = {y: body.clientHeight, x: body.clientWidth};

    //assumptions: Might need to actually get these using doc.getelement
    const sideBarWidth = 201;
    const headerWidth = 41;
    const tableWidth = 250;
    const tableHeight = 200;

    return action(ProjectActionTypes.ADD_TABLE, {
        name: randomName.substring(0,1).toUpperCase() + randomName.substring(1),
        columns: [
            {name: 'id', type: ColTypeEnum.Integer, primary: true, auto: true}
        ],
        position: {x: clamp(position.x - sideBarWidth - (tableWidth / 2),0,windowSize.x - tableWidth - 10), y: clamp(position.y - headerWidth - (tableHeight / 2),0,windowSize.y - tableHeight - 10), width: tableWidth, height: tableHeight}})
}


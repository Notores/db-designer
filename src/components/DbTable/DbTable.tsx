import React from 'react';
import Draggable, {DraggableData, DraggableEvent} from 'react-draggable'
import './DbTable.scss';
import * as DbDesign from "../../types";
import {EntypoKey, EntypoFlowLine, EntypoTriangleUp} from 'react-entypo-icons';
import {Table} from "../../store/project/types";
import {DbColType} from "../../types";

export interface DbTableProps {
    table: Table,
    onMove: (pos: DbDesign.Position) => void
}

const DbTable : React.FC<DbTableProps> = ({table, onMove}) => {
    return (
        <Draggable
            defaultPosition={{...table.position}}
            scale={1}
            onDrag={(e: DraggableEvent, data: DraggableData) => {
                onMove({x: data.x, y: data.y, width: table.position.width, height: table.position.height});
            }}
            bounds={"parent"}
        >
            <div className="dragWrapper" style={{width: table.position.width, height: table.position.height}}>
                <TableRender table={table} />
            </div>
        </Draggable>
    );
}

export const TableRender : React.FC<{table: Table}>= ({table}) => {
    return <div className={`DbTable ${table.name}`} style={{width: table.position.width, height: table.position.height}}>
        <div className="header">
            {table.name}
        </div>
        <div className="body">
            <ul>
                {
                    table.columns.map((col: DbDesign.DbCol, index: number) => {
                        return <li key={index}>
                                    <span className="key">
                                        {col.primary ? <EntypoKey /> : null}
                                        {col.auto ? <EntypoTriangleUp /> : null}
                                    </span>
                            <span className="name">
                                    {col.name}
                                    </span>
                            <span className="type">
                                    {new DbColType(col.type).toString()}
                                    </span>
                            <span className="refs">
                                        {col.reference ? <EntypoFlowLine /> : null}
                                    </span>
                        </li>
                    })
                }
            </ul>
        </div>
    </div>
}

export default DbTable;

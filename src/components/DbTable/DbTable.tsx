import React from 'react';
import Draggable, {DraggableData, DraggableEvent, DraggableEventHandler} from 'react-draggable'
import './DbTable.scss';
import * as DbDesign from "../../types";
// @ts-ignore
import {EntypoKey, EntypoFlowLine, EntypoTriangleUp} from 'react-entypo';
import {Table} from "../../store/project/types";

export interface DbTableProps {
    table: Table,
    onMove: (pos: DbDesign.Position) => void
}

class DbTable extends React.Component <DbTableProps> {

    eventLogger : DraggableEventHandler = (e: DraggableEvent, data: DraggableData) => {
        //console.log('Event: ', e);
        //console.log('Data: ', data);
        this.props.onMove({x: data.x, y: data.y, width: data.node.clientWidth, height: data.node.clientHeight});
    };
    render(){
        const {table} = this.props;
        return (
            <Draggable
                defaultPosition={{...table.position}}
                scale={1}
                handle=".header"
                onDrag={this.eventLogger}
                bounds={"parent"}
            >

                <div className={`DbTable ${table.name}`} style={{width: table.position.width, height: table.position.height}}>
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
                                    {col.type.toString()}
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
            </Draggable>
        );

    }
}

export default DbTable;

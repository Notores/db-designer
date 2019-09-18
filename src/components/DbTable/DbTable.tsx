import React from 'react';
import Draggable, {DraggableData, DraggableEvent, DraggableEventHandler} from 'react-draggable'
import './DbTable.scss';
import * as DbDesign from "../../types";
// @ts-ignore
import {EntypoKey, EntypoFlowLine, EntypoTriangleUp} from 'react-entypo';

export interface Position {
    x: number,
    y: number,
    width: number,
    height: number
}
export interface DbTableProps {
    table: DbDesign.DbTable,
    onMove: (pos: Position) => void
}

class DbTable extends React.Component <DbTableProps> {
    private readonly ref: React.RefObject<HTMLDivElement>;

    constructor(props: Readonly<DbTableProps>){
        super(props);
        this.ref = React.createRef();
        props.table.ref = this.ref;
    }

    eventLogger : DraggableEventHandler = (e: DraggableEvent, data: DraggableData) => {
        //console.log('Event: ', e);
        //console.log('Data: ', data);
        this.props.onMove({x: data.x, y: data.y, width: data.node.clientWidth, height: data.node.clientHeight});
    };
    render(){
        const {table} = this.props;
        return (
            <Draggable
                defaultPosition={{x: 0, y: 0}}
                scale={1}
                handle=".header"
                onDrag={this.eventLogger}
                bounds={"parent"}
            >

                <div className={`DbTable ${table.name}`} ref={this.ref} >
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

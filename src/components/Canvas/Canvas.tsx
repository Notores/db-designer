import React, {Fragment} from "react";
import {DbTable} from "../index";
import {addTable, moveTable} from "../../store/project/actions";
import {SteppedLine} from "../SteppedLine/SteppedLine";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import "./Canvas.scss";

export const Canvas : React.FC = () => {
    const tables = useSelector((state : ApplicationState) => state.project.data);
    const sideBarExtended = useSelector((state : ApplicationState) => state.layout.sideBarExtended);
    const dispatch = useDispatch();
    const classNames = ['Canvas'];
    if(!sideBarExtended)
        classNames.push('extended');

    return <div className={classNames.join(' ')}
                onDrop={(event) => {
                    console.log(event.movementX, event.movementY, event.pageX, event.pageY)
                    const id = event.dataTransfer.getData("text");
                    if(id && id === 'new-table')
                        dispatch(addTable({x: event.clientX, y: event.clientY}))
                }}
                onDragOver={(event) => {
                    event.preventDefault();
                }}>

        {tables.map((table, idx) => (
            <Fragment key={idx}>
                <DbTable table={table} key={idx} onMove={(pos) => {
                    dispatch(moveTable(table, pos))
                }}/>
                {
                    table.columns.map((col, index) => {
                        if (col.reference ) {
                            const refIndex = tables.findIndex(t => {
                                return col.reference ? t.name === col.reference.table.name : false;
                            });
                            return <SteppedLine key={index} orientation="v"
                                                pos0={tables[idx].position}
                                                pos1={tables[refIndex].position}
                                                borderWidth={3} />
                        }
                        return null;
                    })
                }
            </Fragment>
        ))}
    </div>
}

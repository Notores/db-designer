import React, {Fragment} from "react";
import {useSelector} from "react-redux";
import "./Layout.scss";
import {ApplicationState} from "../../store";
import {TableRender} from "../DbTable/DbTable";
import {ColTypeEnum} from "../../types";
import {EntypoSquaredPlus} from "react-entypo-icons";

export const SideBar: React.FC = () => {
    const sideBarExtended = useSelector((state: ApplicationState) => state.layout.sideBarExtended);
    const classNames = ['SideBar'];
    if (sideBarExtended)
        classNames.push('extended');
    return <div className={classNames.join(' ')}>
        <div id="new-table" draggable={true} onDragStart={(event) => {
            // @ts-ignore
            event.dataTransfer.setData('text', event.target.id);
        }}>
            {sideBarExtended ?
                <TableRender table={{
                    name: 'new', position: {x: 0, y: 0, width: 180, height: 100}, columns: [
                        {name: 'col1', type: ColTypeEnum.Integer, primary: true},
                        {name: 'col2', type: ColTypeEnum.String},
                    ]
                }}/>
                :
                <Fragment>
                    <EntypoSquaredPlus style={{color: 'white'}}/>
                </Fragment>
            }
        </div>
    </div>
}

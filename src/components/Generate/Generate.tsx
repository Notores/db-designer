/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Fragment} from "react";
import * as DbDesign from "../../types";
import {useGeneration} from "./hooks";

import "./Generate.scss";

export interface GenerateProps {
    tables: Array<DbDesign.DbTable>,
    onClose: () => void
}
export const Generate : React.FC<GenerateProps> = ({tables, onClose}) => {
    const {code, loaded} = useGeneration(tables);

    return (
        <div className="Generate">
            {
                loaded ?
                    <Fragment>
                        <p>Mysql</p>
                        <textarea defaultValue={code.MySQL ? code.MySQL.content : ''} />
                        <p>MSSQL</p>
                        <textarea defaultValue={code.MSSQL ? code.MSSQL.content : ''} />
                        <p>Mongoose</p>
                        <textarea defaultValue={code.Mongoose ? code.Mongoose.content : ''} />
                    </Fragment> : <p>Loading...</p>
            }
            <div>
                <a title="close" onClick={onClose}>Close</a>
            </div>
        </div>
    )
}




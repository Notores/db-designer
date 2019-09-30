/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Dispatch, SetStateAction, useState} from "react";
import {CodeType, useGeneration} from "./hooks";

import "./Generate.scss";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {Modal} from "../Modal/Modal";

export interface GenerateProps {
    onClose: () => void,
    isOpen: boolean
}

export interface TypeSelectProps {
    selected: CodeType,
    onChange: Dispatch<SetStateAction<CodeType>>
}

const TypeSelect : React.FC<TypeSelectProps> = ({selected, onChange}) => {
    return <form>
        <ul className="TypeSelect">
            <li>
                <label onClick={() => {
                    onChange(CodeType.MySQL);
                }} className={selected === CodeType.MySQL ? 'selected' : ''}>
                    MySQL
                    <input type="radio" name="typeSelect" value={CodeType.MySQL} checked={selected === CodeType.MySQL ? true : false} readOnly />
                </label>
            </li>
            <li>
                <label onClick={() => {
                    onChange(CodeType.MSSQL);
                }} className={selected === CodeType.MSSQL ? 'selected' : ''}>
                    MSSQL
                    <input type="radio" name="typeSelect" value={CodeType.MSSQL} checked={selected === CodeType.MSSQL ? true : false} readOnly />
                </label>
            </li>
            <li>
                <label onClick={() => {
                    onChange(CodeType.Mongoose);
                }} className={selected === CodeType.Mongoose ? 'selected' : ''}>
                    Mongoose
                    <input type="radio" name="typeSelect" value={CodeType.Mongoose} checked={selected === CodeType.Mongoose ? true : false} readOnly />
                </label>
            </li>
        </ul>
    </form>
}

export const Generate : React.FC<GenerateProps> = ({isOpen, onClose}) => {
    const tables = useSelector((state : ApplicationState) => state.project.data);
    const {code, loaded} = useGeneration(tables);
    const [type, setType] = useState<CodeType>(CodeType.MySQL);

    const codeSelector = (type: CodeType) => (code[type] || {}).content;
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Generate your code" >
            <div className="Generate">
                <TypeSelect selected={type} onChange={setType} />
                {
                    loaded ?
                        <textarea style={{padding: '7px'}} value={codeSelector(type)} readOnly /> : <p>Loading...</p>
                }
            </div>
        </Modal>
    )
}




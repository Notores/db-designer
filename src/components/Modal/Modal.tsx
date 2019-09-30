import React, {PropsWithChildren} from "react";
import {EntypoCircleWithCross} from "react-entypo-icons";
import "./Modal.scss";

export interface ModalProps {
    onClose: () => void,
    isOpen: boolean,
    title?: string
}

export const Modal : React.FC<PropsWithChildren<ModalProps>> = ({children, title, onClose, isOpen}) => {
    return isOpen ? <div className="Modal">
        <div className="controls">
            {
                title ?
                    <span className="title">{title}</span> : null
            }
            <button onClick={onClose}>
                <EntypoCircleWithCross />
            </button>
        </div>
        {children}
    </div> : null;
}

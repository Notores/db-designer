import * as React from "react";
import {PropsWithChildren, useState} from "react";
import "./Button.scss";
import Draggable, {ControlPosition, DraggableData, DraggableEvent} from "react-draggable";

export interface ButtonProps {
    onClick : () => void
}

export interface DraggableButtonProps {
    onClick? : () => void,
    onStart? : (ev: DraggableEvent, data: DraggableData) => void,
    onStop? : (ev: DraggableEvent, data: DraggableData) => void,
    onDrag? : (ev: DraggableEvent, data: DraggableData) => void,
    resetOnStop?: boolean
}

export const Button : React.FC<PropsWithChildren<ButtonProps>> = ({children, onClick}) => {
    return (
        <a className="Button" title="generate" onClick={onClick}>
            {children}
        </a>
    );
}

export const DraggableButton : React.FC<PropsWithChildren<DraggableButtonProps>> = ({children, onClick, onStop, onStart, onDrag, resetOnStop}) => {
    const [position, setPosition] = useState<ControlPosition>({x:0,y:0});
    return (
        <Draggable
            position={position}
            scale={1}
            bounds={"#application"}
            onStop={(ev, data) => {
                if(onStop)
                    onStop(ev, data);
                if(resetOnStop)
                    setPosition({x:0,y:0});
            }}
            onStart={onStart}
            onDrag={(ev, data) => {
                if(onDrag)
                    onDrag(ev, data);
                setPosition({x: data.x, y: data.y});
            }}
        >
            <a className="Button" title="generate" onClick={onClick} style={{position: 'fixed', bottom: '18px', right: '88px'}}>
                {children}
            </a>
        </Draggable>
    );
}

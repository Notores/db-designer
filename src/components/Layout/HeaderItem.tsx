import React, {PropsWithChildren, MouseEventHandler} from "react";

export interface FCWithStyle extends React.FC<PropsWithChildren<{style?: object, onClick?: MouseEventHandler<HTMLButtonElement>}>> {}
export interface HeaderItemInterface extends FCWithStyle {
    Separator: FCWithStyle
}

const HeaderItem : HeaderItemInterface = ({children, style, onClick}) => {
    return <span className="HeaderItem" style={{...style}}>
        <button onClick={(event) => {
            event.preventDefault();
            if(onClick)
                onClick(event);
            return false;
        }}>
            {children}
        </button>
    </span>
}

HeaderItem.Separator = ({style}) => {
    return <span className="HeaderItem" style={{...style}}></span>
}


export default HeaderItem;

import React from "react";
import HeaderItem from "./HeaderItem";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {toggleSideBar} from "../../store/layout/actions";
import {EntypoExport, EntypoMenu, EntypoDocuments} from 'react-entypo-icons';
import "./Layout.scss";

export interface HeaderProps {
    showGenerate: boolean,
    setShowGenerate: (newState: boolean) => void
}
export const Header : React.FC<HeaderProps> = ({showGenerate, setShowGenerate}) => {
    const sideBarExtended = useSelector((state : ApplicationState) => state.layout.sideBarExtended);
    const dispatch = useDispatch();
    return <header className="Header">
        <HeaderItem onClick={() => dispatch(toggleSideBar())}>
            <EntypoMenu/>
        </HeaderItem>
        <HeaderItem.Separator style={{width: sideBarExtended ? '160px' : 'auto'}}/>
        <HeaderItem>
            <EntypoDocuments/>
        </HeaderItem>
        <HeaderItem onClick={() => setShowGenerate(!showGenerate)}>
            <EntypoExport/>
        </HeaderItem>
    </header>
}
/*

        <Button onClick={() => setShowGenerate(!showGenerate)}>
            <EntypoExport />
        </Button>
 */

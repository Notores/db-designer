import {ApplicationState} from "./index";
import {ColTypeEnum, DbCol, DbColType} from "../types";

export const loadState = (storeKey : string) => {
    try {
        const serializedState = localStorage.getItem(storeKey);
        if (serializedState === null) {
            return undefined;
        }
        const state : ApplicationState = JSON.parse(serializedState);
        return state;
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state : ApplicationState, storeKey : string) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(storeKey, serializedState);
    } catch (err) {
        console.log("Can't save changes in local storage");
    }
};

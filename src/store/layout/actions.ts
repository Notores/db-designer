import { action } from 'typesafe-actions';
import { LayoutActionTypes } from './types';

export const toggleSideBar = (forceState: boolean | null = null) => action(LayoutActionTypes.TOGGLE_SIDEBAR, {forceState});

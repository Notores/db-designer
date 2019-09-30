import {Store, createStore, applyMiddleware, compose} from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { History } from 'history'
import { ApplicationState, createRootReducer } from './store';
import {debounce} from 'lodash';
import {loadState, saveState} from "./store/localstorage";

const storeKey = 'DBDESIGN';
export default function configureStore(history: History, initialState: ApplicationState): Store<ApplicationState> {
    const persistedState = loadState(storeKey);

    const store = createStore(
        createRootReducer(history),
        persistedState || initialState,
        compose(applyMiddleware(routerMiddleware(history)))
    );
    store.subscribe(debounce(() => {
        saveState(store.getState(), storeKey);
    }, 1000));

    return store
}

import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history'
import configureStore from './configureStore'

import { App } from './components';

import './assets/index.scss';
import './types';
import {Provider} from "react-redux";

const history = createBrowserHistory();

// @ts-ignore
const initialState = window.INITIAL_REDUX_STATE;

const store = configureStore(history, initialState);

ReactDOM.render(<Provider store={store} >
    <App />
</Provider>, document.getElementById('application'));

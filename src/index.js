import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import authReducer from './store/reducers/auth';

// Use redux_devtools to do debug redux on browser extension.
// We go a set up where we should be able to connect our browser extension to the store running in our Javascript code.
// https://github.com/zalmoxisus/redux-devtools-extension
// The following line sets redux_devtools is only available in development environment. 
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

// Build for deployment
//const composeEnhancers = compose;

// Merge all reducers into a single reducer only.
const rootReducer = combineReducers({
    auth: authReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    // Provider is a helper which allows us to inject our store into the reacts components.
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

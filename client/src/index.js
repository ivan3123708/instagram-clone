import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import userReducer from './reducers/userReducer';
import Instagram from './components/Instagram';
import './styles/index.sass';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    loggedUser: userReducer,
  }),
  composeEnhancers(applyMiddleware(thunk)),
);

ReactDOM.render(<Provider store={store}><Instagram /></Provider>, document.getElementById('app_root'));

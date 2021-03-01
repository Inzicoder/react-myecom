import {createStore,applyMiddleware} from 'redux';
import logger from 'redux-logger';
import rootreducer from './root-reducer';
import {  persistStore} from "redux-persist";

const middlewares =[logger];
export const store = createStore(rootreducer,applyMiddleware(...middlewares))

export const persistor = persistStore(store);

export default {store,persistor}
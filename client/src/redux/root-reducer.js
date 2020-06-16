import { combineReducers } from 'redux';
import dataTableReducer from './data-table/data-table-reducer';

const rootReducer = combineReducers({
  dataTableReducer,
});

export default rootReducer;

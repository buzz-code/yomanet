import { combineReducers } from 'redux';
import user from './user_reducer';
import data from './data_reducer';

const rootReducer = combineReducers({
    user,
    data
});

export default rootReducer;
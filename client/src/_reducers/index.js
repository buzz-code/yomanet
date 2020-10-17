import { combineReducers } from 'redux';
import user from './user_reducer';
import data from './data_reducer';
import upload from './upload_reducer';

const rootReducer = combineReducers({
    user,
    data,
    upload
});

export default rootReducer;
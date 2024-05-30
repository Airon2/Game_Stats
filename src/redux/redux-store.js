import {combineReducers, legacy_createStore as createStore} from 'redux';
import usersReducer from './usersReduser';
import GamesReducer from './GamesReduser';


let reducers = combineReducers({
    usersPage: usersReducer,
    GamesPage: GamesReducer
})

let store = createStore(reducers);

export default store;
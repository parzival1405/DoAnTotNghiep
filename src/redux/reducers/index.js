import { combineReducers } from "redux";

import auth from './auth'
import modal from './modal'
import loading from './loading'
import sidebar from './sidebar'

export default combineReducers({
    auth,
    modal,
    loading,
    sidebar,
})
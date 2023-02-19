import { combineReducers } from "redux";

import auth from './auth'
import modal from './modal'
import loading from './loading'
import sidebar from './sidebar'
import tab from './tab'
import patient from './patient'

export default combineReducers({
    auth,
    modal,
    loading,
    sidebar,
    tab,
    patient
})
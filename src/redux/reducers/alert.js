import { GLOBALTYPES } from "../actionType";

const initialState = {}

export default (state = initialState, action) => {
    switch (action.type){
        case GLOBALTYPES.ALERT:
            return action.payload;
        default:
            return state;
    }
}

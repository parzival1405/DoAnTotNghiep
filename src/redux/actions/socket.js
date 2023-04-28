import { GLOBALTYPES
} from '../actionType';

export const initSocket = (socket) => async (dispatch) => {
    try{
        dispatch({type: GLOBALTYPES.ADD_SOCKET, payload:socket})
    } catch (error) {
        console.log(error)
    }
}
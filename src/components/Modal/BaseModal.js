import { Backdrop, Modal } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import useStyles from './styles'
import {hideModal} from '../../redux/actions/modal'
function BaseModal({body, isShow,callback}) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const handleCloseModal = React.useCallback(() => {
        if(callback){
            callback()
        }
        dispatch(hideModal())
        // dispatch(removeUserState())
    },[dispatch])

    return (
        <div className={classes.modal}>
            <Modal 
                open={isShow} 
                className={classes.modal}
                onClose={handleCloseModal}
                closeAfterTransition
                // BackdropComponent={Backdrop}
                // BackdropProps={{
                //   timeout: 500,
                // }}
                >
                {body}
            </Modal>
        </div>
    )
}

export default React.memo(BaseModal)

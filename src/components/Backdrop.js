import React from 'react'

//ui
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

function BackdropComponent({isLoad}) {
    return (
        <div>
            <Backdrop className="backdrop" open={isLoad}>
             <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default BackdropComponent

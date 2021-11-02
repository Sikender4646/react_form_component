import React, { FC, useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

interface ModalProps {
    message: string
    showModal: boolean
    okHandler: () => void
}

const Modal: FC<ModalProps> = ({ showModal, message, okHandler }) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(showModal)
    }, [showModal])

    const handleOkPress = () => {
        setOpen(false)
        okHandler()
    }

    return (
        <Dialog
            open={open}
            onClose={handleOkPress}
        >
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleOkPress} variant="contained">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Modal
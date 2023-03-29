import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";



function LogoutModal(props){
    const {open,  handleClose, title, send} = props
    return(
        <Dialog open = {open} onClose = {handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{props.child}</DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button color={"eror"} onClick={send}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}
export default LogoutModal 
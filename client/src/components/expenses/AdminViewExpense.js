import * as React from 'react';
import { Box, Stack, Button, Typography, Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


function AdminViewExpense() {
    const navigate = useNavigate()
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [openCommentAdded, setOpenCommentAdded] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [invoiceId, setInvoiceId] = useState(0)
    const [userName, setUserName] = useState("")
    const [status, setStatus] = useState("")
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState(0)
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")
    const [userID, setUserId] = useState(0)
    const [url, setUrl] = useState("")
    const { exp_id } = useParams();
    useEffect(() => {
        fetch(`/expenses/adminviewexpense/${exp_id}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((res) => res.json())
            .then((res) => {
                setInvoiceId(res?.invoice_id)
                setStatus(res?.status)
                setAmount(res?.amount)
                setDescription(res?.description)
                setUserName(res?.name)
                setUrl(res?.url)
                setComments(res?.comments)
                setUserId(res.user_id)
            });
    }, [])
    const handleClickError = () => {
        setOpenError(true);
    };
    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenError(false);
    };
    const handleClickSuccess = () => {
        setOpenSuccess(true);
    };
    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false);
    };
    const handleOpenCommentAdded = () => {
        setOpenCommentAdded(true)
    }
    const handleCloseCommentAdded = () => {
        window.location.reload(false);
    }
    const submitComment = () => {
        const user_id = localStorage.getItem("user_id");
        fetch(`/expenses/adminviewexpense/${exp_id}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: comment,
                user_id: user_id
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                handleOpenCommentAdded()
            });
    }
    const approveExpense = () => {
        handleClickSuccess()
        setStatus("Approved")
        fetch(`/expenses/approve/${exp_id}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        })
    }
    const rejectExpense = () => {
        handleClickError()
        setStatus("Rejected")
        fetch(`/expenses/reject/${exp_id}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        })
    }
    return (
        <Box height='100vh' display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
            <Stack bgcolor='white' boxShadow="0px 0px 200px 100px #CDCDC9" borderRadius='20px' borderColor='purple' flexDirection='column' pt={7} alignItems='center' width='50%'>
                <Snackbar open={openSuccess} autoHideDuration={2000} onClose={handleCloseSuccess}>
                    <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
                        Expense Approved
                    </Alert>
                </Snackbar>
                <Snackbar open={openError} autoHideDuration={2000} onClose={handleCloseError}>
                    <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                        Expense Rejected
                    </Alert>
                </Snackbar>
                <Snackbar open={openCommentAdded} autoHideDuration={2000} onClose={handleCloseCommentAdded}>
                    <Alert onClose={handleCloseCommentAdded} severity="info" sx={{ width: '100%' }}>
                        Comment Added
                    </Alert>
                </Snackbar>
                <Stack flexDirection='row' width='70%' alignItems='flex-start' justifyContent='flex-start'>
                    <Typography style={{ fontFamily: 'Gloock', fontSize: '30px' }} mb={3}>Expense Details</Typography>
                </Stack>
                <Stack mb={2} flexDirection='row' width='70%' alignItems='flex-start' justifyContent='flex-start'>
                    <Button color="secondary" onClick={() => navigate(`/expenses/userexpenses/${userID}`)} size='small' variant="outlined">Back</Button>
                    <Button color="secondary" onClick={() => navigate("/users/adminpage")} size='small' style={{ marginLeft: '5px' }} variant="outlined">Dashboard</Button>
                    <Button color="secondary" onClick={() => navigate("/users/signin")} size='small' style={{ marginLeft: '5px' }} variant="outlined">Log out</Button>
                </Stack>
                <Stack flexDirection='row' width='70%' alignItems='flex-start' justifyContent='flex-start'>
                    <Typography fontFamily='Roboto' fontWeight='bold'>Invoice id:  </Typography>
                    <Typography fontFamily='Roboto' ml='5px'>{invoiceId}</Typography>
                </Stack>
                <Stack flexDirection='row' width='70%' alignItems='flex-start' justifyContent='flex-start'>
                    <Typography fontFamily='Roboto' fontWeight='bold'>User name:  </Typography>
                    <Typography fontFamily='Roboto' ml='5px'>{userName}</Typography>
                </Stack>
                <Stack flexDirection='row' width='70%' alignItems='flex-start' justifyContent='flex-start'>
                    <Typography fontFamily='Roboto' fontWeight='bold'>Status:  </Typography>
                    <Typography fontFamily='Roboto' ml='5px'>{status}</Typography>
                </Stack>
                <Stack flexDirection='row' width='70%' alignItems='flex-start' justifyContent='flex-start'>
                    <Typography fontFamily='Roboto' fontWeight='bold'>Description:  </Typography>
                    <Typography fontFamily='Roboto' ml='5px'>{description}</Typography>
                </Stack>
                <Stack flexDirection='row' width='70%' alignItems='flex-start' justifyContent='flex-start'>
                    <Typography fontFamily='Roboto' fontWeight='bold'>Amount:  </Typography>
                    <Typography fontFamily='Roboto' ml='5px'>{amount}</Typography>
                </Stack>
                <Stack flexDirection='row' width='70%' alignItems='flex-start' justifyContent='flex-start'>
                    <Typography fontFamily='Roboto' fontWeight='bold'>Document:  </Typography>
                    <button onClick={handleOpen} style={{ color: 'green', marginLeft: '5px' }}>view</button>
                </Stack>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <img src={url} width='400' height='300' alt="" />
                    </Box>
                </Modal>
                <Stack mt={2} flexDirection='row' width='70%' alignItems='flex-start' justifyContent='flex-start'>
                    <Button onClick={approveExpense} size='small' color="success" variant="outlined">Approve</Button>
                    <Button onClick={rejectExpense} size='small' color="error" style={{ marginLeft: '5px' }} variant="outlined">
                        Reject
                        {/* onClick /viewdoc/#{@exp.id} */}
                    </Button>
                </Stack>
                <Stack mb={7} mt={2} flexDirection='column' width='70%' alignItems='flex-start' justifyContent='flex-start'>
                    <Typography fontFamily='Roboto' fontSize='20px'>Comments: </Typography>
                    <Stack p={1} borderColor='purple' borderRadius='2px' border='solid' mt={2} flexDirection='column' width='99%' alignItems='flex-start' justifyContent='flex-start' maxHeight='100px' sx={{ overflowY: 'scroll' }} overflowY='scroll'>
                        {comments.map(cmt => {
                            return (
                                <div style={{ fontFamily: 'Roboto', fontSize: '13px' }}>
                                    <b>{cmt?.name}:</b> {cmt?.text}</div>
                            )
                        })}
                    </Stack>
                    <Stack mt={2} width='103%' flexDirection='row' justifyContent='flex-start'>
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', height: '30px' }}
                        >
                            <InputBase
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Comment"
                                inputProps={{ 'aria-label': 'search google maps' }}
                            />
                            <IconButton onClick={submitComment} type="button" sx={{ p: '10px' }} aria-label="search">
                                <SendIcon />
                            </IconButton>
                        </Paper>
                    </Stack>
                </Stack>
            </Stack>
        </Box>

    );
}
export default AdminViewExpense;
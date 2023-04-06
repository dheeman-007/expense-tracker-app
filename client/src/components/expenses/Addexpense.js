import * as React from 'react';
import { Box, Stack, Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Addexpense() {
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const { id } = useParams()
    const [document, setDocument] = useState("");
    const [invoiceid, setInvoiceid] = useState(0);
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();

    const handleClickError = () => {
        setOpenError(true);
    };
    const handleCloseError = (event, reason) => {
        navigate(`/expenses/addexpense/${id}`)
        if (reason === 'clickaway') {
            return;
        }

        setOpenError(false);
    };
    const handleClickSuccess = () => {
        setOpenSuccess(true);
    };
    const handleCloseSuccess = (event, reason) => {
        navigate(`/users/dashboard/${id}`)
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false);
    };
    const handleSubmit = (url) => {
        fetch(`/expenses/addexpense/${id}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                invoice_id: invoiceid,
                description: description,
                amount: amount,
                url: url
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res?.message === "success") handleClickSuccess()
                else handleClickError()
            });
    }

    const postDetails = () => {
        const data = new FormData()
        data.append("file", document)
        data.append("upload_preset", "expense-tracker")
        data.append("cloud_name", "dafoo18ob")
        fetch("https://api.cloudinary.com/v1_1/dafoo18ob/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                handleSubmit(data.url)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <Box height='100vh' display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
            <Stack bgcolor='white' boxShadow="0px 0px 200px 100px #CDCDC9" borderRadius='20px' borderColor='purple' flexDirection='column' justifyContent='center' alignItems='center' width='50%' height='80%'>
                <Stack flexDirection='row' width='70%' alignItems='flex-start' justifyContent='flex-start'>
                    <Typography style={{ fontFamily: 'Gloock', fontSize: '30px' }} mb='40px'>Add Expense</Typography>
                </Stack>
                <TextField value={invoiceid} onChange={(e) => setInvoiceid(e.target.value)} size="small" sx={{ width: '70%', mb: '15px' }} id="outlined-basic" type="number" label="Invoice" variant="outlined" />
                <TextField value={description} onChange={(e) => setDescription(e.target.value)} size="small" sx={{ width: '70%', mb: '15px' }} id="outlined-basic" label="Description" variant="outlined" />
                <TextField value={amount} onChange={(e) => setAmount(e.target.value)} size="small" sx={{ width: '70%', mb: '15px' }} id="outlined-basic" type="number" label="Amount" variant="outlined" />
                <Box width='70%' mb='15px'>
                    <Button
                        variant="contained"
                        component="label"
                        color='secondary'
                    >
                        Upload File
                        <input
                            accept="image/png, image/jpeg"
                            onChange={(e) => {
                                setDocument(e.target.files[0]);

                            }}
                            type="file"
                            hidden
                        />
                    </Button>
                </Box>
                <Snackbar open={openSuccess} autoHideDuration={2000} onClose={handleCloseSuccess}>
                    <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
                        Expense created successfully
                    </Alert>
                </Snackbar>
                <Snackbar open={openError} autoHideDuration={2000} onClose={handleCloseError}>
                    <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                        Please enter a valid invoice id
                    </Alert>
                </Snackbar>
                <Stack mt={2} flexDirection='row' width='70%' alignItems='flex-start' justifyContent='flex-start'>
                    <Button onClick={postDetails} color="success" variant="outlined">Add</Button>
                    <Button color="error" onClick={() => navigate(`/users/dashboard/${id}`)} style={{ marginLeft: '5px' }} variant="outlined">Cancel</Button>
                </Stack>
            </Stack>
        </Box>

    );
}
export default Addexpense;
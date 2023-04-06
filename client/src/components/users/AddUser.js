import * as React from 'react';
import { Box, Stack, Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddUser() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [deptName, setDeptName] = useState("")
    const [name, setName] = useState("")
    const [status, setStatus] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        navigate("/users/adminpage")
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const handleSubmit = () => {
        fetch(`/users/adduser`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                dept_name: deptName,
                status: status,
                email: email,
                password: password,
                name: name
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.done) {
                    handleClick()
                }
                else {
                    navigate("/users/adduser/")
                }
            });
    }
    return (
        <Box height='100vh' display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
            <Stack bgcolor='white' boxShadow="0px 0px 200px 100px #CDCDC9" borderRadius='20px' borderColor='purple' flexDirection='column' justifyContent='center' alignItems='center' width='50%' height='80%'>
                <Stack flexDirection='row' width='70%' alignItems='flex-start' justifyContent='flex-start'>
                    <Typography style={{ fontFamily: 'Gloock', fontSize: '30px' }} mb='40px'>Add Employee</Typography>
                </Stack>
                <TextField size="small" value={deptName} onChange={(e) => setDeptName(e.target.value)} sx={{ width: '70%', mb: '15px' }} id="outlined-basic" label="Department Name" variant="outlined" />
                <TextField size="small" value={status} onChange={(e) => setStatus(e.target.value)} sx={{ width: '70%', mb: '15px' }} id="outlined-basic" label="Status" variant="outlined" />
                <TextField size="small" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ width: '70%', mb: '15px' }} id="outlined-basic" label="Email" variant="outlined" />
                <TextField size="small" value={name} onChange={(e) => setName(e.target.value)} sx={{ width: '70%', mb: '15px' }} id="outlined-basic" label="Name" variant="outlined" />
                <TextField size="small" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ width: '70%', mb: '24px' }} id="outlined-password-input" label="Password" type="password" autoComplete="current-password" />
                <Stack flexDirection='row' width='70%' mt={2} alignItems='flex-start' justifyContent='flex-start'>
                    <Button color="success" onClick={handleSubmit} variant="outlined">Save</Button>
                    <Button color="error" onClick={() => navigate("/users/adminpage")} style={{ marginLeft: '5px' }} variant="outlined">Cancel</Button>
                </Stack>
                <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        User Added
                    </Alert>
                </Snackbar>
            </Stack>
        </Box>

    );
}
export default AddUser;
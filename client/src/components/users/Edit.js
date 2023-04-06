import * as React from 'react';
import {useState,useEffect} from 'react'
import { Box, Stack, Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function EditUser() {
    const navigate=useNavigate()
    const { id } = useParams();
    const [deptName, setDeptName] = useState("")
    const [name, setName] = useState("")
    const [status, setStatus] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const edithandler = () => {
        fetch(`/users/edit/${id}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                dept_name:deptName,
                status:status,
                email:email,
                password:password,
                name:name
            }),
        })
        .then((res) => res.json())
        .then((res) => {
            if(res.done) navigate("/users/adminpage")
            else navigate(`/users/edit/${id}`)
        });
    }
    return (
        <Box height='100vh' display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
            <Stack bgcolor='white' borderRadius='20px' boxShadow="0px 0px 200px 100px #CDCDC9" flexDirection='column' justifyContent='center' alignItems='center' width='50%' height='80%'>
                <Stack flexDirection='row' width='70%' alignItems='flex-start' justifyContent='flex-start'>
                    <Typography style={{ fontFamily: 'Gloock', fontSize: '30px' }} mb='40px'>Edit Employee</Typography>
                </Stack>
                <TextField sx={{ width: '70%', mb: '15px' }} value={deptName} onChange={(e)=>setDeptName(e.target.value)} size="small" id="outlined-basic" label="Department Name" variant="outlined" />
                <TextField sx={{ width: '70%', mb: '15px' }} value={status} onChange={(e)=>setStatus(e.target.value)} size="small" id="outlined-basic" label="Status" variant="outlined" />
                <TextField sx={{ width: '70%', mb: '15px' }} value={email} onChange={(e)=>setEmail(e.target.value)} size="small" id="outlined-basic" label="Email" variant="outlined" />
                <TextField sx={{ width: '70%', mb: '15px' }} value={password} onChange={(e)=>setPassword(e.target.value)} size="small" id="outlined-password-input" label="Password" type="password" autoComplete="current-password" />
                <TextField sx={{ width: '70%', mb: '24px' }} value={name} onChange={(e)=>setName(e.target.value)} size="small" id="outlined-basic" label="Name" variant="outlined" />
                <Stack flexDirection='row' width='70%' mt={2} alignItems='flex-start' justifyContent='flex-start'>
                    <Button onClick={edithandler} color="success" variant="outlined">Save</Button>
                    <Button onClick={()=>navigate("/users/adminpage")} color="error" style={{ marginLeft: '5px' }} variant="outlined">Cancel</Button>
                </Stack>
            </Stack>
        </Box>

    );
}
export default EditUser;
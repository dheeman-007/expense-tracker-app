import * as React from 'react';
import { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © Expense Tracker '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();

export default function Signin() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    useEffect(() => {
        localStorage.clear()
    }, [])
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setOpen(false);
    };
    const handleSubmit = () => {
        fetch(`/users/signin`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                localStorage.setItem("user_id", res.user_id);
                if (res.message === "successful") {
                    if (res.isAdmin) navigate("/users/adminpage")
                    else navigate(`/users/dashboard/${res.user_id}`)
                }
                else {
                    handleClick()
                }
            });
    }
    return (
        <Box height='100vh' display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
            <Stack bgcolor='white' boxShadow="0px 0px 200px 100px #CDCDC9" borderRadius='20px' borderColor='red' flexDirection='column' justifyContent='center' alignItems='center' p={6}>
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                    Wrong email or password
                                </Alert>
                            </Snackbar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 1 }}>
                                <TextField
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <Button
                                    onClick={handleSubmit}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                            </Box>
                            <Copyright sx={{ mt: 8, mb: 4 }} />
                        </Box>
                    </Container>
                </ThemeProvider>
            </Stack>
        </Box>

    );
}
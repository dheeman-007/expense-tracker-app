import * as React from 'react';
import { useState, useEffect } from 'react'
import { Box, Stack, Button, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '30ch',
            '&:focus': {
                width: '50ch',
            },
        },
    },
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));
function AdminDashboard() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [search, setSearch] = useState([])
    const [searchActive, setSearchActive] = useState(false)
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        window.location.reload(false);
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleDelete = (id) => {
        fetch(`/users/delete/${id}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((res) => res.json())
            .then((res) => {
                if(res.message==="successful"){
                    handleClick()
                }
            });
    }
    const handleSearch = (key) => {
        console.log(key)
        if (key === "") {
            setSearch(users)
        }
        else {
            const userList = users.filter((user) => {
                return Object.values(user).join(" ").toLowerCase().includes(key.toLowerCase())
            });
            console.log(userList)
            setSearch(userList)
        }
    }
    useEffect(() => {
        fetch("/users/adminpage", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((res) => res.json())
            .then((res) => {
                const userslist = res.filter(function fun(user) {
                    return user.isAdmin === false;
                });
                setUsers(userslist);
                setSearch(userslist)
            });
    }, []);
    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: 'black' }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Admin Dashboard
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Search user…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
            <Box p='10%' height='100vh' display='flex' flexDirection='column' pt='100px' alignItems='center'>
                <Stack width='100%' flexDirection='row' justifyContent='flex-start'><Typography style={{ fontFamily: 'Gloock', fontSize: '30px' }} mb='20px'> User Details</Typography></Stack>

                <Stack pt='20px' width='100%' flexDirection='row' justifyContent='flex-start'>
                    <Button onClick={() => navigate("/users/adduser")} color='success' sx={{ mr: '10px' }} size="small" variant="outlined">Add User</Button>
                    <Button onClick={() => navigate("/users/signin")} color='error' size="small" variant="outlined">Log out</Button>
                </Stack>
                <Stack mt={3} boxShadow="0px 0px 200px 100px #CDCDC9" pt='20px' width='100%' flexDirection='row' justifyContent='flex-start'>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Employee Id
                                        </TableCell>
                                        <TableCell>
                                            Email
                                        </TableCell>
                                        <TableCell>
                                            Name
                                        </TableCell>
                                        <TableCell>
                                            Department
                                        </TableCell>
                                        <TableCell>
                                            Status
                                        </TableCell>
                                        <TableCell>
                                            View
                                        </TableCell>
                                        <TableCell>
                                            Edit
                                        </TableCell>
                                        <TableCell>
                                            Delete
                                        </TableCell>
                                        <TableCell>
                                            Expense
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {search
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((user) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1}>
                                                    <TableCell>
                                                        {user?.id}
                                                    </TableCell>
                                                    <TableCell>
                                                        {user?.email}
                                                    </TableCell>
                                                    <TableCell>
                                                        {user?.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {user?.dept_name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {user?.status}
                                                    </TableCell>
                                                    <TableCell>
                                                        <button onClick={() => navigate(`/users/profile/${user.id}`)} style={{ width: '100%', paddingTop: '5px', cursor: 'pointer' }}>
                                                            <RemoveRedEyeIcon sx={{ color: 'blue' }} fontSize='5px' />
                                                        </button>
                                                    </TableCell>
                                                    <TableCell>
                                                        <button onClick={() => navigate(`/users/edit/${user.id}`)} style={{ width: '100%', paddingTop: '5px', cursor: 'pointer' }}>
                                                            <EditIcon sx={{ color: 'purple' }} fontSize='5px' />
                                                        </button>
                                                    </TableCell>
                                                    <TableCell>
                                                        <button onClick={() => handleDelete(user.id)} style={{ width: '100%', paddingTop: '5px', cursor: 'pointer' }}>
                                                            <DeleteOutlineIcon sx={{ color: 'red' }} fontSize='5px' />
                                                        </button>
                                                    </TableCell>
                                                    <TableCell>
                                                        <button onClick={() => navigate(`/expenses/userexpenses/${user.id}`)} style={{ width: '100%', paddingTop: '5px', cursor: 'pointer' }}>
                                                            <AttachMoneyIcon sx={{ color: 'green' }} fontSize='5px' />
                                                        </button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={search.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Stack>
                <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        User Deleted
                    </Alert>
                </Snackbar>
            </Box>
        </>


    );
}
export default AdminDashboard;
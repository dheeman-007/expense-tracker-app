import * as React from 'react';
import { Box, Stack, Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

function Userexpense() {
    const navigate = useNavigate()
    const [expenses, setExpenses] = useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const { id } = useParams();
    useEffect(() => {
        fetch(`/expenses/userexpenses/${id}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((res) => res.json())
            .then((res) => {
                setExpenses(res)
            });
    }, [])

    return (
        <Box height='100vh' display='flex' flexDirection='row' justifyContent='center' alignItems='center' >
            <Stack p={10} bgcolor='white' borderRadius='20px' boxShadow="0px 0px 200px 100px #CDCDC9" flexDirection='column' justifyContent='center' width={'40%'} alignItems='center' >
                <Stack flexDirection='row' width='100%' alignItems='flex-start' justifyContent='flex-start'>
                    <Typography style={{ fontFamily: 'Gloock', fontSize: '30px' }} mb='20px'>Expense Details</Typography>
                </Stack>
                <Stack flexDirection='row' width='100%' alignItems='flex-start' justifyContent='flex-start' >
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Invoice
                                        </TableCell>
                                        <TableCell>
                                            Status
                                        </TableCell>
                                        <TableCell>
                                            Description
                                        </TableCell>
                                        <TableCell>
                                            Amount
                                        </TableCell>
                                        <TableCell>
                                            View
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {expenses
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((expense) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1}>
                                                    <TableCell>
                                                        {expense?.invoice_id}
                                                    </TableCell>
                                                    <TableCell>
                                                        {expense?.status}
                                                    </TableCell>
                                                    <TableCell>
                                                        {expense?.description}
                                                    </TableCell>
                                                    <TableCell>
                                                        {expense?.amount}
                                                    </TableCell>
                                                    <TableCell>
                                                        <button onClick={() => navigate(`/expenses/userviewexpense/${expense?.id}`)} style={{ width: '100%', paddingTop: '5px', cursor: 'pointer' }}>
                                                            <RemoveRedEyeIcon sx={{ color: 'blue' }} fontSize='5px' />
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
                            count={expenses.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Stack>
                <Stack mt={5} flexDirection='row' width='100%' alignItems='flex-start' justifyContent='flex-start'>
                    <Button color="secondary" onClick={() => navigate(`/users/dashboard/${id}`)} variant="outlined">Back</Button>
                </Stack>
            </Stack>
        </Box>

    );
}
export default Userexpense;
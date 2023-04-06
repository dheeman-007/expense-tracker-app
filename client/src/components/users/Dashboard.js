import * as React from 'react';
import { Box, Stack, Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
};

function Dashboard() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    useEffect(() => {
        fetch(`/users/dashboard/${id}?`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((res) => res.json())
            .then((res) => {
                setUser(res);
            });
    }, []);
    return (
        <Box height='100vh' display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
            <Stack pl={5} pr={5} borderRadius='15px' bgcolor='white' boxShadow="0px 0px 200px 100px #CDCDC9" borderColor='purple' flexDirection='column' justifyContent='center' alignItems='center' >
                <Stack flexDirection='row' mt={2} mb={2} width='100%' alignItems='flex-start' justifyContent='flex-start'>
                    <Button size='small' color="error" onClick={() => navigate("/users/signin")} variant="outlined">Log out</Button>
                </Stack>
                <Stack flexDirection='row' width='100%' alignItems='flex-start' justifyContent='flex-start'>
                    <Card sx={{ maxWidth: 500 }}>
                        <CardMedia
                            sx={{ height: 350 }}
                            image="https://e7.pngegg.com/pngimages/359/411/png-clipart-computer-icons-user-profile-service-others-service-business.png"
                            title="green iguana"
                        />
                        <CardContent>
                            <List sx={style} component="nav" aria-label="mailbox folders">
                                <ListItem button>
                                    <Typography fontFamily='Roboto' fontWeight='bold'>Department name:  </Typography>
                                    <Typography fontFamily='Roboto' ml='5px'>{user?.dept_name}</Typography>
                                </ListItem>
                                <Divider />
                                <ListItem button divider>
                                    <Typography fontFamily='Roboto' fontWeight='bold'>Email:  </Typography>
                                    <Typography fontFamily='Roboto' ml='5px'>{user?.email}</Typography>
                                </ListItem>
                                <ListItem button>
                                    <Typography fontFamily='Roboto' fontWeight='bold'>Password:  </Typography>
                                    <Typography fontFamily='Roboto' ml='5px'>{user?.password}</Typography>
                                </ListItem>
                                <Divider />
                                <ListItem button>
                                    <Typography fontFamily='Roboto' fontWeight='bold'>Name:  </Typography>
                                    <Typography fontFamily='Roboto' ml='5px'>{user?.name}</Typography>
                                </ListItem>
                                <Divider light />
                                <ListItem button>
                                    <Typography fontFamily='Roboto' fontWeight='bold'>Status:  </Typography>
                                    <Typography fontFamily='Roboto' ml='5px'>{user?.status}</Typography>
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Stack>
                <Stack mt={2} mb={2} flexDirection='row' width='100%' alignItems='flex-start' justifyContent='flex-start'>
                    {user?.status==="employee" && <Button sx={{mr:'15px'}} size='small' color="success" onClick={() => navigate(`/expenses/addexpense/${id}`)} variant="outlined">Add Expense</Button>}
                    <Button size='small' color="secondary" onClick={() => navigate(`/expenses/allexpenses/${id}`)} variant="outlined">View Expenses</Button>
                </Stack>
            </Stack>
        </Box>

    );
}
export default Dashboard;
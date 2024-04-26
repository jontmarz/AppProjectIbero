import { useState, useEffect } from 'react';
import { api, getToken } from "../../config/axios";
import { Grid, Box, Typography, Paper, Radio, RadioGroup, FormControlLabel, FormLabel, Chip, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { styled } from '@mui/material/styles';
import { listRoles } from '../../config/assets';
import Swal from 'sweetalert2';

export default function RolesSettings() {

    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
    const token = getToken();

    const UserPaper = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-between',
        color: theme.palette.text.secondary,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        minWidth: "75%",
    }));

    const getUsers = async () => {
        try {
            const { data } = await api({
                url: "/api/user/",
                method: "GET"
            });
            setUsers(data.infoUsers);
        } catch (e) {
            console.error('error: ' + e, 'message: ' + e);
        }
    };

    useEffect(() => {
        if (token) {
            getUsers();
        } else {
            setUsers(null);
        }
    }, []);

    const handleRadioClick = (userId, role) => {
        setSelectedUserId(userId);
        setValue(`role-${userId}`, role);
    };

    const onSubmit = async (data) => {
        let user = users.find(user => user._id === selectedUserId)

        const role = { role: data[`role-${selectedUserId}`] };

        const userUpdate = {
            ...user,
            ...role
        };

        const res = await api({
            url: `/api/user/${selectedUserId}`,
            method: "PUT",
            data: userUpdate
        })
        .then((res) => {
            Swal.fire({
                title: "¡Actualizacion exitosa!",
                text: res.data.message,
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#0098D4"
            });
            window.location.reload();
        })
        .catch((e) => {
            Swal.fire({
                title: "¡Error!",
                text: e.response.data.message,
                icon: "error",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#0098D4"
            });
        });
    };

    if (!users) return null;

    // console.log(users);

    return (
        <>
            <Typography variant="h5" component="h3" sx={{ fontSize: 25, fontWeight: "bold", my: 2, mr: "3em", textAlign: "center" }}>Roles de Usuario</Typography>
            {users.map((item, index) => (
                <Grid container spacing={2} className="settings" sx={{ px: 5, maxWidth: {xl: 1400}, width: "100%", margin: "0 auto" }} key={index}>
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", margin:"auto" }}>
                        <UserPaper>
                            <Box sx={{display: "flex", flexDirection: "column"}}>
                                <Typography variant="h6" component="h6" sx={{ fontSize: 20, fontWeight: "bold", mr: "3em" }}>Nombre: </Typography>
                                <Typography variant="body1" component="p" sx={{ fontSize: 20, mr: "3em" }}>{item.fullName}</Typography>
                            </Box>
                            <div className="UserRoles" sx={{ display: "flex" }}>
                                <FormLabel id={`UserRole-${item.id}`} sx={{ fontWeight: "700"}}>Rol</FormLabel>
                                <RadioGroup 
                                    row 
                                    aria-label={`role-${item.id}`} 
                                    name={`role-${item.id}`} 
                                    defaultValue={item.role}
                                    value={watch(`role-${item._id}`)}
                                >
                                    {listRoles.map((role, index) => (
                                        <FormControlLabel
                                            key={index}
                                            value={role}
                                            control={<Radio />}
                                            label={role}
                                            onClick={() => handleRadioClick(item._id, role)}
                                            {...register(`role-${item._id}`)}
                                        />
                                    ))}
                                </RadioGroup>
                                {selectedUserId === item._id && (
                                    <Chip
                                        label="Cambiar Rol"
                                        color="primary"
                                        clickable
                                        onClick={handleSubmit(onSubmit)}
                                        sx={{ ml: 2 }}
                                    />
                                )}
                            </div>
                        </UserPaper>
                    </Grid>
                </Grid>
            ))}
        </>
    );
}

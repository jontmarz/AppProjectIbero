import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Box, Dialog, DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import Swal from 'sweetalert2';
import { api, getToken } from '../config/axios';
import PropTypes from 'prop-types';
import CustomButton from "../components/CustomButton";
import QueryDB from "../components/records/QueryDB";
import { TableRecords } from "../components/records/TableRecords";
import { FormRecords } from "../components/records/FormRecords";

function SimpleDialog(props) {
    const { onClose, recordValue, open, formRecord } = props;
  
    const handleClose = () => {
      onClose(recordValue);
    };
  
    return (
      <Dialog onClose={handleClose} open={open} sx={{ px:3 }}>
        <DialogTitle sx={{ textAlign: "center"}}>Antecedentes de la Investigación</DialogTitle>
        <DialogContent>
            <DialogContentText sx={{ textAlign: "center", mb: 2 }}>Para agregar un antecedente, debes diligenciar el siguiente formulario:</DialogContentText>
            <FormRecords uploadData={formRecord} />
        </DialogContent>
      </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    recordValue: PropTypes.array.isRequired,
};

export default function Records() {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const token = getToken()
    const [disabled, setDisabled] = useState(false)
    const initTableData = () => {
        const storedData = localStorage.getItem('rowsData')
        return storedData ? JSON.parse(storedData) : []
    }
    const [recordValue, setrecordValue] = useState(() => initTableData())

    const handleData = (data) => {
        var idData = recordValue.length + 1
        const newData = { id: idData, ...data }
        setrecordValue([...recordValue, newData]);
        setOpen(false);
        /* if (recordValue.length > 0) {
            setDisabled(false)
        } else {
            setDisabled(true)
        } */
    }

    useEffect(() => {
        const token = getToken()
        if(!token) {
        } else localStorage.setItem('rowsData', JSON.stringify(recordValue))
    }, [recordValue])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setrecordValue(value);
    };

    const records = Object.assign({}, recordValue)
    console.log(disabled);
    
    const SaveRecords = async() => {
        try {
            const res = await api({
                url: "/api/dataApp/records",
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                data: { records }
            })
            Swal.fire({
                title: "¡Datos Guardados!",
                text: res.data.message,
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#0098D4"
            })
            localStorage.removeItem('rowsData')
            navigate("/problem-tree")
        } catch (e) {
            console.log(e);
            Swal.fire({
                title: "¡Error!",
                text: e.response.data.message,
                icon: "error",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#0098D4"
            })
        }
    }

    return (
        <>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h3" component="h3" sx={{ textAlign: 'center', mt: 2 }}>Antecedentes de la Investigación</Typography>
                <Typography variant="p" component="p" sx={{ textAlign: 'center', mt: 2, ml: 5 }}>Recuerde las bases bibliograficas que puede consultar:</Typography>
            <Box sx={{maxWidth: 1400, margin: "2em auto"}}>
                <QueryDB />
                <Box sx={{mx:2}}>
                    <TableRecords data={recordValue} />

                    <CustomButton name="Agregar Antecedente" action={handleClickOpen} color="#cca448" />

                    <SimpleDialog
                        recordValue={recordValue}
                        open={open}
                        onClose={handleClose}
                        formRecord={handleData}
                    />
                    
                    <Box sx={{ display:"flex", justifyContent:"space-around", mt:3 }}>
                        <CustomButton name="Guardar Datos" action={SaveRecords} data={disabled} />
                    </Box>
                </Box>
            </Box>
            </Grid>
        </Grid>
        </>
    )
}
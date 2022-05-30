import React, { useState } from "react";
import axios from "axios";
import { server } from "../../tools/server";
import {
    Button,
    TextField,
    Autocomplete,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Card,
    Typography,
    CardContent,
    DialogContentText,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Publishers = props => {
    const [filtered, setFiltered] = useState(null);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(null);
    const [openDelete, setOpenDelete] = useState(false);
    const [id, setId] = useState(null);

    if (!props.publishers) {
        return <div>Looading...</div>
    };

    /* This function allow to filter the data */
    const searchValue = e => {
        setFiltered(props.publishers.filter(publisher => publisher.name == e.target.value));
    };

    /* Close modal. */
    const handleClose = () => {
        setOpen(false);
    };

    /* This function create a new publisher in database. */
    const handlePost = () => {
        axios.post(`${server}publisher`, {
            name
        }, { withCredentials: true })
            .then(res => {
                console.log(res);
                if (res.data.status === "success") {
                    setOpen(false);
                    window.location.reload();
                };
            });
    };

    /* This function delete an specify book. */
    const handleDelete = () => {
        axios.delete(`${server}publisher/${id}`, { withCredentials: true }).then(res => {
            if (res.data.status === "success") {
                window.location.reload();
            };
        });
    };

    return (
        <div className="global-container">
            <div className="top-container">
                <Autocomplete style={{ width: "75rem" }}
                    id="searchbar"
                    options={props.publishers.map(option => option.name)}
                    renderInput={(params) =>
                        <TextField {...params} label="Quel author recherchez-vous ?" onChange={e => searchValue(e)} />}
                />
                <Button style={{ marginLeft: "0.5rem" }} variant="contained" onClick={() => setOpen(true)}>
                    <AddCircleIcon />
                </Button>
            </div>

            {filtered
                ? filtered.map(publisher => (
                    <Card style={{ width: "80rem", marginBottom: "1rem" }} key={publisher._id} >
                        <CardContent style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography component="div">
                                {publisher.name}
                            </Typography>
                            <DeleteIcon style={{ cursor: "pointer", color: "red" }} onClick={() => {
                                setId(publisher._id);
                                setOpenDelete(true);
                            }} />
                        </CardContent>
                    </Card>
                ))
                : props.publishers.map(publisher => (
                    <Card style={{ width: "80rem", marginBottom: "1rem" }} key={publisher._id} >
                        <CardContent style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography component="div">
                                {publisher.name}
                            </Typography>
                            <DeleteIcon style={{ cursor: "pointer", color: "red" }} onClick={() => {
                                setId(publisher._id);
                                setOpenDelete(true);
                            }} />
                        </CardContent>
                    </Card>
                ))}


            {/* ADD PUBLISHER DIALOG */}
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    Ajouter une maison d'édition
                </DialogTitle>
                <DialogContent style={{
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <TextField id="name" label="Nom de la maison d'édition" variant="filled" onChange={e => setName(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fermer</Button>
                    <Button onClick={handlePost} autoFocus>
                        Ajouter
                    </Button>
                </DialogActions>
            </Dialog>

            {/* DELETE DIALOG */}
            <Dialog
                open={openDelete}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Supprimer un livre
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Vous allez définitivement supprimer cette maison d'édition. Cette action sera irréverssible. Êtes-vous sûr ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Publishers;
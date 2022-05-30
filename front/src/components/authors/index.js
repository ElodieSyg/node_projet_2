import React, { useState } from "react";
import axios from "axios";
import { server } from "../../tools/server";
import { useNavigate } from "react-router-dom";
import "./authors.css";
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
    TextField,
    Autocomplete,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Select,
    MenuItem,
    DialogContentText,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Authors = props => {
    const [filtered, setFiltered] = useState(null);
    const [open, setOpen] = useState(false);
    const [lastName, setLastName] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [age, setAge] = useState(null);
    const [selectedPublisher, setSelectedPublisher] = useState(null);
    const [openDelete, setOpenDelete] = useState(false);
    const [id, setId] = useState(null);
    const navigate = useNavigate();

    if (!props.authors) {
        return <div>Looading...</div>
    };

    /* Select id's publisher. */
    const handleSelectPublisher = e => {
        setSelectedPublisher(e.target.value);
    };

    /* Select id's author. */
    const handleRedirect = id => {
        navigate(`/authors/${id}`);
    };

    /* Close modal. */
    const handleClose = () => {
        setOpen(false);
    };

    /* This function allow to filter the data. */
    const searchValue = e => {
        setFiltered(props.authors.filter(author => author.firstName == e.target.value || author.lastName == e.target.value));
    };

    /* This function create a new author and store it in mongodb database. */
    const handlePost = () => {
        axios.post(`${server}author`, {
            lastName, firstName, age, publisher: selectedPublisher
        }, { withCredentials: true })
            .then(res => {
                console.log(res);
                if (res.data.status === "success") {
                    setOpen(false);
                };
            });
    };

    /* This function delete an specify book. */
    const handleDelete = () => {
        axios.delete(`${server}author/${id}`, { withCredentials: true }).then(res => {
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
                    options={props.authors.map(option => option.lastName || option.firstName)}
                    renderInput={(params) =>
                        <TextField {...params} label="Quel author recherchez-vous ?" onChange={e => searchValue(e)} />}
                />
                <Button style={{ marginLeft: "0.5rem" }} variant="contained" onClick={() => setOpen(true)}>
                    <AddCircleIcon />
                </Button>
            </div>

            {filtered
                ? filtered.map(author => (
                    <Card style={{ width: "80rem", marginBottom: "1rem" }}>
                        <CardContent>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography variant="h5" component="div">
                                    {author.firstName} {author.lastName} ~ {author.age} ans
                                </Typography>
                                <DeleteIcon style={{ cursor: "pointer", color: "red" }} onClick={() => {
                                    setId(author._id);
                                    setOpenDelete(true);
                                }} />
                            </div>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Auteur
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" style={{ color: "black" }} variant="outlined" onClick={() => handleRedirect(author._id)}>Vos ces livres</Button>
                        </CardActions>
                    </Card>
                ))
                : props.authors.map(author => (
                    <Card style={{ width: "80rem", marginBottom: "1rem" }}>
                        <CardContent>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography variant="h5" component="div">
                                    {author.firstName} {author.lastName} ~ {author.age} ans
                                </Typography>
                                <DeleteIcon style={{ cursor: "pointer", color: "red" }} onClick={() => {
                                    setId(author._id);
                                    setOpenDelete(true);
                                }} />
                            </div>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Auteur
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" style={{ color: "black" }} variant="outlined" onClick={() => handleRedirect(author._id)}>Vos ces livres</Button>
                        </CardActions>
                    </Card>
                ))}

            {/* ADD AUTHOR DIALOG. */}
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    Ajouter un auteur
                </DialogTitle>
                <DialogContent style={{
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <TextField id="firstName" label="Prénom" variant="filled" onChange={e => setFirstName(e.target.value)} style={{ marginBottom: "1rem" }} />
                    <TextField id="lastName" label="Nom de famille" variant="filled" onChange={e => setLastName(e.target.value)} style={{ marginBottom: "1rem" }} />
                    <TextField id="age" type="number" label="Age" variant="filled" onChange={e => setAge(e.target.value)} style={{ marginBottom: "1rem" }} />
                    <Select
                        value={selectedPublisher ? selectedPublisher : "Maison d'édition"}
                        label="Age"
                        onChange={handleSelectPublisher}
                    >
                        {props.publishers.map(publisher => (
                            <MenuItem value={publisher._id}>{publisher.name}</MenuItem>
                        ))}
                    </Select>
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
                        Vous allez définitivement supprimer cet auteur. Cette action sera irréverssible. Êtes-vous sûr ?
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

export default Authors;
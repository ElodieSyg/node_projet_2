import React, { useState } from "react";
import axios from "axios";
import { server } from "../../tools/server";
import moment from "moment";
import {
    Card,
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

const Books = props => {
    const [filtered, setFiltered] = useState(null);
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [selectedPublisher, setSelectedPublisher] = useState(null);
    const [id, setId] = useState(null);

    if (!props.books && !props.authors) {
        return <div>Looading...</div>
    };

    /* Select id's publisher. */
    const handleSelectPublisher = e => {
        setSelectedPublisher(e.target.value);
    };

    /* Select id's author. */
    const handleSelectAuthor = e => {
        setSelectedAuthor(e.target.value);
    };

    /* Close modal. */
    const handleClose = () => {
        setOpen(false);
        setOpenDelete(false);
    };

    /* This function allow to filter the data. */
    const searchValue = e => {
        setFiltered(props.books.filter(author => author.title == e.target.value || author.description == e.target.value));
    };

    /* This function create a new book and store it in mongodb database. */
    const handlePost = () => {
        axios.post(`${server}book`, {
            title, description, author: selectedAuthor, publisher: selectedPublisher
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
        axios.delete(`${server}book/${id}`, { withCredentials: true }).then(res => {
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
                    options={props.books.map(option => option.title || option.description)}
                    renderInput={(params) =>
                        <TextField {...params} label="Quel livre recherchez-vous ?" onChange={e => searchValue(e)} />}
                />
                <Button style={{ marginLeft: "0.5rem" }} variant="contained" onClick={() => setOpen(true)}>
                    <AddCircleIcon />
                </Button>
            </div>

            {filtered
                ? filtered.map(book => (
                    <Card style={{ width: "80rem", marginBottom: "1rem" }}>
                        <CardContent>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography variant="h5" component="div">
                                    {book.title}
                                </Typography>
                                <DeleteIcon style={{ cursor: "pointer", color: "red" }} onClick={() => {
                                    setOpenDelete(true);
                                    setId(book._id)
                                }} />
                            </div>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {moment(book.publication_date).format("MMM Do YY")}, {book.author.firstName} {book.author.lastName}
                            </Typography>
                            <Typography variant="body2">
                                {book.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
                : props.books.map(book => (
                    <Card style={{ width: "80rem", marginBottom: "1rem" }}>
                        <CardContent>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography variant="h5" component="div">
                                    {book.title}
                                </Typography>
                                <DeleteIcon style={{ cursor: "pointer", color: "red" }} onClick={() => {
                                    setOpenDelete(true)
                                    setId(book._id)
                                }} />
                            </div>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {moment(book.publication_date).format("MMM Do YY")}, {book.author.firstName} {book.author.lastName}
                            </Typography>
                            <Typography variant="body2">
                                {book.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}

            {/* ADD BOOK DIALOG */}
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
                    <TextField id="title" label="Titre du livre" variant="filled" onChange={e => setTitle(e.target.value)} style={{ marginBottom: "1rem" }} />
                    <TextField id="description" label="Description du livre" variant="filled" onChange={e => setDescription(e.target.value)} style={{ marginBottom: "1rem" }} />
                    <Select
                        value={selectedAuthor ? selectedAuthor : "Auteur"}
                        label="Auteur"
                        onChange={handleSelectAuthor}
                        style={{ marginBottom: "1rem" }}
                    >
                        {props.authors.map(author => (
                            <MenuItem value={author._id}>{author.firstName} {author.lastName}</MenuItem>
                        ))}
                    </Select>
                    <Select
                        value={selectedPublisher ? selectedPublisher : "Maison d'édition"}
                        label="Maison d'édition"
                        onChange={handleSelectPublisher}
                        style={{ marginBottom: "1rem" }}
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
                        Vous allez définitivement supprimer ce livre. Cette action sera irréverssible. Êtes-vous sûr ?
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

export default Books;
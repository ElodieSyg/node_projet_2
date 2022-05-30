import { useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { server } from "../../tools/server";
import {
    Card,
    CardContent,
    Typography
} from "@mui/material";

/* DYNAMIC PAGE -> RETURN ALL AUTHOR'S BOOKS. */

const DynamicAuthor = props => {
    const [books, setBooks] = useState(null);
    const params = useParams();

    if (params) {
        axios.get(`${server}book/${params.id}`).then(res => setBooks(res.data.data));
    };

    if (!books) {
        return <div>Loading...</div>
    };

    console.log(books)

    return (
        <div className="global-container">
            {books.length > 1
                ? books.map(book => (
                    <Card style={{ width: "80rem", marginBottom: "1rem" }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {book.title}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {moment(book.publication_date).format("MMM Do YY")}, {book.author.firstName} {book.author.lastName}
                            </Typography>
                            <Typography variant="body2">
                                {book.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
                : <p>Pas de livre encore disponible...</p>}
        </div>
    );
};

export default DynamicAuthor;
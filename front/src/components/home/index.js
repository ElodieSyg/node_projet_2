import {
    List,
    Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./home.css";
import { server } from "../../tools/server";

const style = {
    width: '95%',
    height: '10rem',
};

const Home = () => {
    return (
        <div className="global-container">
            <List sx={style}>
                <Link to="/authors" className="link">
                    <h1 className="home-title">AUTHORS</h1>
                </Link>
                <Divider />
                <Link to="/books" className="link">
                    <h1 className="home-title start-end">BOOKS</h1>
                </Link>
                <Divider />
                <Link to="/publishers" className="link">
                    <h1 className="home-title">PUBLISHERS</h1>
                </Link>
            </List>
        </div>
    );
};

export default Home;
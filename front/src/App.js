import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { server } from "./tools/server";
import axios from "axios";
// Components
import Home from "./components/home";
import Authors from "./components/authors";
import Books from "./components/books";
import Publishers from "./components/publishers";
import Navbar from "./components/navbar";
import DynamicAuthor from "./components/authors/dynamic";

const App = () => {
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [publishers, setPublishers] = useState([]);

  /* Fetching all data */
  const getAuthors = () => {
    axios.get(`${server}author`).then(res => {
      setAuthors(res.data.data);
    });
  };

  const getBooks = () => {
    axios.get(`${server}book`).then(res => {
      setBooks(res.data.data);
    });
  };

  const getPublishers = () => {
    axios.get(`${server}publisher`).then(res => {
      setPublishers(res.data.data);
    });
  };

  useState(() => {
    getAuthors();
    getBooks();
    getPublishers();
  }, []);

  if (!books && !authors && !publishers) {
    return <div>Loading...</div>
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={
          <Home />
        } />
        <Route exact path="/books" element={
          <Books
            books={books}
            authors={authors}
            publishers={publishers} />
        } />
        <Route exact path="/authors" element={
          <Authors
            authors={authors}
            setAuthors={setAuthors}
            publishers={publishers} />
        } />
        <Route exact path="/publishers" element={
          <Publishers
            publishers={publishers}
            setPublishers={setPublishers} />
        } />
        <Route exact path="/authors/:id" element={
          <DynamicAuthor />
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

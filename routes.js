"use strict";
const express = require("express");
const { response } = require("express");
const routes = express.Router();
//.Router() controls all the endpoints/different paths our api can handle

const movies = [
    { id: 1, title: "Black Panther", year: 2018, animated: false },
    { id: 2, title: "Once Upon A Time", year: 2019, animated: false },
    { id: 3, title: "Coco", year: 2017, animated: true },
    { id: 4, title: "Iron Man", year: 2008, animated: false }
];
let nextId = 5;

//GET /movies - respond with JSON array of movies
routes.get("/movies", (req, res) => {
    res.json(movies);//just returns the movies array of objects
});

//GET SPECIFIC MOVIE
routes.get("/movies/:id", (req, res) => {
    const id = parseInt(req.params.id); //.id needs to match :id above this line
    //const id will always come back as string
    //to have it come back as number, you need to PARSEINT(req.params.id)
    //OTHERWISE, movie.id === id wont work
    const movie = movies.find(movie => movie.id === id);
    if (movie) {//IF MOVIE EXISTS, SEND JSON;ELSE, GIVE 404 error
        res.json(movie);
    }
    else {
        res.status(404);
        res.send(`No movie with ${id} exists.`)
    }
});

//POST
routes.post("/movies", (req, res) => {
    const movie = req.body;
    movie.id = nextId++;
    movies.push(movie);
    res.status(201);
    res.json(movie);
});
//in body area for POSTMAN: Post -> raw -> Json for postman
//export routes for use in server.js


routes.delete("/movies/:id", (req, res) => {
    console.log("Where's ur mom Potter");
    const id = parseInt(req.params.id);
    const index = movies.findIndex(movie => movie.id === id);
    //findIndex will return -1 if it doesn't find anything
    if (index !== -1) {//if index DOES NOT equal negative one/if index FOUND SOMETHING....
        movies.splice(index, 1);
    }
    res.status(204);
    console.log("She Dedd?");
    res.send(); //or res.json ALWAYS
});

module.exports = routes;


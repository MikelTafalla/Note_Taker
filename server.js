//use express framework
const express = require("express");
//modules used to interact with url paths and have access to fs methods
const path = require("path");
const fs = require("fs");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Set empty array to store notes
let notes = [];

//Routes
app.get("/notes", (req, res) => res.sendFile(__dirname + "/public/notes.html"));

app.get("*", (req, res) => res.sendFile(__dirname + "/public/index.html"));

//API routes
app.get("/api/notes", (req, res) => {
    // reads the notes from json file
    const noteData = fs.readFile("/db/db.json", "utf8");
    console.log(notes);
    res.json(noteData);
});

// Start the server on the port
app.listen(PORT, function() {
    console.log("SERVER IS LISTENING ON PORT: " + PORT);
  });
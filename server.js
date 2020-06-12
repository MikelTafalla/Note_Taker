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

//API routes
app.get("/api/notes", (req, res) => {
    // reads the notes from json file
    fs.readFile(__dirname + "/db/db.json", (err, data) => { 
        if (err) throw err;
        //parse the buffered data on JSON format
        let noteData = JSON.parse(data)
        res.json(noteData);
    });
});

app.post("/api/notes", (req, res) => {
    //Get access to db.json
    fs.readFile(__dirname + "/db/db.json", (err, data) => {if (err) throw err});
    //Store new note in newNote variable
    let newNote = req.body;
    //Push newNote to the array of notes
    notes.push(newNote);
    // Stringify array
    notes = JSON.stringify(notes);
    //Write new array of notes 
    fs.writeFile(__dirname + "/db/db.json", notes, (err, data) => {if (err) throw err }); 
    console.log(notes);
    console.log(newNote);
    res.json(JSON.parse(notes));

});


//HTML Routes
app.get("/notes", (req, res) => res.sendFile(__dirname + "/public/notes.html"));

app.get("*", (req, res) => res.sendFile(__dirname + "/public/index.html"));


// Start the server on the port
app.listen(PORT, function() {
    console.log("SERVER IS LISTENING ON PORT: " + PORT);
  });


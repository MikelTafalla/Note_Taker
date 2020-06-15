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
//Have access to styles.css and index.js
app.use(express.static(path.join(__dirname, 'public')));

//API routes
app.get("/api/notes", (req, res) => {
  // reads the notes from json file
  fs.readFile(__dirname + "/db/db.json", (err, data) => { 
    if (err) throw err;
    //parse the buffered data on JSON format
    let noteData = JSON.parse(data);
    res.json(noteData);
  })
});

app.post("/api/notes", (req, res) => {

  fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => { 
    if (err) throw err;
    let notes = JSON.parse(data)
    // Store new note and create id dynamically
    let newNote = {
      id: notes.length +1,
      title: req.body.title,
      text: req.body.text,
    }
    // Push newNote to the array of notes
    notes.push(newNote)
    //Write new array of notes 
    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), (err, data) => {
      if (err) throw err;
      res.json(notes)      
    }); 
  });
});

// get a specific note to read
app.get("/api/notes/:title", (req, res) => {
  // reads the notes from json file
  fs.readFile(__dirname + "/db/db.json", (err, data) => { 
    if (err) throw err;
    //parse the buffered data on JSON format
    let noteData = JSON.parse(data);
    // Iterate through all elements of notes, and return all elements whose title is different than the one of the URL route.
    notes = noteData.filter(data => {
      return data.title.toLowerCase() === req.params.title.toLowerCase()
    }); 
    res.json(notes);
  })
});

app.delete("/api/notes/:id", (req, res) => {
  // Get access to db.json file to avoid scope problems
  fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => { 
    if (err) throw err;
    // save the object array from db.json in notes
    let notes = JSON.parse(data)
    // storing the element that we want to delete in const note
    const note = notes.find(n => n.id === parseInt(req.params.id));
    // getting the index of the element we want to delete. id: 3 = index = 2
    const index = notes.indexOf(note);
    // remove just the one note that we want to delete based our choice on its index.
    notes.splice(index, 1);
   
    // update/rewrite db.json file after deletion is complete 
    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), (err, data) => {
      if (err) throw err;
      //send response back to client
      res.json(notes)    
    }); 
  });
});

//HTML Routes
app.get("/notes", (req, res) => res.sendFile(__dirname + "/public/notes.html"));

app.get("/", (req, res) => res.sendFile(__dirname + "/public/index.html"));

//CSS Route
app.get("/notes", (req, res) => res.sendFile(__dirname + "/public/assets/css/styles.css"));

//JS Route
app.get("/notes", (req, res) => res.sendFile(__dirname + "/public/assets/js/index.js"));


// Start the server on the port
app.listen(PORT, function() {
  console.log("SERVER IS LISTENING ON PORT: " + PORT);
});


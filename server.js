// requiring the pre-builtin node library to write file or file manipulation
const fs = require('fs');
// requiring the db.json file
const notesStored = require('./db/db.json');
// requring the node library that creates the server and routes
const express = require('express');
// requiing the pre-built-in node library to be able to search for files and folders
const path = require('path');
// rename for ease
const app = express();

// used to identify the server - look for an available server or else use the 3001
const PORT = process.env.PORT || 3001;

// makes the public path accessible to anyone 
app.use(express.static('public'));
// decriptcs data from the browser 
app.use(express.urlencoded({ extended:true }));
// convert the decripted data to json format
app.use(express.json());

// when /api/notes return 
app.get('/api/notes', (req, res) => {
    res.json(notesStored);
});

app.post("/api/notes", (req, res) => {
    console.log(req.body);
    notesStored.push(req.body);
    // adds spacing
    fs.writeFileSync("./db/db.json", JSON.stringify(notesStored, null, "\t"));
    res.json(notesStored);
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})
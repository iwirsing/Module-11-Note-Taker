const notes = require("express").Router();
const {readFromFile, readAndAppend,writeToFile,} = require ('../helpers/fsUtils');
//this is an npm  package that allows programmer to give id to notes
const { v4: uuidv4 } = require('uuid');



//Get route for retrieving notes information
notes.get('/notes',(req,res)=>{
    readFromFile('./db/db.json').then((data)=>{
        res.json(JSON.parse(data));
    })
        
});

//save notes route
notes.post('/notes',(req,res)=>{
    console.log(req.body);
    const {title, text}=req.body;

    //check if all properties are present
    if (title&&text){
        const saveNote ={
            title,
            text,
            id: uuidv4(),
            };
       
        readAndAppend(saveNote,'./db/db.json');
        res.json('Note saved successfully');
    }

    else {
        res.error('Error in saving the note');
    }

});

//delete notes route needed to install method override to be able to use delete
notes.delete('/notes/:id',(req,res)=>{
    const noteId=req.params.id;
    readFromFile('./db/db.json')
    .then((data)=>JSON.parse(data))
    .then((jsonNote)=>{
        //make a new array of notes except the note to be deleted
        const newNotesArray=jsonNote.filter((note)=>note.id !== noteId);

        //save the new notes array to the db.json
        writeToFile('./db/db.json', newNotesArray);

        //show feedback to delete request
        res.json('The note with id '+noteId+' has been successfully deleted.')
    })
});

module.exports=notes;
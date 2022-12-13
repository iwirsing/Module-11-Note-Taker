const router = require("express").Router();
const path = require('path');



//GET Route for notes, basically send the notes.html to client
router.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/notes.html'));
});

//GET Route for homepage, sends the index.html to client
router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'));
});

//route for all others, sends the index.html to client
router.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'));
});

module.exports=router;


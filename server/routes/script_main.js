const express = require('express');
const Script = require('../models/Script')
const Scene = require('../models/Scene')
const router = express.Router();
const {deleteScene} = require('./scene_main')
var fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');




router.get('/getScripts', async(req,resp)=>{
    try {
        let data = await Script.find({})
        resp.send(data)
    } catch (error) {
        resp.status(500).send("Internal Server Error Occured");
    }
})

router.post('/createScript', async(req, resp)=>{
    const {title} = req.body

    try {
        let script_exist = await Script.findOne({title})
        if(script_exist)
        {
            return resp.status(400).json({ errors: "Script with Title Already Exists" });
        }
        // Adding script
        script_exist = await Script.create({title:title})
        
        // console.log(script_exist)
        resp.json(script_exist)

    } catch (error) {
        resp.status(500).send("Internal Server Error Occured");
    }
})

router.put('/deleteScript/:id', async (req, res) => {

    try {
    // Find the script to be deleted and delete it
    let script = await Script.findById(req.params.id);
    // If no Note Exist
    if(!script){return res.status(404).send("Not Found")}
    
    const scene = await Scene.find({script:req.params.id})
    for(let i=0;i<scene.length;i++)
    {
        deleteScene(scene[i]._id)
    }
    
    script = await Script.findByIdAndDelete(req.params.id, {new:true})
    // console.log(req.params.id)
    res.json(script);
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
})

router.put('/updateScript/:id', fetchuser, async (req, res) => {

    try {     
    const {title} = req.body;
    // Create newNote object
    const newNote = {};
    if(title){newNote.title = title};
    // Find the note to be updates
    let note = await Script.findById(req.params.id);
    // If no Note Exist
    if(!note){return res.status(404).send("Not Found")}

    note = await Script.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note});

    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
})





module.exports = router
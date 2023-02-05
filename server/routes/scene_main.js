const express = require('express');
const Scene = require('../models/Scene')
const xlsx = require("xlsx")
const router = express.Router();
const Category = require('../models/Category')
const Item = require('../models/Item')
var fetchuser = require('../middleware/fetchuser')
const { deleteCategory } = require('./category_main')


const createCategory = async (id, script) => {
    let creation = await Category.create({ scene: id, script: script, name: "PROPS", group: "1" })
    creation = await Category.create({ scene: id, script: script, name: "SET DRESSING", group: "1" })
    creation = await Category.create({ scene: id, script: script, name: "VEHICLES", group: "1" })
    creation = await Category.create({ scene: id, script: script, name: "GREENERY", group: "1" })
    creation = await Category.create({ scene: id, script: script, name: "ANIMALS", group: "1" })
    creation = await Category.create({ scene: id, script: script, name: "SPECIAL EFFECTS", group: "1" })
    creation = await Category.create({ scene: id, script: script, name: "WARDROPE", group: "1" })
    creation = await Category.create({ scene: id, script: script, name: "HAIR", group: "1" })
    creation = await Category.create({ scene: id, script: script, name: "SPECIAL EQUIPMENT", group: "1" })
    creation = await Category.create({ scene: id, script: script, name: "STUNT", group: "1" })
    creation = await Category.create({ scene: id, script: script, name: "SOUND", group: "2" })
    creation = await Category.create({ scene: id, script: script, name: "MUSIC", group: "2" })
    creation = await Category.create({ scene: id, script: script, name: "Cast Members", group: "3" })
    creation = await Category.create({ scene: id, script: script, name: "Background Actors", group: "4" })
}


router.post('/getScenes', async (req, resp) => {
    try {
        let id = req.body.id
        let data = await Scene.find({ script: id })
        // exp(id)

        resp.send(data)
    } catch (error) {
        resp.status(500).send("Internal Server Error Occured");
    }
})

router.post('/createScene', async (req, resp) => {

    const { id, number, ie, dn, location, description, set, pagecount, est } = req.body

    try {
        let scene_exist = await Scene.findOne({ number })
        if (scene_exist && scene_exist.script === id) {
            return resp.status(400).json({ errors: "Script with Title Already Exists" });
        }
        // Adding script

        scene_exist = await Scene.create({ script: id, number: number, ie: ie, dn: dn, location: location, description: description, set: set, pagecount: pagecount, est: est })
        // console.log(scene_exist._id)
        createCategory(scene_exist._id, id)
        resp.json(scene_exist)
    } catch (error) {
        // console.log(error)
        resp.status(500).send("Internal Server Error Occured");
    }
})

const deleteScene = async (id) => {
    let scene = await Scene.findById(id);
    // If no Note Exist
    if (!scene) { return res.status(404).send("Not Found") }
    const categry = await Category.find({ scene: id })
    for (let i = 0; i < categry.length; i++) {
        deleteCategory(categry[i]._id)
    }

    scene = await Scene.findByIdAndDelete(id, { new: true })
    return scene
}

router.put('/deleteScene/:id', async (req, res) => {

    try {
        // Find the script to be deleted and delete it
        const scene = deleteScene(req.params.id)
        res.json(scene);

    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
})

// Update
router.put('/updateScene/:id', async (req, res) => {

    try {
        const scene = req.body
        // console.log(req.body)
        let note = await Scene.findById(req.params.id);
        // If no Note Exist
        if (!note) { return res.status(404).send("Not Found") }

        note = await Scene.findByIdAndUpdate(req.params.id, { $set: scene }, { new: true })
        res.json({ note });

    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
})



router.post('/export_schedule', async (req, resp) => {
    try {
        let id = req.body.id
        await exp(id)
        resp.download('./Schedule.xlsx')
    }
    catch(error){
        // console.log(error)
        return resp.status(500).send("Internal Server Error");
    }
})

let exp = async (id) => {
    

        let export_data = []
        let data = await Scene.find({ script: id })
        let response = data.map(async (e) => {
            let categry_cast = await Category.findOne({ scene: e.id, name: "Cast Members" })
            let categry_extra = await Category.findOne({ scene: e.id, name: "Background Actors" })
            let cast_num = ""
            if(categry_cast)
            {
                let cast = await Item.find({ category: categry_cast._id })
                cast.map((ele) => {
                    cast_num += ele.number.toString() + ","
                })
            }
            let extra_num = ""
            if(categry_extra)
            {
                let extra = await Item.find({ category: categry_extra._id })
                extra.map((ele) => {
                    extra_num += "E" + ele.number.toString() + ","
                })
            }
            let export_item = { "Sc. No": e.number, "I/E": e.ie, "Location": e.location, "D/N": e.dn, "CAST": cast_num, "EXTRAS": extra_num, "Pages": e.pagecount, "EST (H)": e.est, "Scene Description": e.description }
            export_data.push(export_item)
        })
        await Promise.all(response)
        // console.log(export_data)
        
        const worksheet = xlsx.utils.json_to_sheet(export_data);
        const workBook = xlsx.utils.book_new()

        xlsx.utils.book_append_sheet(workBook, worksheet, "Schedule")

        xlsx.write(workBook,{bookType:'xlsx',type:"buffer"})

        xlsx.write(workBook,{bookType:'xlsx',type:"binary"})
        xlsx.writeFile(workBook,"Schedule.xlsx")

    
}

module.exports = { router, deleteScene }
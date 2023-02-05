const express = require('express');
const Item = require('../models/Item')
const Script = require('../models/Script')
const Category = require('../models/Category')
const router = express.Router();
const multer = require('multer')
var fetchuser = require('../middleware/fetchuser');
const fs = require('fs');


const Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/images');
    },

    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
})

//  Upload Parameter
const upload = multer({
    storage: Storage
})

// Get Items
router.get('/getItem/:id', async (req, resp) => {
    try {
        const id = req.params.id
        let data = await Item.find({ category: id })
        resp.send(data)
    } catch (error) {
        resp.status(500).send("Internal Server Error Occured");
    }
})

// Add Items
router.post('/createItem', upload.array("file", 3), async (req, resp) => {

    const { id, group, item, description, age, gender, category, count } = JSON.parse(req.body.data);

    try {

        let item_exist

        let cat = await Category.findById(id)
        let chk = await Item.findOne({ script: cat.script, name: item })
        let chk_dublicate = await Item.findOne({ script: cat.script, name: item, category: id })

        if (chk_dublicate) {
            // console.log("first")
            return resp.status(400).json({ errors: "Script with Title Already Exists" });
        }

        // Adding script
        let catagry = await Category.findById(id)
        // console.log(catagry)
        let itemNumb = await Script.findById(catagry.script)
        if (!chk) {
            if (catagry.name == "Cast Members") {
                itemNumb.castNumber += 1
                let respons = await Script.findByIdAndUpdate(itemNumb.id, { $set: itemNumb })
                itemNumb.castNumber -= 1
            }
            else if (catagry.name == "Background Actors") {
                itemNumb.extraNumber += 1
                let respons = await Script.findByIdAndUpdate(itemNumb.id, { $set: itemNumb })
                itemNumb.extraNumber -= 1
            }
        }
        else {
            if (catagry.name == "Cast Members") {
                itemNumb.castNumber = chk.number
            }
            else if (catagry.name == "Background Actors") {
                {
                    itemNumb.extraNumber = chk.number
                }
            }
        }
        if (group == '1') {
            let arr = [];
            for (let i = 0; i < req.files.length; i++)
                arr[i] = req.files[i].filename
            if (catagry.name == "Cast Members") {
                item_exist = await Item.create({ category: id, number: itemNumb.castNumber, scene: catagry.scene, script: catagry.script, group: group, name: item, description: description, images: arr })
            }
            else if (catagry.name == "Background Actors") {
                item_exist = await Item.create({ category: id, number: itemNumb.extraNumber, scene: catagry.scene, script: catagry.script, group: group, name: item, description: description, images: arr })
            }
            else {
                item_exist = await Item.create({ category: id, number: 0, scene: catagry.scene, script: catagry.script, group: group, name: item, description: description, images: arr })

            }

        }
        else if (group == '2') {
            if (catagry.name == "Cast Members") {
                item_exist = await Item.create({ category: id, number: itemNumb.castNumber, scene: catagry.scene, script: catagry.script, group: group, name: item, description: description })
            }
            else if (catagry.name == "Background Actors") {
                item_exist = await Item.create({ category: id, number: itemNumb.extraNumber, scene: catagry.scene, script: catagry.script, group: group, name: item, description: description })
            }
            else {
                item_exist = await Item.create({ category: id, number: 0, scene: catagry.scene, script: catagry.script, group: group, name: item, description: description })

            }
        }
        else if (group == '3') {
            if (catagry.name == "Cast Members") {
                item_exist = await Item.create({ category: id, number: itemNumb.castNumber, scene: catagry.scene, script: catagry.script, group: group, name: item, description: description, age: age, gender: gender, ctg: category })
            }
            else if (catagry.name == "Background Actors") {
                item_exist = await Item.create({ category: id, number: itemNumb.extraNumber, scene: catagry.scene, script: catagry.script, group: group, name: item, description: description, age: age, gender: gender, ctg: category })
            }
            else {
                item_exist = await Item.create({ category: id, number: 0, scene: catagry.scene, script: catagry.script, group: group, name: item, description: description, age: age, gender: gender, ctg: category })

            }
        }
        else if (group == '4') {
            if (catagry.name == "Cast Members") {
                item_exist = await Item.create({ category: id, number: itemNumb.castNumber, scene: catagry.scene, script: catagry.script, group: group, name: item, description: description, age: age, gender: gender, ctg: category, count: count })
            }
            else if (catagry.name == "Background Actors") {
                item_exist = await Item.create({ category: id, number: itemNumb.extraNumber, scene: catagry.scene, script: catagry.script, group: group, name: item, description: description, age: age, gender: gender, ctg: category, count: count })
            }
            else {
                item_exist = await Item.create({ category: id, number: 0, scene: catagry.scene, script: catagry.script, group: group, name: item, description: description, age: age, gender: gender, ctg: category, count: count })

            }
        }
        // console.log(item_exist)
        resp.json(item_exist)

    } catch (error) {
        // console.log(error)
        resp.status(500).send("Internal Server Error Occured");
    }
})

// Add Items from Item Panel
router.post('/createItemPanel', upload.array("file", 3), async (req, resp) => {

    const { id, group, item, description, age, gender, category, count, categories } = JSON.parse(req.body.data);

    // console.log(group)
    const selected = JSON.parse(req.body.selected);

    try {
        let category_obj = categories

        let item_exist = await Item.findOne({ item })
        let item_number = await Script.findById(id)
        let catagry = categories
        let item_chk = await Item.findOne({ script: id, name: item })
        if (item_chk) {
            return resp.status(400).json({ errors: "Item with Title Already Exists" });
        }
        let itemNumb
        if(catagry=="Cast Members"){
            itemNumb = item_number.castNumber
            item_number.castNumber += 1
            let respons = await Script.findByIdAndUpdate(item_number.id, { $set: item_number })          
        }
        else if(catagry=="Background Actors"){
            itemNumb = item_number.extraNumber
            item_number.extraNumber += 1
            let respons = await Script.findByIdAndUpdate(item_number.id, { $set: item_number })          
        }
        //  Adding script
        let response = selected.map(async (e) => {

            let category_to_get = await Category.findOne({ scene: e, name: category_obj })
            // console.log(category_to_get)

            if (group == '1') {
                let arr = [];
                for (let i = 0; i < req.files.length; i++)
                    arr[i] = req.files[i].filename
                if (catagry == "Cast Members") {
                    item_exist = await Item.create({ category: category_to_get._id, number: itemNumb, scene: category_to_get.scene, script: category_to_get.script, group: group, name: item, description: description, images: arr })
                }
                else if (catagry == "Background Actors") {
                    item_exist = await Item.create({ category: category_to_get._id, number: itemNumb, scene: category_to_get.scene, script: category_to_get.script, group: group, name: item, description: description, images: arr })
                }
                else {
                    item_exist = await Item.create({ category: category_to_get._id, number: 0, scene: category_to_get.scene, script: category_to_get.script, group: group, name: item, description: description, images: arr })
    
                }
    
            }
            else if (group == '2') {
                if (catagry == "Cast Members") {
                    item_exist = await Item.create({ category: category_to_get._id, number: itemNumb, scene: category_to_get.scene, script: category_to_get.script, group: group, name: item, description: description })
                }
                else if (catagry == "Background Actors") {
                    item_exist = await Item.create({ category: category_to_get._id, number: itemNumb, scene: category_to_get.scene, script: category_to_get.script, group: group, name: item, description: description })
                }
                else {
                    item_exist = await Item.create({ category: category_to_get._id, number: 0, scene: category_to_get.scene, script: category_to_get.script, group: group, name: item, description: description })
    
                }
            }
            else if (group == '3') {
                if (catagry == "Cast Members") {
                    item_exist = await Item.create({ category: category_to_get._id, number: itemNumb, scene: category_to_get.scene, script: category_to_get.script, group: group, name: item, description: description, age: age, gender: gender, ctg: category })
                }
                else if (catagry == "Background Actors") {
                    item_exist = await Item.create({ category: category_to_get._id, number: itemNumb, scene: category_to_get.scene, script: category_to_get.script, group: group, name: item, description: description, age: age, gender: gender, ctg: category })
                }
                else {
                    item_exist = await Item.create({ category: category_to_get._id, number: 0, scene: category_to_get.scene, script: category_to_get.script, group: group, name: item, description: description, age: age, gender: gender, ctg: category })
    
                }
            }
            else if (group == '4') {
                if (catagry == "Cast Members") {
                    item_exist = await Item.create({ category: category_to_get._id, number: itemNumb, scene: category_to_get.scene, script: category_to_get.script, group: group, name: item, description: description, age: age, gender: gender, ctg: category, count: count })
                }
                else if (catagry == "Background Actors") {
                    item_exist = await Item.create({ category: category_to_get._id, number: itemNumb, scene: category_to_get.scene, script: category_to_get.script, group: group, name: item, description: description, age: age, gender: gender, ctg: category, count: count })
                }
                else {
                    item_exist = await Item.create({ category: category_to_get._id, number: 0, scene: category_to_get.scene, script: category_to_get.script, group: group, name: item, description: description, age: age, gender: gender, ctg: category, count: count })
    
                }

            // if (group == '1') {
            //     let arr = [];
            //     for (let i = 0; i < req.files.length; i++)
            //         arr[i] = req.files[i].filename
            //     item_exist = await Item.create({ category: category_to_get._id, number: newNumber, script: category_to_get.script, scene: category_to_get.scene, group: group, name: item, description: description, images: arr })

            // }
            // else if (group == '2')
            //     item_exist = await Item.create({ category: category_to_get._id, number: newNumber, script: category_to_get.script, scene: category_to_get.scene, group: group, name: item, description: description })
            // else if (group == '3')
            //     item_exist = await Item.create({ category: category_to_get._id, number: newNumber, script: category_to_get.script, scene: category_to_get.scene, group: group, name: item, description: description, age: age, gender: gender, ctg: category })
            // else if (group == '4')
            //     item_exist = await Item.create({ category: category_to_get._id, number: newNumber, script: category_to_get.script, scene: category_to_get.scene, group: group, name: item, description: description, age: age, gender: gender, ctg: category, count: count })

         }
        })

        await Promise.all(response)
        resp.json(item_exist)

    } catch (error) {
        // console.log(error)
        resp.status(500).send("Internal Server Error Occured");
    }
})

const deleteItem = async (id, group) => {
    if (group === '1') {
        const item = await Item.findById({ _id: id })
        const arr = item.images
        if (arr != undefined) {
            for (let i = 0; i < arr.length; i++) {
                fs.unlinkSync("uploads/images" + '/' + arr[i]);
            }
        }
    }
    const result = await Item.findByIdAndDelete(id, { new: true })
    return result
}

// Delete Items
router.put('/deleteItem/:id/:group', async (req, resp) => {

    const { id, group } = req.params;
    // console.log(id, group)

    try {
        const result = deleteItem(id, group)
        resp.json(result)

    } catch (error) {
        // console.log(error)
        return resp.status(500).send("Internal Server Error");
    }
})

// Edit Iterms
router.post('/editItem', upload.array("file", 3), async (req, resp) => {

    const { ctid, id, group, item, description, age, gender, number, category, count } = JSON.parse(req.body.data);

    deleteItem(id, group)
    try {

        // Adding script
        let catagry = await Category.findById(ctid)
        // console.log(ctid, id, group, item, description, age, gender, number, category, count)
        if (group == '1') {
            let arr = []
            for (let i = 0; i < req.files.length; i++)
                arr[i] = req.files[i].filename
            item_exist = await Item.create({ category: ctid, scene: catagry.scene, number:number, script: catagry.script, group: group, name: item, description: description, images: arr })

        }
        else if (group == '2')
            item_exist = await Item.create({ category: ctid, scene: catagry.scene, number:number, script: catagry.script, group: group, name: item, description: description })
        else if (group == '3')
            item_exist = await Item.create({ category: ctid, scene: catagry.scene, number:number, script: catagry.script, group: group, name: item, description: description, age: age, gender: gender, ctg: category })
        else if (group == '4')
            item_exist = await Item.create({ category: ctid, scene: catagry.scene, number:number, script: catagry.script, group: group, name: item, description: description, age: age, gender: gender, ctg: category, count: count })
        // console.log(item_exist)
        resp.json(item_exist)
        // resp.json(item_exist)

    } catch (error) {
        console.log(error)
        resp.status(500).send("Internal Server Error Occured");
    }
})

module.exports = { router, deleteItem }
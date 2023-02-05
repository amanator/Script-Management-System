const express = require('express');
const Category = require('../models/Category')
const router = express.Router();
const Scene = require('../models/Scene')
const Script = require('../models/Script')
var fetchuser = require('../middleware/fetchuser')
const Item = require('../models/Item')
const {deleteItem} = require('./item_main')
const { body, validationResult } = require('express-validator');

router.get('/getCategory/:id', async(req,resp)=>{
    try {
        let data = await Category.find({scene:req.params.id})
        resp.send(data)
    } catch (error) {
        resp.status(500).send("Internal Server Error Occured");
    }
})

router.post('/createCategory', async(req, resp)=>{
    const {id, name, group, color} = req.body

    try {
        let category_exist = await Category.findOne({name})
        if(category_exist && category_exist.scene==id)
        {
            return resp.status(400).json({ errors: "category with Title Already Exists" });
        }
        let scene = await Scene.findById(id)
        let all_Scenes = await Scene.find({script:scene.script})
        // Adding category
        let respons = all_Scenes.map(async(e)=>{
            
            category_exist = await Category.create({scene:e._id,script:scene.script, name:name, group:group, color:color})
        })
        await Promise.all(respons);
        category_exist = await Category.find({scene:id, name:name})
        // console.log(category_exist)
        resp.json(category_exist)

    } catch (error) {
        // console.log(error)
        resp.status(500).send("Internal Server Error Occured");
    }
})

const deleteCategory = async (id)=>{
    let category = await Category.findById(id);
    // If no Note Exist
    // const deleteItem = await Item.deleteMany({category:id})
    if(!category){return res.status(404).send("Not Found")}
    const item = await Item.find({category:id})
    for(let i=0;i<item.length;i++)
    {
        deleteItem(item[i]._id, item[i].group)
    }

    
    category = await Category.findByIdAndDelete(id, {new:true})
    return category;
}


router.put('/deleteCategory/:id', async (req, res) => {

    try {
    // Find the category to be deleted and delete it
    const category = deleteCategory(req.params.id)
    res.json(category);
    
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
})

router.put('/updateCategory/:id', async (req, res) => {

    try {     
    const data = req.body;
    // console.log(data)
    // console.log(req.params.id)
    // Find the note to be updates
    let note = await Category.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}
    let scene = await Scene.findById(note.scene);
    let script = await Script.findOne({_id:scene.script});
    let all_scenes = await Scene.find({script:script._id})
    
    let response = all_scenes.map(async(e)=>{
        let cate = await Category.findOne({scene:e._id, name:data.name})
        let itemData = await Item.find({category:cate._id})
        let response1 = itemData.map(async(e)=>{
            let dataItem = e;
            dataItem.group = data.group 
            let respons = await Item.findByIdAndUpdate(e._id, {$set: dataItem})
         })
         await Promise.all(response1)
         let categoryItem = cate
        categoryItem.group = data.group
        categoryItem.color = data.color
        note = await Category.findByIdAndUpdate(cate._id, {$set: categoryItem})
    })
    await Promise.all(response)
    
    // If no Note Exist
    // console.log(note)
    // let all_Category_in_Script = await Category.find({name:data.name, scene:note.scene})
    // console.log(all_Category_in_Script)
    // all_Category_in_Script.map(async(element)=>{
        
    //     let itemData = await Item.find({category:element.id})
        // let response = itemData.map(async(e)=>{
        //    let dataItem = e;
        //    dataItem.group = data.group 
        //    let respons = await Item.findByIdAndUpdate(e._id, {$set: dataItem})
        // })
        // await Promise.all(response)
        // let categoryItem = element
        // categoryItem.group = data.group
        // categoryItem.color = data.color
        // note = await Category.findByIdAndUpdate(element.id, {$set: categoryItem})
    // })
    note = await Category.findById(req.params.id);
    res.json({note});

    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
})



module.exports = {router, deleteCategory}
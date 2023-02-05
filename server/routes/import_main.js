const express = require('express');
const Script = require('../models/Script')
const Scene = require('../models/Scene')
const Category = require('../models/Category')
const Item = require('../models/Item');
const { promise } = require('bcrypt/promises');
const router = express.Router();

function scene_tag(para) {

    let arr = new Map()
    let i = 0;
    para.map((e) => {
        if ("SceneProperties" in e) {
            i++;
        }
        if ('Text' in e) {
            if (typeof (e.Text) == 'object') {
                e.Text.map((val) => {
                    if (typeof (val) == 'object') {
                        if ("_TagNumber" in val) {
                            // console.log(i,val._TagNumber)
                            arr.set(val._TagNumber, i)
                        }
                    }
                })
            }
        }
    })
    return arr;
}

function decode(data, para) {
    const TagCategory = data.FinalDraft.TagData.TagCategories.TagCategory
    const TagDefinition = data.FinalDraft.TagData.TagDefinitions.TagDefinition
    const Tags = data.FinalDraft.TagData.Tags.Tag
    const arr = scene_tag(para)
    let info = []
    let scene = new Set()
    for (let i = 0; i < TagCategory.length; i++) {
        let obj = { category: "", color: "", items: [] }
        obj.category = TagCategory[i]._Name;
        let items = []
        for (let j = 0; j < TagDefinition.length; j++) {
            if (TagCategory[i]._Id == TagDefinition[j]._CatId) {
                Tags.map((e) => {
                    if ((typeof e.DefId) == "object") {
                        e.DefId.map((v) => {
                            if (v == TagDefinition[j]._Id) {
                                if (arr.has(e._Number)) {
                                    scene.add(arr.get(e._Number))
                                }

                            }
                        })
                    }
                    else if (e.DefId === TagDefinition[j]._Id) {

                        if (arr.has(e._Number)) {
                            scene.add(arr.get(e._Number))
                        }
                    }
                })
                let ar = []
                scene.forEach((e) => ar.push(e))
                items.push({ name: TagDefinition[j]._Label, scene: ar })
                scene.clear()
            }
        }
        obj.category = TagCategory[i]._Name
        obj.color = TagCategory[i]._Color
        obj.items = items
        info.push(obj)

    }
    return info;
}


router.post('/import/:id', async (req, resp) => {
    const id = req.params.id
    const data = req.body
    try {
        const para = data.FinalDraft.Content.Paragraph
        let SceneArray = []
        const r = await para.map(async (e) => {
            if ('SceneProperties' in e) {
                let sceneNo = e._Number
                let l = e.SceneProperties._Length.split(' ')
                let length = 0
                l.map((e) => {
                    length += eval(e)
                })

                let location = ""
                let ie = ""
                let dn = ""

                if ('Text' in e) {
                    let text = ""
                    if (typeof (e.Text) == "object") {
                        e.Text.map((value) => {
                            if (typeof (value) == 'object') {
                                text += value.__text
                            }
                            else {
                                text += value
                            }
                            text += " "
                        })

                    }
                    else {
                        text = e.Text
                    }

                    sp = text.split(".")
                    l = sp[1].split('-')
                    sp1 = text.split("-")
                    ie = sp[0]
                    location = l[0]
                    dn = sp1[sp1.length-1]
                }
                // console.log(sceneNo, length, ie, dn, location)
                let scene = await Scene.create({ script: id, number: sceneNo, ie: ie.toUpperCase(), dn: dn.toUpperCase(), location: location.toUpperCase(), description: "", set: "", pagecount: length, est: 0 })
                SceneArray.push(scene._id)
            }
        })
        await Promise.all(r);
        let num = 0
        let cat = []
        let cat2 = []
        const info = decode(data, para)
        // console.log(info)
        const final = info.map(async (e) => {
            let catergory = e.category
            let color = e.color
            let CategoryArray = []
            const response = SceneArray.map(async (val) => {
                let scne = await Scene.findById(val)
                const rr = await Category.create({script:scne.script, scene: val,color:color, name: catergory, group: 1 })
                // console.log(rr)
                CategoryArray.push(rr._id)
            })
            await Promise.all(response);
            // console.log(CategoryArray)
            // if(catergory == "Cast Members" || catergory == "Background Actors" ){
            //     cat.push(CategoryArray)
            // }
            
            const respons =  e.items.map(async (v) => {
                let item = v.name
                const rr = await v.scene.map(async (number) => {
                    const cate = await Category.findById(CategoryArray[number - 1])
                    const response = await Item.create({scene:cate.scene, script:cate.script, category: CategoryArray[number - 1], group: 1, name: item, number:num })
                    if(cate.name === "Cast Members"){
                        cat.push(response)
                    }
                    if(cate.name === "Background Actors"){
                        cat2.push(response)
                    }
                   
                })
                await Promise.all(rr);
            })
            await Promise.all(respons);
        })

        await Promise.all(final);

        
        // console.log(cat)
        // console.log(cat2)
        const result = await Scene.find({ script: id })
        const total_item = await Item.find({script:id})


        let char = ""
        let i=0
        // console.log(cat)
       let a = cat.map(async(val)=>{
        //    console.log(i +""+ char)
           val.number = i
           if(val.name!=char){
               char = val.name;
               i+=1;
            }
            let respon = await Item.findByIdAndUpdate(val._id, {$set: val})
        })
        await Promise.all(a)
    //     console.log(cat[1])
    //     const total_items = await Item.find({script:id, category:cat[1]})
        i=0;
        char=""
        let b = cat2.map(async(val)=>{
            val.number = i
           if(val.name!=char){
               char = val.name;
               i+=1;
            }
            let respon = await Item.findByIdAndUpdate(val._id, {$set: val})

        })
        await Promise.resolve(b)

        let src = await Script.findById(id)
        src.castNumber = cat.length
        src.extraNumber = cat2.length
        let respons = await Script.findByIdAndUpdate(id, {$set: src})
        resp.json(result)
    }
    catch (error) {
        // console.log(error)
        let deleteScene = await Scene.deleteMany({ script: id })
        resp.status(500).send("Internal Server Error Occured");
    }
})


module.exports = router